const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function normalize(v) {
  const mag = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function quat(x = 0, y = 0, z = 0, w = 1) {
  return { x, y, z, w };
}

function quatNormalize(q) {
  const mag = Math.hypot(q.x, q.y, q.z, q.w) || 1;
  return quat(q.x / mag, q.y / mag, q.z / mag, q.w / mag);
}

function quatMul(a, b) {
  return quat(
    a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
    a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
  );
}

function quatFromAxisAngle(axis, angle) {
  const half = angle * 0.5;
  const s = Math.sin(half);
  const a = normalize(axis);
  return quat(a.x * s, a.y * s, a.z * s, Math.cos(half));
}

function quatRotateVec(q, v) {
  const qv = quat(v.x, v.y, v.z, 0);
  const inv = quat(-q.x, -q.y, -q.z, q.w);
  const out = quatMul(quatMul(q, qv), inv);
  return { x: out.x, y: out.y, z: out.z };
}

function latLonToVec(latRad, lonRad) {
  const cl = Math.cos(latRad);
  return {
    x: cl * Math.sin(lonRad),
    y: Math.sin(latRad),
    z: cl * Math.cos(lonRad)
  };
}

function project(v, cx, cy, r) {
  const perspective = 0.78 + 0.22 * (v.z + 1) * 0.5;
  return {
    x: cx + v.x * r * perspective,
    y: cy - v.y * r * perspective
  };
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width * 0.5, height * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function lerpColor(a, b, t) {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t))
  };
}

function hashLand(lat, lon) {
  const s = Math.sin(lat * 12.9898 + lon * 78.233) * 43758.5453;
  const n = s - Math.floor(s);
  const continent =
    Math.sin((lon + 18) * 0.035) +
    Math.cos((lat - 8) * 0.08) +
    Math.sin((lon + lat) * 0.045);
  const polar = Math.abs(lat) > 70;
  return polar || continent + n * 0.58 > 0.8;
}

Page({
  data: {},

  onReady() {
    this.earth = {
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
      dpr: 1,
      q: quatNormalize(quatMul(
        quatFromAxisAngle({ x: 0, y: 1, z: 0 }, -0.58),
        quatFromAxisAngle({ x: 1, y: 0, z: 0 }, 0.16)
      )),
      yawVel: 0.11,
      pitchVel: 0.008,
      dragging: false,
      lastX: 0,
      lastY: 0,
      frameTimer: null,
      lastTime: Date.now()
    };
    this.initEarthCanvas();
  },

  onUnload() {
    if (this.earth && this.earth.frameTimer) {
      clearTimeout(this.earth.frameTimer);
    }
  },

  handleStart() {
    wx.navigateTo({
      url: "/pages/globe/globe"
    });
  },

  initEarthCanvas() {
    const query = wx.createSelectorQuery().in(this);
    query.select("#earthCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const item = res && res[0];
        if (!item || !item.node) return;

        const canvas = item.node;
        const ctx = canvas.getContext("2d");
        const dpr = wx.getSystemInfoSync().pixelRatio || 1;
        canvas.width = Math.round(item.width * dpr);
        canvas.height = Math.round(item.height * dpr);

        this.earth.canvas = canvas;
        this.earth.ctx = ctx;
        this.earth.width = canvas.width;
        this.earth.height = canvas.height;
        this.earth.dpr = dpr;
        this.earth.lastTime = Date.now();
        this.drawLoop();
      });
  },

  drawLoop() {
    if (!this.earth || !this.earth.ctx) return;
    const now = Date.now();
    const dt = clamp((now - this.earth.lastTime) / 1000, 0.001, 0.04);
    this.earth.lastTime = now;

    if (!this.earth.dragging) {
      this.earth.q = quatNormalize(quatMul(
        quatMul(
          quatFromAxisAngle({ x: 0, y: 1, z: 0 }, this.earth.yawVel * dt),
          quatFromAxisAngle({ x: 1, y: 0, z: 0 }, this.earth.pitchVel * dt)
        ),
        this.earth.q
      ));
      this.earth.yawVel = lerp(this.earth.yawVel, 0.11, 0.012);
      this.earth.pitchVel = lerp(this.earth.pitchVel, 0.008, 0.012);
    }

    this.drawEarth();
    this.earth.frameTimer = setTimeout(() => this.drawLoop(), 16);
  },

  drawEarth() {
    const { ctx, width, height, q, dpr } = this.earth;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const r = Math.min(width, height) * 0.45;

    ctx.clearRect(0, 0, width, height);

    const halo = ctx.createRadialGradient(cx, cy, r * 0.65, cx, cy, r * 1.34);
    halo.addColorStop(0, "rgba(255,255,255,0)");
    halo.addColorStop(0.58, "rgba(255,206,199,0.12)");
    halo.addColorStop(0.78, "rgba(122,151,224,0.24)");
    halo.addColorStop(1, "rgba(151,154,224,0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.34, 0, TAU);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.clip();

    const ocean = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.35, r * 0.1, cx, cy, r * 1.2);
    ocean.addColorStop(0, "rgba(247,252,255,0.98)");
    ocean.addColorStop(0.35, "rgba(181,220,232,0.96)");
    ocean.addColorStop(0.68, "rgba(139,156,220,0.98)");
    ocean.addColorStop(1, "rgba(76,91,165,0.98)");
    ctx.fillStyle = ocean;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    const light = normalize({ x: -0.7, y: -0.24, z: 1 });
    const latSteps = 36;
    const lonSteps = 58;
    const dotSize = Math.max(1.7 * dpr, Math.min(5.4 * dpr, r * 0.014));
    const landA = { r: 96, g: 168, b: 156 };
    const landB = { r: 252, g: 204, b: 190 };
    const ice = { r: 255, g: 255, b: 250 };

    for (let il = 0; il < latSteps; il += 1) {
      const lat = lerp(-88, 88, il / (latSteps - 1));
      for (let io = 0; io < lonSteps; io += 1) {
        const lon = lerp(-180, 180, io / (lonSteps - 1));
        const base = latLonToVec(lat * Math.PI / 180, lon * Math.PI / 180);
        const v = quatRotateVec(q, base);
        if (v.z < 0) continue;

        const land = hashLand(lat, lon);
        if (!land && (il + io) % 4 !== 0) continue;
        if (land && (il + io) % 2 !== 0) continue;

        const p = project(v, cx, cy, r);
        const ndl = clamp(dot(normalize(v), light) * 0.5 + 0.56, 0, 1);
        const shade = 0.68 + ndl * 0.38;

        if (land) {
          const mix = clamp((0.55 - Math.abs(lat) / 90) * 0.6 + ndl * 0.36, 0, 1);
          const c = Math.abs(lat) > 72 ? ice : lerpColor(landA, landB, mix);
          ctx.fillStyle = `rgba(${Math.round(c.r * shade)},${Math.round(c.g * shade)},${Math.round(c.b * shade)},0.9)`;
          ctx.fillRect(p.x, p.y, dotSize * 1.15, dotSize * 1.15);
        } else {
          ctx.fillStyle = `rgba(104,126,206,${0.2 + ndl * 0.16})`;
          ctx.fillRect(p.x, p.y, dotSize * 0.78, dotSize * 0.78);
        }
      }
    }

    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = Math.max(0.7 * dpr, r * 0.003);
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lon = -180; lon <= 180; lon += 6) {
        const v = quatRotateVec(q, latLonToVec(lat * Math.PI / 180, lon * Math.PI / 180));
        if (v.z < 0) {
          started = false;
          continue;
        }
        const p = project(v, cx, cy, r);
        if (!started) {
          ctx.moveTo(p.x, p.y);
          started = true;
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
    }

    for (let lon = -150; lon <= 180; lon += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -82; lat <= 82; lat += 5) {
        const v = quatRotateVec(q, latLonToVec(lat * Math.PI / 180, lon * Math.PI / 180));
        if (v.z < 0) {
          started = false;
          continue;
        }
        const p = project(v, cx, cy, r);
        if (!started) {
          ctx.moveTo(p.x, p.y);
          started = true;
        } else {
          ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();
    }

    const dusk = ctx.createLinearGradient(cx + r * 0.4, cy - r * 0.6, cx + r * 1.05, cy + r * 0.8);
    dusk.addColorStop(0, "rgba(37,45,112,0)");
    dusk.addColorStop(1, "rgba(37,45,112,0.28)");
    ctx.fillStyle = dusk;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();

    const gloss = ctx.createRadialGradient(cx - r * 0.36, cy - r * 0.36, 0, cx - r * 0.14, cy - r * 0.12, r);
    gloss.addColorStop(0, "rgba(255,255,255,0.36)");
    gloss.addColorStop(0.6, "rgba(255,255,255,0.08)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = "rgba(92,94,164,0.22)";
    ctx.lineWidth = Math.max(1, r * 0.008);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    ctx.stroke();

    this.drawOrbitLabel(ctx, cx, cy, r, "Tokyo", "东京", 0.7, -0.03);
  },

  drawOrbitLabel(ctx, cx, cy, r, title, subtitle, ox, oy) {
    const dpr = this.earth.dpr;
    const x = cx + r * ox;
    const y = cy + r * oy;
    const w = 76 * dpr;
    const h = 46 * dpr;
    roundedRect(ctx, x, y, w, h, 12 * dpr);
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    ctx.fill();
    ctx.strokeStyle = "rgba(139,136,204,0.2)";
    ctx.stroke();
    ctx.fillStyle = "#57528f";
    ctx.font = `${13 * dpr}px sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(title, x + w * 0.5, y + 19 * dpr);
    ctx.fillStyle = "#7773b7";
    ctx.font = `${12 * dpr}px sans-serif`;
    ctx.fillText(subtitle, x + w * 0.5, y + 35 * dpr);
  },

  onEarthTouchStart(event) {
    const touch = event.touches && event.touches[0];
    if (!touch || !this.earth) return;
    this.earth.dragging = true;
    this.earth.lastX = touch.clientX;
    this.earth.lastY = touch.clientY;
    this.earth.yawVel = 0;
    this.earth.pitchVel = 0;
  },

  onEarthTouchMove(event) {
    const touch = event.touches && event.touches[0];
    if (!touch || !this.earth || !this.earth.dragging) return;
    const dx = touch.clientX - this.earth.lastX;
    const dy = touch.clientY - this.earth.lastY;
    this.earth.lastX = touch.clientX;
    this.earth.lastY = touch.clientY;

    const scale = 0.008;
    const yaw = dx * scale;
    const pitch = -dy * scale;
    this.earth.q = quatNormalize(quatMul(
      quatMul(
        quatFromAxisAngle({ x: 0, y: 1, z: 0 }, yaw),
        quatFromAxisAngle({ x: 1, y: 0, z: 0 }, pitch)
      ),
      this.earth.q
    ));
    this.earth.yawVel = yaw * 0.7;
    this.earth.pitchVel = pitch * 0.7;
  },

  onEarthTouchEnd() {
    if (!this.earth) return;
    this.earth.dragging = false;
  }
});

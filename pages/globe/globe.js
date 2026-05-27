const TAU = Math.PI * 2;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const normalize = (v) => {
  const m = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / m, y: v.y / m, z: v.z / m };
};
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const quat = (x = 0, y = 0, z = 0, w = 1) => ({ x, y, z, w });
const quatNormalize = (q) => {
  const m = Math.hypot(q.x, q.y, q.z, q.w) || 1;
  return quat(q.x / m, q.y / m, q.z / m, q.w / m);
};
const quatMul = (a, b) => quat(
  a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
  a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
  a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z
);
const quatFromAxisAngle = (axis, angle) => {
  const h = angle * 0.5;
  const s = Math.sin(h);
  const a = normalize(axis);
  return quat(a.x * s, a.y * s, a.z * s, Math.cos(h));
};
const quatRotateVec = (q, v) => {
  const out = quatMul(quatMul(q, quat(v.x, v.y, v.z, 0)), quat(-q.x, -q.y, -q.z, q.w));
  return { x: out.x, y: out.y, z: out.z };
};
const latLonToVec = (lat, lon) => ({ x: Math.cos(lat) * Math.sin(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.cos(lon) });
const project = (v, cx, cy, r) => {
  const p = 0.78 + 0.22 * (v.z + 1) * 0.5;
  return { x: cx + v.x * r * p, y: cy - v.y * r * p };
};
const hashLand = (lat, lon) => Math.abs(lat) > 70 || Math.sin((lon + 18) * 0.035) + Math.cos((lat - 8) * 0.08) + Math.sin((lon + lat) * 0.045) + ((Math.sin(lat * 12.9898 + lon * 78.233) * 43758.5453) % 1) * 0.58 > 0.75;

Page({
  onReady() {
    this.earth = {
      q: quatNormalize(quatMul(quatFromAxisAngle({ x: 0, y: 1, z: 0 }, -0.58), quatFromAxisAngle({ x: 1, y: 0, z: 0 }, 0.16))),
      yawVel: 0.11,
      pitchVel: 0.008,
      dragging: false,
      lastX: 0,
      lastY: 0,
      lastTime: Date.now()
    };
    wx.createSelectorQuery().in(this).select("#globeCanvas").fields({ node: true, size: true }).exec((res) => {
      const item = res && res[0];
      if (!item || !item.node) return;
      const dpr = wx.getSystemInfoSync().pixelRatio || 1;
      this.earth.canvas = item.node;
      this.earth.ctx = item.node.getContext("2d");
      this.earth.width = Math.round(item.width * dpr);
      this.earth.height = Math.round(item.height * dpr);
      this.earth.dpr = dpr;
      item.node.width = this.earth.width;
      item.node.height = this.earth.height;
      this.loop();
    });
  },
  onUnload() {
    if (this.timer) clearTimeout(this.timer);
  },
  goBack() {
    wx.navigateBack();
  },
  startSync() {
    wx.navigateTo({ url: "/pages/calibration/calibration" });
  },
  loop() {
    if (!this.earth || !this.earth.ctx) return;
    const now = Date.now();
    const dt = clamp((now - this.earth.lastTime) / 1000, 0.001, 0.04);
    this.earth.lastTime = now;
    if (!this.earth.dragging) {
      this.earth.q = quatNormalize(quatMul(
        quatMul(quatFromAxisAngle({ x: 0, y: 1, z: 0 }, this.earth.yawVel * dt), quatFromAxisAngle({ x: 1, y: 0, z: 0 }, this.earth.pitchVel * dt)),
        this.earth.q
      ));
      this.earth.yawVel = lerp(this.earth.yawVel, 0.11, 0.01);
    }
    this.draw();
    this.timer = setTimeout(() => this.loop(), 16);
  },
  draw() {
    const e = this.earth;
    const g = e.ctx;
    const cx = e.width * 0.5;
    const cy = e.height * 0.5;
    const r = Math.min(e.width, e.height) * 0.45;
    g.clearRect(0, 0, e.width, e.height);

    const ocean = g.createRadialGradient(cx - r * 0.28, cy - r * 0.35, r * 0.1, cx, cy, r * 1.2);
    ocean.addColorStop(0, "rgba(247,252,255,.98)");
    ocean.addColorStop(0.36, "rgba(181,220,232,.96)");
    ocean.addColorStop(0.68, "rgba(139,156,220,.98)");
    ocean.addColorStop(1, "rgba(76,91,165,.98)");
    g.beginPath();
    g.arc(cx, cy, r, 0, TAU);
    g.fillStyle = ocean;
    g.fill();
    g.save();
    g.clip();

    const light = normalize({ x: -0.7, y: -0.24, z: 1 });
    const dotSize = Math.max(1.7 * e.dpr, r * 0.014);
    for (let il = 0; il < 36; il++) {
      const lat = lerp(-88, 88, il / 35);
      for (let io = 0; io < 58; io++) {
        const lon = lerp(-180, 180, io / 57);
        const v = quatRotateVec(e.q, latLonToVec(lat * Math.PI / 180, lon * Math.PI / 180));
        if (v.z < 0) continue;
        const land = hashLand(lat, lon);
        if (!land && (il + io) % 4 !== 0) continue;
        if (land && (il + io) % 2 !== 0) continue;
        const p = project(v, cx, cy, r);
        const ndl = clamp(dot(normalize(v), light) * 0.5 + 0.56, 0, 1);
        g.fillStyle = land ? `rgba(${110 + ndl * 116},${156 + ndl * 54},${148 + ndl * 52},.92)` : `rgba(104,126,206,${0.2 + ndl * 0.16})`;
        g.fillRect(p.x, p.y, land ? dotSize * 1.15 : dotSize * 0.78, land ? dotSize * 1.15 : dotSize * 0.78);
      }
    }

    g.strokeStyle = "rgba(255,255,255,.16)";
    g.lineWidth = Math.max(.7 * e.dpr, r * .003);
    for (let lat = -60; lat <= 60; lat += 30) {
      g.beginPath();
      let started = false;
      for (let lon = -180; lon <= 180; lon += 6) {
        const v = quatRotateVec(e.q, latLonToVec(lat * Math.PI / 180, lon * Math.PI / 180));
        if (v.z < 0) {
          started = false;
          continue;
        }
        const p = project(v, cx, cy, r);
        if (!started) {
          g.moveTo(p.x, p.y);
          started = true;
        } else {
          g.lineTo(p.x, p.y);
        }
      }
      g.stroke();
    }

    const gloss = g.createRadialGradient(cx - r * 0.36, cy - r * 0.36, 0, cx - r * 0.14, cy - r * 0.12, r);
    gloss.addColorStop(0, "rgba(255,255,255,.36)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = gloss;
    g.beginPath();
    g.arc(cx, cy, r, 0, TAU);
    g.fill();
    g.restore();
  },
  onTouchStart(event) {
    const t = event.touches && event.touches[0];
    if (!t) return;
    this.earth.dragging = true;
    this.earth.lastX = t.clientX;
    this.earth.lastY = t.clientY;
  },
  onTouchMove(event) {
    const t = event.touches && event.touches[0];
    if (!t || !this.earth.dragging) return;
    const dx = t.clientX - this.earth.lastX;
    const dy = t.clientY - this.earth.lastY;
    this.earth.lastX = t.clientX;
    this.earth.lastY = t.clientY;
    const yaw = dx * 0.008;
    const pitch = -dy * 0.008;
    this.earth.q = quatNormalize(quatMul(quatMul(quatFromAxisAngle({ x: 0, y: 1, z: 0 }, yaw), quatFromAxisAngle({ x: 1, y: 0, z: 0 }, pitch)), this.earth.q));
    this.earth.yawVel = yaw * 0.7;
  },
  onTouchEnd() {
    this.earth.dragging = false;
  }
});

const moodCore = require("../../utils/mood-core");

Page({
  data: {
    emotion: moodCore.defaultEmotion(),
    playing: false,
    person: moodCore.findPerson("echo"),
    signature: moodCore.buildSignature(moodCore.defaultEmotion()),
    memory: moodCore.buildMemory(moodCore.defaultEmotion(), moodCore.findPerson("echo")),
    bars: [14, 22, 34, 18, 28, 40, 26, 16, 32, 46, 30, 20, 38, 24, 18, 34, 42, 26, 16, 28, 36, 20, 30, 24]
  },

  onLoad(options) {
    const emotion = moodCore.decodeEmotion(options.emotion);
    const person = moodCore.findPerson(options.id);
    const signature = moodCore.buildSignature(emotion);
    const memory = moodCore.buildMemory(emotion, person);
    this.setData({
      emotion,
      person,
      signature,
      memory
    });
    this.enableShareMenu();
  },

  onReady() {
    this.initParticleCanvas();
  },

  onUnload() {
    if (this.timer) clearTimeout(this.timer);
  },

  initParticleCanvas() {
    wx.createSelectorQuery().in(this).select("#particleCanvas").fields({ node: true, size: true }).exec((res) => {
      const item = res && res[0];
      if (!item || !item.node) return;
      const dpr = wx.getSystemInfoSync().pixelRatio || 1;
      const canvas = item.node;
      const ctx = canvas.getContext("2d");
      canvas.width = Math.round(item.width * dpr);
      canvas.height = Math.round(item.height * dpr);
      this.particle = { canvas, ctx, dpr, w: canvas.width, h: canvas.height, t: 0 };
      this.drawParticles();
    });
  },

  drawParticles() {
    if (!this.particle) return;
    const p = this.particle;
    const g = p.ctx;
    p.t += 0.018;
    g.clearRect(0, 0, p.w, p.h);
    const cx = p.w * 0.5;
    const cy = p.h * 0.52;
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < 1000; i += 1) {
      const a = i * 0.036;
      const wave = Math.sin(i * 0.018 + p.t) * 0.25 + Math.cos(i * 0.011 + p.t * 0.7) * 0.18;
      const r = (0.18 + (i % 180) / 180 * 0.8 + wave * 0.08) * Math.min(p.w, p.h) * 0.42;
      const x = cx + Math.cos(a + p.t * 0.12) * r * (1.35 + Math.sin(a * 2) * 0.18);
      const y = cy + Math.sin(a * 0.86) * r * 0.56;
      const alpha = 0.16 + Math.sin(i + p.t) * 0.08;
      g.fillStyle = i % 7 === 0 ? `rgba(190,160,255,${alpha})` : `rgba(118,220,210,${alpha})`;
      g.fillRect(x, y, 1.5 * p.dpr, 1.5 * p.dpr);
    }
    g.globalCompositeOperation = "source-over";
    this.timer = setTimeout(() => this.drawParticles(), 33);
  },

  togglePlay() {
    this.setData({ playing: !this.data.playing });
  },

  saveMemory() {
    const record = {
      id: this.data.memory.id,
      savedAt: Date.now(),
      person: this.data.person,
      emotion: this.data.emotion,
      signature: this.data.signature,
      memory: this.data.memory
    };
    const list = wx.getStorageSync("moodEarthMemories") || [];
    const next = [record].concat(list.filter((item) => item.id !== record.id)).slice(0, 20);
    wx.setStorageSync("moodEarthMemories", next);
    wx.setClipboardData({
      data: this.data.memory.shareText,
      success: () => {
        wx.showToast({ title: "记忆已保存，文案已复制", icon: "none" });
      }
    });
  },

  enableShareMenu() {
    if (!wx.showShareMenu) return;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },

  onShareAppMessage() {
    return {
      title: this.data.memory.shareText,
      path: `/pages/create/create?id=${this.data.person.id}&emotion=${moodCore.encodeEmotion(this.data.emotion)}`
    };
  },

  onShareTimeline() {
    return {
      title: this.data.memory.shareText,
      query: `id=${this.data.person.id}&emotion=${moodCore.encodeEmotion(this.data.emotion)}`
    };
  },

  rematch() {
    wx.redirectTo({
      url: `/pages/match/match?emotion=${moodCore.encodeEmotion(this.data.emotion)}`
    });
  },

  home() {
    wx.reLaunch({ url: "/pages/index/index" });
  }
});

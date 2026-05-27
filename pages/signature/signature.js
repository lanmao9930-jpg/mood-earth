const moodCore = require("../../utils/mood-core");

Page({
  data: {
    emotion: moodCore.defaultEmotion(),
    signature: moodCore.buildSignature(moodCore.defaultEmotion()),
    bars: [22, 36, 54, 72, 92, 70, 48, 34, 58, 88, 116, 84, 62, 38, 50, 76, 104, 80, 58, 40, 28]
  },

  onLoad(options) {
    const emotion = moodCore.decodeEmotion(options.emotion);
    this.setData({
      emotion,
      signature: moodCore.buildSignature(emotion)
    });
  },

  goBack() {
    wx.navigateBack();
  },

  recalibrate() {
    wx.redirectTo({ url: "/pages/calibration/calibration" });
  },

  findMatch() {
    wx.navigateTo({
      url: `/pages/match/match?emotion=${moodCore.encodeEmotion(this.data.emotion)}`
    });
  }
});

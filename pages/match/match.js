const moodCore = require("../../utils/mood-core");

Page({
  data: {
    emotion: moodCore.defaultEmotion(),
    signature: moodCore.buildSignature(moodCore.defaultEmotion()),
    moodMap: moodCore.buildMoodMap(moodCore.defaultEmotion()),
    matches: []
  },

  onLoad(options) {
    const emotion = moodCore.decodeEmotion(options.emotion);
    this.setData({
      emotion,
      signature: moodCore.buildSignature(emotion),
      moodMap: moodCore.buildMoodMap(emotion),
      matches: moodCore.findMatches(emotion)
    });
  },

  goBack() {
    wx.navigateBack();
  },

  choose(event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/create/create?id=${id}&emotion=${moodCore.encodeEmotion(this.data.emotion)}`
    });
  }
});

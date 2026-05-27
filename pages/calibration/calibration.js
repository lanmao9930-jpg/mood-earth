const moodCore = require("../../utils/mood-core");

Page({
  data: {
    moods: moodCore.moods,
    needs: moodCore.needs,
    soundSignals: moodCore.soundSignals,
    form: moodCore.defaultEmotion(),
    selectedMood: moodCore.moods[2],
    selectedNeed: moodCore.needs[0],
    selectedSignal: moodCore.soundSignals[0]
  },

  goBack() {
    wx.navigateBack();
  },

  selectMood(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({
      "form.mood": value,
      selectedMood: moodCore.moods.find((item) => item.value === value) || moodCore.moods[2]
    });
  },

  selectNeed(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({
      "form.need": value,
      selectedNeed: moodCore.needs.find((item) => item.value === value) || moodCore.needs[0]
    });
  },

  changeIntensity(event) {
    this.setData({ "form.intensity": event.detail.value });
  },

  selectSignal(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({
      "form.signal": value,
      selectedSignal: moodCore.soundSignals.find((item) => item.value === value) || moodCore.soundSignals[0]
    });
  },

  changeSentence(event) {
    this.setData({ "form.sentence": event.detail.value });
  },

  submit() {
    const emotion = Object.assign({}, this.data.form, {
      sentence: (this.data.form.sentence || "").trim()
    });
    wx.navigateTo({
      url: `/pages/signature/signature?emotion=${moodCore.encodeEmotion(emotion)}`
    });
  }
});

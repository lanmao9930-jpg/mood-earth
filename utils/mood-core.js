const moods = [
  { value: "calm", label: "平静", icon: "○", tone: "像退潮后缓慢发亮的海面", color: "#8d91de" },
  { value: "lonely", label: "孤独", icon: "●", tone: "像远处仍在发光的蓝色回声", color: "#6f8fcf" },
  { value: "hope", label: "期待", icon: "✦", tone: "像轨道上慢慢靠近的暖光", color: "#d49a86" },
  { value: "tired", label: "疲惫", icon: "◐", tone: "像被柔软雾气托住的夜晚", color: "#8f89bd" },
  { value: "warm", label: "温暖", icon: "♥", tone: "像掌心里还没有熄灭的小火", color: "#d59778" },
  { value: "anxious", label: "焦虑", icon: "≋", tone: "像需要被慢慢抚平的细浪", color: "#7aa7c8" },
  { value: "lost", label: "迷茫", icon: "◇", tone: "像云层后正在校准方向的星", color: "#9a92cf" },
  { value: "energy", label: "兴奋", icon: "✧", tone: "像即将穿过城市的晨光", color: "#75aaa4" }
];

const needs = [
  { value: "understood", label: "被理解" },
  { value: "quiet", label: "安静独处" },
  { value: "talk", label: "找人聊聊" },
  { value: "encourage", label: "被鼓励" },
  { value: "create", label: "一起创作" },
  { value: "company", label: "只是陪伴" }
];

const soundSignals = [
  { value: "rain", label: "雨声低频", texture: "雨声 / 低频 / 远处钢琴", color: "#6f8fcf" },
  { value: "ocean", label: "海浪呼吸", texture: "海浪 / 呼吸 / 柔和合成器", color: "#75aaa4" },
  { value: "city", label: "城市夜声", texture: "街灯 / 人声碎片 / 轻电子", color: "#8f89bd" },
  { value: "strings", label: "弦乐微光", texture: "弦乐 / 暖色和声 / 慢速脉冲", color: "#d59778" },
  { value: "heartbeat", label: "心跳脉冲", texture: "心跳 / 低鼓 / 近距离呼吸", color: "#d49a86" },
  { value: "wind", label: "风中回声", texture: "风声 / 空间混响 / 远处钟声", color: "#9a92cf" }
];

const bodyZones = [
  { value: "chest", label: "胸口微亮", texture: "靠近心跳的低频光" },
  { value: "throat", label: "喉咙发紧", texture: "细窄但持续的声线" },
  { value: "head", label: "脑海起雾", texture: "雾状扩散的高频颗粒" },
  { value: "hands", label: "指尖发热", texture: "向外寻找连接的脉冲" },
  { value: "body", label: "全身漂浮", texture: "缓慢悬浮的空间回声" },
  { value: "outside", label: "像在远处", texture: "从城市边缘传来的回声" }
];

const matchTypes = {
  mirror: { label: "镜像同频", intent: "确认你此刻并不是一个人" },
  stabilizing: { label: "安放同频", intent: "用更稳定的频率接住你的情绪" },
  complementary: { label: "互补同频", intent: "把你的情绪带向一个新的出口" }
};

const signatures = {
  calm: {
    name: "Soft Blue Tide",
    frequency: "Calm Frequency",
    tags: ["平静", "低频", "柔和"],
    desc: "你现在像一段安静、稳定、缓慢亮起的低频旋律。它不急着表达，却能让周围慢下来。"
  },
  lonely: {
    name: "Deep Blue Echo",
    frequency: "Low Blue Frequency",
    tags: ["孤独", "安静", "想被理解"],
    desc: "你现在像一段安静但希望被听见的声音，微弱却持续发光。它需要的不是热闹，而是准确的靠近。"
  },
  hope: {
    name: "Warm Orbit",
    frequency: "Hope Frequency",
    tags: ["期待", "温柔", "靠近"],
    desc: "你正在等待一段回应，像星球轨道上慢慢靠近的光。它带着一点不确定，也保留着向前的力量。"
  },
  tired: {
    name: "Misty Rest",
    frequency: "Rest Frequency",
    tags: ["疲惫", "放松", "被托住"],
    desc: "你的频率正在降低，像夜色落在肩上。此刻更适合被温柔地接住，而不是继续证明什么。"
  },
  warm: {
    name: "Amber Room",
    frequency: "Warm Frequency",
    tags: ["温暖", "靠近", "分享"],
    desc: "你身上有一种柔软的热度，像一间亮着灯的房间。它适合被分享，也适合照亮别人。"
  },
  anxious: {
    name: "Release Wave",
    frequency: "Tension Release",
    tags: ["焦虑", "释放", "需要稳定"],
    desc: "你的情绪有细密起伏，正在寻找一段更平稳的频率接住它。先让呼吸落地，再决定下一步。"
  },
  lost: {
    name: "Quiet Compass",
    frequency: "Searching Frequency",
    tags: ["迷茫", "寻找", "校准"],
    desc: "你像一颗正在重新校准轨道的星。方向还没有完全清晰，但你已经开始感知自己的重心。"
  },
  energy: {
    name: "Bright Pulse",
    frequency: "High Light Frequency",
    tags: ["兴奋", "创造", "行动"],
    desc: "你的频率明亮而上扬，像清晨穿过玻璃的光。它适合行动，也适合把灵感留成作品。"
  }
};

const people = [
  { id: "echo", initial: "E", name: "Echo_042", city: "Tokyo", country: "Japan", mood: "lonely", need: "understood", signal: "rain", culture: "夜雨 / 钢琴 / 东京街灯", tags: ["孤独", "安静", "被理解"], quote: "今晚我不想说太多，但希望有人知道我在这里。" },
  { id: "mori", initial: "M", name: "Mori_08", city: "Seoul", country: "Korea", mood: "calm", need: "company", signal: "wind", culture: "风声 / 人声采样 / 首尔清晨", tags: ["平静", "陪伴", "温柔"], quote: "我在等一阵风，把心情慢慢吹亮。" },
  { id: "blue", initial: "B", name: "Blue_13", city: "Paris", country: "France", mood: "hope", need: "create", signal: "strings", culture: "弦乐 / 手风琴残影 / 巴黎黄昏", tags: ["期待", "创作", "希望"], quote: "想和一个陌生人一起留下些不会立刻消失的东西。" },
  { id: "lin", initial: "L", name: "Lin_27", city: "Chongqing", country: "China", mood: "anxious", need: "quiet", signal: "city", culture: "轻电子 / 江边风 / 山城夜声", tags: ["焦虑", "安静", "释放"], quote: "如果世界能小声一点，我也许就能重新听见自己。" },
  { id: "nora", initial: "N", name: "Nora_19", city: "London", country: "UK", mood: "warm", need: "talk", signal: "heartbeat", culture: "心跳 / 合唱垫音 / 伦敦雨后", tags: ["温暖", "倾听", "靠近"], quote: "今天想把一点温柔放进别人的口袋里。" }
];

const citySignals = [
  { city: "Tokyo", country: "Japan", mood: "lonely", heat: 42, people: 1248 },
  { city: "Seoul", country: "Korea", mood: "calm", heat: 38, people: 986 },
  { city: "Paris", country: "France", mood: "hope", heat: 31, people: 742 },
  { city: "Chongqing", country: "China", mood: "anxious", heat: 29, people: 618 },
  { city: "London", country: "UK", mood: "warm", heat: 25, people: 536 }
];

function defaultEmotion() {
  return {
    mood: "hope",
    need: "understood",
    signal: "rain",
    body: "chest",
    intensity: 6,
    sentence: ""
  };
}

function decodeEmotion(value) {
  if (!value) return defaultEmotion();
  try {
    return Object.assign(defaultEmotion(), JSON.parse(decodeURIComponent(value)));
  } catch (error) {
    return defaultEmotion();
  }
}

function getMood(value) {
  return moods.find((item) => item.value === value) || moods[2];
}

function getNeed(value) {
  return needs.find((item) => item.value === value) || needs[0];
}

function getSoundSignal(value) {
  return soundSignals.find((item) => item.value === value) || soundSignals[0];
}

function getBodyZone(value) {
  return bodyZones.find((item) => item.value === value) || bodyZones[0];
}

function buildEmotionSignal(emotion) {
  const mood = getMood(emotion.mood);
  const need = getNeed(emotion.need);
  const signal = getSoundSignal(emotion.signal);
  const body = getBodyZone(emotion.body);
  const intensity = Number(emotion.intensity || 6);
  const frequency = Math.round(180 + intensity * 21 + mood.value.length * 7 + signal.value.length * 3);
  const pulse = intensity >= 8 ? "fast" : intensity <= 3 ? "slow" : "floating";
  const decayHours = intensity >= 8 ? 18 : intensity <= 3 ? 8 : 12;
  return {
    id: `${mood.value}-${need.value}-${signal.value}-${body.value}-${intensity}`,
    origin: "Current Position",
    mood,
    need,
    signal,
    body,
    intensity,
    frequency,
    pulse,
    decayHours,
    colorSpectrum: [mood.color, signal.color, "#f7f0ff"],
    waveform: [
      12 + intensity * 2,
      28 + signal.value.length,
      18 + mood.value.length * 3,
      34 + intensity * 4,
      22 + body.value.length * 2,
      42 + intensity * 3
    ],
    sentence: emotion.sentence || "我想把此刻的情绪交给地球，让它被温柔地听见。",
    ritualLine: `Mood Earth 正在把「${mood.label}」校准成一段 ${frequency}Hz 的${signal.label}声纹。`,
    visibilityMode: "anonymous"
  };
}

function buildSignature(emotion) {
  const mood = getMood(emotion.mood);
  const need = getNeed(emotion.need);
  const signal = getSoundSignal(emotion.signal);
  const base = signatures[mood.value] || signatures.hope;
  const intensity = Number(emotion.intensity || 6);
  const voiceprint = buildEmotionSignal(emotion);
  const insight = `Mood Earth 读取到的是「${mood.label}」和「${need.label}」之间的频率：${mood.tone}，声音质感接近「${signal.label}」。`;
  return Object.assign({}, base, {
    mood,
    need,
    signal,
    body: voiceprint.body,
    intensity,
    sentence: emotion.sentence || "我想把此刻的情绪放进一颗会流动的星球。",
    summary: `${mood.label} / ${need.label} / ${signal.label} / ${voiceprint.frequency}Hz`,
    strength: intensity >= 8 ? "强烈而清晰" : intensity <= 3 ? "轻柔而隐约" : "稳定地漂浮",
    insight,
    voiceprint,
    frequencyHz: voiceprint.frequency,
    waveform: voiceprint.waveform,
    colorSpectrum: voiceprint.colorSpectrum
  });
}

function scorePerson(person, emotion) {
  let score = 66;
  if (person.mood === emotion.mood) score += 13;
  if (person.need === emotion.need) score += 10;
  if (person.signal === emotion.signal) score += 8;
  score += Math.min(7, Number(emotion.intensity || 6));
  return Math.min(97, score);
}

function buildMatchType(person, emotion) {
  if (person.mood === emotion.mood && person.need === emotion.need) return matchTypes.mirror;
  if (person.mood === "calm" || person.need === "company") return matchTypes.stabilizing;
  return matchTypes.complementary;
}

function buildMatchReason(person, emotion) {
  const mood = getMood(emotion.mood);
  const need = getNeed(emotion.need);
  const signal = getSoundSignal(emotion.signal);
  if (person.mood === emotion.mood && person.need === emotion.need && person.signal === emotion.signal) {
    return `你们都处在「${mood.label}」里，也都在用「${signal.label}」寻找「${need.label}」。`;
  }
  if (person.mood === emotion.mood && person.need === emotion.need) {
    return `你们的情绪和期待回应高度接近，都在寻找「${need.label}」。`;
  }
  if (person.mood === emotion.mood) {
    return `你们的主情绪同频，都是「${mood.label}」。`;
  }
  if (person.signal === emotion.signal) {
    return `你们选择了相近的声音质感：「${signal.label}」。`;
  }
  return "你们的频率不完全相同，但都在向更柔和的状态移动。";
}

function buildLockLine(person, emotion) {
  const signal = getSoundSignal(emotion.signal);
  const signature = buildSignature(emotion);
  return `你的 ${signature.frequencyHz}Hz ${signal.label}声纹正在与 ${person.city} 的匿名信号锁定。`;
}

function buildPotentialMemory(person, emotion) {
  const signature = buildSignature(emotion);
  const sound = getSoundSignal(person.signal);
  return {
    title: `${signature.name} / ${person.city} Resonance`,
    visual: `${signature.mood.label}色谱与${sound.label}粒子轨道融合`,
    music: `${signature.signal.texture} × ${person.culture}`,
    exportFormat: "8-15 秒动态粒子音乐记忆"
  };
}

function findMatches(emotion) {
  return people
    .map((person) => Object.assign({}, person, {
      score: scorePerson(person, emotion),
      tagText: person.tags.join(" / "),
      reason: buildMatchReason(person, emotion),
      sound: getSoundSignal(person.signal),
      matchType: buildMatchType(person, emotion),
      lockLine: buildLockLine(person, emotion),
      potentialMemory: buildPotentialMemory(person, emotion)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function buildMoodMap(emotion) {
  const selectedMood = getMood(emotion.mood);
  const signal = buildEmotionSignal(emotion);
  const sameMood = citySignals.filter((item) => item.mood === emotion.mood).length;
  const totalPeople = citySignals.reduce((sum, item) => sum + item.people, 0);
  return {
    headline: `全球有 ${totalPeople.toLocaleString()} 个匿名情绪信号正在发光`,
    subline: sameMood ? `其中 ${sameMood} 个城市出现与你相近的「${selectedMood.label}」热区` : `你的「${selectedMood.label}」正在地球上扩散`,
    layers: [
      { name: "Global Mood", label: "全球情绪热层", value: `${totalPeople.toLocaleString()} 个匿名信号` },
      { name: "Resonance Potential", label: "同频潜力层", value: `${sameMood || 3} 个城市接近你的 ${signal.frequency}Hz` },
      { name: "Personal Echo", label: "个人回声层", value: "今日记忆地图等待点亮" }
    ],
    cities: citySignals.map((item) => Object.assign({}, item, {
      moodLabel: getMood(item.mood).label,
      active: item.mood === emotion.mood,
      resonancePotential: Math.min(96, item.heat + (item.mood === emotion.mood ? 36 : 14) + Number(emotion.intensity || 6)),
      creationHint: item.mood === emotion.mood ? "可生成高相似度共创记忆" : "可生成互补型粒子记忆"
    }))
  };
}

function findPerson(id) {
  return people.find((person) => person.id === id) || people[0];
}

function buildParticleVisual(signature, person) {
  return {
    title: `${signature.mood.label} × ${person.city} 粒子画面`,
    palette: signature.colorSpectrum,
    centerGlow: signature.need.label,
    orbit: `${signature.frequencyHz}Hz / ${person.city}`,
    density: signature.intensity >= 8 ? "high-density pulse" : signature.intensity <= 3 ? "slow mist field" : "floating orbit field",
    description: `两段情绪色谱在 ${person.city} 的城市声场里合成一张专属粒子图。`
  };
}

function buildMemoryAtlasPoint(signature, person, matchType) {
  return {
    dateLabel: "Today",
    city: person.city,
    country: person.country,
    title: signature.name,
    mood: signature.mood.label,
    scoreLabel: matchType.label,
    lit: true,
    line: `今天的情绪地图已被 ${person.city} 的共振点点亮。`
  };
}

function buildMemory(emotion, person) {
  const signature = buildSignature(emotion);
  const matchType = buildMatchType(person, emotion);
  const id = `${signature.mood.value}-${signature.need.value}-${signature.signal.value}-${person.id}`;
  const shareText = `我在 Mood Earth 和 ${person.city} 的 ${person.name} 生成了一段 ${signature.mood.label} 频率：${signature.name}`;
  const particle = buildParticleVisual(signature, person);
  const exportMemory = {
    format: "MP4",
    duration: "00:12",
    status: "prototype-ready",
    line: "一段可保存、可下载、可分享的动态粒子音乐记忆"
  };
  const atlasPoint = buildMemoryAtlasPoint(signature, person, matchType);
  const poster = {
    brand: "MOOD EARTH",
    title: `${signature.name} × ${person.name}`,
    route: `${person.city}, ${person.country}`,
    mood: signature.mood.label,
    need: signature.need.label,
    signal: signature.signal.label,
    duration: exportMemory.duration,
    line: `今晚，${person.city} 和你在同一段「${signature.mood.label}」频率里相遇。`,
    quote: person.quote
  };
  return {
    id,
    title: poster.title,
    music: `${signature.signal.texture} × ${person.culture}`,
    layers: [
      { name: "你的声音信号", value: signature.signal.texture },
      { name: "TA 的文化采样", value: person.culture },
      { name: "共振情绪", value: `${signature.mood.label} / ${signature.need.label}` },
      { name: "粒子画面", value: particle.description }
    ],
    steps: [
      "读取两段情绪声纹",
      "锁定城市与频率轨道",
      "混合声音纹理与粒子色谱",
      "生成可保存的 MP4 记忆",
      "点亮今日情绪地图"
    ],
    poster,
    posterLine: poster.line,
    duration: exportMemory.duration,
    matchType,
    lockLine: buildLockLine(person, emotion),
    particle,
    exportMemory,
    atlasPoint,
    shareTitle: "一段来自 Mood Earth 的同频共创记忆",
    shareText
  };
}

function encodeEmotion(emotion) {
  return encodeURIComponent(JSON.stringify(emotion || defaultEmotion()));
}

module.exports = {
  moods,
  needs,
  soundSignals,
  bodyZones,
  matchTypes,
  defaultEmotion,
  decodeEmotion,
  encodeEmotion,
  buildEmotionSignal,
  buildSignature,
  buildMoodMap,
  findMatches,
  findPerson,
  buildMemory
};

const fs = require("fs");
const path = require("path");
const moodCore = require("../utils/mood-core");

const root = path.resolve(__dirname, "..");
const mojibakePattern = new RegExp(`[${String.fromCharCode(0x93af, 0x923c, 0x922e, 0x9241, 0x6e30)}]`);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function checkJson(file) {
  JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function checkText(file) {
  const source = read(file);
  assert(!mojibakePattern.test(source), `${file} contains likely mojibake`);
}

function loadPage(pagePath) {
  const fullPath = path.join(root, `${pagePath}.js`);
  delete require.cache[require.resolve(fullPath)];
  let config = null;
  global.Page = (pageConfig) => {
    config = pageConfig;
  };
  require(fullPath);
  delete global.Page;
  assert(config, `${pagePath} did not call Page()`);
  config.data = JSON.parse(JSON.stringify(config.data || {}));
  config.setData = function setData(patch) {
    for (const [key, value] of Object.entries(patch)) {
      const parts = key.split(".");
      let target = this.data;
      while (parts.length > 1) {
        const part = parts.shift();
        target[part] = target[part] || {};
        target = target[part];
      }
      target[parts[0]] = value;
    }
  };
  return config;
}

function withMockWx(callback) {
  const calls = [];
  const storage = {};
  const previousWx = global.wx;
  global.wx = {
    navigateBack() {
      calls.push({ type: "navigateBack" });
    },
    navigateTo(options) {
      calls.push({ type: "navigateTo", options });
    },
    redirectTo(options) {
      calls.push({ type: "redirectTo", options });
    },
    reLaunch(options) {
      calls.push({ type: "reLaunch", options });
    },
    showToast(options) {
      calls.push({ type: "showToast", options });
    },
    showShareMenu(options) {
      calls.push({ type: "showShareMenu", options });
    },
    getStorageSync(key) {
      return storage[key];
    },
    setStorageSync(key, value) {
      storage[key] = value;
      calls.push({ type: "setStorageSync", key, value });
    },
    setClipboardData(options) {
      calls.push({ type: "setClipboardData", options });
      if (options && typeof options.success === "function") options.success();
    }
  };
  try {
    callback(calls, storage);
  } finally {
    global.wx = previousWx;
  }
}

checkJson("app.json");
checkJson("project.config.json");
checkJson("sitemap.json");

const appConfig = JSON.parse(read("app.json"));
const registeredPages = new Set(appConfig.pages || []);
const requiredPages = [
  "pages/index/index",
  "pages/globe/globe",
  "pages/calibration/calibration",
  "pages/signature/signature",
  "pages/match/match",
  "pages/create/create"
];

for (const page of requiredPages) {
  assert(registeredPages.has(page), `${page} is not registered in app.json`);
}

[
  "utils/mood-core.js",
  "pages/index/index.wxml",
  "pages/globe/globe.wxml",
  "pages/calibration/calibration.wxml",
  "pages/signature/signature.wxml",
  "pages/match/match.wxml",
  "pages/create/create.wxml"
].forEach(checkText);

for (const page of requiredPages) {
  const pageName = page.split("/").pop();
  const jsFile = `${page}.js`;
  const wxmlFile = `${page}.wxml`;
  assert(fs.existsSync(path.join(root, `${page}.json`)), `${page}.json is missing`);
  assert(fs.existsSync(path.join(root, jsFile)), `${jsFile} is missing`);
  assert(fs.existsSync(path.join(root, wxmlFile)), `${wxmlFile} is missing`);

  const js = read(jsFile);
  const wxml = read(wxmlFile);
  const handlers = Array.from(wxml.matchAll(/bind(?:tap|input|change|touchstart|touchmove|touchend|touchcancel)="([^"]+)"/g))
    .map((match) => match[1])
    .filter((handler) => handler !== "noop");
  for (const handler of handlers) {
    assert(new RegExp(`\\b${handler}\\s*\\(`).test(js), `${pageName} binds ${handler} but does not implement it`);
  }
  if (wxml.includes('open-type="share"')) {
    assert(/\bonShareAppMessage\s*\(/.test(js), `${pageName} has a share button but no onShareAppMessage`);
  }
  if (pageName === "create") {
    assert(/\bonShareTimeline\s*\(/.test(js), "create page should support timeline sharing");
    assert(/wx\.setStorageSync\("moodEarthMemories"/.test(js), "create page should persist saved memories");
    assert(/wx\.setClipboardData\(/.test(js), "create page should copy share text when saving");
    assert(/wx\.showShareMenu\(/.test(js), "create page should enable share menu");
  }

  const routeMatches = Array.from(js.matchAll(/\/pages\/[a-z]+\/[a-z]+/g)).map((match) => match[0].slice(1));
  for (const route of routeMatches) {
    assert(registeredPages.has(route), `${pageName} navigates to unregistered route ${route}`);
  }
}

let combinations = 0;
for (const mood of moodCore.moods) {
  for (const signal of moodCore.soundSignals) {
    const emotion = {
      mood: mood.value,
      need: "understood",
      signal: signal.value,
      intensity: 6,
      sentence: "verify"
    };
    const signature = moodCore.buildSignature(emotion);
    const emotionSignal = moodCore.buildEmotionSignal(emotion);
    const moodMap = moodCore.buildMoodMap(emotion);
    const matches = moodCore.findMatches(emotion);
    const memory = moodCore.buildMemory(emotion, moodCore.findPerson(matches[0].id));

    assert(emotionSignal.frequency && emotionSignal.waveform.length >= 6, `emotion signal missing voiceprint for ${mood.value}/${signal.value}`);
    assert(signature.voiceprint && signature.frequencyHz, `signature missing voiceprint fields for ${mood.value}/${signal.value}`);
    assert(signature.summary.includes(signal.label), `signature missing signal for ${mood.value}/${signal.value}`);
    assert(moodMap.layers.length >= 3, "mood map should expose heat imaging layers");
    assert(moodMap.cities.length >= 5, "mood map should expose city heat data");
    assert(moodMap.cities.every((item) => item.resonancePotential && item.creationHint), "mood map cities missing resonance potential");
    assert(matches.length === 3, "match page should expose three soul profiles");
    assert(matches.every((item) => item.reason && item.sound && item.culture), "match profiles missing persona detail");
    assert(matches.every((item) => item.matchType && item.lockLine && item.potentialMemory), "match profiles missing resonance lock detail");
    assert(memory.layers.length >= 3, "memory should expose music layers");
    assert(memory.steps.length >= 4, "memory should expose generation steps");
    assert(memory.shareTitle && memory.posterLine && memory.duration, "memory should expose share card fields");
    assert(memory.id && memory.shareText, "memory should expose persistence and share text fields");
    assert(memory.poster && memory.poster.brand && memory.poster.route && memory.poster.signal, "memory should expose structured poster fields");
    assert(memory.particle && memory.exportMemory && memory.exportMemory.format === "MP4", "memory should expose particle visual and MP4 export");
    assert(memory.atlasPoint && memory.atlasPoint.lit, "memory should light one point on the daily atlas");
    combinations += 1;
  }
}

withMockWx((calls, storage) => {
  const emotion = {
    mood: "lonely",
    need: "understood",
    signal: "rain",
    intensity: 7,
    sentence: "verify"
  };
  const encodedEmotion = moodCore.encodeEmotion(emotion);

  const calibration = loadPage("pages/calibration/calibration");
  calibration.selectMood({ currentTarget: { dataset: { value: "warm" } } });
  calibration.selectNeed({ currentTarget: { dataset: { value: "talk" } } });
  calibration.selectSignal({ currentTarget: { dataset: { value: "heartbeat" } } });
  calibration.selectBody({ currentTarget: { dataset: { value: "hands" } } });
  calibration.changeIntensity({ detail: { value: 8 } });
  calibration.changeSentence({ detail: { value: "hello" } });
  calibration.submit();
  assert(calls.some((call) => call.type === "navigateTo" && call.options.url.startsWith("/pages/signature/signature?emotion=")), "calibration submit should navigate to signature with emotion");

  const signature = loadPage("pages/signature/signature");
  signature.onLoad({ emotion: encodedEmotion });
  signature.findMatch();
  assert(calls.some((call) => call.type === "navigateTo" && call.options.url.startsWith("/pages/match/match?emotion=")), "signature should navigate to match with emotion");

  const match = loadPage("pages/match/match");
  match.onLoad({ emotion: encodedEmotion });
  assert(match.data.matches.length === 3, "match page should load three matches");
  match.choose({ currentTarget: { dataset: { id: match.data.matches[0].id } } });
  assert(calls.some((call) => call.type === "navigateTo" && call.options.url.includes("/pages/create/create?id=")), "match choose should navigate to create");

  const create = loadPage("pages/create/create");
  create.onLoad({ id: "echo", emotion: encodedEmotion });
  assert(calls.some((call) => call.type === "showShareMenu"), "create should enable share menu on load");
  create.togglePlay();
  assert(create.data.playing === true, "create togglePlay should update playing state");
  create.exportMp4Memory();
  assert(create.data.exported === true, "create exportMp4Memory should mark MP4 memory preview exported");
  create.saveMemory();
  assert(Array.isArray(storage.moodEarthMemories) && storage.moodEarthMemories.length === 1, "create saveMemory should persist memory");
  assert(calls.some((call) => call.type === "setClipboardData" && call.options.data.includes("Mood Earth")), "create saveMemory should copy share text");
  const share = create.onShareAppMessage();
  assert(share.title.includes("Mood Earth") && share.path.includes("/pages/create/create?id=echo"), "create share message should include memory route");
  const timeline = create.onShareTimeline();
  assert(timeline.title.includes("Mood Earth") && timeline.query.includes("id=echo"), "create timeline share should include query");
});

console.log(`Mood Earth core flow verified: ${combinations} emotion/sound combinations`);

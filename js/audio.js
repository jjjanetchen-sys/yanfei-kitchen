/* 語音：Tagalog／English／中文用手機內建語音朗讀；台語只播放真人錄音。
   台語錄音檔放在 audio/tw/<key>.<副檔名>，清單在 data/tw-list.js。 */
(function () {
  const LANG_PREFIX = { tl: ["fil", "tl"], en: ["en"], zh: ["zh"] };
  const LANG_TAG = { tl: "fil-PH", en: "en-US", zh: "zh-TW" };
  const RATE = { tl: 0.85, en: 0.9, zh: 0.85 };

  let voices = [];
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  function loadVoices() { if (synth) voices = synth.getVoices() || []; }
  if (synth) {
    loadVoices();
    if (synth.addEventListener) synth.addEventListener("voiceschanged", loadVoices);
  }

  function findVoice(lang) {
    const pre = LANG_PREFIX[lang] || [];
    const list = voices.filter(function (v) {
      const l = (v.lang || "").toLowerCase().replace("_", "-");
      return pre.some(function (p) { return l.indexOf(p) === 0; });
    });
    if (lang === "zh") {
      const tw = list.find(function (v) { return /tw|hant/i.test(v.lang); });
      if (tw) return tw;
    }
    return list[0] || null;
  }

  function clean(text, lang) {
    let t = String(text).replace(/\s+/g, " ");
    if (lang === "tl") {
      t = t.replace(/(\d)\s*ml/g, "$1 mililitro").replace(/(\d)\s*cm/g, "$1 sentimetro").replace(/(\d)\s*g\b/g, "$1 gramo");
    } else if (lang === "en") {
      t = t.replace(/(\d)\s*ml/g, "$1 milliliters").replace(/(\d)\s*cm/g, "$1 centimeters").replace(/\btbsp\b/g, "tablespoon").replace(/\btsp\b/g, "teaspoon");
    }
    return t;
  }

  let current = null;
  function stopAll() {
    if (synth) synth.cancel();
    if (current) { current.pause(); current = null; }
  }

  /* 朗讀文字。回傳 "ok"、"novoice"（找不到該語言的語音，仍會嘗試）或 "unsupported" */
  function speak(text, lang) {
    if (!synth) return "unsupported";
    stopAll();
    loadVoices();
    const u = new SpeechSynthesisUtterance(clean(text, lang));
    const v = findVoice(lang);
    u.lang = v ? v.lang : LANG_TAG[lang];
    if (v) u.voice = v;
    u.rate = RATE[lang] || 0.9;
    synth.speak(u);
    return v ? "ok" : "novoice";
  }

  /* 台語錄音：有哪些檔案記在 data/tw-list.js（YF.TW = { key: "副檔名" }） */
  function playTw(key) {
    const ext = (window.YF && window.YF.TW || {})[key];
    if (!ext) return Promise.resolve(false);
    stopAll();
    current = new window.Audio("audio/tw/" + key + "." + ext);
    return current.play().then(function () { return true; }).catch(function () { return false; });
  }

  /* 計時結束的提示音 */
  let ctx = null;
  function beep(times) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      const count = times === undefined ? 3 : times;
      for (let n = 0; n < count; n++) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 880;
        o.connect(g); g.connect(ctx.destination);
        const t0 = ctx.currentTime + n * 0.45;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.4, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
        o.start(t0); o.stop(t0 + 0.4);
      }
    } catch (e) { /* 沒有聲音也沒關係 */ }
    if (times !== 0 && navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 300]);
  }

  window.YFAudio = { speak: speak, playTw: playTw, stop: stopAll, beep: beep, findVoice: findVoice, hasSynth: !!synth };
})();

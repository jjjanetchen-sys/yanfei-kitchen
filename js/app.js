/* 燕飛食光：主程式（純靜態、無後端）
   資料都在 data/ 資料夾；這裡只負責畫面與互動。
   使用者資料（菜單、冰箱、回饋）存在自己手機的 localStorage。
   跨手機分享靠「連結」：#/menu?m=菜id,菜id&d=日期 、 #/feedback?fb=日期.菜id.結果 */
(function () {
  "use strict";
  const D = window.YF;
  const A = window.YFAudio;
  const LS_KEY = "yanfei_v1";
  const LANGS = ["tl", "en", "zh"]; /* 內容排序用 */
  const LANG_BAR = ["zh", "en", "tl"]; /* 切換鈕順序 */
  const LABEL = { tl: "Tagalog", en: "English", zh: "中文" };
  const REC = {};
  D.RECIPES.forEach(function (r) { REC[r.id] = r; });

  /* ---------- 小工具 ---------- */
  const $ = function (s) { return document.querySelector(s); };
  const esc = function (s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  const pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  function todayStr() { const d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function shortDate(s) { const p = String(s).split("-"); return p.length === 3 ? Number(p[1]) + "/" + Number(p[2]) : s; }
  function seasonNow() {
    const m = new Date().getMonth() + 1;
    if (m >= 3 && m <= 5) return "spring";
    if (m >= 6 && m <= 8) return "summer";
    if (m >= 9 && m <= 11) return "autumn";
    return "winter";
  }
  /* 分享用的網址。openExternalBrowser=1 會讓 LINE 改用手機預設瀏覽器打開，
     這樣菜單才會存在看護平常用的瀏覽器裡，而不是 LINE 內建瀏覽器 */
  function baseUrl() { return location.origin + location.pathname + "?openExternalBrowser=1"; }
  function compactDate(d) { return String(d).replace(/-/g, ""); }

  /* ---------- 狀態 ---------- */
  const DEFAULTS = { lang: "zh", multi: true, menu: { date: "", ids: [] }, fridge: [], fb: {}, shop: [] };
  let ST = load();
  function load() {
    try {
      const o = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      return Object.assign({}, DEFAULTS, o);
    } catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(ST)); } catch (e) { /* 無痕模式等情況，忽略 */ } }

  /* ---------- 多語顯示 ---------- */
  function order() { return [ST.lang].concat(LANGS.filter(function (l) { return l !== ST.lang; })); }
  /* o = {zh,en,tl}。主要語言大字，其餘小字（可關閉） */
  function tri(o, cls) {
    const ord = order();
    let h = '<span class="l1 ' + (cls || "") + '" lang="' + ord[0] + '">' + (o[ord[0]] || "") + "</span>";
    if (ST.multi) {
      for (let i = 1; i < ord.length; i++) h += '<span class="l2" lang="' + ord[i] + '">' + (o[ord[i]] || "") + "</span>";
    }
    return h;
  }
  function ui(k) { const a = D.UI[k] || [k, k, k]; return { zh: a[0], en: a[1], tl: a[2] }; }
  /* 介面（按鈕、標題、選單）：預設中文大字＋英文小字。
     切到 English 時英文大字＋中文小字；切到 Tagalog 時 Tagalog 大字＋英文小字。 */
  function uiSecond() { return ST.lang === "en" ? "zh" : "en"; }
  function triUI(o, cls) {
    const second = uiSecond();
    let h = '<span class="l1 ' + (cls || "") + '">' + (o[ST.lang] || o.zh || "") + "</span>";
    if (ST.multi) h += '<span class="l2">' + (o[second] || "") + "</span>";
    return h;
  }
  const U = function (k) { return triUI(ui(k)); };
  /* 純文字（放在屬性、標籤、LINE 訊息裡） */
  const UT = function (k) { return ui(k)[ST.lang]; };
  const P1 = function (o) { return o[ST.lang] || o.zh; };
  /* 按鈕文字：主要語言＋小字的第二語言 */
  const U1 = function (k) {
    const o = ui(k);
    return o[ST.lang] + (ST.multi ? '<span class="sub2">' + o[uiSecond()] + "</span>" : "");
  };

  function amtText(n, u, lang) {
    const un = D.UNITS[u];
    if (!un) return "";
    if (n == null || u === "half") return un[lang];
    let num;
    if (n === 0.5) num = lang === "zh" ? "半" : "1/2";
    else if (n === 0.33) num = lang === "zh" ? "三分之一" : "1/3";
    else num = String(n);
    let unit = un[lang];
    if (lang === "en" && n > 1) {
      const pl = { clove: "cloves", slice: "slices", stalk: "stalks", pc: "pcs", piece: "pieces" };
      unit = pl[unit] || unit;
    }
    return lang === "zh" ? num + " " + unit : num + " " + unit;
  }
  function amtTri(n, u) { return tri({ zh: amtText(n, u, "zh"), en: amtText(n, u, "en"), tl: amtText(n, u, "tl") }); }

  /* ---------- 提示訊息 ---------- */
  let toastTimer = null;
  function toast(html) {
    const t = $("#toast");
    t.innerHTML = html;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  /* ---------- 回饋統計 ---------- */
  function fbStats(id) {
    const s = { all: 0, half: 0, no: 0 };
    Object.keys(ST.fb).forEach(function (d) { const v = ST.fb[d][id]; if (v) s[v]++; });
    return s;
  }
  function fbLove(id) { const s = fbStats(id); return s.all - 2 * s.no; }
  const FB_ICON = { all: "😋", half: "😐", no: "😖" };
  const FB_KEY = { all: "ateAll", half: "ateHalf", no: "ateNone" };
  function fbButtons(id) {
    const cur = (ST.fb[todayStr()] || {})[id] || "";
    return '<div class="fbrow" role="group">' + ["all", "half", "no"].map(function (v) {
      return '<button class="fbbtn ' + (cur === v ? "on " : "") + v + '" data-act="fb" data-id="' + id + '" data-v="' + v + '">' +
        '<span class="fe">' + FB_ICON[v] + "</span><span>" + U1(FB_KEY[v]) + "</span></button>";
    }).join("") + "</div>";
  }

  /* ---------- 冰箱評分 ---------- */
  function fridgeScore(r) {
    const need = [];
    r.ing.forEach(function (x) { if (!D.ING[x.id].pantry && need.indexOf(x.id) < 0) need.push(x.id); });
    const have = need.filter(function (id) { return ST.fridge.indexOf(id) >= 0; });
    return { need: need, have: have, miss: need.filter(function (id) { return have.indexOf(id) < 0; }), ratio: need.length ? have.length / need.length : 0 };
  }

  /* ---------- 共用元件 ---------- */
  function audioBtns(o, key) {
    let h = '<button class="ab" data-act="say" data-l="tl" data-t="' + esc(o.tl) + '">🔊 Tagalog</button>';
    if (ST.lang !== "tl") h += '<button class="ab" data-act="say" data-l="' + ST.lang + '" data-t="' + esc(o[ST.lang]) + '">🔊 ' + LABEL[ST.lang] + "</button>";
    if (D.TW && D.TW[key]) h += '<button class="ab tw" data-act="tw" data-k="' + esc(key) + '">🔊 台語</button>';
    return h;
  }
  function chip(act, k, v, label, active) {
    return '<button class="chip' + (active ? " on" : "") + '" data-act="' + act + '" data-k="' + k + '" data-v="' + v + '">' + label + "</button>";
  }
  function backBar(title) {
    return '<div class="topline"><a class="back" href="#/">← ' + UT("home") + '</a><h1 class="ptitle">' + title + "</h1></div>";
  }

  /* ---------- 首頁 ---------- */
  function vHome() {
    const s = D.SEASONS[seasonNow()];
    const ids = ST.menu.ids.filter(function (id) { return REC[id]; });
    let strip;
    if (ids.length) {
      strip = '<div class="strip-menu"><b>📅 ' + UT("today") + "</b>" + ids.map(function (id) {
        return '<a class="mchip" href="#/recipe/' + id + '">' + REC[id].e + " " + P1(REC[id]) + "</a>";
      }).join("") + "</div>";
    } else {
      strip = '<div class="strip-menu"><b>📅 ' + UT("today") + '</b><span class="dim">' + UT("menuEmpty") + '</span> <a class="mchip add" href="#/recipes">＋ ' + U1("menuAdd") + "</a></div>";
    }
    const tiles = [
      ["#/menu", "📅", "today"], ["#/recipes", "📖", "recipes"], ["#/phrases", "💬", "phrases"],
      ["#/vocab", "🔤", "vocab"], ["#/shop", "🛒", "shop"], ["#/fridge", "🧊", "fridge"],
      ["#/equip", "🍳", "equip"], ["#/feedback", "😋", "feedback"], ["#/pick", "🤔", "pick"]
    ].filter(function (t) { return t[2] !== "equip" || D.EQUIP_READY; }).map(function (t) {
      return '<a class="tile" href="' + t[0] + '"><span class="te">' + t[1] + '</span><span class="tt">' + U(t[2]) + "</span></a>";
    }).join("");
    return '<section class="hero">' +
      '<img class="hero-img" src="images/hero-800.jpg" srcset="images/hero-800.jpg 800w, images/hero.jpg 1200w" sizes="100vw" width="1200" height="676" fetchpriority="high" decoding="async" alt="燕飛食光：奶奶笑著端出一盤蛋糕">' +
      '<div class="hero-text"><h1 class="sr-only">燕飛食光</h1><p class="hero-sub">' + triUI(ui("appSub")) + "</p></div></section>" +
      '<div class="wrap">' +
      '<div class="strip"><div class="strip-season">' + s.e + " " + UT("season") + " <b>" + P1(s) + "</b></div>" + strip + "</div>" +
      '<div class="tiles">' + tiles + "</div>" +
      (/Android/i.test(navigator.userAgent) ? '<p class="tip">💡 ' + UT("installTip") + "</p>" : "") + "</div>";
  }

  /* ---------- 食譜列表 ---------- */
  let RF = { q: "", season: "", tag: "", cooker: "", soft: false, cat: "", tbc: false };
  function recipeMatches(r) {
    if (RF.q) {
      const q = RF.q.toLowerCase();
      if ((r.zh + " " + r.en + " " + r.tl).toLowerCase().indexOf(q) < 0) return false;
    }
    if (RF.season && r.seasons.map(function (z) { return D.SEASON_BY_ZH[z]; }).indexOf(RF.season) < 0) return false;
    if (RF.tag && r.tags.indexOf(RF.tag) < 0) return false;
    if (RF.cooker && r.cooker !== RF.cooker) return false;
    if (RF.soft && r.elder.soft < 3) return false;
    if (RF.cat && r.cat !== RF.cat) return false;
    if (r.status === "tbc" && !RF.tbc) return false;
    return true;
  }
  function recipeCard(r) {
    const inM = ST.menu.ids.indexOf(r.id) >= 0;
    const b = [];
    b.push(r.cooker === "rice" ? "🍚 " + UT("outerPot") + " " + r.outer : "🔥 " + UT("stove"));
    b.push("🥣".repeat(r.elder.soft));
    if (r.status === "tbc") b.push('<span class="tbc">⏳ ' + UT("tbc") + "</span>");
    const love = fbStats(r.id);
    if (love.all > 0 && fbLove(r.id) > 0) b.push("😋 ×" + love.all);
    return '<article class="rcard"><a class="rlink" href="#/recipe/' + r.id + '"><span class="re">' + r.e + '</span><span class="rn">' + triUI(r) + "</span></a>" +
      '<div class="badges">' + b.map(function (x) { return '<span class="badge">' + x + "</span>"; }).join("") + "</div>" +
      '<button class="btn small ' + (inM ? "on" : "") + '" data-act="menu" data-id="' + r.id + '">' + (inM ? "✓ " + U1("inMenu") : "＋ " + U1("addMenu")) + "</button></article>";
  }
  function recipeListHtml() {
    const list = D.RECIPES.filter(recipeMatches);
    return list.length ? list.map(recipeCard).join("") : '<p class="empty">' + U("noResult") + "</p>";
  }
  function vRecipes() {
    const seasons = Object.keys(D.SEASONS).map(function (k) { return chip("rf", "season", k, D.SEASONS[k].e + " " + P1(D.SEASONS[k]), RF.season === k); }).join("");
    const tags = Object.keys(D.TAGS).map(function (k) { return chip("rf", "tag", k, P1(D.TAGS[k]), RF.tag === k); }).join("");
    const other = chip("rf", "cooker", "rice", "🍚 " + UT("rice"), RF.cooker === "rice") +
      chip("rf", "cooker", "stove", "🔥 " + UT("stove"), RF.cooker === "stove") +
      chip("rf", "soft", "1", "🥣🥣🥣 " + UT("softOnly"), RF.soft) +
      chip("rf", "tbc", "1", "⏳ " + UT("showTbc") + " (" + D.RECIPES.filter(function (r) { return r.status === "tbc"; }).length + ")", RF.tbc);
    return '<div class="wrap">' + backBar("📖 " + UT("recipes")) +
      '<input id="q" class="search" type="search" placeholder="' + esc(UT("searchPh")) + '" value="' + esc(RF.q) + '" autocomplete="off">' +
      '<div class="chips">' + seasons + "</div><div class=\"chips\">" + tags + other + "</div>" +
      '<div id="rlist" class="rlist">' + recipeListHtml() + "</div></div>";
  }

  /* ---------- 食譜內頁 ---------- */
  function lineShare(text) { return "https://line.me/R/share?text=" + encodeURIComponent(text); }
  function elderPanel(r) {
    const e = r.elder;
    const soft = "🥣".repeat(e.soft) + '<span class="dimdots">' + "🥣".repeat(3 - e.soft) + "</span>";
    const cut = e.cut ? "<li><b>" + UT("cutting") + "</b> " + tri(D.CUT[e.cut]) + "</li>" : "";
    return '<section class="card elder"><h2>🧓 ' + U("forGrandma") + "</h2><ul class=\"kv\"><li><b>" + UT("softness") + "</b> " + soft + "</li>" + cut +
      "<li><b>" + UT("lowSalt") + "</b> " + tri(ui("lowSaltTip")) + "</li></ul><p class=\"enote\">" + tri(e.note) + "</p></section>";
  }
  function cookerPanel(r) {
    if (r.cooker !== "rice") return '<div class="cooker stove"><span class="ce">🔥</span><div class="ct">' + U("stoveNA") + "</div></div>";
    const n = r.outer;
    const o = {
      zh: "外鍋 " + n + " 杯水",
      en: "Outer pot: " + n + " cup" + (n > 1 ? "s" : "") + " of water",
      tl: "Outer pot: " + n + " tasang tubig"
    };
    return '<div class="cooker"><span class="ce">🍚</span><div class="ct">' + tri(o) + (r.outerNote ? '<div class="cnote">' + tri(r.outerNote) + "</div>" : "") + "</div></div>";
  }
  function vRecipe(id) {
    const r = REC[id];
    if (!r) return '<div class="wrap">' + backBar(UT("recipes")) + '<p class="empty">' + U("noResult") + "</p></div>";
    const inM = ST.menu.ids.indexOf(id) >= 0;
    const tags = r.tags.map(function (t) { return '<span class="badge">' + P1(D.TAGS[t]) + "</span>"; }).join("") +
      r.seasons.map(function (z) { const k = D.SEASON_BY_ZH[z]; return '<span class="badge season">' + D.SEASONS[k].e + "</span>"; }).join("") +
      (r.status === "tbc" ? '<span class="badge tbc">⏳ ' + UT("tbc") + "</span>" : '<span class="badge ok">✓ ' + UT("confirmed") + "</span>");
    const ings = r.ing.map(function (x) {
      const g = D.ING[x.id];
      return '<li><span class="ie">' + g.e + '</span><span class="iname">' + tri(g) + '</span><span class="iamt">' + amtTri(x.n, x.u) + "</span></li>";
    }).join("");
    const link = baseUrl() + "#/recipe/" + id;
    const steps = r.steps.map(function (s, i) {
      const n = i + 1;
      const ask = lineShare("【燕飛食光】" + ui("notSure").zh + ": " + r.zh + " / " + r.tl + " — " + n + "\n" + s.zh + "\n" + s.tl + "\n" + link);
      return '<li class="step" data-act="done"><div class="num">' + n + '</div><div class="sbody">' +
        '<img class="simg" loading="lazy" src="images/steps/' + id + "-" + n + '.jpg" alt="" onerror="this.remove()">' +
        '<div class="stext">' + tri(s) + "</div>" +
        '<div class="sbtns">' + audioBtns(s, id + "_s" + n) +
        (s.t ? '<button class="ab timer" data-act="timer" data-min="' + s.t + '" data-label="' + esc(P1(r) + " — " + n) + '">⏱ ' + s.t + " " + UT("minutes") + "</button>" : "") +
        '<a class="ab ask" href="' + ask + '" target="_blank" rel="noopener">❓ ' + U1("notSure") + "</a></div></div></li>";
    }).join("");
    const warn = r.warn.length ? '<section class="card warn"><h2>⚠️ ' + U("reminders") + "</h2><ul>" + r.warn.map(function (w) { return "<li>" + tri(w) + "</li>"; }).join("") + "</ul></section>" : "";
    return '<div class="wrap">' + '<div class="topline"><a class="back" href="#/recipes">← ' + UT("recipes") + "</a></div>" +
      '<header class="rhead"><span class="rbig">' + r.e + '</span><h1 class="rtitle">' + tri(r) + "</h1>" +
      '<div class="audio-title">' + audioBtns(r, "r_" + id) + "</div>" +
      '<div class="badges">' + tags + "</div>" +
      '<button class="btn ' + (inM ? "on" : "") + '" data-act="menu" data-id="' + id + '">' + (inM ? "✓ " + U1("inMenu") : "＋ " + U1("addMenu")) + "</button></header>" +
      (r.status === "tbc" ? '<p class="note-banner">⏳ ' + tri(ui("tbcBanner")) + "</p>" : "") +
      cookerPanel(r) + elderPanel(r) +
      '<section class="card secret"><h2>⭐ ' + U("secret") + "</h2><p>" + tri(r.secret) + "</p></section>" +
      '<section class="card"><h2>🧺 ' + U("ingredients") + '</h2><ul class="ings">' + ings + "</ul></section>" +
      '<section><h2 class="h2s">👩‍🍳 ' + U("steps") + '</h2><ol class="steps">' + steps + "</ol></section>" + warn +
      '<section class="card"><h2>' + U("feedback") + '</h2><p class="dim">' + UT("fbHint") + "</p>" + fbButtons(id) + "</section>" +
      "</div>";
  }

  /* ---------- 今日菜單 ---------- */
  function menuLink() { return baseUrl() + "#/menu?m=" + ST.menu.ids.join("-") + "&d=" + (ST.menu.date || todayStr()) + "&l=tl"; }
  function vMenu() {
    const ids = ST.menu.ids.filter(function (id) { return REC[id]; });
    const d = ST.menu.date || todayStr();
    const stale = ids.length && d !== todayStr();
    let body;
    if (!ids.length) {
      body = '<div class="empty big">🍽️<p>' + U("menuEmpty") + '</p><a class="btn big" href="#/recipes">＋ ' + U1("menuAdd") + "</a></div>";
    } else {
      body = ids.map(function (id, i) {
        const r = REC[id];
        return '<article class="mcard"><div class="mnum">' + (i + 1) + '</div><div class="mmain"><a class="mname" href="#/recipe/' + id + '"><span class="re">' + r.e + "</span><span>" + triUI(r) + "</span></a>" +
          fbButtons(id) + '<div class="mbtns"><a class="btn small" href="#/recipe/' + id + '">👩‍🍳 ' + U1("cookNow") + '</a><button class="btn small ghost" data-act="menu" data-id="' + id + '">✕ ' + U1("remove") + "</button></div></div></article>";
      }).join("");
      const text = "【燕飛食光】" + shortDate(d) + " " + ui("today").zh + " / " + ui("today").tl + "\n" +
        ids.map(function (id, i) { return (i + 1) + ". " + REC[id].zh + " — " + REC[id].tl; }).join("\n") + "\n" + menuLink();
      body += '<div class="actions"><a class="btn line big" href="' + lineShare(text) + '" target="_blank" rel="noopener">💬 ' + U1("menuShare") + "</a>" +
        '<button class="btn" data-act="copy" data-t="' + esc(menuLink()) + '">🔗 ' + U1("copyLink") + '</button><a class="btn" href="#/shop">🛒 ' + U1("shop") +
        '</a><button class="btn ghost" data-act="clearmenu">🗑 ' + U1("clear") + "</button></div>";
    }
    return '<div class="wrap">' + backBar("📅 " + UT("today")) +
      '<p class="dim">' + UT("menuDate") + ": <b>" + shortDate(d) + "</b>" + (stale ? ' <span class="badge tbc">⚠ ' + shortDate(d) + "</span>" : "") + "</p>" + body + "</div>";
  }

  /* ---------- 採買清單 ---------- */
  function shoppingList() {
    const map = {};
    ST.menu.ids.forEach(function (id) {
      const r = REC[id];
      if (!r) return;
      r.ing.forEach(function (x) {
        const g = D.ING[x.id];
        if (g.area === "none") return;
        const m = map[x.id] || (map[x.id] = { id: x.id, nums: {}, texts: {}, from: [] });
        if (x.n == null || x.u === "half") m.texts[x.u] = x.n;
        else m.nums[x.u] = (m.nums[x.u] || 0) + x.n;
        if (m.from.indexOf(id) < 0) m.from.push(id);
      });
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }
  function vShop() {
    const list = shoppingList();
    if (!list.length) return '<div class="wrap">' + backBar("🛒 " + UT("shop")) + '<div class="empty big">🛒<p>' + U("shopEmpty") + '</p><a class="btn big" href="#/recipes">＋ ' + U1("menuAdd") + "</a></div></div>";
    const groups = {};
    const have = [];
    list.forEach(function (m) {
      const g = D.ING[m.id];
      if (ST.fridge.indexOf(m.id) >= 0) { have.push(m); return; }
      (groups[g.area] = groups[g.area] || []).push(m);
    });
    function row(m) {
      const g = D.ING[m.id];
      const parts = [];
      Object.keys(m.nums).forEach(function (u) { parts.push({ n: Math.round(m.nums[u] * 100) / 100, u: u }); });
      Object.keys(m.texts).forEach(function (u) { parts.push({ n: m.texts[u], u: u }); });
      const amt = {};
      LANGS.forEach(function (l) { amt[l] = parts.map(function (p) { return amtText(p.n, p.u, l); }).join(" + "); });
      const on = ST.shop.indexOf(m.id) >= 0;
      return '<li class="srow' + (on ? " done" : "") + '" data-act="shopcheck" data-id="' + m.id + '"><span class="check">' + (on ? "✓" : "") + '</span><span class="ie">' + g.e + '</span><span class="iname">' + tri(g) +
        '</span><span class="iamt">' + tri(amt) + "</span></li>";
    }
    let html = "";
    Object.keys(D.AREAS).forEach(function (a) {
      if (!groups[a]) return;
      const ar = D.AREAS[a];
      html += '<section class="card"><h2>' + ar.e + " " + triUI(ar) + '</h2><ul class="slist">' + groups[a].map(row).join("") + "</ul></section>";
    });
    if (have.length) {
      html += '<section class="card dimcard"><h2>🧊 ' + U("haveInFridge") + '</h2><ul class="slist">' + have.map(function (m) {
        const g = D.ING[m.id];
        return '<li class="srow"><span class="ie">' + g.e + '</span><span class="iname">' + tri(g) + "</span></li>";
      }).join("") + "</ul></section>";
    }
    return '<div class="wrap">' + backBar("🛒 " + UT("shop")) + html + '<div class="actions"><button class="btn ghost" data-act="clearshop">↺ ' + U1("clear") + "</button></div></div>";
  }

  /* ---------- 冰箱 ---------- */
  function vFridge() {
    const groups = {};
    Object.keys(D.ING).forEach(function (id) {
      const g = D.ING[id];
      if (g.pantry || g.area === "none") return;
      (groups[g.area] = groups[g.area] || []).push(id);
    });
    let html = "";
    Object.keys(D.AREAS).forEach(function (a) {
      if (!groups[a]) return;
      html += '<section class="card"><h2>' + D.AREAS[a].e + " " + triUI(D.AREAS[a]) + '</h2><div class="fchips">' + groups[a].map(function (id) {
        const g = D.ING[id];
        const on = ST.fridge.indexOf(id) >= 0;
        return '<button class="fchip' + (on ? " on" : "") + '" data-act="fridge" data-id="' + id + '"><span class="fe">' + g.e + "</span><span>" + triUI(g) + "</span></button>";
      }).join("") + "</div></section>";
    });
    let can = "";
    if (ST.fridge.length) {
      const arr = D.RECIPES.filter(function (r) { return r.status !== "tbc"; }).map(function (r) { return { r: r, s: fridgeScore(r) }; }).filter(function (x) { return x.s.have.length > 0; })
        .sort(function (a, b) { return b.s.ratio - a.s.ratio; });
      can = '<section class="card"><h2>👩‍🍳 ' + U("canMake") + "</h2>" + (arr.length ? arr.map(function (x) {
        const miss = x.s.miss.map(function (id) { return D.ING[id].e + " " + P1(D.ING[id]); }).join("、");
        return '<a class="candish" href="#/recipe/' + x.r.id + '"><span class="re">' + x.r.e + '</span><span class="cdn">' + triUI(x.r) + '<span class="dim">' + (miss ? UT("missing") + ": " + miss : "✓") + '</span></span><span class="pct">' + Math.round(x.s.ratio * 100) + "%</span></a>";
      }).join("") : '<p class="empty">' + U("noResult") + "</p>") + "</section>";
    }
    return '<div class="wrap">' + backBar("🧊 " + UT("fridge")) + '<p class="dim">' + UT("fridgeHint") + "<br>" + UT("pantryNote") + "</p>" + can + html + "</div>";
  }

  /* ---------- 常用句 ---------- */
  let PF = { cat: "" };
  function phraseCard(p) {
    return '<article class="pcard"><button class="pmain" data-act="big" data-k="' + p.key + '"><span class="pe">' + p.e + '</span><span class="ptext">' + tri(p) + "</span></button>" +
      '<div class="sbtns">' + audioBtns(p, p.key) + '<button class="ab" data-act="big" data-k="' + p.key + '">🔍 ' + U1("showBig") + "</button></div></article>";
  }
  function vPhrases() {
    const cats = chip("pf", "cat", "", UT("all"), !PF.cat) + Object.keys(D.PHRASE_CATS).map(function (k) {
      return chip("pf", "cat", k, D.PHRASE_CATS[k].e + " " + P1(D.PHRASE_CATS[k]), PF.cat === k);
    }).join("");
    const list = D.PHRASES.filter(function (p) { return !PF.cat || p.cat === PF.cat; });
    return '<div class="wrap">' + backBar("💬 " + UT("phrases")) + '<div class="chips">' + cats + '</div><div class="plist">' + list.map(phraseCard).join("") + "</div></div>";
  }

  /* ---------- 詞彙卡 ---------- */
  let VF = { cat: "ingredient", q: "" };
  function vocabCard(v) {
    return '<article class="vcard"><div class="vimg"><span class="emo">' + v.e + '</span><img loading="lazy" src="images/vocab/' + v.key + '.jpg" alt="" onerror="this.remove()"></div>' +
      '<div class="vtext">' + tri(v) + '</div><div class="sbtns">' + audioBtns(v, v.key) + "</div></article>";
  }
  function vocabListHtml() {
    const q = VF.q.toLowerCase();
    const list = D.VOCAB.filter(function (v) {
      if (VF.cat && v.cat !== VF.cat) return false;
      return !q || (v.zh + " " + v.en + " " + v.tl).toLowerCase().indexOf(q) >= 0;
    });
    return list.length ? list.map(vocabCard).join("") : '<p class="empty">' + U("noResult") + "</p>";
  }
  function vVocab() {
    const cats = Object.keys(D.VOCAB_CATS).map(function (k) {
      return chip("vf", "cat", k, D.VOCAB_CATS[k].e + " " + P1(D.VOCAB_CATS[k]), VF.cat === k);
    }).join("");
    return '<div class="wrap">' + backBar("🔤 " + UT("vocab")) + '<input id="vq" class="search" type="search" placeholder="' + esc(UT("searchPh")) + '" value="' + esc(VF.q) + '" autocomplete="off">' +
      '<div class="chips">' + cats + '</div><div id="vlist" class="vlist">' + vocabListHtml() + "</div></div>";
  }

  /* ---------- 器具 ---------- */
  function vEquip() {
    const cupInfo = {
      zh: "食譜裡的「1 杯水」，是用電鍋附的量杯，把水倒進外鍋。",
      en: "\"1 cup of water\" in a recipe means the cup that came with the rice cooker, poured into the outer pot.",
      tl: "Ang \"1 tasa ng tubig\" sa recipe ay ang tasang kasama ng rice cooker, ibinubuhos sa outer pot."
    };
    const heat = D.HEAT_GUIDE.map(function (h) {
      return '<div class="hrow"><span class="he">' + h.e + '</span><div><b>' + tri(h.name) + "</b><div>" + tri(h.use) + "</div></div></div>";
    }).join("");
    const cards = D.EQUIP.map(function (q) {
      return '<section class="card equip"><div class="eimg"><span class="emo">' + q.e + '</span><img loading="lazy" src="' + q.img + '" alt="" onerror="this.remove()"></div>' +
        "<h2>" + tri(q.name) + (q.todo ? ' <span class="badge tbc">⏳ ' + UT("tbc") + "</span>" : "") + "</h2><p>" + tri(q.use) + "</p><ol class=\"esteps\">" +
        q.steps.map(function (s) { return "<li>" + tri(s) + "</li>"; }).join("") + "</ol><p class=\"ewater\">💧 " + tri(q.water) + "</p></section>";
    }).join("");
    return '<div class="wrap">' + backBar("🍳 " + UT("equip")) + '<p class="note-banner">' + UT("equipTbc") + "</p>" +
      '<section class="card secret"><h2>💧 ' + U("cupsWater") + "</h2><p>" + tri(cupInfo) + "</p></section>" +
      '<section class="card"><h2>🔥 ' + U("stove") + "</h2>" + heat + "</section>" + cards + "</div>";
  }

  /* ---------- 奶奶回饋 ---------- */
  function fbShareText() {
    const t = todayStr();
    const day = ST.fb[t] || {};
    const ids = Object.keys(day).filter(function (id) { return REC[id]; });
    if (!ids.length) return "";
    const word = { all: ui("ateAll"), half: ui("ateHalf"), no: ui("ateNone") };
    const pairs = ids.map(function (id) { return compactDate(t) + "." + id + "." + day[id]; }).join("-");
    return "【燕飛食光】" + shortDate(t) + " " + ui("feedback").zh + " / " + ui("feedback").tl + "\n" +
      ids.map(function (id) { return FB_ICON[day[id]] + " " + REC[id].zh + " — " + word[day[id]].zh + " / " + word[day[id]].tl; }).join("\n") +
      "\n" + baseUrl() + "#/feedback?fb=" + pairs;
  }
  function vFeedback() {
    const t = todayStr();
    const ids = ST.menu.ids.filter(function (id) { return REC[id]; });
    let today = ids.length ? ids.map(function (id) {
      return '<div class="fbitem"><div class="fbname"><span class="re">' + REC[id].e + "</span>" + triUI(REC[id]) + "</div>" + fbButtons(id) + "</div>";
    }).join("") : '<p class="empty">' + U("menuEmpty") + ' <a href="#/recipes">＋</a></p>';
    const rows = D.RECIPES.map(function (r) { return { r: r, s: fbStats(r.id), love: fbLove(r.id) }; })
      .filter(function (x) { return x.s.all + x.s.half + x.s.no > 0; })
      .sort(function (a, b) { return b.love - a.love; });
    const hist = rows.length ? rows.map(function (x) {
      const tot = x.s.all + x.s.half + x.s.no;
      return '<div class="hrow2"><span class="re">' + x.r.e + '</span><div class="hmain">' + triUI(x.r) +
        '<div class="bar"><i class="b-all" style="width:' + (x.s.all / tot * 100) + '%"></i><i class="b-half" style="width:' + (x.s.half / tot * 100) + '%"></i><i class="b-no" style="width:' + (x.s.no / tot * 100) + '%"></i></div>' +
        '<span class="dim">😋 ' + x.s.all + " &nbsp; 😐 " + x.s.half + " &nbsp; 😖 " + x.s.no + "</span></div></div>";
    }).join("") : '<p class="empty">' + U("fbNone") + "</p>";
    const share = fbShareText();
    return '<div class="wrap">' + backBar("😋 " + UT("feedback")) +
      '<section class="card"><h2>' + U("fbToday") + " · " + shortDate(t) + '</h2><p class="dim">' + UT("fbHint") + "</p>" + today +
      (share ? '<div class="actions"><a class="btn line big" href="' + lineShare(share) + '" target="_blank" rel="noopener">💬 ' + U1("fbShare") + "</a></div>" : "") + "</section>" +
      '<section class="card"><h2>' + U("fbHistory") + "</h2>" + hist + "</section></div>";
  }

  /* ---------- 今天煮什麼（規則推薦） ---------- */
  function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function vPick() {
    const sn = seasonNow();
    const hasFb = Object.keys(ST.fb).length > 0;
    const recent = {};
    Object.keys(ST.fb).sort().slice(-7).forEach(function (d) { Object.keys(ST.fb[d]).forEach(function (id) { recent[id] = true; }); });
    const scored = D.RECIPES.filter(function (r) { return r.status !== "tbc"; }).map(function (r) {
      let score = 0;
      const why = [];
      if (r.seasons.map(function (z) { return D.SEASON_BY_ZH[z]; }).indexOf(sn) >= 0 && r.seasons.length < 4) { score += 2; why.push("whySeason"); }
      const fs = fridgeScore(r);
      if (ST.fridge.length && fs.ratio >= 0.6) { score += 3 * fs.ratio; why.push("whyFridge"); }
      const love = fbLove(r.id);
      if (love > 0) { score += Math.min(3, love); why.push("whyLove"); } else if (love < 0) score += love;
      if (r.elder.soft >= 3) { score += 0.5; why.push("whySoft"); }
      if (hasFb && !recent[r.id]) { score += 1; why.push("whyNew"); }
      if (r.tags.indexOf("quick") >= 0) score += 0.3;
      score += (hashStr(todayStr() + r.id) % 100) / 200;
      return { r: r, score: score, why: why };
    }).sort(function (a, b) { return b.score - a.score; }).slice(0, 3);
    const s = D.SEASONS[sn];
    return '<div class="wrap">' + backBar("🤔 " + UT("pick")) + '<p class="dim">' + s.e + " " + P1(s) + "</p>" + scored.map(function (x) {
      const inM = ST.menu.ids.indexOf(x.r.id) >= 0;
      return '<article class="card pickc"><a class="mname" href="#/recipe/' + x.r.id + '"><span class="re">' + x.r.e + "</span><span>" + triUI(x.r) + "</span></a>" +
        '<div class="badges">' + x.why.map(function (w) { return '<span class="badge ok">' + UT(w) + "</span>"; }).join("") + "</div>" +
        '<button class="btn small ' + (inM ? "on" : "") + '" data-act="menu" data-id="' + x.r.id + '">' + (inM ? "✓ " + U1("inMenu") : "＋ " + U1("addMenu")) + "</button></article>";
    }).join("") + "</div>";
  }

  /* ---------- 路由 ---------- */
  let wake = null;
  function releaseWake() { if (wake && wake.release) { wake.release().catch(function () {}); } wake = null; }
  function keepAwake() {
    if (!("wakeLock" in navigator)) return;
    navigator.wakeLock.request("screen").then(function (w) { wake = w; }).catch(function () {});
  }

  /* 收到的菜單先放這裡，等使用者按「換成這份」才寫入 */
  let pendingMenu = null;
  function importShared(q) {
    const had = q.has("l") || q.has("m") || q.has("fb");
    let changed = false;
    if (q.has("l") && LANGS.indexOf(q.get("l")) >= 0 && !ST.langSet) { ST.lang = q.get("l"); changed = true; }
    if (q.has("m")) {
      /* 分隔符號是連字號；舊連結的逗號也接受 */
      const ids = q.get("m").split(/[-,]/).filter(function (id, i, arr) { return REC[id] && arr.indexOf(id) === i; });
      const date = /^\d{4}-\d{2}-\d{2}$/.test(q.get("d") || "") ? q.get("d") : todayStr();
      const same = date === ST.menu.date && ids.join() === ST.menu.ids.join();
      if (ids.length && !same) pendingMenu = { date: date, ids: ids };
    }
    if (q.has("fb")) {
      /* 格式：20261003.菜id.結果，用連字號相連；舊格式（2026-10-03、逗號）也接受 */
      const re = /(\d{4})-?(\d{2})-?(\d{2})\.([a-z0-9_]+)\.(all|half|no)/g;
      let m;
      let n = 0;
      while ((m = re.exec(q.get("fb")))) {
        if (!REC[m[4]]) continue;
        const d = m[1] + "-" + m[2] + "-" + m[3];
        ST.fb[d] = ST.fb[d] || {};
        ST.fb[d][m[4]] = m[5];
        n++;
      }
      if (n) { changed = true; toast("😋 " + U1("fbMerged")); }
    }
    if (changed) save();
    return had;
  }
  function showMenuAsk() {
    if (!pendingMenu) return;
    const pm = pendingMenu;
    const old = pm.date !== todayStr();
    const cur = ST.menu.ids.filter(function (id) { return REC[id]; });
    const ov = $("#overlay");
    ov.innerHTML = '<div class="obox ask"><div class="oe">📅</div><h2 class="askq">' + U("menuAsk") + "</h2>" +
      '<p class="askdate">' + UT("menuDate") + ": <b>" + shortDate(pm.date) + "</b></p>" +
      (old ? '<p class="askwarn">⚠️ ' + U("menuOld") + "</p>" : "") +
      '<ol class="asklist">' + pm.ids.map(function (id) { return "<li>" + REC[id].e + " " + tri(REC[id]) + "</li>"; }).join("") + "</ol>" +
      (cur.length ? '<p class="dim">' + UT("menuReplace") + "：" + cur.map(function (id) { return P1(REC[id]); }).join("、") + "</p>" : "") +
      '<div class="askbtns"><button class="btn big on" data-act="acceptmenu">✓ ' + U1("menuYes") + '</button><button class="btn big ghost" data-act="closebig">✕ ' + U1("menuNo") + "</button></div></div>";
    ov.classList.add("show");
  }

  function route() {
    const raw = (location.hash || "#/").replace(/^#/, "");
    const qi = raw.indexOf("?");
    const path = qi >= 0 ? raw.slice(0, qi) : raw;
    const q = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : "");
    if (importShared(q)) { history.replaceState(null, "", "#" + path); }
    const parts = path.split("/").filter(Boolean);
    const name = parts[0] || "home";
    releaseWake();
    $("#overlay").classList.remove("show");
    let html;
    switch (name) {
      case "recipes": html = vRecipes(); break;
      case "recipe": html = vRecipe(parts[1]); keepAwake(); break;
      case "menu": html = vMenu(); break;
      case "phrases": html = vPhrases(); break;
      case "vocab": html = vVocab(); break;
      case "shop": html = vShop(); break;
      case "fridge": html = vFridge(); break;
      case "equip": html = vEquip(); break;
      case "feedback": html = vFeedback(); break;
      case "pick": html = vPick(); break;
      default: html = vHome();
    }
    $("#app").innerHTML = html;
    window.scrollTo(0, 0);
    renderChrome(name);
    showMenuAsk();
  }
  /* 狀態改變後重畫，但保留捲動位置 */
  function rerender() {
    const y = window.scrollY;
    const q = document.activeElement && document.activeElement.id;
    const hash = location.hash;
    const raw = (hash || "#/").replace(/^#/, "").split("?")[0];
    const parts = raw.split("/").filter(Boolean);
    const name = parts[0] || "home";
    const map = { recipes: vRecipes, menu: vMenu, phrases: vPhrases, vocab: vVocab, shop: vShop, fridge: vFridge, equip: vEquip, feedback: vFeedback, pick: vPick };
    let html;
    if (name === "recipe") html = vRecipe(parts[1]);
    else html = (map[name] || vHome)();
    $("#app").innerHTML = html;
    window.scrollTo(0, y);
    renderChrome(name);
    if (q) { const el = document.getElementById(q); if (el) el.focus(); }
  }

  /* ---------- 頂端列與底部導覽 ---------- */
  function renderChrome(name) {
    $("#langbar").innerHTML = LANG_BAR.map(function (l) {
      return '<button class="lbtn' + (ST.lang === l ? " on" : "") + '" data-act="lang" data-v="' + l + '" aria-pressed="' + (ST.lang === l) + '">' + LABEL[l] + "</button>";
    }).join("") + '<button class="lbtn multi' + (ST.multi ? " on" : "") + '" data-act="multi" title="' + esc(ST.multi ? UT("langOnly") : UT("langAll")) + '" aria-label="' + esc(ST.multi ? UT("langOnly") : UT("langAll")) + '">🌐' + (ST.multi ? "3" : "1") + "</button>";
    /* 底部導覽的字要短，才放得下 */
    const NAVL = {
      home: { zh: "首頁", en: "Home", tl: "Bahay" }, menu: { zh: "菜單", en: "Menu", tl: "Menu" },
      recipes: { zh: "食譜", en: "Recipes", tl: "Recipe" }, phrases: { zh: "常用句", en: "Phrases", tl: "Parirala" },
      shop: { zh: "採買", en: "Shop", tl: "Bibilhin" }
    };
    const nav = [["home", "#/", "🏠"], ["menu", "#/menu", "📅"], ["recipes", "#/recipes", "📖"], ["phrases", "#/phrases", "💬"], ["shop", "#/shop", "🛒"]];
    $("#bottomnav").innerHTML = nav.map(function (n) {
      const on = name === n[0] || (name === "recipe" && n[0] === "recipes");
      return '<a class="nitem' + (on ? " on" : "") + '" href="' + n[1] + '"><span class="ne">' + n[2] + '</span><span class="nl">' + P1(NAVL[n[0]]) + "</span></a>";
    }).join("");
    document.documentElement.lang = ST.lang === "zh" ? "zh-Hant" : ST.lang;
  }

  /* ---------- 計時器 ---------- */
  let TM = null;
  let tmInt = null;
  let alarmInt = null;
  function fmtTime(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    return (h ? h + ":" + pad(m) : m) + ":" + pad(ss);
  }
  function stopTimer() {
    TM = null;
    clearInterval(tmInt); clearInterval(alarmInt);
    $("#timerbar").className = "timerbar";
    $("#timerbar").innerHTML = "";
  }
  function startTimer(min, label) {
    stopTimer();
    A.beep(0);
    TM = { end: Date.now() + min * 60000, label: label };
    const bar = $("#timerbar");
    bar.className = "timerbar show";
    function draw() {
      if (!TM) return;
      const left = TM.end - Date.now();
      if (left <= 0) {
        clearInterval(tmInt);
        bar.className = "timerbar show alarm";
        bar.innerHTML = '<div class="tmain"><b>⏰ ' + U1("timeUp") + '</b><span class="tl">' + esc(TM.label) + '</span></div><button class="btn" data-act="stoptimer">' + U1("stop") + "</button>";
        A.beep(3);
        alarmInt = setInterval(function () { A.beep(3); }, 4000);
        return;
      }
      bar.innerHTML = '<div class="tmain"><b>⏱ ' + fmtTime(left) + '</b><span class="tl">' + esc(TM.label) + '</span></div><button class="btn ghost" data-act="stoptimer">' + U1("stop") + "</button>";
    }
    draw();
    tmInt = setInterval(draw, 500);
  }

  /* ---------- 放大顯示（拿給對方看） ---------- */
  function showBig(key) {
    const p = D.PHRASES.filter(function (x) { return x.key === key; })[0];
    if (!p) return;
    const ov = $("#overlay");
    ov.innerHTML = '<div class="obox"><button class="oclose" data-act="closebig" aria-label="close">✕</button><div class="oe">' + p.e + "</div>" +
      '<p class="o1" lang="tl">' + p.tl + '</p><p class="o2" lang="en">' + p.en + '</p><p class="o2" lang="zh-Hant">' + p.zh + "</p>" +
      '<div class="sbtns center">' + audioBtns(p, p.key) + "</div></div>";
    ov.classList.add("show");
  }

  /* ---------- 事件 ---------- */
  function copyText(t) {
    function done() { toast("✓ " + U1("copied")); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(done).catch(function () { fallbackCopy(t); done(); });
    } else { fallbackCopy(t); done(); }
  }
  function fallbackCopy(t) {
    const ta = document.createElement("textarea");
    ta.value = t; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* 忽略 */ }
    document.body.removeChild(ta);
  }
  function toggleIn(arr, v) { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); }

  const ACTS = {
    lang: function (el) { ST.lang = el.dataset.v; ST.langSet = true; save(); rerender(); },
    multi: function () { ST.multi = !ST.multi; save(); rerender(); },
    say: function (el) {
      const lang = el.dataset.l;
      const r = A.speak(el.dataset.t, lang);
      if (r === "unsupported" || (r === "novoice" && lang === "tl")) toast("🔇 " + tri(ui("noVoice")));
    },
    tw: function (el) {
      A.playTw(el.dataset.k).then(function (ok) {
        if (!ok) { el.classList.add("missing"); toast("🎙️ " + tri(ui("twNone"))); }
      });
    },
    menu: function (el) {
      const id = el.dataset.id;
      if (ST.menu.date !== todayStr()) ST.menu = { date: todayStr(), ids: [] };
      toggleIn(ST.menu.ids, id);
      save(); rerender();
    },
    clearmenu: function () { ST.menu = { date: todayStr(), ids: [] }; save(); rerender(); },
    fb: function (el) {
      const t = todayStr();
      ST.fb[t] = ST.fb[t] || {};
      if (ST.fb[t][el.dataset.id] === el.dataset.v) delete ST.fb[t][el.dataset.id];
      else { ST.fb[t][el.dataset.id] = el.dataset.v; toast("✓ " + U1("fbSaved")); }
      save(); rerender();
    },
    rf: function (el) {
      const k = el.dataset.k;
      if (k === "soft") RF.soft = !RF.soft;
      else if (k === "tbc") RF.tbc = !RF.tbc;
      else RF[k] = RF[k] === el.dataset.v ? "" : el.dataset.v;
      rerender();
    },
    pf: function (el) { PF.cat = el.dataset.v; rerender(); },
    vf: function (el) { VF.cat = el.dataset.v; rerender(); },
    fridge: function (el) { toggleIn(ST.fridge, el.dataset.id); save(); rerender(); },
    shopcheck: function (el) { toggleIn(ST.shop, el.dataset.id); save(); rerender(); },
    clearshop: function () { ST.shop = []; save(); rerender(); },
    copy: function (el) { copyText(el.dataset.t); },
    timer: function (el) { startTimer(Number(el.dataset.min), el.dataset.label); },
    stoptimer: function () { stopTimer(); },
    done: function (el, ev) {
      if (ev.target.closest("a,button")) return;
      el.classList.toggle("is-done");
    },
    big: function (el) { showBig(el.dataset.k); },
    closebig: function () { pendingMenu = null; $("#overlay").classList.remove("show"); A.stop(); },
    acceptmenu: function () {
      if (pendingMenu) { ST.menu = pendingMenu; ST.shop = []; save(); }
      pendingMenu = null;
      $("#overlay").classList.remove("show");
      toast("📅 " + U1("menuLoaded"));
      if (/^#\/menu/.test(location.hash)) rerender(); else location.hash = "#/menu";
    }
  };

  document.addEventListener("click", function (ev) {
    const el = ev.target.closest("[data-act]");
    if (!el) {
      if (ev.target.id === "overlay") ACTS.closebig();
      return;
    }
    const fn = ACTS[el.dataset.act];
    if (fn) fn(el, ev);
  });
  document.addEventListener("input", function (ev) {
    if (ev.target.id === "q") { RF.q = ev.target.value; $("#rlist").innerHTML = recipeListHtml(); }
    if (ev.target.id === "vq") { VF.q = ev.target.value; $("#vlist").innerHTML = vocabListHtml(); }
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && /^#\/recipe\//.test(location.hash) && !wake) keepAwake();
  });
  window.addEventListener("hashchange", route);

  /* ---------- 啟動 ---------- */
  route();
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();

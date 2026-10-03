/* 詞彙卡（切法、火候、器具）。食材與調味料自動從 data/ingredients.js 讀取。
   key 就是台語錄音檔名：audio/tw/<key>.m4a（食材的 key 是 i_<id>） */
(function () {
  window.YF = window.YF || {};
  const V = (key, cat, e, zh, en, tl) => ({ key, cat, e, zh, en, tl });

  YF.VOCAB_CATS = {
    ingredient: { zh: "食材", en: "Ingredients", tl: "Sangkap", e: "🥬" },
    seasoning:  { zh: "調味", en: "Seasonings", tl: "Pampalasa", e: "🧂" },
    cutting:    { zh: "切法", en: "Cutting", tl: "Paghiwa", e: "🔪" },
    heat:       { zh: "火候・做法", en: "Heat and methods", tl: "Apoy at paraan", e: "🔥" },
    tool:       { zh: "器具", en: "Tools", tl: "Kagamitan", e: "🍳" }
  };

  YF.VOCAB = [
    /* 切法 */
    V("v_slice", "cutting", "🔪", "切片", "Slice", "Hiwain nang pahiwa (hiwa)"),
    V("v_shred", "cutting", "🥢", "切絲", "Shred into strips", "Hiwain nang mahaba at manipis"),
    V("v_dice", "cutting", "🧊", "切丁", "Dice", "Hiwain sa maliliit na kuwadrado"),
    V("v_mince", "cutting", "🧄", "切末", "Mince", "Tadtarin"),
    V("v_chunk", "cutting", "🥕", "滾刀塊", "Roll-cut chunks", "Hiwain sa mga tipak"),
    V("v_bite", "cutting", "🍽️", "一口大小", "Bite-size", "Pang-isang subo"),
    V("v_smash", "cutting", "👊", "拍碎", "Smash", "Dikdikin"),
    V("v_peel", "cutting", "🥔", "削皮", "Peel", "Balatan"),
    V("v_cut_scissors", "cutting", "✂️", "用剪刀剪", "Cut with scissors", "Gupitin gamit ang gunting"),
    V("v_scrape", "cutting", "🥄", "刮乾淨", "Scrape clean", "Kayurin nang malinis"),
    /* 火候・做法 */
    V("v_high_heat", "heat", "🔥🔥🔥", "大火", "High heat", "Malakas na apoy"),
    V("v_med_heat", "heat", "🔥🔥", "中火", "Medium heat", "Katamtamang apoy"),
    V("v_low_heat", "heat", "🔥", "小火", "Low heat", "Mahinang apoy"),
    V("v_boil", "heat", "♨️", "煮滾", "Bring to a boil", "Pakuluan"),
    V("v_simmer", "heat", "🫕", "微滾（小小滾）", "Simmer", "Hayaang kumulo nang mahina"),
    V("v_steam", "heat", "🍲", "蒸", "Steam", "Pasingawan"),
    V("v_stew", "heat", "🥘", "燉", "Stew", "Nilaga nang matagal"),
    V("v_stirfry", "heat", "🍳", "炒", "Stir-fry", "Igisa"),
    V("v_fragrant", "heat", "🧄", "爆香", "Fry until fragrant", "Igisa hanggang bumango"),
    V("v_blanch", "heat", "🫧", "汆燙", "Blanch", "Pakuluan nang sandali"),
    V("v_rest_covered", "heat", "⏳", "悶（蓋著等）", "Rest with the lid on", "Hayaang nakatakip"),
    V("v_strain", "heat", "🥣", "過濾（過篩）", "Strain", "Salain"),
    V("v_drain", "heat", "💦", "瀝乾", "Drain", "Patuluin"),
    V("v_skim", "heat", "🫧", "撈浮沫", "Skim the foam", "Alisin ang bula"),
    V("v_marinate", "heat", "🥣", "醃", "Marinate", "Ibabad sa pampalasa"),
    V("v_soak", "heat", "💧", "泡水", "Soak", "Ibabad"),
    V("v_cooked_through", "heat", "✅", "熟透", "Fully cooked", "Luto na luto"),
    V("v_soft", "heat", "🥣", "軟爛", "Very soft", "Napakalambot"),
    /* 器具 */
    V("v_rice_cooker", "tool", "🍚", "電鍋", "Electric rice cooker (steamer)", "Electric rice cooker (pang-steam)"),
    V("v_inner_pot", "tool", "🥘", "內鍋", "Inner pot", "Inner pot (panloob na kaldero)"),
    V("v_outer_pot", "tool", "🫕", "外鍋（放水的地方）", "Outer pot (where the water goes)", "Outer pot (lalagyan ng tubig)"),
    V("v_measure_cup", "tool", "🥛", "量杯（電鍋附的杯子）", "Measuring cup (comes with the cooker)", "Panukat na tasa (kasama ng rice cooker)"),
    V("v_switch", "tool", "🔘", "開關（跳起來就好了）", "Switch (it pops up when done)", "Switch (tumatalon kapag tapos na)"),
    V("v_gas_stove", "tool", "🔥", "瓦斯爐", "Gas stove", "Kalan"),
    V("v_wok", "tool", "🍳", "炒菜鍋", "Wok / frying pan", "Kawali"),
    V("v_soup_pot", "tool", "🍲", "湯鍋", "Soup pot", "Palayok ng sabaw"),
    V("v_tbsp", "tool", "🥄", "大匙", "Tablespoon", "Kutsara (tablespoon)"),
    V("v_tsp", "tool", "🥄", "小匙", "Teaspoon", "Kutsarita (teaspoon)"),
    V("v_strainer", "tool", "🥣", "濾網", "Strainer", "Salaan"),
    V("v_chopsticks", "tool", "🥢", "筷子", "Chopsticks", "Chopsticks"),
    V("v_gloves", "tool", "🧤", "隔熱手套", "Heat-resistant gloves", "Guwantes na hindi nakakapaso"),
    V("v_knife", "tool", "🔪", "菜刀", "Kitchen knife", "Kutsilyo"),
    V("v_board", "tool", "🪵", "砧板", "Cutting board", "Sangkalan"),
    V("v_scissors", "tool", "✂️", "剪刀", "Scissors", "Gunting"),
    V("v_plate", "tool", "🍽️", "深盤", "Deep plate", "Malalim na plato")
  ];

  /* 食材與調味料自動加入 */
  Object.keys(YF.ING).forEach(function (id) {
    const g = YF.ING[id];
    if (g.area === "none" && id !== "water") return;
    YF.VOCAB.push({ key: "i_" + id, cat: g.v === "s" ? "seasoning" : "ingredient", e: g.e, zh: g.zh, en: g.en, tl: g.tl });
  });
})();

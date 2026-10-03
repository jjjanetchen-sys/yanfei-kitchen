/* 介面文字、標籤、單位。格式：[中文, English, Tagalog] */
window.YF = window.YF || {};

YF.UI = {
  appName: ["燕飛食光", "Yanfei Kitchen", "Kusina ni Yanfei"],
  appSub: ["台式家常菜 · 中／英／Tagalog 三語食譜", "Taiwanese home cooking in 3 languages", "Lutong-bahay na Taiwanese sa 3 wika"],
  home: ["首頁", "Home", "Bahay"],
  back: ["返回", "Back", "Bumalik"],
  today: ["今日菜單", "Today's Menu", "Menu Ngayon"],
  recipes: ["食譜", "Recipes", "Mga Recipe"],
  phrases: ["常用句", "Quick Phrases", "Mga Madalas na Sabihin"],
  vocab: ["詞彙卡", "Word Cards", "Mga Salita"],
  shop: ["採買清單", "Shopping List", "Listahan ng Bibilhin"],
  fridge: ["冰箱庫存", "My Fridge", "Laman ng Ref"],
  equip: ["家裡器具", "Kitchen Tools", "Mga Gamit sa Kusina"],
  feedback: ["奶奶回饋", "Grandma's Feedback", "Feedback kay Lola"],
  pick: ["今天煮什麼", "What to Cook", "Ano ang Lulutuin"],
  season: ["現在是", "Now is", "Ngayon ay"],
  searchPh: ["搜尋菜名…", "Search…", "Maghanap…"],
  all: ["全部", "All", "Lahat"],
  rice: ["電鍋", "Rice cooker", "Rice cooker"],
  stove: ["瓦斯爐", "Gas stove", "Kalan"],
  softOnly: ["很軟爛", "Very soft", "Napakalambot"],
  addMenu: ["加入菜單", "Add to menu", "Idagdag sa menu"],
  inMenu: ["已在菜單", "In menu", "Nasa menu na"],
  remove: ["移除", "Remove", "Alisin"],
  ingredients: ["食材", "Ingredients", "Mga Sangkap"],
  steps: ["步驟", "Steps", "Mga Hakbang"],
  secret: ["燕飛食光秘訣", "Yanfei's Secret", "Sikreto ni Yanfei"],
  reminders: ["小提醒", "Reminders", "Paalala"],
  forGrandma: ["給奶奶", "For Grandma", "Para kay Lola"],
  softness: ["軟爛程度", "Softness", "Lambot"],
  cutting: ["切法", "Cutting", "Paghiwa"],
  lowSalt: ["少鹽", "Low salt", "Kaunting asin"],
  lowSaltTip: ["鹽最後再加，先加一半", "Add salt last. Start with half.", "Magdagdag ng asin sa huli. Kalahati muna."],
  outerPot: ["外鍋", "Outer pot", "Outer pot"],
  cupsWater: ["杯水", "cup(s) of water", "tasa ng tubig"],
  stoveNA: ["用瓦斯爐", "Use the gas stove", "Gamitin ang kalan"],
  notSure: ["我不確定", "I'm not sure", "Hindi ako sigurado"],
  notSureMsg: ["傳 LINE 問媽媽", "Ask Mom on LINE", "Magtanong kay Mama sa LINE"],
  timer: ["計時", "Timer", "Timer"],
  timeUp: ["時間到了！", "Time is up!", "Tapos na ang oras!"],
  stop: ["停止", "Stop", "Itigil"],
  minutes: ["分鐘", "min", "minuto"],
  play: ["播放", "Play", "I-play"],
  tw: ["台語", "Taiwanese", "Taiwanese"],
  twNone: ["這句還沒有台語錄音", "No Taiwanese recording yet", "Wala pang Taiwanese na recording"],
  noVoice: ["這支手機沒有 Tagalog 語音，請改用文字", "This phone has no Tagalog voice. Please read the text.", "Walang Tagalog na boses ang teleponong ito. Basahin ang teksto."],
  showBig: ["放大給對方看", "Show full screen", "Ipakita nang malaki"],
  tbc: ["待媽媽確認", "Waiting for Mom to confirm", "Hihintayin pa ang kumpirmasyon ni Mama"],
  confirmed: ["媽媽已確認", "Confirmed by Mom", "Kumpirmado ni Mama"],

  menuEmpty: ["今天還沒有選菜", "No dishes chosen yet", "Wala pang napiling ulam"],
  menuAdd: ["去選菜", "Choose dishes", "Pumili ng ulam"],
  menuShare: ["用 LINE 傳給看護", "Send to caregiver on LINE", "Ipadala sa caregiver sa LINE"],
  copyLink: ["複製連結", "Copy link", "Kopyahin ang link"],
  copied: ["已複製", "Copied", "Nakopya na"],
  clear: ["清空菜單", "Clear menu", "Burahin ang menu"],
  menuLoaded: ["已收到今天的菜單", "Today's menu received", "Natanggap na ang menu ngayon"],
  menuAsk: ["要換成這份菜單嗎？", "Use this menu?", "Gamitin ang menu na ito?"],
  menuOld: ["這不是今天的菜單，日期是舊的", "This menu is not for today. The date is old.", "Hindi ito ang menu ngayon. Luma ang petsa."],
  menuReplace: ["目前的菜單會被換掉", "Your current menu will be replaced", "Mapapalitan ang kasalukuyang menu"],
  menuYes: ["換成這份", "Use this menu", "Gamitin ito"],
  menuNo: ["不要", "No, keep mine", "Huwag"],
  menuDate: ["菜單日期", "Menu date", "Petsa ng menu"],
  cookNow: ["開始做", "Start cooking", "Simulan ang pagluto"],

  shopEmpty: ["先去選菜單，這裡就會出現要買的東西", "Choose a menu first. The shopping list will appear here.", "Pumili muna ng menu. Lalabas dito ang bibilhin."],
  haveInFridge: ["冰箱已有", "Already in fridge", "Nasa ref na"],
  skipFridge: ["扣掉冰箱已有的", "Skip what's in the fridge", "Huwag isama ang nasa ref"],
  fridgeHint: ["點一下，標示家裡現在有的食材", "Tap to mark what you have at home", "I-tap ang mga sangkap na nasa bahay"],
  canMake: ["用冰箱食材可以做", "You can make these", "Maaaring lutuin ito"],
  missing: ["還缺", "Missing", "Kulang"],
  pantryNote: ["油鹽醬油等調味料不列入計算", "Oil, salt and sauces are not counted", "Hindi isinama ang mantika, asin at sarsa"],

  ateAll: ["吃光了", "Finished it", "Naubos"],
  ateHalf: ["剩一半", "Half left", "Kalahati ang natira"],
  ateNone: ["不愛吃", "Didn't like it", "Hindi nagustuhan"],
  fbToday: ["今天", "Today", "Ngayon"],
  fbHistory: ["大家的口碑", "How dishes did", "Resulta ng mga ulam"],
  fbNone: ["還沒有記錄", "No records yet", "Wala pang record"],
  fbShare: ["用 LINE 回報給媽媽", "Report to Mom on LINE", "Iulat kay Mama sa LINE"],
  fbSaved: ["已記下", "Saved", "Nai-save na"],
  fbHint: ["一天點一下就好", "One tap a day is enough", "Isang tap lang bawat araw"],
  fbMerged: ["已合併回饋記錄", "Feedback merged", "Naisama na ang feedback"],

  pickWhy: ["為什麼推薦", "Why", "Bakit"],
  whySeason: ["現在是產季", "In season now", "Nasa panahon ngayon"],
  whyFridge: ["冰箱食材夠", "You have the ingredients", "Kumpleto ang sangkap"],
  whyLove: ["奶奶愛吃", "Grandma loves it", "Paborito ni Lola"],
  whySoft: ["很軟爛，好入口", "Very soft and easy to eat", "Napakalambot at madaling kainin"],
  whyNew: ["最近沒吃過", "Not cooked lately", "Matagal nang hindi niluto"],
  whyQuick: ["快手", "Quick to make", "Mabilis lutuin"],

  equipTbc: ["這一頁的內容是範例，請媽媽確認後再修改 data/equipment.js", "This page is an example. Mom should confirm it (edit data/equipment.js).", "Halimbawa lang ang pahinang ito. Kumpirmahin ni Mama (i-edit ang data/equipment.js)."],
  installTip: ["小技巧：把這個網頁「加到主畫面」，廚房沒網路也能開", "Tip: add this page to your Home Screen. It works offline.", "Tip: idagdag ito sa Home Screen. Gumagana kahit walang internet."],
  langOnly: ["只看一種語言", "One language only", "Isang wika lang"],
  langAll: ["顯示三種語言", "Show 3 languages", "Ipakita ang 3 wika"],
  showTbc: ["待確認的菜", "Not confirmed yet", "Hindi pa kumpirmado"],
  tbcBanner: ["這道菜的做法還沒經過媽媽確認，水量和時間可能要調整。", "Mom has not confirmed this recipe yet. The water and time may need adjusting.", "Hindi pa ito nakukumpirma ni Mama. Maaaring kailangang ayusin ang tubig at oras."],
  noResult: ["找不到", "Nothing found", "Walang nakita"]
};

YF.SEASONS = {
  spring: { zh: "春", en: "Spring", tl: "Tagsibol", e: "🌸" },
  summer: { zh: "夏", en: "Summer", tl: "Tag-init", e: "☀️" },
  autumn: { zh: "秋", en: "Autumn", tl: "Taglagas", e: "🍂" },
  winter: { zh: "冬", en: "Winter", tl: "Taglamig", e: "❄️" }
};
YF.SEASON_BY_ZH = { "春": "spring", "夏": "summer", "秋": "autumn", "冬": "winter" };

YF.TAGS = {
  light:   { zh: "清爽", en: "Light", tl: "Magaan" },
  tonic:   { zh: "進補", en: "Nourishing", tl: "Pampalakas" },
  quick:   { zh: "快手", en: "Quick", tl: "Mabilis" },
  kids:    { zh: "小孩愛吃", en: "Kid-friendly", tl: "Gusto ng bata" },
  rice:    { zh: "下飯", en: "Good with rice", tl: "Bagay sa kanin" },
  lowoil:  { zh: "低油", en: "Low oil", tl: "Kaunting mantika" }
};

YF.CATS = {
  soup:    { zh: "湯品", en: "Soup", tl: "Sabaw" },
  meat:    { zh: "肉類", en: "Meat", tl: "Karne" },
  veg:     { zh: "青菜", en: "Vegetables", tl: "Gulay" },
  egg:     { zh: "蒸蛋", en: "Egg", tl: "Itlog" },
  seafood: { zh: "海鮮", en: "Seafood", tl: "Pagkaing-dagat" },
  rice:    { zh: "飯類", en: "Rice", tl: "Kanin" },
  dessert: { zh: "甜品", en: "Dessert", tl: "Panghimagas" }
};

/* 超市區域（採買清單依此分類） */
YF.AREAS = {
  produce: { zh: "蔬果區", en: "Produce", tl: "Gulay at Prutas", e: "🥬" },
  meat:    { zh: "肉品區", en: "Meat", tl: "Karne", e: "🥩" },
  seafood: { zh: "海鮮區", en: "Seafood", tl: "Pagkaing-dagat", e: "🐟" },
  egg:     { zh: "蛋類（冷藏）", en: "Eggs", tl: "Itlog", e: "🥚" },
  dry:     { zh: "乾貨・米麵區", en: "Dry goods and rice", tl: "Tuyong paninda at bigas", e: "🌾" },
  sauce:   { zh: "調味料・油", en: "Sauces and oil", tl: "Pampalasa at mantika", e: "🧂" }
};

/* 單位。zh 是中文量詞，en/tl 是對應說法 */
YF.UNITS = {
  g:       { zh: "公克", en: "g", tl: "g" },
  ml:      { zh: "毫升", en: "ml", tl: "ml" },
  tbsp:    { zh: "大匙", en: "tbsp", tl: "kutsara" },
  tsp:     { zh: "小匙", en: "tsp", tl: "kutsarita" },
  ricecup: { zh: "米杯", en: "rice cup", tl: "rice cup" },
  ke:      { zh: "顆", en: "pc", tl: "piraso" },
  tiao:    { zh: "條", en: "pc", tl: "piraso" },
  shou:    { zh: "隻", en: "pc", tl: "piraso" },
  duo:     { zh: "朵", en: "pc", tl: "piraso" },
  ban:     { zh: "瓣", en: "clove", tl: "butil" },
  pian:    { zh: "片", en: "slice", tl: "hiwa" },
  zhi:     { zh: "支", en: "stalk", tl: "piraso" },
  ba:      { zh: "把", en: "bunch", tl: "tali" },
  half:    { zh: "半隻", en: "half", tl: "kalahati" },
  kuai:    { zh: "塊", en: "piece", tl: "piraso" },
  pinch:   { zh: "小撮", en: "pinch", tl: "kurot" },
  handful: { zh: "小把", en: "small handful", tl: "isang dakot" },
  some:    { zh: "適量", en: "to taste", tl: "ayon sa lasa" },
  few:     { zh: "少許", en: "a little", tl: "kaunti" },
  drops:   { zh: "幾滴", en: "a few drops", tl: "ilang patak" }
};

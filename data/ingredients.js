/* 食材與調味料。
   v: i = 食材, s = 調味料（詞彙卡分類用）
   area: 採買區域；none = 不用買（例如水）
   pantry: true = 家裡常備，推薦菜色時不列入「缺少」計算 */
window.YF = window.YF || {};

const I = (e, zh, en, tl, area, v, pantry) => ({ e, zh, en, tl, area, v, pantry: !!pantry });

YF.ING = {
  greens:       I("🥬", "青菜（空心菜／青江菜／小白菜）", "Leafy greens (water spinach / bok choy)", "Madahong gulay (kangkong / pechay)", "produce", "i"),
  garlic:       I("🧄", "蒜頭", "Garlic", "Bawang", "produce", "i"),
  ginger:       I("🫚", "薑", "Ginger", "Luya", "produce", "i"),
  scallion:     I("🌿", "青蔥", "Scallion (spring onion)", "Sibuyas na mahaba", "produce", "i"),
  carrot:       I("🥕", "紅蘿蔔", "Carrot", "Karot", "produce", "i"),
  daikon:       I("🥕", "白蘿蔔", "Daikon (white radish)", "Labanos", "produce", "i"),
  winter_melon: I("🥒", "冬瓜", "Winter melon", "Kundol", "produce", "i"),
  bitter_melon: I("🥒", "苦瓜", "Bitter melon", "Ampalaya", "produce", "i"),
  pineapple:    I("🍍", "新鮮鳳梨", "Fresh pineapple", "Sariwang pinya", "produce", "i"),
  yam:          I("🍠", "山藥", "Chinese yam", "Chinese yam (shanyao)", "produce", "i"),
  pickled_cuke: I("🥒", "醃脆瓜（瓜仔）", "Pickled cucumber (gua zi)", "Atsarang pipino (gua zi)", "sauce", "i"),
  ferm_pine:    I("🍍", "蔭鳳梨（鳳梨豆醬）", "Fermented pineapple (salted pineapple)", "Fermented pineapple (inasnang pinya)", "sauce", "i"),

  chicken:      I("🍗", "雞肉（切塊）", "Chicken (cut up)", "Manok (hiniwa)", "meat", "i"),
  chicken_thigh:I("🍗", "雞腿肉", "Chicken thigh", "Hita ng manok", "meat", "i"),
  pork_rib:     I("🍖", "小排骨", "Pork ribs", "Tadyang ng baboy", "meat", "i"),
  ground_pork:  I("🥩", "豬絞肉（肥瘦比 3:7）", "Ground pork (30% fat)", "Giniling na baboy", "meat", "i"),
  lamb:         I("🐑", "羊肉塊（帶皮或羊排）", "Lamb pieces (with skin, or lamb ribs)", "Karne ng tupa", "meat", "i"),

  shrimp:       I("🦐", "白蝦", "Shrimp", "Hipon", "seafood", "i"),
  fish:         I("🐟", "鱸魚或鯛魚（或魚片）", "Sea bass or sea bream (or fish fillet)", "Isda (sea bass o sea bream, o fillet)", "seafood", "i"),

  egg:          I("🥚", "雞蛋", "Egg", "Itlog", "egg", "i"),

  rice:         I("🍚", "白米", "Rice", "Bigas", "dry", "i"),
  glass_noodle: I("🍜", "粉絲", "Glass noodles", "Sotanghon", "dry", "i"),
  mung_bean:    I("🫘", "綠豆", "Mung beans", "Munggo", "dry", "i"),
  shiitake:     I("🍄", "乾香菇", "Dried shiitake mushroom", "Tuyong shiitake", "dry", "i"),
  red_date:     I("🔴", "紅棗", "Red dates (jujube)", "Pulang jujube (red dates)", "dry", "i"),
  goji:         I("🔴", "枸杞", "Goji berries", "Goji berries", "dry", "i"),
  dang_gui:     I("🌿", "當歸", "Dang gui (angelica root)", "Dang gui (angelica root)", "dry", "i"),
  huang_qi:     I("🌿", "黃耆", "Huang qi (astragalus)", "Huang qi (astragalus)", "dry", "i"),

  oil:          I("🫒", "食用油", "Cooking oil", "Mantika", "sauce", "s", true),
  sesame_oil:   I("🫗", "香油（麻油）", "Sesame oil", "Mantika ng linga (sesame oil)", "sauce", "s", true),
  salt:         I("🧂", "鹽", "Salt", "Asin", "sauce", "s", true),
  soy:          I("🍶", "醬油", "Soy sauce", "Toyo", "sauce", "s", true),
  wine:         I("🍾", "米酒", "Rice cooking wine", "Rice wine (alak pangluto)", "sauce", "s", true),
  sugar:        I("🍬", "糖（白糖）", "Sugar", "Asukal", "sauce", "s", true),
  rock_sugar:   I("🍬", "冰糖或砂糖", "Rock sugar or white sugar", "Rock sugar o asukal", "sauce", "s", true),
  pepper:       I("⚪", "白胡椒粉", "White pepper", "Puting paminta", "sauce", "s", true),
  water:        I("💧", "水", "Water", "Tubig", "none", "i", true),
  warm_water:   I("💧", "溫水", "Warm water", "Maligamgam na tubig", "none", "i", true),
  hot_water:    I("💧", "熱水", "Hot water", "Mainit na tubig", "none", "i", true)
};

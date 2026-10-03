/* 食譜資料（來源：Notion「燕飛食光食譜」，共 13 道）
   新增菜色時，複製一個區塊，改 id 與內容即可。
   id 只能用英文小寫與底線；台語錄音檔會用到：audio/tw/<id>-s<步驟號>.m4a
   status: "ok" = 媽媽已確認；"tbc" = 待確認
   outer: 外鍋水量（杯），瓦斯爐菜色填 null
   步驟 t = 計時（分鐘）
   elder.soft: 1 一般、2 偏軟、3 很軟爛；elder.cut: mince 切碎、dice 切丁、small 切小塊
   ※ elder 欄位是依「奶奶食物不能太硬」整理的建議，請媽媽確認。 */
window.YF = window.YF || {};

const T = (zh, en, tl) => ({ zh, en, tl });
const S = (zh, en, tl, t) => ({ zh, en, tl, t });
const G = (id, n, u) => ({ id, n, u });

const CUT = {
  mince: T("切碎", "Minced", "Tinadtad"),
  dice:  T("切丁", "Diced", "Hiniwa nang maliliit na kuwadrado"),
  small: T("切小塊", "Small pieces", "Hiniwa nang maliliit")
};
YF.CUT = CUT;

YF.RECIPES = [
  /* ---------- 1 炒青菜 ---------- */
  {
    id: "stir_fried_greens", e: "🥬", cat: "veg", cooker: "stove", outer: null, status: "ok",
    seasons: ["春", "夏", "秋", "冬"], tags: ["quick", "light"],
    zh: "炒青菜", en: "Stir-fried Leafy Greens", tl: "Ginisang Gulay na Madahon",
    secret: T("調味、控制水分、悶蒸，是炒出好吃青菜的關鍵。",
              "Seasoning, controlling the water, and steaming are the keys to good greens.",
              "Ang timpla, tamang tubig, at pagpapasingaw ang susi sa masarap na gulay."),
    elder: { soft: 2, cut: "small", note: T("菜梗切短一點，多悶一下讓菜變軟。", "Cut the stems shorter. Steam a little longer so it is soft.", "Paikliin ang tangkay. Pasingawan nang kaunti pa para lumambot.") },
    ing: [G("greens", 1, "ba"), G("garlic", 2, "ban"), G("oil", 1, "tbsp"), G("hot_water", 50, "ml"), G("salt", null, "some")],
    steps: [
      S("洗青菜。", "Wash the greens.", "Hugasan ang gulay."),
      S("切成 4 到 6 公分的段。", "Cut into 4–6 cm pieces.", "Hiwain nang 4–6 cm."),
      S("菜梗和菜葉分開放。", "Keep the stems and leaves apart.", "Ihiwalay ang tangkay sa dahon."),
      S("蒜頭拍碎，切成末。", "Smash the garlic and mince it.", "Dikdikin ang bawang at tadtarin."),
      S("鍋子燒熱，倒入 1 大匙油。", "Heat the pan. Add 1 tbsp oil.", "Initin ang kawali. Ilagay ang 1 kutsarang mantika."),
      S("放蒜末，用小火炒香。不要炒焦。", "Add the garlic. Fry on low heat until fragrant. Do not burn it.", "Ilagay ang bawang. Igisa sa mahinang apoy hanggang bumango. Huwag hayaang masunog."),
      S("先放菜梗，翻炒幾下。", "Add the stems first. Stir-fry a few times.", "Ilagay muna ang tangkay. Igisa nang ilang beses."),
      S("放菜葉，馬上加 50 毫升熱水。", "Add the leaves. Pour in 50 ml hot water right away.", "Ilagay ang dahon. Agad na ibuhos ang 50 ml na mainit na tubig."),
      S("用大火炒 1 到 2 分鐘，炒到菜葉變軟。", "Stir-fry on high heat for 1–2 minutes until the leaves are soft.", "Igisa sa malakas na apoy nang 1–2 minuto hanggang lumambot ang dahon.", 2),
      S("加鹽拌勻。", "Add salt and mix.", "Lagyan ng asin at haluin."),
      S("關火，馬上盛盤。", "Turn off the heat. Serve right away.", "Patayin ang apoy. Ihain agad.")
    ],
    warn: []
  },

  /* ---------- 2 水蒸蛋 ---------- */
  {
    id: "steamed_egg", e: "🥚", cat: "egg", cooker: "rice", outer: 1, status: "tbc",
    outerNote: T("鍋蓋夾一根筷子留縫", "Put a chopstick under the lid", "Maglagay ng chopstick sa ilalim ng takip"),
    seasons: ["春", "夏", "秋", "冬"], tags: ["quick", "kids", "lowoil"],
    zh: "水蒸蛋", en: "Steamed Egg Custard", tl: "Pinasingawang Itlog",
    secret: T("蛋和水約 1 比 2，蛋液會滑嫩。蛋液要過篩，鍋蓋夾筷子，才不會蒸出小洞。",
              "Use about 1 part egg to 2 parts water for a smooth custard. Strain the egg and vent the lid with a chopstick so there are no holes.",
              "Mga 1 itlog sa 2 tubig para malambot. Salain ang itlog at lagyan ng chopstick ang takip para walang butas."),
    elder: { soft: 3, cut: null, note: T("本來就很軟，很適合奶奶。鹽只放一小撮。", "Already very soft. Good for Grandma. Use only a pinch of salt.", "Napakalambot na. Bagay kay Lola. Isang kurot lang na asin.") },
    ing: [G("egg", 3, "ke"), G("warm_water", 300, "ml"), G("salt", 1, "pinch"), G("sesame_oil", null, "drops"), G("scallion", null, "few")],
    steps: [
      S("雞蛋打散。", "Beat the eggs.", "Batiin ang itlog."),
      S("加入 300 毫升溫水和 1 小撮鹽。", "Add 300 ml warm water and a pinch of salt.", "Ilagay ang 300 ml na maligamgam na tubig at isang kurot na asin."),
      S("輕輕攪勻。不要打出泡泡。", "Stir gently. Do not make bubbles.", "Haluin nang dahan-dahan. Huwag gumawa ng bula."),
      S("用濾網把蛋液過篩到深盤。", "Pour the egg through a strainer into a deep plate.", "Salain ang itlog sa malalim na plato."),
      S("用湯匙舀掉表面的泡泡。", "Skim off the bubbles with a spoon.", "Alisin ang bula sa ibabaw gamit ang kutsara."),
      S("盤子蓋上小盤或耐熱保鮮膜。", "Cover the plate with a small plate or heat-safe wrap.", "Takpan ang plato ng maliit na plato o heat-safe na plastic wrap."),
      S("外鍋倒 1 杯水，放入蛋盤。", "Pour 1 cup of water in the outer pot. Put the plate in.", "Ibuhos ang 1 tasang tubig sa outer pot. Ilagay ang plato."),
      S("鍋蓋夾一根筷子，留一點縫。", "Put a chopstick between the pot and the lid.", "Maglagay ng chopstick sa pagitan ng kaldero at takip."),
      S("按下開關。", "Press the switch.", "Pindutin ang switch."),
      S("開關跳起後，輕輕搖一下盤子。", "When the switch pops up, gently shake the plate.", "Kapag tumalon ang switch, dahan-dahang alugin ang plato."),
      S("中間還是水水的，外鍋再加半杯水續蒸。", "If the center is still watery, add 1/2 cup water to the outer pot and steam again.", "Kung malabnaw pa ang gitna, magdagdag ng 1/2 tasang tubig sa outer pot at pasingawan ulit."),
      S("蓋著悶 5 分鐘。", "Leave it covered for 5 minutes.", "Hayaang nakatakip nang 5 minuto.", 5),
      S("淋幾滴香油，撒上蔥花。", "Add a few drops of sesame oil and sprinkle scallion.", "Magpatak ng sesame oil at magwisik ng hiniwang sibuyas na mahaba.")
    ],
    warn: [T("蒸好的蛋很燙，端的時候要戴隔熱手套。", "The egg is very hot. Wear heat-resistant gloves.", "Napakainit ng itlog. Magsuot ng guwantes na hindi nakakapaso.")]
  },

  /* ---------- 3 鳳梨苦瓜雞 ---------- */
  {
    id: "pineapple_bitter_melon_chicken", e: "🍍", cat: "soup", cooker: "rice", outer: 1.5, status: "ok",
    seasons: ["夏", "秋"], tags: ["light", "rice"],
    zh: "鳳梨苦瓜雞", en: "Chicken Soup with Bitter Melon and Fermented Pineapple", tl: "Sabaw ng Manok na may Ampalaya at Fermented Pineapple",
    secret: T("先把苦瓜刮乾淨去苦味，再把雞肉燉到香軟回甘。",
              "Scrape the bitter melon clean to remove bitterness, then stew the chicken until soft.",
              "Kayurin nang malinis ang ampalaya para mawala ang pait, at lutuin ang manok hanggang lumambot."),
    elder: { soft: 3, cut: "small", note: T("苦瓜切薄一點、多悶一下。雞骨頭要挑掉再給奶奶。", "Slice the bitter melon thinner and let it steam longer. Remove chicken bones before serving Grandma.", "Hiwain nang manipis ang ampalaya at pasingawan nang matagal. Alisin ang buto ng manok bago ihain kay Lola.") },
    ing: [G("chicken", 1, "half"), G("bitter_melon", 1, "tiao"), G("ferm_pine", 150, "g"), G("pineapple", 120, "g"), G("ginger", 4, "pian"), G("water", 1400, "ml"), G("wine", 1, "tbsp"), G("salt", null, "some")],
    steps: [
      S("苦瓜對切。", "Cut the bitter melon in half lengthwise.", "Hatiin nang pahaba ang ampalaya."),
      S("用湯匙刮掉籽和白色內膜。要刮乾淨。", "Scrape out the seeds and white pith with a spoon. Scrape it clean.", "Kayurin ang buto at puting laman sa loob gamit ang kutsara. Linisin nang mabuti."),
      S("苦瓜切成一口大小。", "Cut into bite-size pieces.", "Hiwain nang pang-isang subo."),
      S("雞肉放進冷水鍋，用中火煮滾。", "Put the chicken in a pot of cold water. Boil on medium heat.", "Ilagay ang manok sa palayok na may malamig na tubig. Pakuluan sa katamtamang apoy."),
      S("撈掉浮沫。", "Skim off the foam.", "Alisin ang bula."),
      S("撈出雞肉，沖洗乾淨。", "Take out the chicken and rinse it.", "Iahon ang manok at banlawan."),
      S("雞肉、苦瓜、薑片放進內鍋。", "Put the chicken, bitter melon and ginger in the inner pot.", "Ilagay sa inner pot ang manok, ampalaya at luya."),
      S("放蔭鳳梨（連醬汁）和鳳梨塊。", "Add the fermented pineapple (with the sauce) and pineapple pieces.", "Ilagay ang fermented pineapple (kasama ang sarsa) at hiwa ng pinya."),
      S("加水淹過食材。", "Add water to cover everything.", "Magdagdag ng tubig hanggang matakpan."),
      S("淋 1 大匙米酒。", "Add 1 tbsp rice wine.", "Ilagay ang 1 kutsarang rice wine."),
      S("外鍋倒 1.5 杯水，放入內鍋。", "Pour 1.5 cups of water in the outer pot. Put the inner pot in.", "Ibuhos ang 1.5 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後不要開蓋，再悶 15 到 20 分鐘。", "When the switch pops up, do not open the lid. Wait 15–20 more minutes.", "Kapag tumalon ang switch, huwag buksan ang takip. Maghintay pa ng 15–20 minuto.", 15),
      S("先喝一口湯。不夠鹹再少量加鹽。", "Taste the soup first. Add a little salt only if needed.", "Tikman muna ang sabaw. Magdagdag ng kaunting asin kung kulang.")
    ],
    warn: [T("蔭鳳梨已經有鹹味，通常不用再加鹽。", "The fermented pineapple is already salty. Usually no more salt is needed.", "Maalat na ang fermented pineapple. Kadalasan hindi na kailangan ng asin.")]
  },

  /* ---------- 4 山藥排骨湯 ---------- */
  {
    id: "yam_pork_rib_soup", e: "🍠", cat: "soup", cooker: "rice", outer: 2, status: "tbc",
    seasons: ["秋", "冬"], tags: ["tonic"],
    zh: "山藥排骨湯", en: "Pork Rib and Chinese Yam Soup", tl: "Sabaw ng Baboy at Chinese Yam",
    secret: T("山藥切厚塊（約 3 公分），才不會煮到化掉。處理山藥時戴手套，手比較不會癢。",
              "Cut the yam into thick 3 cm chunks so it does not fall apart. Wear gloves because yam makes hands itchy.",
              "Hiwain ang yam nang makapal (mga 3 cm) para hindi madurog. Magsuot ng guwantes dahil nakakangati ang yam."),
    elder: { soft: 2, cut: "small", note: T("山藥可以切小一點。排骨的骨頭要挑掉，肉撕小塊。", "Cut the yam smaller. Remove the rib bones and tear the meat into small pieces.", "Mas liitan ang hiwa ng yam. Alisin ang buto ng tadyang at hatiin ang karne sa maliliit.") },
    ing: [G("pork_rib", 400, "g"), G("yam", 300, "g"), G("red_date", 6, "duo"), G("goji", 1, "tbsp"), G("ginger", 3, "pian"), G("wine", 1, "tbsp"), G("salt", null, "some")],
    steps: [
      S("排骨放進冷水鍋，煮滾。", "Put the ribs in a pot of cold water. Bring to a boil.", "Ilagay ang tadyang sa palayok na may malamig na tubig. Pakuluan."),
      S("撈出排骨，沖洗乾淨。", "Take out the ribs and rinse them.", "Iahon ang tadyang at banlawan."),
      S("戴上手套，把山藥削皮。", "Put on gloves. Peel the yam.", "Magsuot ng guwantes. Balatan ang yam."),
      S("山藥切成約 3 公分的厚塊。", "Cut the yam into thick 3 cm chunks.", "Hiwain ang yam sa makapal na 3 cm na piraso."),
      S("排骨、山藥、紅棗、薑片放進內鍋。", "Put the ribs, yam, red dates and ginger in the inner pot.", "Ilagay sa inner pot ang tadyang, yam, red dates at luya."),
      S("加水淹過食材。", "Add water to cover everything.", "Magdagdag ng tubig hanggang matakpan."),
      S("淋 1 大匙米酒。", "Add 1 tbsp rice wine.", "Ilagay ang 1 kutsarang rice wine."),
      S("外鍋倒 2 杯水，放入內鍋。", "Pour 2 cups of water in the outer pot. Put the inner pot in.", "Ibuhos ang 2 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，放入枸杞。", "When the switch pops up, add the goji berries.", "Kapag tumalon ang switch, ilagay ang goji berries."),
      S("蓋上鍋蓋，再悶 10 分鐘。", "Cover again. Wait 10 more minutes.", "Takpan ulit. Maghintay pa ng 10 minuto.", 10),
      S("打開，加鹽調味。", "Open the lid. Add salt to taste.", "Buksan ang takip. Lagyan ng asin ayon sa lasa.")
    ],
    warn: []
  },

  /* ---------- 5 瓜仔肉 ---------- */
  {
    id: "steamed_pork_patty", e: "🥩", cat: "meat", cooker: "rice", outer: 1, status: "tbc",
    outerNote: T("肉中心沒熟，再加半杯水續蒸", "If the center is not cooked, add 1/2 cup water and steam again", "Kung hilaw pa ang gitna, magdagdag ng 1/2 tasang tubig at pasingawan ulit"),
    seasons: ["春", "夏", "秋", "冬"], tags: ["rice", "quick", "kids"],
    zh: "瓜仔肉", en: "Steamed Pork Patty with Pickled Melon", tl: "Pinasingawang Giniling na Baboy na may Atsarang Pipino",
    secret: T("肉末往同一個方向攪拌到有黏性，蒸出來才有彈性。醃脆瓜已經很鹹，醬油放少一點。",
              "Stir the pork in one direction until sticky for a springy texture. The pickles are salty, so use less soy sauce.",
              "Haluin ang giniling sa iisang direksyon hanggang malagkit. Maalat na ang atsara, kaya konti lang ang toyo."),
    elder: { soft: 2, cut: "mince", note: T("絞肉本來就軟。醬油可以省略，因為瓜仔已經很鹹。", "Ground pork is already soft. Skip the soy sauce because the pickles are salty.", "Malambot na ang giniling. Puwedeng huwag nang maglagay ng toyo dahil maalat ang atsara.") },
    ing: [G("ground_pork", 300, "g"), G("pickled_cuke", 3, "tbsp"), G("soy", 1, "tsp"), G("wine", 1, "tsp"), G("pepper", null, "few"), G("ginger", 1, "tsp")],
    steps: [
      S("絞肉放進碗裡。", "Put the ground pork in a bowl.", "Ilagay ang giniling na baboy sa mangkok."),
      S("加 1 小匙醬油、1 小匙米酒。", "Add 1 tsp soy sauce and 1 tsp rice wine.", "Ilagay ang 1 kutsaritang toyo at 1 kutsaritang rice wine."),
      S("加少許白胡椒和 1 小匙薑末。", "Add a little white pepper and 1 tsp minced ginger.", "Ilagay ang kaunting puting paminta at 1 kutsaritang tinadtad na luya."),
      S("往同一個方向攪拌，拌到黏稠。", "Stir in one direction until sticky.", "Haluin sa iisang direksyon hanggang lumagkit."),
      S("加入 3 大匙醃脆瓜和 1 大匙瓜汁，拌勻。", "Add 3 tbsp pickled cucumber and 1 tbsp pickle juice. Mix.", "Ilagay ang 3 kutsarang atsarang pipino at 1 kutsarang katas nito. Haluin."),
      S("放進深盤，壓平。", "Put it in a deep plate. Press it flat.", "Ilagay sa malalim na plato. Idiin hanggang patag."),
      S("外鍋倒 1 杯水，放入盤子。", "Pour 1 cup of water in the outer pot. Put the plate in.", "Ibuhos ang 1 tasang tubig sa outer pot. Ilagay ang plato."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，用筷子戳最厚的地方。", "When the switch pops up, poke the thickest part with a chopstick.", "Kapag tumalon ang switch, tusukin ang pinakamakapal na bahagi gamit ang chopstick."),
      S("沒有粉紅色、肉汁清澈，才算熟。", "It is cooked only if there is no pink and the juice is clear.", "Luto na kung walang kulay rosas at malinaw ang katas."),
      S("還沒熟，外鍋加半杯水再蒸。", "If not cooked, add 1/2 cup water to the outer pot and steam again.", "Kung hilaw pa, magdagdag ng 1/2 tasang tubig sa outer pot at pasingawan ulit."),
      S("把肉汁一起淋在白飯上。", "Pour the meat juice over white rice.", "Ibuhos ang katas ng karne sa puting kanin.")
    ],
    warn: [T("絞肉一定要完全煮熟才能吃。", "Ground pork must be fully cooked before eating.", "Siguraduhing luto na luto ang giniling bago kainin.")]
  },

  /* ---------- 6 蘿蔔排骨湯 ---------- */
  {
    id: "daikon_pork_rib_soup", e: "🥕", cat: "soup", cooker: "rice", outer: 2, status: "tbc",
    outerNote: T("蘿蔔還硬，外鍋再加半杯水續蒸", "If the daikon is still hard, add 1/2 cup water and steam again", "Kung matigas pa ang labanos, magdagdag ng 1/2 tasang tubig at pasingawan ulit"),
    seasons: ["秋", "冬"], tags: ["light", "kids"],
    zh: "蘿蔔排骨湯", en: "Pork Rib and Daikon Soup", tl: "Sabaw ng Baboy at Labanos",
    secret: T("白蘿蔔皮下有一圈粗纖維，削皮要削深一點，湯會更清甜。排骨先汆燙，湯才會清。",
              "Peel the daikon deeper to remove the tough layer under the skin. Blanch the ribs first for a clear soup.",
              "Balatan nang malalim ang labanos para maalis ang matigas na hibla. Pakuluan muna ang tadyang para malinaw ang sabaw."),
    elder: { soft: 3, cut: "small", note: T("蘿蔔要用筷子一戳就破才夠軟。可以切小塊。", "The daikon is soft enough when a chopstick goes through easily. You can cut it smaller.", "Sapat na ang lambot kapag madaling tusukin ng chopstick. Puwedeng liitan ang hiwa.") },
    ing: [G("pork_rib", 400, "g"), G("daikon", 600, "g"), G("carrot", 0.5, "tiao"), G("ginger", 3, "pian"), G("wine", 1, "tbsp"), G("salt", 1, "tsp")],
    steps: [
      S("排骨放進冷水鍋，煮滾。", "Put the ribs in a pot of cold water. Bring to a boil.", "Ilagay ang tadyang sa palayok na may malamig na tubig. Pakuluan."),
      S("撈出排骨，沖洗乾淨。", "Take out the ribs and rinse them.", "Iahon ang tadyang at banlawan."),
      S("白蘿蔔削皮。要削深一點。", "Peel the daikon. Peel it deeper.", "Balatan ang labanos. Mas malalim ang balat."),
      S("蘿蔔和紅蘿蔔切成滾刀塊。", "Cut the daikon and carrot into chunks.", "Hiwain ang labanos at karot sa mga tipak."),
      S("排骨、蘿蔔、紅蘿蔔、薑片放進內鍋。", "Put the ribs, daikon, carrot and ginger in the inner pot.", "Ilagay sa inner pot ang tadyang, labanos, karot at luya."),
      S("加水淹過食材。水不要超過內鍋 8 分滿。", "Add water to cover. Do not fill past 80% of the inner pot.", "Magdagdag ng tubig hanggang matakpan. Huwag lalampas sa 80% ng inner pot."),
      S("淋 1 大匙米酒。", "Add 1 tbsp rice wine.", "Ilagay ang 1 kutsarang rice wine."),
      S("外鍋倒 2 杯水，放入內鍋。", "Pour 2 cups of water in the outer pot. Put the inner pot in.", "Ibuhos ang 2 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，悶 20 分鐘。", "When the switch pops up, wait 20 minutes.", "Kapag tumalon ang switch, maghintay ng 20 minuto.", 20),
      S("用筷子戳蘿蔔。", "Poke the daikon with a chopstick.", "Tusukin ang labanos gamit ang chopstick."),
      S("還很硬，外鍋加半杯水再蒸一次。", "If still hard, add 1/2 cup water to the outer pot and steam again.", "Kung matigas pa, magdagdag ng 1/2 tasang tubig sa outer pot at pasingawan ulit."),
      S("起鍋前加 1 小匙鹽調味。", "Before serving, add about 1 tsp salt.", "Bago ihain, lagyan ng mga 1 kutsaritang asin.")
    ],
    warn: []
  },

  /* ---------- 7 雞肉香菇炊飯 ---------- */
  {
    id: "chicken_mushroom_rice", e: "🍚", cat: "rice", cooker: "rice", outer: 1, status: "tbc",
    seasons: ["秋", "冬"], tags: ["rice", "quick"],
    zh: "雞肉香菇炊飯", en: "One-Pot Chicken and Mushroom Rice", tl: "Kanin na may Manok at Shiitake",
    secret: T("飯、肉、菜一起煮好，很適合不想開火的日子。用香菇水代替一部分水，飯會有香菇的鮮味。",
              "Rice, meat and vegetables cook together. Use the mushroom water for extra flavor.",
              "Sabay-sabay na iluluto ang kanin, karne at gulay. Gamitin ang tubig ng shiitake para mas malasa."),
    elder: { soft: 2, cut: "dice", note: T("雞肉丁和香菇絲切小一點。想要飯更軟，水可以多加一點點。", "Cut chicken and mushroom smaller. For softer rice, add a little more water.", "Liitan ang hiwa ng manok at shiitake. Para sa mas malambot na kanin, dagdagan nang kaunti ang tubig.") },
    ing: [G("rice", 2, "ricecup"), G("chicken_thigh", 200, "g"), G("shiitake", 4, "duo"), G("carrot", 0.33, "tiao"), G("water", 2, "ricecup"), G("soy", 2, "tbsp"), G("wine", 1, "tbsp"), G("pepper", null, "few")],
    steps: [
      S("乾香菇用水泡軟。香菇水留著。", "Soak the dried shiitake in water until soft. Keep the water.", "Ibabad ang tuyong shiitake hanggang lumambot. Itabi ang tubig."),
      S("香菇切絲。", "Slice the mushrooms into strips.", "Hiwain ang shiitake nang mahaba at manipis."),
      S("雞腿肉切成小丁。", "Cut the chicken thigh into small dice.", "Hiwain ang hita ng manok sa maliliit na kuwadrado."),
      S("雞肉加 1 大匙醬油、1 大匙米酒、少許白胡椒，拌勻。", "Mix the chicken with 1 tbsp soy sauce, 1 tbsp rice wine and a little pepper.", "Haluin ang manok sa 1 kutsarang toyo, 1 kutsarang rice wine at kaunting paminta."),
      S("醃 10 分鐘。", "Marinate for 10 minutes.", "Ibabad nang 10 minuto.", 10),
      S("紅蘿蔔切小丁。", "Cut the carrot into small dice.", "Hiwain ang karot sa maliliit na kuwadrado."),
      S("米洗淨，瀝乾，放進內鍋。", "Wash the rice. Drain it. Put it in the inner pot.", "Hugasan ang bigas. Patuluin. Ilagay sa inner pot."),
      S("加香菇水和清水，一共 2 米杯。", "Add the mushroom water and plain water, 2 rice cups in total.", "Ilagay ang tubig ng shiitake at tubig, 2 rice cup lahat."),
      S("加 1 大匙醬油，拌勻。", "Add 1 tbsp soy sauce. Mix.", "Ilagay ang 1 kutsarang toyo. Haluin."),
      S("雞肉、香菇、紅蘿蔔鋪在米上面。不要攪拌。", "Spread the chicken, mushroom and carrot on top. Do not stir.", "Ilatag sa ibabaw ng bigas ang manok, shiitake at karot. Huwag haluin."),
      S("外鍋倒 1 杯水，放入內鍋。", "Pour 1 cup of water in the outer pot. Put the inner pot in.", "Ibuhos ang 1 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，悶 10 分鐘。", "When the switch pops up, wait 10 minutes.", "Kapag tumalon ang switch, maghintay ng 10 minuto.", 10),
      S("打開，把飯和料拌勻。", "Open the lid. Mix the rice and toppings.", "Buksan ang takip. Haluin ang kanin at sahog."),
      S("確認雞肉全熟。", "Check that the chicken is fully cooked.", "Tiyaking luto na luto ang manok.")
    ],
    warn: [T("雞肉一定要完全煮熟。", "Chicken must be fully cooked.", "Siguraduhing luto na luto ang manok.")]
  },

  /* ---------- 8 蒜蓉粉絲蒸蝦 ---------- */
  {
    id: "garlic_shrimp_glass_noodles", e: "🦐", cat: "seafood", cooker: "rice", outer: 1, status: "tbc",
    seasons: ["春", "夏", "秋"], tags: ["quick", "rice"],
    zh: "蒜蓉粉絲蒸蝦", en: "Steamed Shrimp with Garlic and Glass Noodles", tl: "Pinasingawang Hipon na may Bawang at Sotanghon",
    secret: T("粉絲先泡軟墊在盤底，會吸飽蝦汁和蒜香。海鮮不能蒸太久，外鍋 1 杯水剛剛好。",
              "Soak the glass noodles and lay them under the shrimp so they absorb the juices. Do not over-steam seafood. 1 cup in the outer pot is right.",
              "Ibabad ang sotanghon at ilatag sa ilalim ng hipon para sumipsip ng katas. Huwag sobrang pasingawan. 1 tasa sa outer pot ay sakto."),
    elder: { soft: 2, cut: "dice", note: T("蝦子可以去殼切丁，比較好咬。", "Peel the shrimp and cut into pieces so it is easy to chew.", "Balatan at hiwain ang hipon para madaling nguyain.") },
    ing: [G("shrimp", 10, "shou"), G("glass_noodle", 1, "handful"), G("garlic", 4, "ban"), G("soy", 1.5, "tbsp"), G("wine", 1, "tbsp"), G("oil", 1, "tbsp"), G("scallion", null, "few")],
    steps: [
      S("粉絲用溫水泡軟。", "Soak the glass noodles in warm water until soft.", "Ibabad ang sotanghon sa maligamgam na tubig hanggang lumambot."),
      S("把粉絲剪短。", "Cut the noodles shorter with scissors.", "Gupitin ang sotanghon para umikli."),
      S("剪掉蝦子的鬚和腳。", "Snip off the shrimp whiskers and legs.", "Gupitin ang bigote at paa ng hipon."),
      S("蝦背劃一刀，去掉腸泥。", "Cut along the back and remove the vein.", "Hiwaan ang likod at alisin ang bituka."),
      S("蒜頭切成末。", "Mince the garlic.", "Tadtarin ang bawang."),
      S("蒜末加 1.5 大匙醬油、1 大匙米酒、1 大匙油，拌成蒜蓉醬。", "Mix the garlic with 1.5 tbsp soy sauce, 1 tbsp rice wine and 1 tbsp oil.", "Haluin ang bawang sa 1.5 kutsarang toyo, 1 kutsarang rice wine at 1 kutsarang mantika."),
      S("盤底鋪上粉絲。", "Spread the noodles on the plate.", "Ilatag ang sotanghon sa plato."),
      S("蝦子排在粉絲上。", "Arrange the shrimp on top.", "Ayusin ang hipon sa ibabaw."),
      S("淋上蒜蓉醬。", "Pour the garlic sauce over.", "Ibuhos ang sarsang bawang."),
      S("外鍋倒 1 杯水，放入盤子。", "Pour 1 cup of water in the outer pot. Put the plate in.", "Ibuhos ang 1 tasang tubig sa outer pot. Ilagay ang plato."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，看蝦子是不是全部變紅。", "When the switch pops up, check that all shrimp are red.", "Kapag tumalon ang switch, tingnan kung pula na ang lahat ng hipon."),
      S("撒上蔥花。", "Sprinkle scallion on top.", "Magwisik ng hiniwang sibuyas na mahaba.")
    ],
    warn: [T("對海鮮過敏的人不要吃。", "Do not eat if allergic to seafood.", "Huwag kainin kung allergic sa seafood.")]
  },

  /* ---------- 9 冬瓜排骨湯 ---------- */
  {
    id: "winter_melon_pork_rib_soup", e: "🥒", cat: "soup", cooker: "rice", outer: 2, status: "tbc",
    seasons: ["夏"], tags: ["light", "kids"],
    zh: "冬瓜排骨湯", en: "Pork Rib and Winter Melon Soup", tl: "Sabaw ng Baboy at Kundol",
    secret: T("冬瓜切大塊一點，燉出來才不會化成泥。排骨先汆燙去血水，湯比較清甜。",
              "Cut the winter melon into big chunks so it does not turn to mush. Blanch the ribs first for a clear, sweet soup.",
              "Hiwain nang malalaki ang kundol para hindi madurog. Pakuluan muna ang tadyang para malinaw at matamis ang sabaw."),
    elder: { soft: 3, cut: "small", note: T("冬瓜本來就很軟，很適合奶奶。排骨的骨頭要挑掉。", "Winter melon is naturally soft. Good for Grandma. Remove the rib bones.", "Likas na malambot ang kundol. Bagay kay Lola. Alisin ang buto ng tadyang.") },
    ing: [G("pork_rib", 400, "g"), G("winter_melon", 500, "g"), G("ginger", 3, "pian"), G("wine", 1, "tbsp"), G("salt", null, "some")],
    steps: [
      S("排骨放進冷水鍋，煮滾。", "Put the ribs in a pot of cold water. Bring to a boil.", "Ilagay ang tadyang sa palayok na may malamig na tubig. Pakuluan."),
      S("撈出排骨，沖洗乾淨。", "Take out the ribs and rinse them.", "Iahon ang tadyang at banlawan."),
      S("冬瓜去皮，去籽。", "Peel the winter melon and remove the seeds.", "Balatan ang kundol at alisin ang buto."),
      S("冬瓜切成 3 到 4 公分的塊。", "Cut into 3–4 cm chunks.", "Hiwain sa 3–4 cm na piraso."),
      S("排骨、薑片、冬瓜放進內鍋。", "Put the ribs, ginger and winter melon in the inner pot.", "Ilagay sa inner pot ang tadyang, luya at kundol."),
      S("加水淹過食材。水不要超過內鍋 8 分滿。", "Add water to cover. Do not fill past 80% of the inner pot.", "Magdagdag ng tubig hanggang matakpan. Huwag lalampas sa 80% ng inner pot."),
      S("淋 1 大匙米酒。", "Add 1 tbsp rice wine.", "Ilagay ang 1 kutsarang rice wine."),
      S("外鍋倒 2 杯水，放入內鍋。", "Pour 2 cups of water in the outer pot. Put the inner pot in.", "Ibuhos ang 2 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，悶 15 分鐘。", "When the switch pops up, wait 15 minutes.", "Kapag tumalon ang switch, maghintay ng 15 minuto.", 15),
      S("打開，加鹽調味。", "Open the lid. Add salt to taste.", "Buksan ang takip. Lagyan ng asin ayon sa lasa.")
    ],
    warn: []
  },

  /* ---------- 10 蔥薑蒸魚 ---------- */
  {
    id: "steamed_fish_scallion_ginger", e: "🐟", cat: "seafood", cooker: "rice", outer: 1.5, status: "tbc",
    outerNote: T("整條魚（約 500 公克）1.5 杯；魚片或小魚 1 杯", "Whole fish (about 500 g): 1.5 cups. Fillet or small fish: 1 cup", "Buong isda (mga 500 g): 1.5 tasa. Fillet o maliit na isda: 1 tasa"),
    seasons: ["春", "夏", "秋", "冬"], tags: ["light", "lowoil", "quick"],
    zh: "蔥薑蒸魚", en: "Steamed Fish with Scallion and Ginger", tl: "Pinasingawang Isda na may Luya at Sibuyas na Mahaba",
    secret: T("魚底下墊薑片，可以去腥，魚也不會黏盤。蒸好後倒掉盤中的水，再淋醬油和熱油，味道比較乾淨。",
              "Put ginger slices under the fish to remove fishy smell and stop sticking. Pour off the juice after steaming, then add soy sauce and hot oil.",
              "Maglagay ng hiwa ng luya sa ilalim ng isda para mawala ang lansa at hindi dumikit. Itapon ang katas pagkatapos, saka ilagay ang toyo at mainit na mantika."),
    elder: { soft: 3, cut: null, note: T("蒸魚本來就很軟。一定要先把魚刺挑乾淨再給奶奶。", "Steamed fish is already soft. Always remove all fish bones before serving Grandma.", "Malambot na ang pinasingawang isda. Laging alisin ang lahat ng tinik bago ihain kay Lola.") },
    ing: [G("fish", 500, "g"), G("ginger", 1, "kuai"), G("scallion", 2, "zhi"), G("wine", 1, "tbsp"), G("soy", 2, "tbsp"), G("water", 1, "tbsp"), G("sugar", 1, "pinch"), G("oil", 1, "tbsp")],
    steps: [
      S("魚洗乾淨，用紙巾擦乾。", "Wash the fish and pat it dry.", "Hugasan ang isda at patuyuin gamit ang tissue."),
      S("魚身抹少許米酒。", "Rub a little rice wine on the fish.", "Pahiran ng kaunting rice wine ang isda."),
      S("薑一半切片，一半切絲。", "Slice half of the ginger. Shred the other half.", "Hiwain ang kalahati ng luya nang pabilog. Hiwain ang kalahati nang hibla."),
      S("盤底鋪上薑片。", "Lay the ginger slices on the plate.", "Ilatag ang hiwa ng luya sa plato."),
      S("魚放在薑片上，上面放薑絲。", "Put the fish on top, then the shredded ginger.", "Ilagay ang isda sa ibabaw, at ang hibla ng luya sa ibabaw nito."),
      S("外鍋倒水：整條魚 1.5 杯，魚片 1 杯。", "Pour water in the outer pot: 1.5 cups for a whole fish, 1 cup for fillets.", "Ibuhos ang tubig sa outer pot: 1.5 tasa para sa buong isda, 1 tasa para sa fillet."),
      S("放入魚盤，蓋上鍋蓋。", "Put the plate in and cover the pot.", "Ilagay ang plato at takpan ang kaldero."),
      S("按下開關。", "Press the switch.", "Pindutin ang switch."),
      S("開關跳起後，悶 3 分鐘。", "When the switch pops up, wait 3 minutes.", "Kapag tumalon ang switch, maghintay ng 3 minuto.", 3),
      S("用筷子戳魚背最厚的地方，確認熟透。", "Poke the thickest part of the back to check it is cooked.", "Tusukin ang pinakamakapal na bahagi ng likod para tiyaking luto."),
      S("倒掉盤中的湯汁。", "Pour off the juice on the plate.", "Itapon ang katas sa plato."),
      S("拿掉薑絲，放上蔥絲。", "Remove the old ginger shreds. Put the scallion on top.", "Alisin ang lumang hibla ng luya. Ilagay ang hiwa ng sibuyas na mahaba sa ibabaw."),
      S("2 大匙醬油、1 大匙水、1 小撮糖拌勻，淋在魚上。", "Mix 2 tbsp soy sauce, 1 tbsp water and a pinch of sugar. Pour over the fish.", "Paghaluin ang 2 kutsarang toyo, 1 kutsarang tubig at isang kurot na asukal. Ibuhos sa isda."),
      S("1 大匙油燒熱，淋在蔥絲上。", "Heat 1 tbsp oil. Pour it over the scallion.", "Initin ang 1 kutsarang mantika. Ibuhos sa sibuyas na mahaba.")
    ],
    warn: [T("魚一定要完全煮熟。", "Fish must be fully cooked.", "Siguraduhing luto na luto ang isda."),
           T("小心魚刺。給長輩吃之前先挑掉。", "Watch out for fish bones. Remove them before serving elders.", "Mag-ingat sa tinik. Alisin bago ihain sa matatanda.")]
  },

  /* ---------- 11 清燉羊肉湯 ---------- */
  {
    id: "clear_lamb_soup", e: "🐑", cat: "soup", cooker: "stove", outer: null, status: "ok",
    seasons: ["秋", "冬"], tags: ["tonic"],
    zh: "清燉羊肉湯", en: "Clear Braised Lamb Soup with Herbs", tl: "Malinaw na Sabaw ng Karneng Tupa",
    secret: T("羊肉從冷水開始加熱，血水才會慢慢逼出來，湯才清澈。白蘿蔔去羶、加清甜。起鍋前才淋米酒，香氣最好。",
              "Start the lamb in cold water so the blood comes out slowly and the soup stays clear. Daikon removes the gamey smell. Add rice wine at the end.",
              "Simulan ang karne sa malamig na tubig para lumabas ang dugo at maging malinaw ang sabaw. Inaalis ng labanos ang lansa. Ilagay ang rice wine sa huli."),
    elder: { soft: 2, cut: "small", note: T("羊肉切小塊，燉久一點到很軟。藥材不要太多。", "Cut the lamb small and stew until very soft. Do not use too many herbs.", "Hiwain nang maliliit ang karne at lutuin hanggang sobrang lambot. Huwag magdagdag ng sobrang herbs.") },
    ing: [G("lamb", 600, "g"), G("daikon", 1, "tiao"), G("water", 1500, "ml"), G("dang_gui", 1, "pian"), G("huang_qi", 5, "pian"), G("goji", 1, "tbsp"), G("red_date", 6, "duo"), G("ginger", 1, "kuai"), G("scallion", 2, "zhi"), G("wine", 2, "tbsp"), G("sesame_oil", null, "drops"), G("salt", null, "some")],
    steps: [
      S("羊肉洗淨，和幾片薑、蔥段一起放進冷水鍋。", "Wash the lamb. Put it in a pot of cold water with a few ginger slices and scallion pieces.", "Hugasan ang karne. Ilagay sa palayok na may malamig na tubig kasama ang ilang hiwa ng luya at sibuyas na mahaba."),
      S("用中火慢慢煮滾。", "Bring it slowly to a boil on medium heat.", "Dahan-dahang pakuluan sa katamtamang apoy."),
      S("煮到浮出灰色血沫，撈出羊肉。", "When gray foam rises, take out the lamb.", "Kapag may lumutang na kulay abong bula, iahon ang karne."),
      S("羊肉沖洗乾淨，瀝乾。", "Rinse the lamb and drain it.", "Banlawan ang karne at patuluin."),
      S("白蘿蔔去皮，切成滾刀塊。", "Peel the daikon. Cut into chunks.", "Balatan ang labanos. Hiwain sa mga tipak."),
      S("當歸、黃耆、紅棗、枸杞稍微沖水，瀝乾。", "Rinse the herbs, red dates and goji quickly. Drain.", "Banlawan nang mabilis ang mga herbs, red dates at goji. Patuluin."),
      S("湯鍋倒入 1500 毫升清水。", "Pour 1500 ml water into the soup pot.", "Ibuhos ang 1500 ml na tubig sa palayok."),
      S("放入羊肉、蘿蔔、薑片、當歸、黃耆、紅棗。", "Add the lamb, daikon, ginger, dang gui, huang qi and red dates.", "Ilagay ang karne, labanos, luya, dang gui, huang qi at red dates."),
      S("用大火煮滾。", "Bring to a boil on high heat.", "Pakuluan sa malakas na apoy."),
      S("轉小火，蓋上鍋蓋，微滾燉 50 到 60 分鐘。", "Turn to low heat. Cover. Simmer for 50–60 minutes.", "Hinaan ang apoy. Takpan. Hayaang kumulo nang mahina nang 50–60 minuto.", 50),
      S("起鍋前 5 分鐘，放入枸杞和 2 大匙米酒。", "5 minutes before serving, add the goji and 2 tbsp rice wine.", "5 minuto bago ihain, ilagay ang goji at 2 kutsarang rice wine.", 5),
      S("關火前加適量的鹽。", "Before turning off the heat, add salt to taste.", "Bago patayin ang apoy, lagyan ng asin ayon sa lasa."),
      S("淋幾滴香油。", "Add a few drops of sesame oil.", "Magpatak ng sesame oil.")
    ],
    warn: [T("含中藥材。有慢性病或正在吃藥的人，吃之前先問醫師。", "Contains Chinese herbs. People with chronic illness or on medicine should ask a doctor first.", "May Chinese herbs. Kung may malubhang sakit o umiinom ng gamot, magtanong muna sa doktor.")]
  },

  /* ---------- 12 香菇雞湯 ---------- */
  {
    id: "shiitake_chicken_soup", e: "🍄", cat: "soup", cooker: "rice", outer: 2, status: "tbc",
    seasons: ["秋", "冬"], tags: ["tonic", "kids"],
    zh: "香菇雞湯", en: "Chicken and Shiitake Mushroom Soup", tl: "Sabaw ng Manok na may Shiitake",
    secret: T("香菇泡軟的水不要倒，過濾後一起放進湯裡，鮮味最足。雞肉先汆燙，湯才會清澈沒有腥味。",
              "Keep the mushroom soaking water. Strain it and add it to the soup for the best flavor. Blanch the chicken first for a clear soup.",
              "Huwag itapon ang pinagbabaran ng shiitake. Salain at ilagay sa sabaw para mas malasa. Pakuluan muna ang manok para malinaw ang sabaw."),
    elder: { soft: 2, cut: "small", note: T("香菇剪小塊。雞骨頭要挑掉，雞肉撕小塊。", "Cut the mushrooms smaller. Remove chicken bones and shred the meat.", "Liitan ang hiwa ng shiitake. Alisin ang buto ng manok at hiwain ang karne.") },
    ing: [G("chicken", 600, "g"), G("shiitake", 9, "duo"), G("ginger", 4, "pian"), G("water", 800, "ml"), G("wine", 1, "tbsp"), G("salt", 1, "tsp")],
    steps: [
      S("乾香菇用冷水泡 30 分鐘。", "Soak the dried shiitake in cold water for 30 minutes.", "Ibabad ang tuyong shiitake sa malamig na tubig nang 30 minuto.", 30),
      S("香菇水過濾，留著。", "Strain the soaking water. Keep it.", "Salain ang pinagbabaran. Itabi."),
      S("剪掉香菇的蒂頭。", "Cut off the mushroom stems.", "Gupitin ang tangkay ng shiitake."),
      S("雞肉放進冷水鍋，煮滾。", "Put the chicken in a pot of cold water. Bring to a boil.", "Ilagay ang manok sa palayok na may malamig na tubig. Pakuluan."),
      S("撈出雞肉，沖洗乾淨。", "Take out the chicken and rinse it.", "Iahon ang manok at banlawan."),
      S("雞肉、香菇、薑片放進內鍋。", "Put the chicken, mushrooms and ginger in the inner pot.", "Ilagay sa inner pot ang manok, shiitake at luya."),
      S("倒入香菇水，再加清水，一共約 800 毫升。", "Pour in the mushroom water, then add water to make about 800 ml.", "Ibuhos ang tubig ng shiitake, at dagdagan ng tubig hanggang mga 800 ml."),
      S("淋 1 大匙米酒。", "Add 1 tbsp rice wine.", "Ilagay ang 1 kutsarang rice wine."),
      S("外鍋倒 2 杯水，放入內鍋。", "Pour 2 cups of water in the outer pot. Put the inner pot in.", "Ibuhos ang 2 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，悶 15 分鐘。", "When the switch pops up, wait 15 minutes.", "Kapag tumalon ang switch, maghintay ng 15 minuto.", 15),
      S("試一口湯，再加鹽調整。", "Taste the soup. Adjust with salt.", "Tikman ang sabaw. Ayusin gamit ang asin.")
    ],
    warn: [T("內鍋的水不要超過 8 分滿。", "Do not fill the inner pot past 80%.", "Huwag punuin ang inner pot nang lampas 80%.")]
  },

  /* ---------- 13 綠豆湯 ---------- */
  {
    id: "mung_bean_soup", e: "🫘", cat: "dessert", cooker: "rice", outer: 2, status: "tbc",
    outerNote: T("悶 20 分鐘後，豆子還沒軟，外鍋再加 1 杯水續蒸一次", "If the beans are not soft after 20 minutes, add 1 more cup and steam again", "Kung hindi pa malambot ang munggo pagkatapos ng 20 minuto, magdagdag ng 1 tasa at pasingawan ulit"),
    seasons: ["夏"], tags: ["light"],
    zh: "綠豆湯", en: "Sweet Mung Bean Soup", tl: "Matamis na Sabaw ng Munggo",
    secret: T("綠豆先泡水，比較快煮軟。夏天泡豆子要放冰箱。糖最後才加，豆子比較容易煮開花。",
              "Soak the beans first so they cook faster. In summer, soak in the fridge. Add sugar last so the beans burst open.",
              "Ibabad muna ang munggo para mabilis lumambot. Kapag tag-init, ibabad sa ref. Ilagay ang asukal sa huli."),
    elder: { soft: 3, cut: null, note: T("豆子要煮到很軟。糖可以少放一點。", "Cook the beans until very soft. Use less sugar.", "Lutuin ang munggo hanggang sobrang lambot. Bawasan ang asukal.") },
    ing: [G("mung_bean", 1, "ricecup"), G("water", 1000, "ml"), G("rock_sugar", 70, "g")],
    steps: [
      S("綠豆洗乾淨。", "Wash the mung beans.", "Hugasan ang munggo."),
      S("加水泡 4 小時以上。夏天放冰箱泡。", "Soak in water for 4+ hours. In summer, soak in the fridge.", "Ibabad sa tubig nang higit 4 na oras. Kapag tag-init, ibabad sa ref.", 240),
      S("倒掉泡豆子的水。", "Pour off the soaking water.", "Itapon ang tubig na pinagbabaran."),
      S("綠豆放進內鍋，加 1000 毫升水。", "Put the beans in the inner pot. Add 1000 ml water.", "Ilagay ang munggo sa inner pot. Magdagdag ng 1000 ml na tubig."),
      S("外鍋倒 2 杯水，放入內鍋。", "Pour 2 cups of water in the outer pot. Put the inner pot in.", "Ibuhos ang 2 tasang tubig sa outer pot. Ilagay ang inner pot."),
      S("蓋上鍋蓋，按下開關。", "Cover the pot and press the switch.", "Takpan ang kaldero at pindutin ang switch."),
      S("開關跳起後，悶 20 分鐘。", "When the switch pops up, wait 20 minutes.", "Kapag tumalon ang switch, maghintay ng 20 minuto.", 20),
      S("打開，看豆子有沒有開花。", "Open the lid. Check if the beans have burst open.", "Buksan ang takip. Tingnan kung bumuka na ang munggo."),
      S("豆子還沒軟，外鍋加 1 杯水，再蒸一次。", "If the beans are still hard, add 1 cup to the outer pot and steam again.", "Kung matigas pa, magdagdag ng 1 tasa sa outer pot at pasingawan ulit."),
      S("豆子軟了，加糖攪拌到融化。", "When the beans are soft, add sugar and stir until it melts.", "Kapag malambot na ang munggo, ilagay ang asukal at haluin hanggang matunaw."),
      S("可以熱喝，也可以放涼冰過再吃。", "Serve hot, or cool it and chill it.", "Puwedeng ihain nang mainit, o palamigin at ilagay sa ref.")
    ],
    warn: [T("糖量可以減少。需要控制血糖的人，請依醫師建議調整。", "You can reduce the sugar. People watching blood sugar should follow their doctor's advice.", "Puwedeng bawasan ang asukal. Sundin ang payo ng doktor kung kailangang kontrolin ang blood sugar.")]
  }
];

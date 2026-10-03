/* 家裡器具說明。
   ※ 這頁是「範例」，請媽媽確認後再改成家裡實際的情況。
   todo: true 的項目會顯示「待確認」。確認後改成 false。
   img: 器具照片（放在 images/equip/，例如 images/equip/cooker_big.jpg），沒有照片會自動隱藏。 */
(function () {
  window.YF = window.YF || {};
  const T = (zh, en, tl) => ({ zh, en, tl });

  /* 媽媽確認內容後，把 false 改成 true，首頁才會出現「家裡器具」按鈕 */
  YF.EQUIP_READY = false;

  YF.EQUIP = [
    {
      id: "cooker_big", e: "🍚", img: "images/equip/cooker_big.jpg", todo: true,
      name: T("大電鍋（範例）", "Big rice cooker (example)", "Malaking rice cooker (halimbawa)"),
      use: T("煮湯、蒸魚、蒸肉、煮飯。分量多的時候用這一個。", "For soups, steamed fish and meat, rice. Use this one for bigger amounts.", "Para sa sabaw, pinasingawang isda at karne, kanin. Gamitin ito para sa maraming lutuin."),
      steps: [
        T("內鍋放食材，外鍋倒水（用電鍋附的量杯量）。", "Put food in the inner pot. Put water in the outer pot (use the cup that came with the cooker).", "Ilagay ang pagkain sa inner pot. Ilagay ang tubig sa outer pot (gamitin ang tasang kasama ng rice cooker)."),
        T("蓋上鍋蓋，按下開關。", "Cover and press the switch.", "Takpan at pindutin ang switch."),
        T("開關跳起來就表示外鍋的水乾了。", "When the switch pops up, the outer water has boiled away.", "Kapag tumalon ang switch, naubos na ang tubig sa outer pot."),
        T("跳起後通常還要悶一下，食譜會寫幾分鐘。", "After it pops up, you usually wait a bit. The recipe tells you how long.", "Pagkatapos tumalon, kadalasan maghintay pa nang kaunti. Nakasulat sa recipe kung gaano katagal.")
      ],
      water: T("外鍋 1 杯水約 10 到 15 分鐘；2 杯水約 25 分鐘以上。（請媽媽確認）", "1 cup of outer water is about 10–15 minutes; 2 cups is 25+ minutes. (Mom to confirm)", "Ang 1 tasa sa outer pot ay mga 10–15 minuto; ang 2 tasa ay higit 25 minuto. (Kumpirmahin ni Mama)")
    },
    {
      id: "cooker_small", e: "🍚", img: "images/equip/cooker_small.jpg", todo: true,
      name: T("小電鍋（範例）", "Small rice cooker (example)", "Maliit na rice cooker (halimbawa)"),
      use: T("蒸蛋、蒸一小盤菜、熱剩菜。分量少的時候用這一個。", "For steamed egg, a small plate of food, reheating. Use this one for small amounts.", "Para sa pinasingawang itlog, maliit na plato, at pag-init ng tira. Gamitin ito para sa kaunting lutuin."),
      steps: [
        T("使用方式跟大電鍋一樣。", "Use it the same way as the big cooker.", "Ganoon din ang paggamit sa malaking rice cooker."),
        T("外鍋水量要減少，請看食譜上的杯數。", "Use less outer water. Follow the cups in the recipe.", "Mas kaunting tubig sa outer pot. Sundin ang bilang ng tasa sa recipe.")
      ],
      water: T("（請媽媽補充小電鍋的水量換算）", "(Mom to add water conversion for the small cooker)", "(Dagdagan ni Mama ng sukat ng tubig para sa maliit na rice cooker)")
    },
    {
      id: "stove_left", e: "🔥", img: "images/equip/stove_left.jpg", todo: true,
      name: T("瓦斯爐 左邊（範例）", "Gas stove, left (example)", "Kalan, kaliwa (halimbawa)"),
      use: T("炒菜用。火力比較大。", "For stir-frying. Stronger flame.", "Para sa paggisa. Mas malakas ang apoy."),
      steps: [
        T("先按住旋鈕再轉動點火。", "Push in the knob, then turn to light it.", "Idiin ang knob, saka iikot para magsindi."),
        T("確認有火再放手。", "Check the flame is on before letting go.", "Tiyaking may apoy bago bitawan.")
      ],
      water: T("大火：炒青菜。中火：爆香。小火：燉煮。（請媽媽確認旋鈕位置）", "High: stir-frying greens. Medium: frying garlic. Low: simmering. (Mom to confirm the knob positions)", "Malakas: paggisa ng gulay. Katamtaman: paggisa ng bawang. Mahina: paglaga. (Kumpirmahin ni Mama ang posisyon ng knob)")
    },
    {
      id: "stove_right", e: "🔥", img: "images/equip/stove_right.jpg", todo: true,
      name: T("瓦斯爐 右邊（範例）", "Gas stove, right (example)", "Kalan, kanan (halimbawa)"),
      use: T("燉湯、小火慢煮用。火力比較小。", "For stewing soup and slow cooking. Gentler flame.", "Para sa nilagang sabaw at mabagal na pagluto. Mas mahina ang apoy."),
      steps: [
        T("點火方式跟左邊一樣。", "Light it the same way as the left one.", "Ganoon din ang pagsindi sa kaliwa."),
        T("燉羊肉湯用這個爐子，轉小火。", "Use this one for lamb soup on low heat.", "Gamitin ito para sa sabaw ng tupa sa mahinang apoy.")
      ],
      water: T("（請媽媽補充）", "(Mom to add)", "(Dagdagan ni Mama)")
    }
  ];

  /* 火力說明（所有瓦斯爐通用） */
  YF.HEAT_GUIDE = [
    { e: "🔥🔥🔥", name: T("大火", "High heat", "Malakas na apoy"), use: T("火焰碰到鍋底。炒青菜、煮滾。", "Flame touches the pan. For stir-frying greens and boiling.", "Dumadampi ang apoy sa kawali. Para sa paggisa ng gulay at pagpapakulo.") },
    { e: "🔥🔥", name: T("中火", "Medium heat", "Katamtamang apoy"), use: T("火焰剛好在鍋底下。汆燙、一般炒菜。", "Flame just under the pan. For blanching and ordinary frying.", "Nasa ilalim lang ng kawali ang apoy. Para sa pagpapakulo sandali at karaniwang paggisa.") },
    { e: "🔥", name: T("小火", "Low heat", "Mahinang apoy"), use: T("火焰很小。爆香蒜頭、燉湯。", "Small flame. For frying garlic and stewing soup.", "Maliit ang apoy. Para sa paggisa ng bawang at paglaga ng sabaw.") }
  ];
})();

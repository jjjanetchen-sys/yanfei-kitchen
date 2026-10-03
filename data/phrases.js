/* 常用句快捷鍵。key 就是台語錄音檔名：audio/tw/<key>.m4a
   cat: heat 火候、taste 味道、cut 切法、care 照顧奶奶、talk 日常 */
(function () {
  window.YF = window.YF || {};
  const P = (key, cat, e, zh, en, tl) => ({ key, cat, e, zh, en, tl });

  YF.PHRASE_CATS = {
    heat:  { zh: "火候・時間", en: "Heat and time", tl: "Apoy at oras", e: "🔥" },
    taste: { zh: "味道", en: "Taste", tl: "Lasa", e: "👅" },
    cut:   { zh: "切法・清洗", en: "Cutting and washing", tl: "Paghiwa at paghuhugas", e: "🔪" },
    care:  { zh: "照顧奶奶", en: "Caring for Grandma", tl: "Pag-aalaga kay Lola", e: "🧓" },
    talk:  { zh: "日常", en: "Daily", tl: "Pang-araw-araw", e: "💬" }
  };

  YF.PHRASES = [
    P("p_cook_10_more", "heat", "⏱️", "再煮 10 分鐘", "Cook it for 10 more minutes", "Lutuin pa nang 10 minuto"),
    P("p_cook_softer", "heat", "🥣", "再煮軟一點", "Cook it until softer", "Lutuin pa hanggang lumambot"),
    P("p_too_hard", "heat", "🪨", "太硬了，奶奶咬不動", "Too hard. Grandma cannot chew it", "Masyadong matigas. Hindi ito kayang nguyain ni Lola"),
    P("p_heat_down", "heat", "🔥", "火關小一點", "Turn the heat down", "Hinaan ang apoy"),
    P("p_heat_off", "heat", "⏹️", "關火", "Turn off the heat", "Patayin ang apoy"),
    P("p_cover_pot", "heat", "🍲", "蓋上鍋蓋", "Cover the pot", "Takpan ang kaldero"),
    P("p_dont_open", "heat", "🚫", "先不要開蓋", "Do not open the lid yet", "Huwag munang buksan ang takip"),
    P("p_add_water", "heat", "💧", "水加多一點", "Add more water", "Dagdagan ng tubig"),
    P("p_too_salty", "taste", "🧂", "太鹹了", "Too salty", "Masyadong maalat"),
    P("p_not_salty", "taste", "😐", "不夠鹹", "Not salty enough", "Kulang sa alat"),
    P("p_less_salt", "taste", "🥄", "鹽少放一點", "Use less salt", "Bawasan ang asin"),
    P("p_too_oily", "taste", "🛢️", "太油了", "Too oily", "Masyadong mamantika"),
    P("p_taste_first", "taste", "👅", "先試一口再加鹽", "Taste first, then add salt", "Tikman muna bago magdagdag ng asin"),
    P("p_cut_smaller", "cut", "🔪", "切小一點", "Cut it smaller", "Hiwain nang mas maliit"),
    P("p_no_wash", "cut", "🚿", "這個不用洗", "No need to wash this", "Hindi na kailangang hugasan ito"),
    P("p_wash_clean", "cut", "🫧", "要洗乾淨", "Wash it clean", "Hugasan nang mabuti"),
    P("p_remove_bones", "care", "🦴", "骨頭、魚刺都要挑乾淨", "Remove all bones and fish bones", "Alisin ang lahat ng buto at tinik"),
    P("p_cool_first", "care", "🌡️", "先放涼再給奶奶", "Let it cool before giving to Grandma", "Hayaang lumamig bago ibigay kay Lola"),
    P("p_small_portion", "care", "🥄", "分量少一點，奶奶吃不多", "Smaller portion. Grandma does not eat much", "Konti lang ang bahagi. Hindi marami ang kinakain ni Lola"),
    P("p_grandma_finished", "care", "😋", "奶奶吃光了", "Grandma finished everything", "Naubos ni Lola"),
    P("p_grandma_no", "care", "🙅", "奶奶不愛吃這個", "Grandma does not like this", "Hindi gusto ni Lola ito"),
    P("p_wait_me", "talk", "✋", "請等我一下", "Please wait a moment", "Pakihintay sandali"),
    P("p_ask_again", "talk", "❓", "不確定就問我", "If you are not sure, ask me", "Kung hindi sigurado, magtanong sa akin"),
    P("p_thanks_good", "talk", "💛", "今天煮得很好，謝謝", "You cooked very well today. Thank you", "Napakasarap ng luto mo ngayon. Salamat"),
    P("p_show_me", "talk", "📷", "請拍照給我看", "Please send me a photo", "Pakipadala ng litrato sa akin")
  ];
})();

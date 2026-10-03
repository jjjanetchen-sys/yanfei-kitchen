# 燕飛食光

台式家常菜三語食譜，台語只用真人錄音。網頁介面預設是中文大字＋英文小字；Tagalog 出現在食譜細節（食材、步驟、提醒）、常用句和詞彙卡裡。右上角切到 Tagalog 後，按鈕和選單也會變成 Tagalog 大字＋英文小字。用 LINE 傳給看護的菜單連結，第一次打開會自動是 Tagalog。純靜態網站，不需安裝、不需建置、沒有後端。

## 上傳到 GitHub

1. 把本資料夾裡的所有檔案與資料夾，依原本的結構拖進 GitHub repository（不要壓縮成 zip）。
2. Settings → Pages → Source 選 `main` 分支、根目錄 `/`。
3. 網址會是 `https://<帳號>.github.io/<repo 名稱>/`。

> 麥克風錄音（`record.html`）和離線功能需要 `https`，GitHub Pages 本來就是 https。

## 資料夾結構

```
index.html              首頁（所有畫面都在這一頁裡切換）
record.html             台語錄音頁（給媽媽用）
manifest.json           加到手機主畫面用
sw.js                   離線快取
README.md
css/style.css           樣式
js/app.js               畫面與互動
js/audio.js             語音朗讀、台語錄音播放、計時提示音
data/ui.js              介面文字、標籤、單位（三語）
data/ingredients.js     食材與調味料（三語、超市區域）
data/recipes.js         13 道食譜（三語步驟）
data/phrases.js         常用句快捷鍵
data/vocab.js           詞彙卡（切法、火候、器具）
data/equipment.js       家裡器具說明（範例，待媽媽確認）
data/tw-list.js         已上傳的台語錄音清單（錄音頁自動產生）
images/hero.jpg         主視覺（1200px 寬）
images/hero-800.jpg     主視覺（800px 寬，手機用）
images/logo.jpg         頂端列 logo
images/icon-192.png     App 圖示
images/icon-512.png
images/steps/           步驟照片（檔名：菜id-步驟號.jpg）
audio/tw/               台語錄音檔
```

## 一週菜單與採買

1. 首頁 →「一週菜單」→ 在每一天按「＋加菜」，到食譜頁選菜，選完按「選好了」。
2. 「採買清單」可選「只買今天／3 天／7 天」，會把這幾天的食材加總。同一道菜排了兩天就算兩份。
3. 到了當天，「今日菜單」會自動出現那天排好的菜，按「用 LINE 傳給看護」即可。
4. 兩週以前的菜單會自動清掉。

## 兩支手機怎麼共用菜單與回饋

資料存在各自手機裡，手機之間靠「連結」傳遞：

- **媽媽選好菜單** → 今日菜單頁按「用 LINE 傳給看護」→ 看護點開連結，菜單就出現在她的手機。
- **看護記錄奶奶吃的狀況** → 奶奶回饋頁按「用 LINE 回報給媽媽」→ 媽媽點開連結，記錄就合併進媽媽的手機。
- 看護點開菜單連結時，會先看到「要換成這份菜單嗎？」和日期、菜名，按了才會換；日期不是今天會有紅色警告。
- 分享連結帶有 `openExternalBrowser=1`，LINE 會改用手機預設瀏覽器打開，菜單才會存在平常用的瀏覽器裡。
- iPhone 上「加到主畫面」的捷徑和 Safari 的資料是分開的，所以 iPhone 請直接用 Safari 開，不要用主畫面捷徑。
- 每道菜每天只要點一下：吃光／剩一半／不愛吃。累積後會影響「今天煮什麼」的推薦。

## 台語錄音

1. 媽媽用手機開 `record.html`，照畫面念中文，用台語錄。
2. 按「下載全部錄音」。會下載所有錄音檔，最後再下載一個 `tw-list.js`。
3. 錄音檔放進 `audio/tw/`，`tw-list.js` 放進 `data/`（覆蓋舊的），一起上傳到 GitHub。檔名都不用改。
4. **只有 `data/tw-list.js` 清單裡有的項目，網頁才會出現「🔊 台語」按鈕。** 沒錄的不會顯示。
5. **建議先錄「① 常用句」和「② 菜名」**，再錄步驟。
6. iPhone 錄的是 `.m4a`，iPhone 和 Android 都能播；Android 的 Chrome 可能錄成 `.webm`，部分 iPhone 可能不能播。若看護用 iPhone，建議用 iPhone 或 Safari 錄。

## 新增或修改食譜

打開 `data/recipes.js`，複製一個菜色區塊，改 `id`（英文小寫與底線）和內容即可。`status` 填 `"ok"` 代表媽媽已確認，`"tbc"` 代表待確認。步驟照片放 `images/steps/`，檔名 `菜id-步驟號.jpg`。

## 步驟、詞彙照片（選用）

- 步驟：`images/steps/<菜id>-<步驟號>.jpg`，例如 `images/steps/steamed_egg-4.jpg`
- 詞彙：`images/vocab/<key>.jpg`，例如 `images/vocab/i_ginger.jpg`（key 見 `data/vocab.js`）
- 器具：`images/equip/cooker_big.jpg` 等（見 `data/equipment.js`）
- 沒有照片會自動顯示表情符號，不會破圖。建議寬 1000px 以內、每張 200KB 以下。

## 需要人確認的地方

- **Tagalog 與 English 翻譯**是依 Notion 食譜翻譯的，請看護或會 Tagalog 的朋友看過一次，特別是食材名稱（蔭鳳梨、瓜仔、山藥、當歸、黃耆）。
- `data/recipes.js` 裡每道菜的 `elder`（軟爛程度、切法、給奶奶的提醒）是依「食物不能太硬」整理的建議，請媽媽確認。
- `data/equipment.js` 的器具說明是**範例**，所以首頁先不顯示「家裡器具」。改成家裡實際的兩個電鍋、兩個瓦斯爐後，把檔案裡的 `YF.EQUIP_READY = false` 改成 `true`，按鈕就會出現。
- Notion 裡標示「待確認」的 10 道菜**預設隱藏**，不會出現在食譜列表、冰箱推薦和「今天煮什麼」。在食譜頁按「⏳ 待確認的菜」才看得到。媽媽確認一道，就把 `data/recipes.js` 裡那道菜的 `status: "tbc"` 改成 `status: "ok"`。
- Tagalog 語音朗讀用手機內建語音。有些手機沒有 Tagalog（fil-PH）語音，會顯示提示，看護可以改看文字。

## 之後可以加的功能

- 節氣與在地盛產期（目前只依春夏秋冬）。
- 真正的 AI 問答（「今天煮什麼」目前是規則式推薦）。純靜態網站不能放 API key，需要另外加一個小型後端。

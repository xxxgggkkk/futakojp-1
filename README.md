# GAO代購商品展示網站

這是一個面向台灣客人的日本代購商品展示網站，不包含註冊、購物車、下單、線上付款、訂單和物流功能。客人瀏覽商品後，透過 Instagram、LINE、WhatsApp 或 Email 聯絡代購。

## 功能

- 首頁：Logo、網站名稱、搜尋、分類導覽、Banner、推薦商品、熱門商品、最新商品、商品卡片瀑布流。
- 商品：分類頁、搜尋頁、詳情頁、多圖展示、台幣參考價格、品牌、到貨週期、代購狀態、介紹、規格、注意事項。
- 後台：管理員登入、商品新增/編輯/刪除/上架/下架、分類管理、Banner 管理、網站設定。
- 圖片：支援 JPG、PNG、WEBP，多圖上傳、拖曳上傳、預覽。
- SEO：自訂標題、Meta Description、Open Graph、`sitemap.xml`、`robots.txt`。

## 技术栈

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite 開發資料庫，可切換 PostgreSQL
- Cookie 管理員認證
- 本地圖片儲存，Vercel 可使用 Vercel Blob

## 本地執行

1. 安裝依賴：

```bash
npm install
```

2. 建立環境變數：

```bash
cp .env.example .env
```

建議修改 `.env` 中的管理員帳號、密碼和 `AUTH_SECRET`。

3. 初始化資料庫並匯入範例資料：

```bash
npm run db:push
npm run db:seed
```

4. 啟動開發伺服器：

```bash
npm run dev
```

打開 `http://localhost:3000` 查看網站。

## 預設後台

- 後台地址：`/admin`
- 預設 Email：`admin@example.com`
- 預設密碼：`admin123456`

如果你在 `.env` 中設定了 `ADMIN_EMAIL` 和 `ADMIN_PASSWORD`，種子資料會使用你的設定。

## 後台使用

- 商品管理：新增、編輯、刪除、上架、下架商品，維護台幣價格、庫存狀態、介紹、規格和圖片。
- 分類管理：新增、修改、刪除分類，首頁導覽會自動更新。
- 首頁 Banner：維護首頁大圖、文案、連結和顯示狀態。
- 網站設定：修改網站名稱、SEO、Instagram、LINE、WhatsApp、Email、QR Code 和 Logo。

## 部署到 Vercel

正式部署請使用 Prisma Postgres 和 Vercel Blob。專案已包含 `prisma/schema.postgres.prisma` 和 `vercel.json`，Vercel 建置時會自動切換到 PostgreSQL schema，並自動建表與匯入範例資料。

1. 將專案上傳到 GitHub。
2. 在 Vercel 匯入專案。
3. 在 Vercel 建立 Prisma Postgres 資料庫，並把它連接到目前專案。
4. 可選：在 Vercel 建立 Blob Store，並把它連接到目前專案。
5. 新增或確認環境變數：

```bash
DATABASE_PRISMA_DATABASE_URL="Prisma Postgres 自動生成"
ADMIN_EMAIL="你的管理員 Email"
ADMIN_PASSWORD="你的強密碼"
AUTH_SECRET="一段足夠長的隨機字串"
NEXT_PUBLIC_SITE_URL="你的 Vercel 網址"
BLOB_READ_WRITE_TOKEN="Vercel Blob 自動生成，可選"
```

不要在正式部署環境設定 `BLOCK_PUBLIC_ADMIN=true`，否則公開後台會被攔截。這個變數只用於臨時本地展示。

Vercel 會讀取 `vercel.json`，使用下面的建置命令：

```bash
npm run vercel-build
```

部署完成後，線上資料庫會在建置流程中自動初始化。後台上傳圖片時，如果存在 `BLOB_READ_WRITE_TOKEN`，圖片會儲存到 Vercel Blob；本地開發沒有這個 token 時，會繼續儲存到 `public/uploads`。

## 切換 PostgreSQL

1. 將 `prisma/schema.prisma` 中 datasource provider 從 `sqlite` 改為 `postgresql`。
2. 把資料庫環境變數改為 PostgreSQL 連線字串。
3. 執行：

```bash
npm run db:push
npm run db:seed
```

## 後續擴充建議

目前結構已預留商品狀態、庫存狀態、分類、圖片、站點設定和後台認證。未來可繼續增加線上下單、付款、會員系統、收藏、多語言、匯率換算、價格幣別切換、標籤和庫存同步。

# GAO代购商品展示网站

这是一个日本代购商品展示网站，不包含注册、购物车、下单、在线支付、订单和物流功能。客户浏览商品后，通过微信、LINE、WhatsApp 或邮箱联系代购。

## 功能

- 首页：Logo、网站名称、搜索、分类导航、Banner、推荐商品、热门商品、最新商品、商品卡片瀑布流。
- 商品：分类页、搜索页、详情页、多图展示、参考价格、品牌、到货周期、代购状态、介绍、规格、注意事项。
- 后台：管理员登录、商品新增/编辑/删除/上架/下架、分类管理、Banner 管理、网站设置。
- 图片：支持 JPG、PNG、WEBP，多图上传、拖拽上传、预览。
- SEO：自定义标题、Meta Description、Open Graph、`sitemap.xml`、`robots.txt`。

## 技术栈

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite 开发数据库，可切换 PostgreSQL
- Cookie 管理员认证
- 本地图片存储，可后续替换为 Vercel Blob

## 本地运行

1. 安装依赖：

```bash
npm install
```

2. 创建环境变量：

```bash
cp .env.example .env
```

建议修改 `.env` 中的管理员账号、密码和 `AUTH_SECRET`。

3. 初始化数据库并导入示例数据：

```bash
npm run db:push
npm run db:seed
```

4. 启动开发服务器：

```bash
npm run dev
```

打开 `http://localhost:3000` 查看网站。

## 默认后台

- 后台地址：`/admin`
- 默认邮箱：`admin@example.com`
- 默认密码：`admin123456`

如果你在 `.env` 中设置了 `ADMIN_EMAIL` 和 `ADMIN_PASSWORD`，种子数据会使用你的设置。

## 后台使用

- 商品管理：新增、编辑、删除、上架、下架商品，维护价格、库存状态、介绍、规格和图片。
- 分类管理：新增、修改、删除分类，首页导航会自动更新。
- 首页 Banner：维护首页大图、文案、链接和显示状态。
- 网站设置：修改网站名称、SEO、微信、LINE、WhatsApp、邮箱、二维码和 Logo。

## 部署到 Vercel

正式部署请使用 PostgreSQL 和 Vercel Blob。项目已包含 `prisma/schema.postgres.prisma` 和 `vercel.json`，Vercel 构建时会自动切换到 PostgreSQL schema。

1. 将项目上传到 GitHub。
2. 在 Vercel 导入项目。
3. 在 Vercel 创建 Postgres 数据库，并把它连接到当前项目。
4. 在 Vercel 创建 Blob Store，并把它连接到当前项目。
5. 添加或确认环境变量：

```bash
DATABASE_URL="Vercel Postgres 自动生成或你自己的 PostgreSQL 地址"
ADMIN_EMAIL="你的管理员邮箱"
ADMIN_PASSWORD="你的强密码"
AUTH_SECRET="一段足够长的随机字符串"
NEXT_PUBLIC_SITE_URL="你的 Vercel 访问地址"
BLOB_READ_WRITE_TOKEN="Vercel Blob 自动生成"
```

不要在正式部署环境设置 `BLOCK_PUBLIC_ADMIN=true`，否则公网后台会被拦截。这个变量只用于临时本地隧道展示。

Vercel 会读取 `vercel.json`，使用下面的构建命令：

```bash
npm run vercel-build
```

部署完成后，线上数据库需要初始化一次。可以在本机临时把 `DATABASE_URL` 设置为 Vercel Postgres 地址后运行：

```bash
cp prisma/schema.postgres.prisma prisma/schema.prisma
npm run db:push
npm run db:seed
```

如果你不想在本机操作线上数据库，也可以在 Vercel 的部署环境或其他安全终端里执行同样命令。

后台上传图片时，如果存在 `BLOB_READ_WRITE_TOKEN`，图片会保存到 Vercel Blob；本地开发没有这个 token 时，会继续保存到 `public/uploads`。

## 切换 PostgreSQL

1. 将 `prisma/schema.prisma` 中 datasource provider 从 `sqlite` 改为 `postgresql`。
2. 把 `DATABASE_URL` 改为 PostgreSQL 连接字符串。
3. 运行：

```bash
npm run db:push
npm run db:seed
```

## 后续扩展建议

当前结构已预留商品状态、库存状态、分类、图片、站点设置和后台认证。未来可继续增加在线下单、支付、用户系统、收藏、多语言、汇率换算、价格币种切换、标签和库存同步。

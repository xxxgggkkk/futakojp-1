import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const images = {
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80",
  drugstore: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=80",
  snacks: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=1000&q=80",
  supplement: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=1000&q=80",
  anime: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=1000&q=80",
  luxury: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
  digital: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
  home: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
};

async function main() {
  const password = process.env.ADMIN_PASSWORD || "admin123456";
  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      passwordHash: await bcrypt.hash(password, 12)
    }
  });

  await prisma.siteSetting.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      siteName: "GAO代购",
      metaTitle: "GAO代购｜日本好物展示目录",
      metaDescription: "精选日本美妆、药妆、零食、数码、家居和限定商品展示，支持微信、LINE 咨询代购。",
      wechatId: "gao-daigou",
      lineId: "gao-daigou",
      email: "hello@example.com"
    }
  });

  const categorySeed = [
    ["美妆", "beauty", "日本热门护肤、彩妆和香氛"],
    ["药妆", "drugstore", "药妆店常见护理与生活用品"],
    ["零食", "snacks", "限定口味、季节包装和伴手礼"],
    ["保健品", "supplement", "营养补充与日常健康"],
    ["动漫周边", "anime", "手办、徽章、限定联名"],
    ["奢侈品", "luxury", "品牌精品与日本限定"],
    ["数码产品", "digital", "小家电、配件和电子设备"],
    ["家居用品", "home", "收纳、厨房、生活美学"],
    ["其他", "other", "其他可咨询商品"]
  ];

  const categories: Record<string, string> = {};
  for (const [index, [name, slug, description]] of categorySeed.entries()) {
    const category = await prisma.category.upsert({
      where: { slug },
      update: { name, description, sortOrder: index },
      create: { name, slug, description, sortOrder: index }
    });
    categories[slug] = category.id;
  }

  await prisma.banner.upsert({
    where: { id: "seed-banner-main" },
    update: {},
    create: {
      id: "seed-banner-main",
      title: "日本当季好物精选",
      subtitle: "从药妆店、百货店到限定周边，展示可咨询代购商品。",
      imageUrl: images.beauty,
      linkUrl: "/search",
      isActive: true,
      sortOrder: 0
    }
  });

  const products = [
    {
      name: "资生堂 Elixir 怡丽丝尔防晒乳",
      slug: "shiseido-elixir-sunscreen",
      brand: "Shiseido",
      categoryId: categories.beauty,
      priceJpy: 3300,
      deliveryCycle: "7-14 天",
      stockStatus: "AVAILABLE",
      isRecommended: true,
      isHot: true,
      image: images.beauty,
      shortIntro: "日本药妆店高人气防晒，通勤和旅行都适合。",
      description: "轻薄肤感，适合日常防晒和妆前使用。具体版本、容量和库存请联系确认。",
      specs: "容量：35ml\n产地：日本\n适合：日常通勤、防晒补充",
      notes: "价格为日本参考价，实际代购价会根据店铺活动、汇率和库存确认。"
    },
    {
      name: "龙角散润喉糖 白桃限定味",
      slug: "ryukakusan-peach-candy",
      brand: "Ryukakusan",
      categoryId: categories.drugstore,
      priceJpy: 598,
      deliveryCycle: "7-10 天",
      stockStatus: "LIMITED",
      isRecommended: true,
      isHot: false,
      image: images.drugstore,
      shortIntro: "日本便利店与药妆店常见润喉糖，白桃味较受欢迎。",
      description: "适合随身携带，口味清爽。限定口味可能随季节变化。",
      specs: "类型：袋装糖果\n保存：常温避光\n口味：白桃",
      notes: "食品类请确认收货地进口限制。"
    },
    {
      name: "Calbee じゃがポックル 北海道薯条三兄弟",
      slug: "calbee-jaga-pokkuru",
      brand: "Calbee",
      categoryId: categories.snacks,
      priceJpy: 1080,
      deliveryCycle: "10-18 天",
      stockStatus: "AVAILABLE",
      isRecommended: false,
      isHot: true,
      image: images.snacks,
      shortIntro: "北海道经典伴手礼，独立小包装。",
      description: "薯条口感酥脆，适合作为礼物或办公室分享零食。",
      specs: "包装：独立小袋\n产地：日本北海道\n保存：常温",
      notes: "易碎食品运输中可能出现少量碎裂。"
    },
    {
      name: "DHC 维生素 C 60日装",
      slug: "dhc-vitamin-c-60",
      brand: "DHC",
      categoryId: categories.supplement,
      priceJpy: 520,
      deliveryCycle: "7-14 天",
      stockStatus: "PREORDER",
      isRecommended: true,
      isHot: true,
      image: images.supplement,
      shortIntro: "日本常见营养补充品，适合日常咨询补货。",
      description: "DHC 热门基础保健品之一，可按需求咨询多件代购。",
      specs: "规格：60日装\n类型：营养补充食品\n品牌：DHC",
      notes: "保健品不替代药物，特殊人群请先咨询专业人士。"
    },
    {
      name: "限定动漫徽章盲盒",
      slug: "anime-badge-blind-box",
      brand: "Japan Limited",
      categoryId: categories.anime,
      priceJpy: 880,
      deliveryCycle: "14-21 天",
      stockStatus: "LIMITED",
      isRecommended: false,
      isHot: true,
      image: images.anime,
      shortIntro: "日本线下活动和专门店常见限定周边。",
      description: "盲盒款式随机，适合动漫周边收藏。可咨询指定作品或活动库存。",
      specs: "类型：徽章盲盒\n购买渠道：线下店铺/活动店\n款式：随机",
      notes: "限定品售完较快，下单前需确认当天库存。"
    },
    {
      name: "MUJI 无印良品香薰机",
      slug: "muji-aroma-diffuser",
      brand: "MUJI",
      categoryId: categories.home,
      priceJpy: 6990,
      deliveryCycle: "10-18 天",
      stockStatus: "AVAILABLE",
      isRecommended: true,
      isHot: false,
      image: images.home,
      shortIntro: "简洁家居风格香薰机，适合卧室和书桌。",
      description: "无印良品经典小家电，可搭配精油咨询。",
      specs: "类型：超声波香薰机\n适用：室内\n电压：请确认版本",
      notes: "电器类需确认插头、电压和保修限制。"
    },
    {
      name: "Sony LinkBuds S 无线耳机",
      slug: "sony-linkbuds-s",
      brand: "Sony",
      categoryId: categories.digital,
      priceJpy: 26400,
      deliveryCycle: "10-18 天",
      stockStatus: "PREORDER",
      isRecommended: false,
      isHot: true,
      image: images.digital,
      shortIntro: "轻量降噪无线耳机，日本渠道可咨询颜色和库存。",
      description: "适合通勤、办公和日常听歌。实际价格随渠道活动变动。",
      specs: "类型：真无线耳机\n功能：降噪、蓝牙连接\n品牌：Sony",
      notes: "数码产品售后和地区保修需单独确认。"
    },
    {
      name: "日本限定运动鞋配色",
      slug: "japan-limited-sneakers",
      brand: "Selected Brand",
      categoryId: categories.luxury,
      priceJpy: 19800,
      deliveryCycle: "14-25 天",
      stockStatus: "LIMITED",
      isRecommended: false,
      isHot: true,
      image: images.luxury,
      shortIntro: "日本店铺限定配色，尺码需要实时确认。",
      description: "适合喜欢限定款的客户。可提供品牌、尺码、预算后确认。",
      specs: "类型：鞋履\n尺码：按库存确认\n渠道：日本线下/线上店铺",
      notes: "热门尺码变动快，确认后再安排代购。"
    }
  ];

  for (const product of products) {
    const { image, ...data } = product;
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        status: "ACTIVE",
        images: {
          create: [
            { url: image, alt: data.name, sortOrder: 0 },
            { url: image, alt: data.name, sortOrder: 1 }
          ]
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

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
    update: {
      siteName: "GAO代購",
      metaTitle: "GAO代購｜日本好物展示目錄",
      metaDescription: "精選日本美妝、藥妝、零食、3C、居家和限定商品展示，台幣參考價，支援 Instagram、LINE 諮詢代購。"
    },
    create: {
      id: "site",
      siteName: "GAO代購",
      metaTitle: "GAO代購｜日本好物展示目錄",
      metaDescription: "精選日本美妝、藥妝、零食、3C、居家和限定商品展示，台幣參考價，支援 Instagram、LINE 諮詢代購。",
      wechatId: "gao-daigou",
      lineId: "gao-daigou",
      email: "hello@example.com"
    }
  });

  const categorySeed = [
    ["美妝", "beauty", "日本熱門保養、彩妝和香氛"],
    ["藥妝", "drugstore", "藥妝店常見保養與生活用品"],
    ["零食", "snacks", "限定口味、季節包裝和伴手禮"],
    ["保健食品", "supplement", "營養補充與日常健康"],
    ["動漫周邊", "anime", "公仔、徽章、限定聯名"],
    ["精品", "luxury", "品牌精品與日本限定"],
    ["3C 商品", "digital", "小家電、配件和電子產品"],
    ["居家用品", "home", "收納、廚房、生活美學"],
    ["其他", "other", "其他可諮詢商品"]
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
    update: {
      title: "雙子日本代購",
      subtitle: "私訊確認商品後安排登記採買，訂金與餘額流程清楚透明。",
      imageUrl: "/images/home-order-guide.jpg",
      linkUrl: "/search",
      isActive: true,
      sortOrder: 0
    },
    create: {
      id: "seed-banner-main",
      title: "雙子日本代購",
      subtitle: "私訊確認商品後安排登記採買，訂金與餘額流程清楚透明。",
      imageUrl: "/images/home-order-guide.jpg",
      linkUrl: "/search",
      isActive: true,
      sortOrder: 0
    }
  });

  const products = [
    {
      name: "資生堂 Elixir 怡麗絲爾防曬乳",
      slug: "shiseido-elixir-sunscreen",
      brand: "Shiseido",
      categoryId: categories.beauty,
      priceJpy: 690,
      deliveryCycle: "7-14 天",
      stockStatus: "AVAILABLE",
      isRecommended: true,
      isHot: true,
      image: images.beauty,
      shortIntro: "日本藥妝店高人氣防曬，通勤和旅行都適合。",
      description: "輕薄膚感，適合日常防曬和妝前使用。具體版本、容量和庫存請聯絡確認。",
      specs: "容量：35ml\n產地：日本\n適合：日常通勤、防曬補擦",
      notes: "價格為台幣參考價，實際代購價會依店鋪活動、匯率和庫存確認。"
    },
    {
      name: "龍角散潤喉糖 白桃限定味",
      slug: "ryukakusan-peach-candy",
      brand: "Ryukakusan",
      categoryId: categories.drugstore,
      priceJpy: 125,
      deliveryCycle: "7-10 天",
      stockStatus: "LIMITED",
      isRecommended: true,
      isHot: false,
      image: images.drugstore,
      shortIntro: "日本便利商店與藥妝店常見潤喉糖，白桃味很受歡迎。",
      description: "適合隨身攜帶，口味清爽。限定口味可能隨季節變化。",
      specs: "類型：袋裝糖果\n保存：常溫避光\n口味：白桃",
      notes: "食品類請先確認收貨地進口限制。"
    },
    {
      name: "Calbee じゃがポックル 北海道薯條三兄弟",
      slug: "calbee-jaga-pokkuru",
      brand: "Calbee",
      categoryId: categories.snacks,
      priceJpy: 230,
      deliveryCycle: "10-18 天",
      stockStatus: "AVAILABLE",
      isRecommended: false,
      isHot: true,
      image: images.snacks,
      shortIntro: "北海道經典伴手禮，獨立小包裝。",
      description: "薯條口感酥脆，適合作為禮物或辦公室分享零食。",
      specs: "包裝：獨立小袋\n產地：日本北海道\n保存：常溫",
      notes: "易碎食品運送中可能出現少量碎裂。"
    },
    {
      name: "DHC 维生素 C 60日装",
      slug: "dhc-vitamin-c-60",
      brand: "DHC",
      categoryId: categories.supplement,
      priceJpy: 110,
      deliveryCycle: "7-14 天",
      stockStatus: "PREORDER",
      isRecommended: true,
      isHot: true,
      image: images.supplement,
      shortIntro: "日本常見營養補充品，適合日常諮詢補貨。",
      description: "DHC 熱門基礎保健食品之一，可依需求諮詢多件代購。",
      specs: "規格：60 日份\n類型：營養補充食品\n品牌：DHC",
      notes: "保健食品不替代藥物，特殊族群請先諮詢專業人士。"
    },
    {
      name: "限定動漫徽章盲盒",
      slug: "anime-badge-blind-box",
      brand: "Japan Limited",
      categoryId: categories.anime,
      priceJpy: 190,
      deliveryCycle: "14-21 天",
      stockStatus: "LIMITED",
      isRecommended: false,
      isHot: true,
      image: images.anime,
      shortIntro: "日本線下活動和專門店常見限定周邊。",
      description: "盲盒款式隨機，適合動漫周邊收藏。可諮詢指定作品或活動庫存。",
      specs: "類型：徽章盲盒\n購買通路：線下店鋪/活動店\n款式：隨機",
      notes: "限定品售完較快，確認前需先查詢當天庫存。"
    },
    {
      name: "MUJI 无印良品香薰机",
      slug: "muji-aroma-diffuser",
      brand: "MUJI",
      categoryId: categories.home,
      priceJpy: 1460,
      deliveryCycle: "10-18 天",
      stockStatus: "AVAILABLE",
      isRecommended: true,
      isHot: false,
      image: images.home,
      shortIntro: "簡潔居家風格香氛機，適合臥室和書桌。",
      description: "無印良品經典小家電，可搭配精油諮詢。",
      specs: "類型：超音波香氛機\n適用：室內\n電壓：請確認版本",
      notes: "電器類需確認插頭、電壓和保固限制。"
    },
    {
      name: "Sony LinkBuds S 无线耳机",
      slug: "sony-linkbuds-s",
      brand: "Sony",
      categoryId: categories.digital,
      priceJpy: 5500,
      deliveryCycle: "10-18 天",
      stockStatus: "PREORDER",
      isRecommended: false,
      isHot: true,
      image: images.digital,
      shortIntro: "輕量降噪無線耳機，日本通路可諮詢顏色和庫存。",
      description: "適合通勤、辦公和日常聽歌。實際價格會依通路活動變動。",
      specs: "類型：真無線耳機\n功能：降噪、藍牙連線\n品牌：Sony",
      notes: "3C 商品售後和地區保固需另外確認。"
    },
    {
      name: "日本限定运动鞋配色",
      slug: "japan-limited-sneakers",
      brand: "Selected Brand",
      categoryId: categories.luxury,
      priceJpy: 4100,
      deliveryCycle: "14-25 天",
      stockStatus: "LIMITED",
      isRecommended: false,
      isHot: true,
      image: images.luxury,
      shortIntro: "日本店鋪限定配色，尺寸需要即時確認。",
      description: "適合喜歡限定款的客人。可提供品牌、尺寸、預算後確認。",
      specs: "類型：鞋款\n尺寸：依庫存確認\n通路：日本線下/線上店鋪",
      notes: "熱門尺寸變動快，確認後再安排代購。"
    }
  ];

  for (const product of products) {
    const { image, ...data } = product;
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: data,
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

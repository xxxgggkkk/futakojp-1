export type LineProductPost = {
  id: string;
  date: string;
  title: string;
  price?: string;
  status: "現貨" | "預購" | "限時收單" | "連線代購" | "社群公告" | "限量";
  body: string;
};

export const lineProductPosts: LineProductPost[] = [
  {
    id: "vis-mary-quant",
    date: "2026/09/05",
    title: "VIS × MARY QUANT 聯名系列",
    status: "限時收單",
    body: "MARY QUANT 最近真的已經佔據各大品牌了，這次跟 VIS 的聯名也好好看。不管想穿得正式一點，還是休閒日常一點，都可以搭出不同風格。部分價格圖片已標示，若想詢問其他商品，歡迎私群或社群內詢問。"
  },
  {
    id: "snidel-home-cinnamonroll",
    date: "2026/09/04",
    title: "SNIDEL HOME × Cinnamonroll",
    status: "預購",
    body: "繼上次酷洛米聯名後，這次換大耳狗啦。大耳狗系列商品公告於 LINE 社群發布，喜歡的款式可私訊確認。"
  },
  {
    id: "fray-id-store",
    date: "2026/09/03",
    title: "FRAY I.D 店鋪實拍",
    status: "連線代購",
    body: "FRAY I.D 秋裝店鋪實拍，社群內發布款式照片與商品資訊。想詢問尺寸、顏色與價格可私訊確認。"
  },
  {
    id: "lily-brown-mary-quant",
    date: "2026/09/01",
    title: "LILY BROWN × MARY QUANT",
    status: "連線代購",
    body: "漂亮衣服的季節又來了。LILY BROWN × MARY QUANT 的聯名配色很有秋天感，社群內有店鋪實拍與商品公告。"
  },
  {
    id: "sorin-hello-kitty",
    date: "2026/08/31",
    title: "SORIN × Hello Kitty",
    status: "預購",
    body: "蝴蝶結與 Hello Kitty 聯名，透膚上衣也是滿滿 Kitty。商品款式以 LINE 社群貼文為準。"
  },
  {
    id: "monchhichi-emoda",
    date: "2026/08/29",
    title: "Monchhichi × EMODA 聯名系列",
    status: "預購",
    body: "社群貼文公告大學 T、針織上衣等品項，價格與尺寸資訊在貼文圖片中標示。"
  },
  {
    id: "mary-quant-ballet-shoes",
    date: "2026/08/20",
    title: "MARY QUANT 芭蕾舞鞋",
    status: "預購",
    body: "芭蕾舞鞋新款公告，款式與尺寸以社群貼文為準，喜歡可私訊詢問。"
  },
  {
    id: "mary-quant-suede-sneakers",
    date: "2026/08/20",
    title: "MARY QUANT 蝴蝶結麂皮休閒鞋",
    status: "預購",
    body: "蝴蝶結綁帶搭配小花細節，在休閒鞋中加入甜甜的可愛感，三個顏色都很適合秋冬。"
  },
  {
    id: "rodeo-bow-jacket",
    date: "2026/08/16",
    title: "RODEO CROWNS WIDE BOWL 蝴蝶結外套",
    price: "NT$3480",
    status: "預購",
    body: "蝴蝶結外套一直人氣不減，今年還推出新色。一件外套就能成為整套穿搭的主角。"
  },
  {
    id: "sanrio-house-doll-charms",
    date: "2026/08/14",
    title: "Sanrio house 娃娃吊飾",
    status: "預購",
    body: "角色選擇很多，毛茸茸的材質摸起來很舒服，實品也很可愛。"
  },
  {
    id: "usagi-online-sale",
    date: "2026/08/07",
    title: "USAGI ONLINE 限時打折",
    status: "限時收單",
    body: "USAGI ONLINE 折扣活動，更多品項參與折扣。收單時間以 LINE 社群貼文公告為準。"
  },
  {
    id: "kbf-final-sale",
    date: "2026/08/06",
    title: "KBF FINAL SALE",
    status: "限時收單",
    body: "KBF 限時特價倒數，之前沒有特價的款式也陸續加入優惠。想入手可私訊確認。"
  },
  {
    id: "snidel-kuromi",
    date: "2026/07/22",
    title: "SNIDEL × KUROMI 聯名系列",
    status: "預購",
    body: "除了睡衣外連外出服都有酷洛米聯名。價格圖片已標示，官方預計七月下旬至八月上旬出貨。"
  },
  {
    id: "snidel-home-kuromi",
    date: "2026/07/22",
    title: "SNIDEL HOME × KUROMI 聯名系列",
    status: "預購",
    body: "酷洛米聯名家居服系列，社群內發布款式與資訊，喜歡可私訊確認。"
  },
  {
    id: "sanrio-house-tshirt",
    date: "2026/07/20",
    title: "Sanrio house 新品短袖上衣",
    status: "預購",
    body: "Sanrio house 新品短袖登場，Hello Kitty、Kuromi 等款式以社群貼文為準。"
  },
  {
    id: "cocodeal-sale",
    date: "2026/07/10",
    title: "COCO DEAL 夏季折扣優惠",
    status: "限時收單",
    body: "COCO DEAL 夏季折扣商品公告，熱門款與熱門尺寸缺貨速度快，建議提早詢問。"
  },
  {
    id: "sorin-bow-camisole",
    date: "2026/07/10",
    title: "SORIN 蝴蝶結吊帶上衣",
    status: "預購",
    body: "之前賣出很多件的蝴蝶結吊帶上衣推出夏天新色，搭在普通上衣外面就很有亮點。"
  },
  {
    id: "lillian-carat-sale",
    date: "2026/07/08",
    title: "LILLIAN CARAT 折扣季",
    status: "限時收單",
    body: "LILLIAN CARAT 折扣季，洋裝、上衣等商品可依社群實拍私訊詢問。"
  },
  {
    id: "kbf-sale",
    date: "2026/07/06",
    title: "KBF 折扣季",
    status: "限時收單",
    body: "KBF 折扣季商品公告。因款式較多，如有喜歡的商品請私訊確認價格與尺寸。"
  },
  {
    id: "kyoto-chiikawa",
    date: "2025/06/30",
    title: "京都限定吉伊卡哇連線代購",
    status: "連線代購",
    body: "京都限定吉伊卡哇商品連線代購，款式與庫存依現場情況確認。"
  },
  {
    id: "sousou-kyoto",
    date: "2025/06/30",
    title: "京都 SOU・SOU 帆布袋與口金包",
    status: "連線代購",
    body: "來自京都的品牌 SOU・SOU 帆布袋、口金包。大容量設計，適合喜歡日系穿搭的客人。"
  },
  {
    id: "esther-bunny-charm",
    date: "2025/06/29",
    title: "Esther Bunny 娃娃吊飾",
    status: "預購",
    body: "韓國女孩人手一隻的 Esther Bunny，日本也很有人氣。金屬愛心掛鉤設計，可掛包包、鑰匙、手機。預購時間以社群貼文為準。"
  },
  {
    id: "biore-uv",
    date: "2025/06/28",
    title: "Biore UV Aqua Rich 密著舒芙蕾防曬",
    status: "現貨",
    body: "日本藥妝店熱賣的呼吸感防曬，SPF50+ PA++++。現貨在台，數量不多。"
  },
  {
    id: "kitty-pouch",
    date: "2025/06/27",
    title: "京都限定 Hello Kitty 口金包",
    status: "限時收單",
    body: "京都限定 Hello Kitty 口金包，限購商品數量有限，有需要可直接私訊。"
  },
  {
    id: "twice-japan-goods",
    date: "2025/06/23",
    title: "TWICE JAPAN 官方周邊",
    status: "預購",
    body: "TWICE JAPAN 官方釋出周邊，想加入行列可直接私訊詢問。"
  },
  {
    id: "tirtir-lip",
    date: "2025/05/29",
    title: "TIRTIR 雙頭水潤唇膏",
    status: "預購",
    body: "日本熱銷 TIRTIR 雙頭水潤唇膏，一頭滋潤修護，一頭打造嘟嘟豐唇感。"
  },
  {
    id: "clayge-cinnamonroll",
    date: "2025/06/18",
    title: "CINNAMOROLL × CLAYGE 卸妝膏",
    status: "預購",
    body: "Cinnamoroll 聯名包裝卸妝膏，藍色為肥皂香，黑色為白茶香。五效合一，包裝可愛。"
  },
  {
    id: "ball-chain",
    date: "2025/05/24",
    title: "Ball & Chain 環保袋/包包",
    status: "預購",
    body: "已代購多次的實用環保包，可折疊收納，款式多、容量實用。其他款式可傳照片詢問。"
  },
  {
    id: "refa-heart-brush",
    date: "2025/05/22",
    title: "ReFa 熱銷心形梳",
    status: "社群公告",
    body: "ReFa 熱銷心形梳，一梳撫平毛躁，商品資訊以社群貼文為準。"
  },
  {
    id: "loveliner-chiikawa",
    date: "2025/05/22",
    title: "Love Liner × CHIIKAWA 眼線液",
    price: "NT$450",
    status: "限量",
    body: "Love Liner × CHIIKAWA 限定聯名眼線液，烏薩奇款咖啡色，限定包裝且數量有限。"
  },
  {
    id: "canmake-cl01",
    date: "2025/05/22",
    title: "Canmake CL01 腮紅",
    price: "NT$200",
    status: "社群公告",
    body: "日本人氣 Canmake CL01，柔滑膏狀質地，溫柔粉紅色調，日常、約會、上班都適合。"
  }
];

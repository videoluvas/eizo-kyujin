import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const categories = [
  // 放送映像
  { nameEn: "tv", group: "放送映像", name: "テレビ", keywords: "テレビ,TV" },
  { nameEn: "broadcast", group: "放送映像", name: "放送", keywords: "放送" },
  { nameEn: "film", group: "放送映像", name: "映画", keywords: "映画,フィルム" },
  { nameEn: "drama", group: "放送映像", name: "ドラマ", keywords: "ドラマ" },
  { nameEn: "live", group: "放送映像", name: "ライブ", keywords: "ライブ" },
  { nameEn: "event", group: "放送映像", name: "イベント", keywords: "イベント" },
  { nameEn: "delivery", group: "放送映像", name: "配信", keywords: "配信,ブロードキャスト" },
  // 制作技術
  { nameEn: "video-editing", group: "制作技術", name: "編集", keywords: "編集,エディター" },
  { nameEn: "shooting", group: "制作技術", name: "撮影", keywords: "撮影,カメラマン,カメラ" },
  { nameEn: "cg", group: "制作技術", name: "CG", keywords: "CG,3DCG" },
  { nameEn: "vfx", group: "制作技術", name: "VFX", keywords: "VFX,視覚効果" },
  { nameEn: "motion-graphics", group: "制作技術", name: "モーショングラフィックス", keywords: "モーション,モーショングラフィックス" },
  { nameEn: "audio", group: "制作技術", name: "音声", keywords: "音声,音響,サウンド" },
  { nameEn: "lighting", group: "制作技術", name: "照明", keywords: "照明,ライティング" },
  // SNSデジタル
  { nameEn: "sns", group: "SNSデジタル", name: "SNS", keywords: "SNS,TikTok,Instagram,インスタ" },
  { nameEn: "youtube", group: "SNSデジタル", name: "YouTube", keywords: "YouTube,ユーチューブ,YouTuber" },
  { nameEn: "mv", group: "SNSデジタル", name: "MV", keywords: "MV,ミュージックビデオ" },
  { nameEn: "cm", group: "SNSデジタル", name: "CM", keywords: "CM,コマーシャル" },
  // クリエイティブ
  { nameEn: "director", group: "クリエイティブ", name: "ディレクター", keywords: "ディレクター,ディレクション" },
  { nameEn: "producer", group: "クリエイティブ", name: "プロデューサー", keywords: "プロデューサー,プロデュース" },
  { nameEn: "designer", group: "クリエイティブ", name: "デザイナー", keywords: "デザイナー,デザイン" },
];

async function seed() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { nameEn: category.nameEn },
      update: category,
      create: category,
    });
  }
  console.log(`${categories.length}件のカテゴリを登録しました`);
  await prisma.$disconnect();
}

seed().catch(console.error);
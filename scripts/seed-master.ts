import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const workStyles = [
  { name: "正社員" },
  { name: "アルバイト・パート" },
  { name: "契約・臨時・期間社員" },
  { name: "業務委託・在宅ワーク" },
  { name: "派遣社員" },
  { name: "新卒・インターン" },
];

const areas = [
  { name: "北海道" },
  { name: "青森県" },
  { name: "岩手県" },
  { name: "宮城県" },
  { name: "秋田県" },
  { name: "山形県" },
  { name: "福島県" },
  { name: "茨城県" },
  { name: "栃木県" },
  { name: "群馬県" },
  { name: "埼玉県" },
  { name: "千葉県" },
  { name: "東京都" },
  { name: "神奈川県" },
  { name: "新潟県" },
  { name: "富山県" },
  { name: "石川県" },
  { name: "福井県" },
  { name: "山梨県" },
  { name: "長野県" },
  { name: "岐阜県" },
  { name: "静岡県" },
  { name: "愛知県" },
  { name: "三重県" },
  { name: "滋賀県" },
  { name: "京都府" },
  { name: "大阪府" },
  { name: "兵庫県" },
  { name: "奈良県" },
  { name: "和歌山県" },
  { name: "鳥取県" },
  { name: "島根県" },
  { name: "岡山県" },
  { name: "広島県" },
  { name: "山口県" },
  { name: "徳島県" },
  { name: "香川県" },
  { name: "愛媛県" },
  { name: "高知県" },
  { name: "福岡県" },
  { name: "佐賀県" },
  { name: "長崎県" },
  { name: "熊本県" },
  { name: "大分県" },
  { name: "宮崎県" },
  { name: "鹿児島県" },
  { name: "沖縄県" },
];

async function seed() {
  for (const ws of workStyles) {
    await prisma.workStyle.upsert({
      where: { name: ws.name },
      update: ws,
      create: ws,
    });
  }
  console.log(`${workStyles.length}件の働き方を登録しました`);

  for (const area of areas) {
    await prisma.area.upsert({
      where: { name: area.name },
      update: area,
      create: area,
    });
  }
  console.log(`${areas.length}件のエリアを登録しました`);

  await prisma.$disconnect();
}

seed().catch(console.error);
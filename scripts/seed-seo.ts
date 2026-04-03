import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.seoSetting.upsert({
    where: { page: "top" },
    update: {
      title: "映像業界の転職求人なら｜映像求人PROポータル",
      description: "映像業界・動画制作に特化した転職求人検索サービス。動画編集・撮影・ディレクター・プロデューサーなどの求人を掲載。プロの動画制作会社が運営し、求人ボックス提携の豊富な求人から理想の転職先を探せます。",
      ogTitle: "映像業界の転職求人なら｜映像求人PROポータル",
      ogDescription: "映像業界・動画制作に特化した転職求人検索サービス。動画編集、撮影、ディレクター、プロデューサーなどの転職求人をまとめて検索。",
      ogImage: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/Creator_01%20(24).jpg",
    },
    create: {
      page: "top",
      title: "映像業界の転職求人なら｜映像求人PROポータル",
      description: "映像業界・動画制作に特化した転職求人検索サービス。動画編集・撮影・ディレクター・プロデューサーなどの求人を掲載。プロの動画制作会社が運営し、求人ボックス提携の豊富な求人から理想の転職先を探せます。",
      ogTitle: "映像業界の転職求人なら｜映像求人PROポータル",
      ogDescription: "映像業界・動画制作に特化した転職求人検索サービス。動画編集、撮影、ディレクター、プロデューサーなどの転職求人をまとめて検索。",
      ogImage: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/Creator_01%20(24).jpg",
    },
  });

  await prisma.seoSetting.upsert({
    where: { page: "jobs-list" },
    update: {
      title: "映像業界の転職求人一覧｜動画制作・動画編集の求人検索｜映像求人PROポータル",
      description: "映像業界・動画制作の転職求人一覧ページです。動画編集、映像制作、撮影、ディレクター、プロデューサーなどの求人を勤務地・職種・雇用形態・キーワードから検索。自分に合った転職先を見つけられます。",
      ogTitle: "映像業界の転職求人一覧｜映像求人PROポータル",
      ogDescription: "動画編集・映像制作・撮影・ディレクターなど、映像業界の転職求人を一覧で掲載。勤務地や職種から自分に合った求人を検索できます。",
      ogImage: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/Creator_01%20(24).jpg",
    },
    create: {
      page: "jobs-list",
      title: "映像業界の転職求人一覧｜動画制作・動画編集の求人検索｜映像求人PROポータル",
      description: "映像業界・動画制作の転職求人一覧ページです。動画編集、映像制作、撮影、ディレクター、プロデューサーなどの求人を勤務地・職種・雇用形態・キーワードから検索。自分に合った転職先を見つけられます。",
      ogTitle: "映像業界の転職求人一覧｜映像求人PROポータル",
      ogDescription: "動画編集・映像制作・撮影・ディレクターなど、映像業界の転職求人を一覧で掲載。勤務地や職種から自分に合った求人を検索できます。",
      ogImage: "https://pub-647b9765a3c242dcac081e185c116796.r2.dev/Creator_01%20(24).jpg",
    },
  });

  console.log("SEO settings seeded!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
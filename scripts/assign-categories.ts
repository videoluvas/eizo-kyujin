import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function assignAllCategories() {
  const categories = await prisma.category.findMany();
  console.log(`カテゴリ数: ${categories.length}`);

  const jobs = await prisma.job.findMany({
    select: { id: true, title: true, snippet: true },
  });
  console.log(`Job数: ${jobs.length}`);

  let updated = 0;
  for (const job of jobs) {
    const text = job.title + " " + (job.snippet ?? "");
    const matched: string[] = [];

    for (const cat of categories) {
      const keywords = cat.keywords.split(",").map((k) => k.trim());
      for (const kw of keywords) {
        if (kw && text.includes(kw)) {
          matched.push(cat.name);
          break;
        }
      }
    }

    console.log(`${job.title} → ${matched.length > 0 ? matched.join(", ") : "なし"}`);

    await prisma.job.update({
      where: { id: job.id },
      data: { category: matched },
    });
    updated++;
  }

  console.log(`${updated}件のカテゴリを更新しました`);
  await prisma.$disconnect();
}

assignAllCategories().catch(console.error);
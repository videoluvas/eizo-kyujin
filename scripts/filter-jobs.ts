import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function filterJobs() {
  const now = new Date();

  try {
    const ngKeywords = await prisma.ngKeyword.findMany();

    if (ngKeywords.length === 0) {
      console.log("NGキーワードがありません");
      return;
    }

    let totalHidden = 0;

    for (const ng of ngKeywords) {
      const targets = ng.targets; // ["title", "company", "snippet"]

      const orConditions = targets.map((target) => ({
        [target]: { contains: ng.keyword },
      }));

      const result = await prisma.job.updateMany({
        where: {
          isPublished: true,
          OR: orConditions,
        },
        data: {
          isPublished: false,
        },
      });

      if (result.count > 0) {
        console.log(`[${now.toISOString()}] NG="${ng.keyword}" targets=${targets.join(",")} hidden=${result.count}`);
        totalHidden += result.count;
      }
    }

    console.log(`[${now.toISOString()}] 合計非公開=${totalHidden}`);
  } catch (error) {
    console.error("filterJobs error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

filterJobs();
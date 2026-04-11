import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export async function filterJobs() {
  const now = new Date();

  try {
    const ngKeywords = await prisma.ngKeyword.findMany();

    if (ngKeywords.length === 0) {
      console.log("NGキーワードがありません");
      return;
    }

    let totalArchived = 0;

    for (const ng of ngKeywords) {
      const orConditions = ng.targets.map((target) => ({
        [target]: { contains: ng.keyword },
      }));

      const matched = await prisma.job.findMany({
        where: { OR: orConditions },
      });

      for (const job of matched) {
        const existing = await prisma.archivedJob.findFirst({
          where: { originalId: job.id },
        });

        if (existing) {
          await prisma.archivedJob.update({
            where: { id: existing.id },
            data: {
              lastSeenAt: job.lastSeenAt,
              archivedAt: now,
              archivedBy: ng.keyword,
            },
          });
        } else {
          await prisma.archivedJob.create({
            data: {
              originalId: job.id,
              url: job.url,
              title: job.title,
              company: job.company,
              jt: job.jt,
              st: job.st,
              area: job.area,
              snippet: job.snippet,
              update: job.update,
              tracking: job.tracking,
              category: job.category,
              sourceKeyword: job.sourceKeyword,
              firstSeenAt: job.firstSeenAt,
              lastSeenAt: job.lastSeenAt,
              archivedAt: now,
              archivedBy: ng.keyword,
            },
          });
        }

        await prisma.job.delete({ where: { id: job.id } });
        totalArchived++;
      }

      if (matched.length > 0) {
        console.log(`[${now.toISOString()}] NG="${ng.keyword}" targets=${ng.targets.join(",")} archived=${matched.length}`);
      }
    }

    console.log(`[${now.toISOString()}] 合計アーカイブ=${totalArchived}`);
  } catch (error) {
    console.error("filterJobs error:", error);
  }
}
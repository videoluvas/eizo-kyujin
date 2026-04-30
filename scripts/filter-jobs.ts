import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function archiveJob(job: any, now: Date, reason: string) {
  const existing = await prisma.archivedJob.findFirst({
    where: { originalId: job.id },
  });

  if (existing) {
    await prisma.archivedJob.update({
      where: { id: existing.id },
      data: {
        lastSeenAt: job.lastSeenAt,
        archivedAt: now,
        archivedBy: reason,
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
        archivedBy: reason,
      },
    });
  }

  await prisma.job.delete({ where: { id: job.id } });
}

export async function filterJobs() {
  const now = new Date();

  try {
    const ngKeywords = await prisma.ngKeyword.findMany();

    let totalArchived = 0;

    // NGキーワードマッチ
    if (ngKeywords.length > 0) {
      for (const ng of ngKeywords) {
        const orConditions = ng.targets.map((target) => ({
          [target]: { contains: ng.keyword },
        }));

        const matched = await prisma.job.findMany({
          where: { OR: orConditions },
        });

        for (const job of matched) {
          await archiveJob(job, now, ng.keyword);
          totalArchived++;
        }

        if (matched.length > 0) {
          console.log(`[${now.toISOString()}] NG="${ng.keyword}" targets=${ng.targets.join(",")} archived=${matched.length}`);
        }
      }
    }

    // カテゴリなし求人
    const noCategory = await prisma.job.findMany({
      where: { category: { isEmpty: true } },
    });

    for (const job of noCategory) {
      await archiveJob(job, now, "no_category");
      totalArchived++;
    }

    if (noCategory.length > 0) {
      console.log(`[${now.toISOString()}] カテゴリなしアーカイブ=${noCategory.length}`);
    }

    console.log(`[${now.toISOString()}] 合計アーカイブ=${totalArchived}`);

    // 1日以上前のアーカイブを削除
    const cutoff = new Date(now.getTime() - 1 * 60 * 1000);
    const deleted = await prisma.archivedJob.deleteMany({
      where: { archivedAt: { lt: cutoff } },
    });

    if (deleted.count > 0) {
      console.log(`[${now.toISOString()}] 古いアーカイブ削除=${deleted.count}`);
    }

  } catch (error) {
    console.error("filterJobs error:", error);
  }
}
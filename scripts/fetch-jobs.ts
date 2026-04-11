import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const API_KEY = process.env.KYUJIN_BOX_API_KEY!;
const PUBLISHER_ID = process.env.KYUJIN_BOX_PUBLISHER_ID!;
const DOMAIN = process.env.KYUJIN_BOX_DOMAIN!;

function assignCategories(
  title: string,
  snippet: string,
  categories: { name: string; keywords: string }[]
): string[] {
  const text = `${title ?? ""} ${snippet ?? ""}`;
  const matched: string[] = [];

  for (const cat of categories) {
    const keywords = cat.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    for (const kw of keywords) {
      if (text.includes(kw)) {
        matched.push(cat.name);
        break;
      }
    }
  }

  return matched;
}

async function fetchJobs() {
  const now = new Date();

  try {
    const searchKeywords = await prisma.searchKeyword.findMany({
      where: { isActive: true },
      orderBy: { id: "asc" },
    });

    if (searchKeywords.length === 0) {
      console.log("キーワードがありません");
      return;
    }

    const categories = await prisma.category.findMany();

    // fetchCountが最小のグループからランダム選択
    const minFetchCount = Math.min(...searchKeywords.map((k) => k.fetchCount));
    const candidates = searchKeywords.filter((k) => k.fetchCount === minFetchCount);
    const target = candidates[Math.floor(Math.random() * candidates.length)];

    const currentStart = target.currentStart ?? 1;

    const queryString = new URLSearchParams({
      key: API_KEY,
      publisher: PUBLISHER_ID,
      domain: DOMAIN,
      format: "json",
      kw: target.keyword,
      jt: "1",
      st: "3",
      update: "3",
      filter: "2",
      start: String(currentStart),
      limit: "50",
      ip: "0.0.0.0",
      ua: "ua",
    }).toString().replace(/\+/g, "%20");

    const fullUrl = `https://xn--pckua2a7gp15o89zb.com/api/a/v1/jobs?${queryString}`;
    const res = await fetch(fullUrl);

    // 400エラー＝上限超え → リセット＋fetchCount+1
    if (res.status === 400) {
      await prisma.searchKeyword.update({
        where: { id: target.id },
        data: {
          currentStart: 1,
          fetchCount: { increment: 1 },
          total: currentStart > 1 ? currentStart - 1 : null,
        },
      });
      console.log(
        `[${now.toISOString()}] kw="${target.keyword}" 400エラー→リセット fetchCount+1`
      );
      return;
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API request failed: ${res.status} ${res.statusText} / ${text}`);
    }

    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error(`エラー [${target.keyword}]:`, data);
      return;
    }

    const fetchedCount = data.results.length;

    let nextStart: number;
    let confirmedTotal: number | null;
    let isCompleted = false;

    if (fetchedCount < 50) {
      // 全件取得完了 → リセット＋fetchCount+1
      nextStart = 1;
      confirmedTotal = currentStart + fetchedCount - 1;
      isCompleted = true;
    } else {
      // 続きあり
      nextStart = currentStart + 50;
      confirmedTotal = null;
    }

await prisma.searchKeyword.update({
  where: { id: target.id },
  data: {
    currentStart: nextStart,
    total: isCompleted ? confirmedTotal : null,
    ...(isCompleted ? { fetchCount: { increment: 1 } } : {}),
  },
});

    let createdCount = 0;
    let updatedCount = 0;

    for (const job of data.results) {
      const titleKey = job.title ?? "";
      const companyKey = job.company ?? "";

      const existing = await prisma.job.findUnique({
        where: {
          title_company: {
            title: titleKey,
            company: companyKey,
          },
        },
        select: {
          id: true,
          category: true,
        },
      });

      const category =
        existing && existing.category.length > 0
          ? existing.category
          : assignCategories(job.title ?? "", job.snippet ?? "", categories);

      await prisma.job.upsert({
        where: {
          title_company: {
            title: titleKey,
            company: companyKey,
          },
        },
        update: {
          url: job.url,
          tracking: job.tracking ?? null,
          jt: job.jt ?? null,
          st: job.st ?? null,
          area: job.area ?? null,
          snippet: job.snippet ?? null,
          update: job.update ? new Date(job.update) : null,
          lastSeenAt: now,
        },
        create: {
          url: job.url,
          title: titleKey,
          company: companyKey,
          jt: job.jt ?? null,
          st: job.st ?? null,
          area: job.area ?? null,
          snippet: job.snippet ?? null,
          update: job.update ? new Date(job.update) : null,
          tracking: job.tracking ?? null,
          category,
          firstSeenAt: now,
          lastSeenAt: now,
        },
      });

      if (existing) {
        updatedCount++;
      } else {
        createdCount++;
      }
    }

    const cutoff = new Date(now.getTime() - 72 * 60 * 60 * 1000);
    const deleted = await prisma.job.deleteMany({
      where: {
        lastSeenAt: { lt: cutoff },
      },
    });

    console.log(
      `[${now.toISOString()}] kw="${target.keyword}" progress=${currentStart}/${confirmedTotal ?? target.total ?? "?"} fetched=${fetchedCount} created=${createdCount} updated=${updatedCount} deleted=${deleted.count}${isCompleted ? " ✅完了→fetchCount+1" : ""}`
    );
  } catch (error) {
    console.error("fetchJobs error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchJobs();
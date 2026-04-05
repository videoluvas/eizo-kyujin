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

    // 今の分数でキーワードをローテーション
    const minute = now.getMinutes();
    const target = searchKeywords[minute % searchKeywords.length];

    const url = new URL("https://xn--pckua2a7gp15o89zb.com/api/a/v1/jobs");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("publisher", PUBLISHER_ID);
    url.searchParams.set("domain", DOMAIN);
    url.searchParams.set("format", "json");
    url.searchParams.set("kw", target.keyword);
    url.searchParams.set("filter", "2");
    url.searchParams.set("start", "1");
    url.searchParams.set("limit", "50");
    url.searchParams.set("ip", "0.0.0.0");
    url.searchParams.set("ua", "ua");

    const res = await fetch(url.toString());

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API request failed: ${res.status} ${res.statusText} / ${text}`);
    }

    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error(`エラー [${target.keyword}]:`, data);
      return;
    }

    let createdCount = 0;
    let updatedCount = 0;

    for (const job of data.results) {
      const existing = await prisma.job.findUnique({
        where: { url: job.url },
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
        where: { url: job.url },
        update: {
          title: job.title ?? "",
          company: job.company ?? "",
          jt: job.jt ?? null,
          st: job.st ?? null,
          area: job.area ?? null,
          snippet: job.snippet ?? null,
          update: job.update ? new Date(job.update) : null,
          tracking: job.tracking ?? null,
          lastSeenAt: now,
        },
        create: {
          url: job.url,
          title: job.title ?? "",
          company: job.company ?? "",
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

    // 24時間以上取得できていない求人を削除
    const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const deleted = await prisma.job.deleteMany({
      where: {
        lastSeenAt: {
          lt: cutoff,
        },
      },
    });

    console.log(
      `[${now.toISOString()}] kw="${target.keyword}" fetched=${data.results.length} created=${createdCount} updated=${updatedCount} deleted=${deleted.count} total=${data.total}`
    );
  } catch (error) {
    console.error("fetchJobs error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchJobs();
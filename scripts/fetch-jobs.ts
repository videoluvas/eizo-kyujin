import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const API_KEY = process.env.KYUJIN_BOX_API_KEY!;
const PUBLISHER_ID = process.env.KYUJIN_BOX_PUBLISHER_ID!;
const DOMAIN = process.env.KYUJIN_BOX_DOMAIN!;

async function fetchJobs() {
  const keywords = await prisma.searchKeyword.findMany({
    where: { isActive: true },
    orderBy: { id: "asc" },
  });

  if (keywords.length === 0) {
    console.log("キーワードがありません");
    await prisma.$disconnect();
    return;
  }

  // 今の分数でキーワードをローテーション
  const minute = new Date().getMinutes();
  const target = keywords[minute % keywords.length];

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
  const data = await res.json();

  if (!data.results) {
    console.error(`エラー [${target.keyword}]:`, data);
    await prisma.$disconnect();
    return;
  }

  // 取得した求人を保存
  for (const job of data.results) {
    await prisma.job.upsert({
      where: { url: job.url },
      update: {
        title: job.title,
        company: job.company,
        jt: job.jt,
        st: job.st,
        area: job.area,
        snippet: job.snippet,
        update: job.update ? new Date(job.update) : null,
        tracking: job.tracking,
      },
      create: {
        url: job.url,
        title: job.title,
        company: job.company,
        jt: job.jt,
        st: job.st,
        area: job.area,
        snippet: job.snippet,
        update: job.update ? new Date(job.update) : null,
        tracking: job.tracking,
      },
    });
  }

  // 今回取得したURL以外を削除
  const fetchedUrls = data.results.map((job: any) => job.url);
  const deleted = await prisma.job.deleteMany({
    where: {
      url: { notIn: fetchedUrls },
    },
  });
  if (deleted.count > 0) {
    console.log(`${deleted.count}件削除`);
  }

  console.log(`[${new Date().toISOString()}] ${target.keyword}: ${data.results.length}件保存 (total: ${data.total})`);

  await prisma.$disconnect();
}

fetchJobs().catch(console.error);
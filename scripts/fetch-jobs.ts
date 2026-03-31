import { PrismaClient } from "../app/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const API_KEY = process.env.KYUJIN_BOX_API_KEY!;
const PUBLISHER_ID = process.env.KYUJIN_BOX_PUBLISHER_ID!;
const DOMAIN = process.env.KYUJIN_BOX_DOMAIN!;

const SEARCH_PARAMS = [
  { kw: "動画編集", area: "東京都" },
  { kw: "映像制作", area: "東京都" },
  { kw: "動画編集", area: "大阪府" },
];

async function fetchJobs() {
  for (const params of SEARCH_PARAMS) {
    const url = new URL("https://xn--pckua2a7gp15o89zb.com/api/a/v1/jobs");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("publisher", PUBLISHER_ID);
    url.searchParams.set("domain", DOMAIN);
    url.searchParams.set("format", "json");
    url.searchParams.set("kw", params.kw);
    url.searchParams.set("area", params.area);
    url.searchParams.set("filter", "2");
    url.searchParams.set("start", "1");
    url.searchParams.set("limit", "50");
    url.searchParams.set("ip", "0.0.0.0");
    url.searchParams.set("ua", "ua");

    const res = await fetch(url.toString());
    const data = await res.json();
console.log(JSON.stringify(data.results?.[0], null, 2)); // 最初の1件だけ表示

    if (!data.results) {
      console.error("エラー:", data);
      continue;
    }

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
    console.log(`${params.kw} / ${params.area}: ${data.results.length}件保存`);
  }

  await prisma.$disconnect();
}

fetchJobs().catch(console.error);
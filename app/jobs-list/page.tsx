/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { prisma } from "@/app/lib/prisma";
import JobListClient from "./JobListClient";
import SearchForm from "@/components/search/SearchForm";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSetting.findUnique({
      where: { page: "jobs-list" }
    });
    console.log("SEO data:", seo);
    return {
      title: seo?.title ?? "デフォルトタイトル",
      description: seo?.description ?? "デフォルト説明",
      openGraph: {
        title: seo?.ogTitle || seo?.title || "",
        description: seo?.ogDescription || seo?.description || "",
        images: seo?.ogImage ? [seo.ogImage] : [],
      },
    };
  } catch (e) {
    console.error("SEO fetch error:", e);
    return { title: "エラー" };
  }
}

type Props = {
  searchParams: Promise<{
    workStyle?: string;
    area?: string;
    category?: string;
    kw?: string;
    sort?: string;
    perPage?: string;
    page?: string;
  }>;
};

export default async function JobList({ searchParams }: Props) {
  const { workStyle, area, category, kw } = await searchParams;

  // 特殊文字をエスケープ
  const escapedKw = kw ? kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : "";

  const categoryList = category
    ? Array.isArray(category)
      ? category
      : category.split(",")
    : [];

  const where: any = {};
  if (workStyle) where.jt = { contains: workStyle };
  if (area) where.area = { contains: area };

  if (categoryList.length > 0 && escapedKw) {
    where.AND = [
      { OR: categoryList.map((cat) => ({ category: { has: cat } })) },
      { OR: [
        { title: { contains: escapedKw, mode: "insensitive" } },
        { snippet: { contains: escapedKw, mode: "insensitive" } },
        { company: { contains: escapedKw, mode: "insensitive" } },
        { area: { contains: escapedKw, mode: "insensitive" } },
      ]},
    ];
  } else if (categoryList.length > 0) {
    where.OR = categoryList.map((cat) => ({ category: { has: cat } }));
  } else if (escapedKw) {
    where.OR = [
      { title: { contains: escapedKw, mode: "insensitive" } },
      { snippet: { contains: escapedKw, mode: "insensitive" } },
      { company: { contains: escapedKw, mode: "insensitive" } },
      { area: { contains: escapedKw, mode: "insensitive" } },
    ];
  }

  const [jobs, workStyles, areas, categories] = await Promise.all([
    prisma.job.findMany({ where, orderBy: { update: "desc" } }),
    prisma.workStyle.findMany({ orderBy: { id: "asc" } }),
    prisma.area.findMany({ orderBy: { id: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const total = jobs.length;

  return (
    <>
      <Layout>
        {/* SEO用h1 */}
        <div className="page-seo-hidden">
          <h1>
            映像業界・動画制作の転職求人検索｜未経験・編集・ディレクター案件掲載
          </h1>
        </div>
        <div>
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-single banner-single-bg">
                <div className="block-banner text-center">
                  <h2 className="wow animate__animated animate__fadeInUp">
  映像業界の転職求人を検索
  <span style={{
    fontSize: "13px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #0EA5E9, #3B64F4)",
    color: "#fff",
    borderRadius: "20px",
    padding: "3px 12px",
    marginLeft: "12px",
    verticalAlign: "middle",
    letterSpacing: "0.5px",
  }}>
    ● 毎分更新中
  </span>
</h2>
                  <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                    映像制作者・動画クリエイター向けの転職求人を掲載中。
                    <br className="d-none d-xl-block" />
                    動画制作会社・事業会社・スタジオなど、幅広い求人から検索できます。
                    勤務地・職種・雇用形態・キーワードで絞り込み、
                    自分に合った転職先を見つけましょう。
                  </div>
                  <Suspense>
                    <SearchForm workStyles={workStyles} areas={areas} categories={categories} mode="list" />
                  </Suspense>
                </div>
                {/* スポンサー表記 */}
                <div className="mt-45 text-center">
                  <a href="https://xn--pckua2a7gp15o89zb.com/" target="_blank" rel="noopener noreferrer">
                    <img src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/logo_kyuzin_box_01.png" alt="求人ボックス" style={{ height: "40px", verticalAlign: "middle" }} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="section-box mt-30">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Suspense>
                    <JobListClient jobs={jobs} total={total} />
                  </Suspense>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
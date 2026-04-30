/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout/Layout";
import CategorySlider from "@/components/sliders/CategorySlider";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import SearchForm from "@/components/search/SearchForm";
import CategoryJobs from "@/components/jobs/CategoryJobs";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await prisma.seoSetting.findUnique({
      where: { page: "top" }
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

export default async function Home() {
  const [workStyles, areas, categories, featuredCategories, groupedCategories] = await Promise.all([
  prisma.workStyle.findMany({ orderBy: { id: "asc" } }),
  prisma.area.findMany({ orderBy: { id: "asc" } }),
  prisma.category.findMany({ orderBy: { name: "asc" } }),
  prisma.category.findMany({
    where: { order: { gt: 0 } },
    orderBy: { order: "desc" },
    take: 6,
  }),
  prisma.category.findMany({ orderBy: { group: "asc" } }),
]);

  const categoryJobs = await Promise.all(
    featuredCategories.map(async (cat) => ({
      category: cat,
jobs: await prisma.job.findMany({
  where: { category: { has: cat.name } },
  orderBy: { update: "desc" },
  take: 8,
}),
    }))
  );

  return (
    <Layout>
      <div className="bg-homepage1" />
{/* SEO用h1 */}
<div className="seo-heading-wrapper">
  <h1 className="seo-heading-1 font-xs color-text-paragraph-2">
    映像業界・動画制作に特化した転職求人検索サービス
  </h1>
</div>
      {/* ヒーローバナー */}
      <section className="section-box">
        <div className="banner-hero hero-1">
          <div className="banner-inner">
            <div className="row">
              <div className="col-xl-10 col-lg-12">
                <div className="block-banner">
                  <h2 className="heading-banner wow animate__animated animate__fadeInUp">
                    映像業界・動画制作に特化した
                    <span className="color-brand-2">転職求人検索サービス</span>
                    <br className="d-none d-lg-block" />
                    理想の転職先を見つけよう
                  </h2>
                  <div className="banner-description mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                    映像制作者・動画クリエイター向けの転職求人を横断検索。
                    <br className="d-none d-lg-block" />
                    勤務地・職種・雇用形態・キーワードから、自分に合った職場を探せます。
                  </div>
                  <Suspense>
                    <SearchForm workStyles={workStyles} areas={areas} categories={categories} mode="top" />
                  </Suspense>
                {/* スポンサー表記 */}
                <div className="mt-45 text-center">
                  <a href="https://xn--pckua2a7gp15o89zb.com/" target="_blank" rel="noopener noreferrer">
                    <img className="sponsor-logo" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/logo_kyuzin_box_01.png" alt="求人ボックス" />
                  </a>
                </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-12 d-none d-xl-block col-md-6">
                <div className="banner-imgs">
                  <div className="block-1 shape-1">
                    <img className="img-responsive" alt="映像求人PRO" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizo-job_banner1.png" />
                  </div>
                  <div className="block-2 shape-2">
                    <img className="img-responsive" alt="映像求人PRO" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizo-job_banner2.png" />
                  </div>
                  <div className="block-3 shape-3">
                    <img className="img-responsive" alt="映像求人PRO" src="assets/imgs/page/homepage1/icon-top-banner.png" />
                  </div>
                  <div className="block-4 shape-3">
                    <img className="img-responsive" alt="映像求人PRO" src="assets/imgs/page/homepage1/icon-bottom-banner.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-100" />

      {/* 注目の求人 */}
      <section className="section-box mt-50 section-category-mobile-tight">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">人気の求人カテゴリ</h2>
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
              多くの動画クリエイターが検索している求人カテゴリをピックアップ。
            </p>
          </div>
          <CategoryJobs categoryJobs={categoryJobs} />
        </div>
      </section>

      {/* 職種から求人を探す */}
      <section className="section-box mt-80">
        <div className="section-box wow animate__animated animate__fadeIn">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">さまざまな手段で転職求人を探せます</h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                映像業界に特化した切り口から、効率よく自分に合った転職先を見つけることができます。
              </p>
            </div>
            <div className="box-swiper mt-50">
              <CategorySlider categories={groupedCategories} />
            </div>
          </div>
        </div>
      </section>

      {/* 映像制作者向け求人を掲載 */}
      <section className="section-box overflow-visible mt-100 mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="box-image-job">
                <img className="img-job-1" alt="映像クリエイターのための転職求人プラットフォーム" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizo-job_banner3%20(2).png" />
                <img className="img-job-2" alt="映像クリエイターのための転職求人プラットフォーム" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/eizo-job_banner3%20(1).png" />
                <figure className="wow animate__animated animate__fadeIn">
                  <img alt="映像クリエイターのための転職求人プラットフォーム" src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/Creator_01%20(13).jpg" />
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="content-job-inner">
<span className="color-text-mutted" style={{ fontSize: "20px", fontWeight: "700" }}>映像クリエイターのための転職求人プラットフォーム</span>
<h2 className="wow animate__animated animate__fadeInUp" style={{ fontSize: "42px", fontWeight: "700" }}>
  <span className="color-brand-2">プロの動画制作会社</span>が運営
</h2>
                <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">
                 現場を知るクリエイター目線で、実態に即した求人情報を掲載しています。

映像制作会社、動画編集、撮影、ディレクターなど、
映像業界に特化した転職求人をわかりやすく整理。
未経験からキャリアアップまで、幅広い転職ニーズに対応しています。
                </div>
                <div className="mt-40">
                  <div className="wow animate__animated animate__fadeInUp">
                    <Link href="/jobs-list"><span className="btn btn-default">求人を探す</span></Link>
                    <Link href="https://www.luvas.red/"><span className="btn btn-link">運営会社</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* 勤務地から求人を探す */}
<section className="section-box mt-50 area-card-section">
  <div className="container">
    <div className="text-center">
      <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">勤務地から転職求人を探す</h2>
      <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
        全国の映像業界求人をエリアごとに検索。
制作会社・事業会社・スタジオなど、自分に合った勤務地を見つけましょう。
      </p>
    </div>
  </div>
  <div className="container">
    <div className="row mt-50">
      {[...areas]
        .sort((a, b) => b.order - a.order)
        .slice(0, 6)
        .map((areaItem) => (
          <div key={areaItem.id} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div className="card-image-top hover-up">
              <Link href={`/jobs-list?area=${encodeURIComponent(areaItem.name)}`}>
                <div
                  className="image"
                  style={{
                    backgroundImage: `url("${areaItem.imgUrl || 'assets/imgs/page/homepage1/location1.png'}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Link>
              <div className="informations">
                <Link href={`/jobs-list?area=${encodeURIComponent(areaItem.name)}`}>
                  <h3 style={{ fontSize: "16px", marginTop: "8px" }}>{areaItem.name}の映像求人</h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</section>

    </Layout>
  );
}
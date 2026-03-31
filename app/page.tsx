/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout/Layout";
import CategorySlider from "@/components/sliders/Category";
import CategoryTab from "@/components/elements/CategoryTab";
import Link from "next/link";
import { Briefcase, MapPin, Grid3X3, Search, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="bg-homepage1" />

      <section className="section-box">
        <div className="banner-hero hero-1">
          <div className="banner-inner">
            <div className="row">
              <div className="col-xl-10 col-lg-12">
                <div className="block-banner">
                  <h1 className="heading-banner wow animate__animated animate__fadeInUp">
                    映像制作者に特化した
                    <span className="color-brand-2">求人検索サービス</span>
                    <br className="d-none d-lg-block" />
                    理想の案件・転職先を探そう
                  </h1>

                  <div
                    className="banner-description mt-20 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".1s"
                  >
                    映像制作会社・動画クリエイター向けの求人を検索できます。
                    <br className="d-none d-lg-block" />
                    働き方・エリア・カテゴリ・キーワードから、自分に合った求人を見つけられます。
                  </div>

                  <div
                    className="form-find mt-40 wow animate__animated animate__fadeIn"
                    data-wow-delay=".2s"
                  >
                    <form
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.1fr 1.1fr 1.1fr 1.5fr auto",
                        gap: "0",
                        alignItems: "center",
                        maxWidth: "1120px",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "0 18px",
                          borderRight: "1px solid #e5e7eb",
                          minHeight: "56px",
                        }}
                      >
                        <Briefcase size={18} color="#94a3b8" />
                        <select
                          className="form-input"
                          style={{
                            border: "none",
                            boxShadow: "none",
                            padding: 0,
                            background: "transparent",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                        >
                          <option value="">働き方</option>
                          <option value="fulltime">正社員</option>
                          <option value="contract">業務委託</option>
                          <option value="parttime">アルバイト</option>
                          <option value="freelance">フリーランス</option>
                          <option value="intern">インターン</option>
                        </select>
                        <ChevronDown size={16} color="#94a3b8" />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "0 18px",
                          borderRight: "1px solid #e5e7eb",
                          minHeight: "56px",
                        }}
                      >
                        <MapPin size={18} color="#94a3b8" />
                        <select
                          className="form-input"
                          style={{
                            border: "none",
                            boxShadow: "none",
                            padding: 0,
                            background: "transparent",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                        >
                          <option value="">エリア</option>
                          <option value="tokyo">東京</option>
                          <option value="osaka">大阪</option>
                          <option value="nagoya">名古屋</option>
                          <option value="fukuoka">福岡</option>
                          <option value="sapporo">札幌</option>
                          <option value="remote">リモート</option>
                        </select>
                        <ChevronDown size={16} color="#94a3b8" />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "0 18px",
                          borderRight: "1px solid #e5e7eb",
                          minHeight: "56px",
                        }}
                      >
                        <Grid3X3 size={18} color="#94a3b8" />
                        <select
                          className="form-input"
                          style={{
                            border: "none",
                            boxShadow: "none",
                            padding: 0,
                            background: "transparent",
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                        >
                          <option value="">カテゴリ</option>
                          <option value="editing">動画編集</option>
                          <option value="production">映像制作</option>
                          <option value="director">ディレクター</option>
                          <option value="shooting">撮影</option>
                          <option value="motion">モーショングラフィックス</option>
                          <option value="cg">CG・アニメーション</option>
                        </select>
                        <ChevronDown size={16} color="#94a3b8" />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "0 18px",
                          minHeight: "56px",
                        }}
                      >
                        <Search size={18} color="#94a3b8" />
                        <input
                          className="form-input"
                          type="text"
                          placeholder="キーワードを入力"
                          style={{
                            border: "none",
                            boxShadow: "none",
                            padding: 0,
                            background: "transparent",
                          }}
                        />
                      </div>

                      <Link
                        href="/jobs-list"
                        className="btn btn-default font-sm"
                        style={{
                          minWidth: "160px",
                          height: "56px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "16px",
                          marginLeft: "10px",
                        }}
                      >
                        <Search size={18} style={{ marginRight: "8px" }} />
                        検索する
                      </Link>
                    </form>
                  </div>

                  <div
                    className="list-tags-banner mt-60 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <strong>人気の検索:</strong>
                    <Link href="/jobs-list">動画編集</Link>
                    <Link href="/jobs-list">映像制作</Link>
                    <Link href="/jobs-list">ディレクター</Link>
                    <Link href="/jobs-list">撮影</Link>
                    <Link href="/jobs-list">モーショングラフィックス</Link>
                  </div>
                </div>
              </div>

              <div className="col-xl-2 col-lg-12 d-none d-xl-block col-md-6">
                <div className="banner-imgs">
                  <div className="block-1 shape-1">
                    <img
                      className="img-responsive"
                      alt="求人スカウト"
                      src="assets/imgs/page/homepage1/banner1.png"
                    />
                  </div>
                  <div className="block-2 shape-2">
                    <img
                      className="img-responsive"
                      alt="求人スカウト"
                      src="assets/imgs/page/homepage1/banner2.png"
                    />
                  </div>
                  <div className="block-3 shape-3">
                    <img
                      className="img-responsive"
                      alt="求人スカウト"
                      src="assets/imgs/page/homepage1/icon-top-banner.png"
                    />
                  </div>
                  <div className="block-4 shape-3">
                    <img
                      className="img-responsive"
                      alt="求人スカウト"
                      src="assets/imgs/page/homepage1/icon-bottom-banner.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-100" />

      <section className="section-box mt-80">
        <div className="section-box wow animate__animated animate__fadeIn">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                職種から求人を探す
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                映像制作に関わるさまざまな職種から、自分に合った求人を探せます
              </p>
            </div>
            <div className="box-swiper mt-50">
              <CategorySlider />
            </div>
          </div>
        </div>
      </section>

      <section className="section-box mt-50">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              注目の求人
            </h2>
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
              映像制作・動画編集・ディレクションなどの求人を掲載しています
            </p>
          </div>
          <div className="mt-70">
            <CategoryTab />
          </div>
        </div>
      </section>

      <section className="section-box overflow-visible mt-100 mb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="box-image-job">
                <img
                  className="img-job-1"
                  alt="求人スカウト"
                  src="assets/imgs/page/homepage1/img-chart.png"
                />
                <img
                  className="img-job-2"
                  alt="求人スカウト"
                  src="assets/imgs/page/homepage1/controlcard.png"
                />
                <figure className="wow animate__animated animate__fadeIn">
                  <img alt="求人スカウト" src="assets/imgs/page/homepage1/img1.png" />
                </figure>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12">
              <div className="content-job-inner">
                <span className="color-text-mutted text-32">映像制作者向け求人を掲載</span>
                <h2 className="text-52 wow animate__animated animate__fadeInUp">
                  自分に合った
                  <span className="color-brand-2">仕事</span>
                  を見つけよう
                </h2>
                <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">
                  映像制作会社、動画編集、撮影、ディレクターなど、
                  映像業界に特化した求人情報をわかりやすく掲載。
                  条件に合った求人を探しやすいシンプルな求人検索サービスです。
                </div>

                <div className="mt-40">
                  <div className="wow animate__animated animate__fadeInUp">
                    <Link href="/jobs-list">
                      <span className="btn btn-default">求人を探す</span>
                    </Link>

                    <Link href="/page-about">
                      <span className="btn btn-link">詳しく見る</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-box mt-50">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              勤務地から求人を探す
            </h2>
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
              エリアごとの求人をチェックして、自分に合った勤務地を見つけましょう
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row mt-50">
            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
              <div className="card-image-top hover-up">
                <Link href="/jobs-list">
                  <div
                    className="image"
                    style={{ backgroundImage: "url(assets/imgs/page/homepage1/location1.png)" }}
                  >
                    <span className="lbl-hot">注目</span>
                  </div>
                </Link>

                <div className="informations">
                  <Link href="/jobs-list">
                    <h5>東京</h5>
                  </Link>

                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="text-14 color-text-paragraph-2">求人 5件</span>
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <span className="color-text-paragraph-2 text-14">企業 120社</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-7 col-sm-12 col-12">
              <div className="card-image-top hover-up">
                <Link href="/jobs-list">
                  <div
                    className="image"
                    style={{ backgroundImage: "url(assets/imgs/page/homepage1/location2.png)" }}
                  >
                    <span className="lbl-hot">人気</span>
                  </div>
                </Link>

                <div className="informations">
                  <Link href="/jobs-list">
                    <h5>大阪</h5>
                  </Link>

                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="text-14 color-text-paragraph-2">求人 7件</span>
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <span className="color-text-paragraph-2 text-14">企業 68社</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
              <div className="card-image-top hover-up">
                <Link href="/jobs-list">
                  <div
                    className="image"
                    style={{ backgroundImage: "url(assets/imgs/page/homepage1/location3.png)" }}
                  >
                    <span className="lbl-hot">注目</span>
                  </div>
                </Link>

                <div className="informations">
                  <Link href="/jobs-list">
                    <h5>名古屋</h5>
                  </Link>

                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="text-14 color-text-paragraph-2">求人 9件</span>
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <span className="color-text-paragraph-2 text-14">企業 80社</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
              <div className="card-image-top hover-up">
                <Link href="/jobs-list">
                  <div
                    className="image"
                    style={{ backgroundImage: "url(assets/imgs/page/homepage1/location4.png)" }}
                  />
                </Link>

                <div className="informations">
                  <Link href="/jobs-list">
                    <h5>福岡</h5>
                  </Link>

                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="text-14 color-text-paragraph-2">求人 16件</span>
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <span className="color-text-paragraph-2 text-14">企業 86社</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12">
              <div className="card-image-top hover-up">
                <Link href="/jobs-list">
                  <div
                    className="image"
                    style={{ backgroundImage: "url(assets/imgs/page/homepage1/location5.png)" }}
                  />
                </Link>

                <div className="informations">
                  <Link href="/jobs-list">
                    <h5>札幌</h5>
                  </Link>

                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="text-14 color-text-paragraph-2">求人 39件</span>
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <span className="color-text-paragraph-2 text-14">企業 186社</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
              <div className="card-image-top hover-up">
                <Link href="/jobs-list">
                  <div
                    className="image"
                    style={{ backgroundImage: "url(assets/imgs/page/homepage1/location6.png)" }}
                  />
                </Link>

                <div className="informations">
                  <Link href="/jobs-list">
                    <h5>リモート</h5>
                  </Link>

                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="text-14 color-text-paragraph-2">求人 15件</span>
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <span className="color-text-paragraph-2 text-14">企業 632社</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-box mt-50 mb-20">
        <div className="container">
          <div className="box-newsletter">
            <div className="row">
              <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                <img src="assets/imgs/template/newsletter-left.png" alt="求人スカウト" />
              </div>

              <div className="col-lg-12 col-xl-6 col-12">
                <h2 className="text-md-newsletter text-center">
                  映像制作の求人を
                  <br />
                  まとめてチェック
                </h2>
                <div className="box-form-newsletter mt-40 text-center">
                  <Link href="/jobs-list" className="btn btn-default font-heading">
                    求人一覧を見る
                  </Link>
                </div>
              </div>

              <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                <img src="assets/imgs/template/newsletter-right.png" alt="求人スカウト" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
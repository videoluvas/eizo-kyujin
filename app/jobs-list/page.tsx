/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import BlogSlider from "@/components/sliders/Blog";
import { Briefcase, MapPin, Grid3X3, Search, ChevronDown } from "lucide-react";

export default function JobList() {
  return (
    <>
      <Layout>
        <div>
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-single banner-single-bg">
                <div className="block-banner text-center">
                  <h3 className="wow animate__animated animate__fadeInUp">
                    <span className="color-brand-2">22件の求人</span> を掲載中
                  </h3>
                  <div
                    className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".1s"
                  >
                    映像制作者・動画クリエイター向けの求人を検索できます。
                    <br className="d-none d-xl-block" />
                    条件に合った案件や転職先を見つけましょう。
                  </div>

                  <div
                    className="form-find text-start mt-40 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".2s"
                  >
                    <form
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.1fr 1.1fr 1.1fr 1.5fr auto",
                        gap: "0",
                        alignItems: "center",
                        maxWidth: "1680px",
                        width: "100%",
                        margin: "0 auto",
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

                      <button
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
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-box mt-30">
            <div className="container">
              <div className="row">
                {/* 左：求人一覧 */}
                <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                  <div className="content-page">
                    <div className="box-filters-job">
                      <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12">
                          <span className="text-small text-showing">
                            <strong>41-60件</strong> / <strong>944件</strong> を表示中
                          </span>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12 text-sm-end mt-15 mt-md-0">
                          <div className="display-flex2 justify-content-sm-end">
                            <div className="box-border mr-10">
                              <span className="text-sortby">表示件数:</span>
                              <div className="dropdown dropdown-sort">
                                <button
                                  className="btn dropdown-toggle"
                                  id="dropdownSort"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  data-bs-display="static"
                                >
                                  <span>12</span>
                                  <i className="fi-rr-angle-small-down" />
                                </button>
                                <ul
                                  className="dropdown-menu dropdown-menu-light"
                                  aria-labelledby="dropdownSort"
                                >
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">10</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item active">12</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">20</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="box-border">
                              <span className="text-sortby">並び順:</span>
                              <div className="dropdown dropdown-sort">
                                <button
                                  className="btn dropdown-toggle"
                                  id="dropdownSort2"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  data-bs-display="static"
                                >
                                  <span>新着順</span>
                                  <i className="fi-rr-angle-small-down" />
                                </button>
                                <ul
                                  className="dropdown-menu dropdown-menu-light"
                                  aria-labelledby="dropdownSort2"
                                >
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item active">新着順</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">古い順</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">人気順</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row display-list">
                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-4.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">Dailymotion</span>
                                  </Link>
                                  <span className="location-small">東京都 / リモート可</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">Premiere Pro</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">After Effects</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>フルスタックエンジニア</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">正社員</span>
                              <span className="card-time">
                                <span>3</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              デジタル領域のサービス開発を推進するポジションです。プロダクト改善や新規機能開発に携わっていただきます。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">年収500万円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-2.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">Adobe Illustrator</span>
                                  </Link>
                                  <span className="location-small">東京都渋谷区</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">Photoshop</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">Illustrator</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>動画エディター</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">業務委託</span>
                              <span className="card-time">
                                <span>5</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              SNS動画や広告動画の編集を担当していただきます。短尺動画の制作経験がある方歓迎です。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">時給2,500円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-3.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">Bing Search</span>
                                  </Link>
                                  <span className="location-small">大阪府大阪市</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">撮影</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">編集</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>映像ディレクター</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">正社員</span>
                              <span className="card-time">
                                <span>6</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              企画から撮影、編集ディレクションまで一貫して担当いただくポジションです。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">年収450万円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-5.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">LinkedIn</span>
                                  </Link>
                                  <span className="location-small">神奈川県横浜市</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">SNS</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">広告運用</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>SNS動画クリエイター</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">アルバイト</span>
                              <span className="card-time">
                                <span>8</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              TikTok・Instagram・YouTube Shorts向けの動画制作を行うポジションです。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">時給1,800円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-6.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">Quora JSC</span>
                                  </Link>
                                  <span className="location-small">福岡県福岡市</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">企画</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">構成</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>動画プランナー</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">正社員</span>
                              <span className="card-time">
                                <span>10</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              企業動画・採用動画・プロモーション動画の企画立案を行うポジションです。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">年収400万円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-7.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">Nintendo</span>
                                  </Link>
                                  <span className="location-small">愛知県名古屋市</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">YouTube</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">サムネイル</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>YouTube動画編集者</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">業務委託</span>
                              <span className="card-time">
                                <span>12</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              YouTubeチャンネル運用に伴う動画編集、テロップ、簡単なサムネイル制作を行います。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">1本15,000円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-12">
                        <div className="card-grid-2 hover-up">
                          <span className="flash" />
                          <div className="row">
                            <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-8.png" alt="求人企業ロゴ" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">Periscope</span>
                                  </Link>
                                  <span className="location-small">リモート</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-5 text-start text-md-end pr-30 col-md-5 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">ディレクション</span>
                                </Link>
                                <Link href="#">
                                  <span className="btn btn-grey-small mr-5">進行管理</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="card-block-info">
                            <h4>
                              <Link href="#">
                                <span>動画制作ディレクター</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">正社員</span>
                              <span className="card-time">
                                <span>15</span>
                                <span>分前</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">
                              クライアント対応、制作進行、品質管理まで幅広く担当するディレクターポジションです。
                            </p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">年収550万円</span>
                                  <span className="text-muted">〜</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                  <div
                                    className="btn btn-apply-now"
                                    data-bs-toggle="modal"
                                    data-bs-target="#ModalApplyJobForm"
                                  >
                                    応募する
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="paginations">
                      <ul className="pager">
                        <li>
                          <a className="pager-prev" href="#" />
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number">1</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number">2</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number">3</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number">4</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number">5</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number active">6</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <span className="pager-number">7</span>
                          </Link>
                        </li>
                        <li>
                          <a className="pager-next" href="#" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 右：求人詳細 */}
                <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                  <div className="sidebar-shadow none-shadow mb-30" style={{ height: "100%" }}>
                    <div className="p-4 p-md-5">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-25">
                        <div>
                          <h3 className="mb-10">シニア フルスタックエンジニア</h3>
                          <div className="d-flex flex-wrap align-items-center gap-3">
                            <span className="card-briefcase">正社員</span>
                            <span className="card-time">
                              <span>3</span>
                              <span>分前</span>
                            </span>
                          </div>
                        </div>
                        <div>
                          <div
                            className="btn btn-apply-now"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalApplyJobForm"
                          >
                            応募する
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-shadow mb-30">
                        <div className="p-4">
                          <h5 className="medium-heading mb-20">雇用情報</h5>

                          <div className="mb-15 d-flex">
                            <div style={{ minWidth: "110px" }} className="color-text-paragraph-2">
                              業界
                            </div>
                            <div>機械 / 自動車 / 建設</div>
                          </div>

                          <div className="mb-15 d-flex">
                            <div style={{ minWidth: "110px" }} className="color-text-paragraph-2">
                              給与
                            </div>
                            <div>年収800万円〜1000万円</div>
                          </div>

                          <div className="mb-15 d-flex">
                            <div style={{ minWidth: "110px" }} className="color-text-paragraph-2">
                              雇用形態
                            </div>
                            <div>正社員</div>
                          </div>

                          <div className="d-flex">
                            <div style={{ minWidth: "110px" }} className="color-text-paragraph-2">
                              更新日
                            </div>
                            <div>2026/03/11</div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-30">
                        <h4 className="mb-15">仕事内容</h4>
                        <p className="font-md color-text-paragraph mb-15">
                          デジタルプロダクトの設計・開発・改善を推進するポジションです。プロダクトチームと連携しながら、ユーザー体験の向上に向けた機能開発を行っていただきます。
                        </p>
                        <p className="font-md color-text-paragraph">
                          フロントエンドからバックエンドまで幅広く関わり、仕様策定、実装、運用改善まで一貫して担当していただきます。
                        </p>
                      </div>

                      <div className="mb-30">
                        <h4 className="mb-15">必須スキル</h4>
                        <ul className="list-dot">
                          <li className="mb-10">エンドツーエンドの開発経験</li>
                          <li className="mb-10">インタラクティブなサービス設計の実務経験</li>
                          <li className="mb-10">チームでのコミュニケーション能力</li>
                          <li className="mb-10">プロトタイプやモックの作成経験</li>
                          <li className="mb-10">タスクの見積もりと優先順位付けの経験</li>
                          <li className="mb-10">デジタルプロダクト開発の実務経験</li>
                          <li className="mb-10">デザインまたは関連分野の知識</li>
                          <li className="mb-10">Figma / Photoshop / Illustrator 等の使用経験</li>
                        </ul>
                      </div>

                      <div className="mb-0">
                        <h4 className="mb-15">歓迎する人物像</h4>
                        <p className="font-md color-text-paragraph mb-15">
                          プロダクト理解を深めながら、ユーザーとビジネスの両面に価値を出せる方を歓迎します。
                        </p>
                        <p className="font-md color-text-paragraph mb-15">
                          課題発見から改善提案まで主体的に取り組み、チームと連携しながら開発を前に進められる方に向いています。
                        </p>
                        <p className="font-md color-text-paragraph">
                          複雑な内容をわかりやすく整理し、関係者と円滑にコミュニケーションできる方を求めています。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-box mt-50 mb-50">
            <div className="container">
              <div className="text-start">
                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                  お知らせ・ブログ
                </h2>
                <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                  最新情報やお役立ち情報をお届けします
                </p>
              </div>
            </div>
            <div className="container">
              <div className="mt-50">
                <div className="box-swiper style-nav-top">
                  <BlogSlider />
                </div>
                <div className="text-center">
                  <Link href="blog-grid">
                    <span className="btn btn-brand-1 btn-icon-load mt--30 hover-up">
                      もっと見る
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="section-box mt-50 mb-20">
            <div className="container">
              <div className="box-newsletter">
                <div className="row">
                  <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                    <img src="assets/imgs/template/newsletter-left.png" alt="newsletter" />
                  </div>
                  <div className="col-lg-12 col-xl-6 col-12">
                    <h2 className="text-md-newsletter text-center">
                      新着求人や最新情報を
                      <br />
                      定期的にお届けします
                    </h2>
                    <div className="box-form-newsletter mt-40">
                      <form className="form-newsletter">
                        <input
                          className="input-newsletter"
                          type="text"
                          placeholder="メールアドレスを入力"
                        />
                        <button className="btn btn-default font-heading icon-send-letter">
                          登録する
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                    <img src="assets/imgs/template/newsletter-right.png" alt="newsletter" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
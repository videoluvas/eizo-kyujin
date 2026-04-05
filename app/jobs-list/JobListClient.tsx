"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

type Job = {
  id: number;
  url: string;
  title: string;
  company: string;
  jt: string | null;
  st: string | null;
  area: string | null;
  snippet: string | null;
  update: Date | null;
  tracking: string | null;
  category: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  jobs: Job[];
  total: number;
};

function extractMinSalary(st: string | null): number {
  if (!st) return 0;
  const match = st.replace(/,/g, "").match(/(\d+)万円/);
  return match ? parseInt(match[1]) : 0;
}

function extractMaxSalary(st: string | null): number {
  if (!st) return 0;
  const matches = st.replace(/,/g, "").match(/(\d+)万円/g);
  if (!matches) return 0;
  const nums = matches.map((m) => parseInt(m.replace("万円", "")));
  return Math.max(...nums);
}

export default function JobListClient({ jobs, total }: Props) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  // PC専用レイアウト
  const [layout, setLayout] = useState<"list" | "grid2" | "grid3">("list");
  // モバイル専用レイアウト（両方1列、スニペット有無のみ違い）
  const [mobileLayout, setMobileLayout] = useState<"list" | "compact">("list");

  const [sortOpen, setSortOpen] = useState(false);
  const [perPageOpen, setPerPageOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [mobilePerPageOpen, setMobilePerPageOpen] = useState(false);

  const currentPage = parseInt(searchParamsHook.get("page") || "1");
  const perPage = parseInt(searchParamsHook.get("perPage") || "20");
  const sortOrder = searchParamsHook.get("sort") || "newest";

  const sortLabels: Record<string, string> = {
    newest: "新着順",
    recommended: "おすすめ順",
    salary_min_high: "最低年収が高い順",
    salary_max_high: "最高年収が高い順",
  };

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`/jobs-list?${params.toString()}`);
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortOrder) {
      case "recommended":
        return b.category.length - a.category.length;
      case "newest":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "salary_min_high":
        return extractMinSalary(b.st) - extractMinSalary(a.st);
      case "salary_max_high":
        return extractMaxSalary(b.st) - extractMaxSalary(a.st);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(total / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const displayedJobs = sortedJobs.slice(start, end);

  // PC用グリッドクラス（モバイル列数は指定しない）
  const pcGridClass = {
    list: "col-xl-12 col-lg-12 col-md-12",
    grid2: "col-xl-6 col-lg-6 col-md-6",
    grid3: "col-xl-4 col-lg-4 col-md-4",
  }[layout];

  // モバイル用グリッドクラス（両方1列）
  const mobileGridClass = "col-12";

  return (
    <div className="content-page">

      {/* ========== PC用フィルターバー（md以上） ========== */}
      <div className="box-filters-job d-none d-md-block">
        <div className="row align-items-end">
          <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12">
            <span className="text-small text-showing">
              <strong>{start + 1}-{Math.min(end, total)}件</strong> / <strong>{total}件</strong> を表示中
            </span>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12 text-sm-end mt-15 mt-md-0">
            <div className="display-flex2 justify-content-sm-end">

              {/* 表示件数 */}
              <div className="box-border mr-10" style={{ position: "relative" }}>
                <span className="text-sortby">表示件数:</span>
                <div className="dropdown dropdown-sort">
                  <button className="btn dropdown-toggle" onClick={() => { setPerPageOpen(!perPageOpen); setSortOpen(false); }}>
                    <span>{perPage}</span>
                    <i className="fi-rr-angle-small-down" />
                  </button>
                  {perPageOpen && (
                    <ul className="dropdown-menu dropdown-menu-light show" style={{ position: "absolute", right: 0, zIndex: 100 }}>
                      {[10, 20, 50].map((n) => (
                        <li key={n}>
                          <span className={`dropdown-item ${perPage === n ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => { updateParams({ perPage: String(n), page: "1" }); setPerPageOpen(false); }}>
                            {n}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* 並び順 */}
              <div className="box-border mr-10" style={{ position: "relative" }}>
                <span className="text-sortby">並び順:</span>
                <div className="dropdown dropdown-sort">
                  <button className="btn dropdown-toggle" onClick={() => { setSortOpen(!sortOpen); setPerPageOpen(false); }}>
                    <span>{sortLabels[sortOrder]}</span>
                    <i className="fi-rr-angle-small-down" />
                  </button>
                  {sortOpen && (
                    <ul className="dropdown-menu dropdown-menu-light show" style={{ position: "absolute", right: 0, zIndex: 100 }}>
                      {Object.entries(sortLabels).map(([key, label]) => (
                        <li key={key}>
                          <span className={`dropdown-item ${sortOrder === key ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => { updateParams({ sort: key, page: "1" }); setSortOpen(false); }}>
                            {label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* レイアウト切替 */}
              <div className="box-view-type">
                <span className="view-type" style={{ cursor: "pointer", marginRight: "5px", opacity: layout === "list" ? 1 : 0.4 }} onClick={() => setLayout("list")}>
                  <Icon icon="boxicons:rows-3-filled" width={20} />
                </span>
                <span className="view-type" style={{ cursor: "pointer", marginRight: "5px", opacity: layout === "grid2" ? 1 : 0.4 }} onClick={() => setLayout("grid2")}>
                  <Icon icon="boxicons:grid-filled" width={20} />
                </span>
                <span className="view-type" style={{ cursor: "pointer", opacity: layout === "grid3" ? 1 : 0.4 }} onClick={() => setLayout("grid3")}>
                  <Icon icon="boxicons:grid-9-filled" width={20} />
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========== モバイル用フィルターバー（md未満） ========== */}
      <div className="box-filters-job d-md-none" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

        {/* 1行目：表示件数・並び順 */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>

          {/* 表示件数 */}
          <div className="box-border" style={{ position: "relative", width: "auto" }}>
            <div className="dropdown dropdown-sort">
              <button className="btn dropdown-toggle" style={{ fontSize: "12px", padding: "4px 8px", width: "auto" }} onClick={() => { setMobilePerPageOpen(!mobilePerPageOpen); setMobileSortOpen(false); }}>
                <span>{perPage}件</span>
                <i className="fi-rr-angle-small-down" />
              </button>
              {mobilePerPageOpen && (
                <ul className="dropdown-menu dropdown-menu-light show" style={{ position: "absolute", left: 0, top: "100%", zIndex: 300, minWidth: "70px" }}>
                  {[10, 20, 50].map((n) => (
                    <li key={n}>
                      <span className={`dropdown-item ${perPage === n ? "active" : ""}`} style={{ cursor: "pointer", fontSize: "12px" }} onClick={() => { updateParams({ perPage: String(n), page: "1" }); setMobilePerPageOpen(false); }}>
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 並び順 */}
          <div className="box-border" style={{ position: "relative", width: "auto" }}>
            <div className="dropdown dropdown-sort">
              <button className="btn dropdown-toggle" style={{ fontSize: "12px", padding: "4px 8px", width: "auto" }} onClick={() => { setMobileSortOpen(!mobileSortOpen); setMobilePerPageOpen(false); }}>
                <span>{sortLabels[sortOrder]}</span>
                <i className="fi-rr-angle-small-down" />
              </button>
              {mobileSortOpen && (
                <ul className="dropdown-menu dropdown-menu-light show" style={{ position: "absolute", left: 0, top: "100%", zIndex: 300, minWidth: "150px" }}>
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <li key={key}>
                      <span className={`dropdown-item ${sortOrder === key ? "active" : ""}`} style={{ cursor: "pointer", fontSize: "12px" }} onClick={() => { updateParams({ sort: key, page: "1" }); setMobileSortOpen(false); }}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>

        {/* 2行目：件数表示・レイアウト切替 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "#66789c", lineHeight: 1 }}>
            <strong>{start + 1}-{Math.min(end, total)}</strong> / <strong>{total}件</strong>
          </span>
          <div className="box-view-type">
            <span className="view-type" style={{ cursor: "pointer", marginRight: "4px", opacity: mobileLayout === "list" ? 1 : 0.4 }} onClick={() => setMobileLayout("list")}>
              <Icon icon="f7:rectangle-grid-1x2-fill" width={18} />
            </span>
            <span className="view-type" style={{ cursor: "pointer", opacity: mobileLayout === "compact" ? 1 : 0.4 }} onClick={() => setMobileLayout("compact")}>
              <Icon icon="boxicons:rows-3-filled" width={18} />
            </span>
          </div>
        </div>

      </div>

      {/* ========== PC用カードリスト（md以上） ========== */}
      <div className="d-none d-md-block">
        <div className="row display-list">
          {displayedJobs.map((job) => (
            <div key={job.id} className={pcGridClass}>
              <div className="card-grid-2 hover-up">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="card-grid-2-image-left">
                      <div className="image-box">
                        <img src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/dummy-work.png" alt="企業ロゴ" style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "8px" }} />
                      </div>
                      <div className="right-info">
                        <a href={job.url} target="_blank" rel="noopener"><span className="name-job">{job.company}</span></a>
                        <span className="location-small">{job.area}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 text-start text-md-end pr-30 col-md-4 col-sm-12">
                    {layout === "list" && (
                      <div className="pl-15 mb-15 mt-30">
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", maxHeight: "56px", overflow: "hidden", justifyContent: "flex-end" }}>
                          {job.category.map((cat) => (
                            <span key={cat} className="btn btn-grey-small" style={{ cursor: "pointer" }} onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat)}`)}>
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-block-info">
                  <h4>
                    <a href={job.url} target="_blank" rel="noopener">
                      <span>{job.title}</span>
                    </a>
                  </h4>
                  {(layout === "grid2" || layout === "grid3") && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", maxHeight: "28px", overflow: "hidden", marginTop: "6px", marginBottom: "4px" }}>
                      {job.category.map((cat) => (
                        <span key={cat} className="btn btn-grey-small" style={{ cursor: "pointer" }} onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat)}`)}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-5">
                    <a href={job.url} target="_blank" rel="noopener">
                      {job.jt && <span className="card-briefcase">{job.jt}</span>}
                    </a>
                    {job.update && (
                      <span className="card-time">
                        {new Date(job.update).toLocaleDateString("ja-JP")}
                      </span>
                    )}
                  </div>
                  <p className="font-sm color-text-paragraph mt-10">{job.snippet}</p>
                  <div className="card-2-bottom mt-20">
                    <div className="row">
                      <div className="col-lg-7 col-7">
                        <a href={job.url} target="_blank" rel="noopener">
                          <span className="card-text-price">{job.st}</span>
                        </a>
                      </div>
                      <div className="col-lg-5 col-5 text-end">
                        <a href={job.url} target="_blank" rel="noopener" className="btn btn-apply-now">詳細を見る</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== モバイル用カードリスト（md未満） ========== */}
      <div className="d-md-none">
        <div className="row display-list">
          {displayedJobs.map((job) => (
            <div key={job.id} className={mobileGridClass}>
              <div className="card-grid-2 hover-up">
                <div className="card-block-info" style={{ padding: "12px" }}>
                  {/* 会社名・エリア・雇用形態・日付 */}
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px", marginBottom: "4px" }}>
                    <a href={job.url} target="_blank" rel="noopener">
                      <span style={{ color: "#3B64F4", fontWeight: "600", fontSize: "13px" }}>{job.company}</span>
                    </a>
                    {job.area && <span className="location-small" style={{ fontSize: "12px" }}>{job.area}</span>}
                    {job.jt && <span className="card-briefcase" style={{ fontSize: "12px" }}>{job.jt}</span>}
                    {job.update && (
                      <span className="card-time" style={{ fontSize: "12px" }}>
                        {new Date(job.update).toLocaleDateString("ja-JP")}
                      </span>
                    )}
                  </div>
                  {/* タイトル */}
                  <h4 style={{ fontSize: "14px", marginBottom: "4px", lineHeight: "1.4" }}>
                    <a href={job.url} target="_blank" rel="noopener">{job.title}</a>
                  </h4>
                  {/* カテゴリ */}
                  {job.category.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "4px" }}>
                      {job.category.map((cat) => (
                        <span key={cat} className="btn btn-grey-small" style={{ cursor: "pointer" }} onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat)}`)}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* スニペット（compactのときは非表示） */}
                  {job.snippet && mobileLayout !== "compact" && (
                    <p style={{ fontSize: "12px", color: "#66789c", margin: "4px 0 6px", lineHeight: "1.5" }}>
                      {job.snippet}
                    </p>
                  )}
                  {/* 給与・詳細ボタン */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginTop: "6px" }}>
                    <span className="card-text-price" style={{ fontSize: "13px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>{job.st}</span>
                    <a href={job.url} target="_blank" rel="noopener" className="btn btn-apply-now" style={{ width: "auto", display: "inline-block", padding: "6px 12px", fontSize: "12px", flexShrink: 0 }}>詳細を見る</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ページネーション */}
      <div className="paginations">
        <ul className="pager">
          <li>
            <a className="pager-prev" href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) updateParams({ page: String(currentPage - 1) }); }} />
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <a href="#" className={`pager-number ${currentPage === page ? "active" : ""}`} onClick={(e) => { e.preventDefault(); updateParams({ page: String(page) }); }}>
                {page}
              </a>
            </li>
          ))}
          <li>
            <a className="pager-next" href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) updateParams({ page: String(currentPage + 1) }); }} />
          </li>
        </ul>
      </div>
    </div>
  );
}

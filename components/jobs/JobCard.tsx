/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";

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
  category: string[];
};

type Props = {
  job: Job;
  layout?: "list" | "grid2" | "grid3" | "grid4";
};

export default function JobCard({ job, layout = "grid3" }: Props) {
  const router = useRouter();
  const isGrid = layout !== "list";

  return (
    <div className="card-grid-2 hover-up">
      <div className="row">
        <div className={isGrid ? "col-12" : "col-lg-8 col-md-8 col-sm-12"}>
          <div className="card-grid-2-image-left">
            <div className="image-box">
              <img src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/dummy-work.png" alt="企業ロゴ" style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "8px" }} />
            </div>
            <div className="right-info">
              <a href={job.url} target="_blank" rel="noopener">
  <span className="name-job" style={{
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "200px"
  }}>{job.company}</span>
</a>
              <span className="location-small">{job.area}</span>
            </div>
          </div>
        </div>
        {!isGrid && (
          <div className="col-lg-4 text-start text-md-end pr-30 col-md-4 col-sm-12">
            <div className="pl-15 mb-15 mt-30">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", maxHeight: "56px", overflow: "hidden", justifyContent: "flex-end" }}>
                {job.category.map((cat) => (
                  <span key={cat} className="btn btn-grey-small" style={{ cursor: "pointer" }} onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat)}`)}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

<div className="card-block-info">
        {isGrid && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", maxHeight: "28px", overflow: "hidden", marginBottom: "6px" }}>
            {job.category.map((cat) => (
              <span key={cat} className="btn btn-grey-small" style={{ cursor: "pointer" }} onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat)}`)}>
                {cat}
              </span>
            ))}
          </div>
        )}
        <h4 style={{ fontSize: "16px" }}>
  <a href={job.url} target="_blank" rel="noopener">
    <span style={{
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      minHeight: "60px"
    }}>{job.title}</span>
  </a>
</h4>
<div className="mt-5">
  <a href={job.url} target="_blank" rel="noopener">
    {job.jt && <span className="card-briefcase">{job.jt}</span>}
  </a>
  {job.update && (
    <span className="card-time">{new Date(job.update).toLocaleDateString("ja-JP")}</span>
  )}
</div>
<div className="card-2-bottom mt-20">
  <div className="row">
    <div className="col-lg-7 col-7">
      <a href={job.url} target="_blank" rel="noopener">
        <span className="card-text-price" style={{ fontSize: "13px" }}>{job.st}</span>
      </a>
    </div>
    <div className="col-lg-5 col-5 text-end">
      <a href={job.url} target="_blank" rel="noopener" className="btn btn-apply-now">詳細を見る</a>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
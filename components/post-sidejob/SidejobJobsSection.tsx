"use client";
import Link from "next/link";
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
  jobs: Job[];
  category: string;
};

function JobCard({ job }: { job: Job }) {
  const router = useRouter();

  return (
    <div className="card-grid-2 hover-up" style={{ marginBottom: "12px" }}>
      <div className="card-block-info" style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
          <a href={job.url} target="_blank" rel="noopener">
            <span style={{ color: "#3B64F4", fontWeight: "600", fontSize: "14px" }}>{job.company}</span>
          </a>
          {job.area && <span className="location-small" style={{ fontSize: "13px" }}>{job.area}</span>}
          {job.jt && <span className="card-briefcase" style={{ fontSize: "13px" }}>{job.jt}</span>}
          {job.update && (
            <span className="card-time" style={{ fontSize: "13px" }}>
              {new Date(job.update).toLocaleDateString("ja-JP")}
            </span>
          )}
        </div>
        <h4 style={{ fontSize: "15px", marginBottom: "8px" }}>
          <a href={job.url} target="_blank" rel="noopener">
            <span style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {job.title}
            </span>
          </a>
        </h4>
        {job.category.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
            {job.category.map((cat) => (
              <span
                key={cat}
                className="btn btn-grey-small"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat)}`)}
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <div className="card-2-bottom mt-10">
          <div className="row">
            <div className="col-lg-7 col-7">
              <span className="card-text-price" style={{ fontSize: "13px" }}>{job.st}</span>
            </div>
            <div className="col-lg-5 col-5 text-end">
              <Link href={`/jobs-list?category=${encodeURIComponent("副業OK")}`} className="btn btn-apply-now">
                もっと見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SidejobJobsSection({ jobs, category }: Props) {
  if (jobs.length === 0) return null;

  return (
    <section id="sidejob-jobs" style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#1a2b4a",
          borderLeft: "5px solid #2da562",
          paddingLeft: "14px",
          marginBottom: "8px",
          lineHeight: "1.5",
        }}
      >
        現在掲載中の副業OK{category}関連の映像求人
      </h2>
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>※一部抜粋・ランダム表示</p>
      <div style={{ marginBottom: "20px" }}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link href={`/jobs-list?category=${encodeURIComponent("副業OK")}`}>
          <span className="btn btn-default">副業OKの求人をもっと見る</span>
        </Link>
      </div>
    </section>
  );
}

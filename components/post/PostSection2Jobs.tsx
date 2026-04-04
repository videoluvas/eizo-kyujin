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

function PostJobCard({ job, category }: { job: Job; category: string }) {
  const router = useRouter();

  return (
    <div className="card-grid-2 hover-up" style={{ marginBottom: "12px" }}>
      <div className="card-block-info" style={{ padding: "16px" }}>
        {/* 会社名・場所・雇用形態・日付 横並び */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
          <a href={job.url} target="_blank" rel="noopener">
            <span style={{ color: "#3B64F4", fontWeight: "600", fontSize: "14px" }}>
              {job.company}
            </span>
          </a>
          {job.area && (
            <span className="location-small" style={{ fontSize: "13px" }}>{job.area}</span>
          )}
          {job.jt && (
            <span className="card-briefcase" style={{ fontSize: "13px" }}>{job.jt}</span>
          )}
          {job.update && (
            <span className="card-time" style={{ fontSize: "13px" }}>
              {new Date(job.update).toLocaleDateString("ja-JP")}
            </span>
          )}
        </div>

        {/* タイトル */}
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

        {/* カテゴリ（タイトルの下） */}
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

        {/* 給与・もっと見るボタン */}
        <div className="card-2-bottom mt-10">
          <div className="row">
            <div className="col-lg-7 col-7">
              <span className="card-text-price" style={{ fontSize: "13px" }}>{job.st}</span>
            </div>
            <div className="col-lg-5 col-5 text-end">
              <Link href={`/jobs-list?category=${encodeURIComponent(category)}`} className="btn btn-apply-now">
                もっと見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostSection2Jobs({ jobs, category }: Props) {
  return (
    <section id="section-2" style={{ marginBottom: "48px" }}>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#1a2b4a",
          borderLeft: "5px solid #3B64F4",
          paddingLeft: "14px",
          marginBottom: "24px",
          lineHeight: "1.5",
        }}
      >
        【厳選】{category}の最新求人情報
      </h2>

      {jobs.length === 0 ? (
        <div style={{
          padding: "24px",
          background: "#f8f9ff",
          borderRadius: "8px",
          textAlign: "center",
          color: "#888",
          fontSize: "14px",
        }}>
          現在求人情報を読み込み中です
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          {jobs.map((job) => (
            <PostJobCard key={job.id} job={job} category={category} />
          ))}
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <Link href={`/jobs-list?category=${encodeURIComponent(category)}`}>
          <span className="btn btn-default">
            {category}の求人をもっと見る
          </span>
        </Link>
      </div>
    </section>
  );
}

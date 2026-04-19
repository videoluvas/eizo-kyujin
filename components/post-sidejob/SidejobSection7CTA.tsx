"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PostSidejob } from "@/app/generated/prisma/client";

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

type Category = {
  nameEn: string;
  name: string;
  group: string;
};

type Props = {
  post: PostSidejob;
  jobs: Job[];
  categories: Category[];
};

function JobCard({ job, category }: { job: Job; category: string }) {
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

export default function SidejobSection7CTA({ post, jobs, categories }: Props) {
  const related = categories.filter((c) => c.name !== post.category).slice(0, 12);

  return (
    <>
      {/* H2⑦ CV導線 */}
      <section id="section-7" style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#1a2b4a",
            borderLeft: "5px solid #2da562",
            paddingLeft: "14px",
            marginBottom: "24px",
            lineHeight: "1.5",
          }}
        >
          {post.h2_7_title || `副業OKの${post.category}求人を映像求人PROで探す`}
        </h2>

        {/* 導線テキスト */}
        {post.p_7_1 && (
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#444", marginBottom: "24px" }}>
            {post.p_7_1}
          </p>
        )}

        {/* CTAボタン */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href={`/jobs-list?category=${encodeURIComponent(post.category)}`}>
            <span
              className="btn btn-default"
              style={{ fontSize: "15px", padding: "14px 32px", borderRadius: "8px" }}
            >
              副業OKの{post.category}求人を見る
            </span>
          </Link>
        </div>

        {/* 関連求人カード */}
        {jobs.length > 0 && (
          <>
            <p style={{ fontSize: "14px", color: "#888", marginBottom: "16px" }}>
              現在掲載中の{post.category}求人（一部）
            </p>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} category={post.category} />
            ))}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Link href={`/jobs-list?category=${encodeURIComponent(post.category)}`}>
                <span className="btn btn-default">
                  {post.category}の求人をもっと見る
                </span>
              </Link>
            </div>
          </>
        )}
      </section>

      {/* 関連カテゴリ */}
      {related.length > 0 && (
        <section style={{ marginBottom: "48px" }}>
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
            {post.category}に関連する求人カテゴリ
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {related.map((cat) => (
              <Link key={cat.nameEn} href={`/jobs-list?category=${encodeURIComponent(cat.name)}`}>
                <span className="btn btn-grey-small" style={{ fontSize: "14px", padding: "8px 16px" }}>
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

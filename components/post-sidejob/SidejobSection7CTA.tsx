"use client";
import Link from "next/link";
import type { PostSidejob } from "@/app/generated/prisma/client";

type Category = {
  nameEn: string;
  name: string;
  group: string;
};

type Props = {
  post: PostSidejob;
  categories: Category[];
};

export default function SidejobSection7CTA({ post, categories }: Props) {
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

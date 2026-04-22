// components/post/PostRelatedArticles.tsx
import Link from "next/link";
import type { RelatedPost } from "@/app/lib/getRelatedPosts";

type Props = {
  posts: RelatedPost[];
};

export default function PostRelatedArticles({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section id="section-related" style={{ marginBottom: "48px" }}>
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
        関連記事
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="hover-up"
              style={{
                display: "flex",
                gap: "16px",
                background: "#fff",
                border: "1px solid #e8eaff",
                borderRadius: "10px",
                padding: "16px",
                alignItems: "center",
              }}
            >
              {/* サムネイル */}
              {post.thumbnail && (
                <div
                  style={{
                    flexShrink: 0,
                    width: "100px",
                    height: "68px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* テキスト */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {post.category && (
                  <span
                    className="btn btn-grey-small"
                    style={{ fontSize: "11px", pointerEvents: "none", marginBottom: "6px", display: "inline-block" }}
                  >
                    {post.category}
                  </span>
                )}
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#1a2b4a",
                    margin: 0,
                    lineHeight: "1.6",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.title}
                </p>
              </div>

              {/* 矢印 */}
              <div style={{ flexShrink: 0, color: "#3B64F4", fontSize: "18px" }}>›</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
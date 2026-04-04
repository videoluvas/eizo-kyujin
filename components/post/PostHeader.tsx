import type { Post } from "@/app/generated/prisma/client";

type Props = {
  post: Post;
};

export default function PostHeader({ post }: Props) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="post-header" style={{ marginBottom: "32px" }}>
      {/* カテゴリバッジ */}
      {post.category && (
        <div style={{ marginBottom: "12px" }}>
          <span
            className="btn btn-grey-small"
            style={{ fontSize: "12px", pointerEvents: "none" }}
          >
            {post.category}
          </span>
        </div>
      )}

      {/* H1タイトル */}
      <h1
        style={{
          fontSize: "26px",
          fontWeight: "700",
          lineHeight: "1.5",
          color: "#1a2b4a",
          marginBottom: "16px",
        }}
      >
        {post.title}
      </h1>

      {/* メタ情報 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "13px",
          color: "#888",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {post.author && (
          <span>
            <i className="fi-rr-user" style={{ marginRight: "4px" }} />
            {post.author}
          </span>
        )}
        {publishedDate && (
          <span>
            <i className="fi-rr-calendar" style={{ marginRight: "4px" }} />
            {publishedDate}
          </span>
        )}
        {post.readingTime > 0 && (
          <span>
            <i className="fi-rr-clock" style={{ marginRight: "4px" }} />
            約{post.readingTime}分で読めます
          </span>
        )}
      </div>

      {/* サムネイル */}
      {post.thumbnail && (
        <div style={{ marginBottom: "24px", borderRadius: "12px", overflow: "hidden" }}>
          <img
            src={post.thumbnail}
            alt={post.title}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      )}

      {/* リード文 */}
      {post.lead && (
        <div
          style={{
            fontSize: "15px",
            lineHeight: "1.9",
            color: "#444",
            padding: "20px 24px",
            background: "#f8f9ff",
            borderLeft: "4px solid #3B64F4",
            borderRadius: "0 8px 8px 0",
          }}
        >
          {post.lead}
        </div>
      )}
    </div>
  );
}

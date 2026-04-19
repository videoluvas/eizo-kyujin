import type { PostSidejob } from "@/app/generated/prisma/client";

type Props = {
  post: PostSidejob;
};

export default function SidejobPostHeader({ post }: Props) {
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
          <span className="btn btn-grey-small" style={{ fontSize: "12px", pointerEvents: "none" }}>
            {post.category}
          </span>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "12px",
              fontWeight: "700",
              padding: "3px 12px",
              borderRadius: "20px",
              background: "#e8f5e9",
              color: "#2da562",
            }}
          >
            副業OK特集
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
        <div
          style={{
            marginBottom: "24px",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 8px 32px rgba(59,100,244,0.15)",
          }}
        >
          <img
            src={post.thumbnail}
            alt={post.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "brightness(0.93) saturate(1.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "35%",
              background: "linear-gradient(to top, rgba(26,43,74,0.45), transparent)",
            }}
          />
          {post.category && (
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: "#3B64F4",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "700",
                padding: "4px 14px",
                borderRadius: "20px",
                letterSpacing: "0.5px",
              }}
            >
              {post.category} 副業OK
            </div>
          )}
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

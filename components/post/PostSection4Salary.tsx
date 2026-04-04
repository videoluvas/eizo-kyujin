import type { Post } from "@/app/generated/prisma/client";

type Props = {
  post: Post;
};

export default function PostSection4Salary({ post }: Props) {
  if (!post.h2_4_title) return null;

  return (
    <section id="section-4" style={{ marginBottom: "48px" }}>
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
        {post.h2_4_title}
      </h2>

      {post.p_4_1 && (
        <div
          style={{
            background: "#f0f4ff",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#3B64F4",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#3B64F4", marginBottom: "8px" }}>
      年収の目安
    </h3>
          </div>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#444", margin: "0" }}>
            {post.p_4_1}
          </p>
        </div>
      )}

      {post.p_4_2 && (
        <div
          style={{
            background: "#f0fff4",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#2da562",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
                <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#2da562", marginBottom: "8px" }}>
      年収アップのポイント
    </h3>
          </div>
          <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#444", margin: "0" }}>
            {post.p_4_2}
          </p>
        </div>
      )}
    </section>
  );
}

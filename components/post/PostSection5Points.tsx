import type { Post } from "@/app/generated/prisma/client";

type Props = {
  post: Post;
};

export default function PostSection5Points({ post }: Props) {
  if (!post.h2_5_title) return null;

  const items = [
    { h3: post.h3_5_1, p: post.p_5_1 },
    { h3: post.h3_5_2, p: post.p_5_2 },
    { h3: post.h3_5_3, p: post.p_5_3 },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-5" style={{ marginBottom: "48px" }}>
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
        {post.h2_5_title}
      </h2>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: "20px",
            background: "#fff",
            border: "1px solid #e8eaff",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span
              style={{
                minWidth: "28px",
                height: "28px",
                background: "#3B64F4",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "13px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "1px",
              }}
            >
              {i + 1}
            </span>
            <div style={{ flex: 1 }}>
              {item.h3 && (
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#1a2b4a",
                    marginBottom: "8px",
                  }}
                >
                  {item.h3}
                </h3>
              )}
              {item.p && (
                <p style={{ fontSize: "15px", lineHeight: "1.9", color: "#444", margin: "0" }}>
                  {item.p}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

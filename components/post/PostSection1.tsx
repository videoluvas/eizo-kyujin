import type { Post } from "@/app/generated/prisma/client";

type Props = {
  post: Post;
};

export default function PostSection1({ post }: Props) {
  if (!post.h2_1_title) return null;

  const items = [
    { h3: post.h3_1_1, p: post.p_1_1 },
    { h3: post.h3_1_2, p: post.p_1_2 },
    { h3: post.h3_1_3, p: post.p_1_3 },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-1" style={{ marginBottom: "48px" }}>
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
        {post.h2_1_title}
      </h2>

      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: "24px" }}>
          {item.h3 && (
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#2a3f6e",
                marginBottom: "10px",
                paddingBottom: "6px",
                borderBottom: "1px dashed #dde3f5",
              }}
            >
              {item.h3}
            </h3>
          )}
          {item.p && (
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.9",
                color: "#444",
                margin: "0",
              }}
            >
              {item.p}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}

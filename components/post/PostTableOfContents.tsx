import type { Post } from "@/app/generated/prisma/client";

type Props = {
  post: Post;
  isSidebar?: boolean;
};

type TocItem = {
  id: string;
  label: string;
  level: "h2" | "h3";
};

function buildToc(post: Post): TocItem[] {
  const items: TocItem[] = [];

  if (post.h2_1_title) {
    items.push({ id: "section-1", label: post.h2_1_title, level: "h2" });
  }
  items.push({ id: "section-2", label: `【厳選】${post.category}の最新求人情報`, level: "h2" });
  if (post.h2_3_title) {
    items.push({ id: "section-3", label: post.h2_3_title, level: "h2" });
  }
  if (post.h2_4_title) {
    items.push({ id: "section-4", label: post.h2_4_title, level: "h2" });
  }
  if (post.h2_5_title) {
    items.push({ id: "section-5", label: post.h2_5_title, level: "h2" });
  }
  items.push({ id: "section-6", label: `${post.category}に関連する求人カテゴリ`, level: "h2" });

  return items;
}

export default function PostTableOfContents({ post, isSidebar = false }: Props) {
  const toc = buildToc(post);

  if (isSidebar) {
    return (
      <div
        style={{
          background: "#f8f9ff",
          border: "1px solid #e8eaff",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#3B64F4",
            marginBottom: "12px",
            paddingBottom: "8px",
            borderBottom: "2px solid #3B64F4",
          }}
        >
          目次
        </div>
        <ol style={{ paddingLeft: "0", margin: "0", listStyle: "none" }}>
          {toc.map((item, i) => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <a
                href={`#${item.id}`}
                style={{
                  fontSize: "13px",
                  color: "#444",
                  textDecoration: "none",
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  lineHeight: "1.5",
                }}
              >
                <span
                  style={{
                    minWidth: "20px",
                    height: "20px",
                    background: "#3B64F4",
                    color: "#fff",
                    borderRadius: "4px",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    marginTop: "1px",
                  }}
                >
                  {i + 1}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#f8f9ff",
        border: "1px solid #e8eaff",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#3B64F4",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "2px solid #3B64F4",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>📋</span>
        <span>目次</span>
      </div>
      <ol style={{ paddingLeft: "0", margin: "0", listStyle: "none" }}>
        {toc.map((item, i) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <a
              href={`#${item.id}`}
              style={{
                fontSize: "14px",
                color: "#333",
                textDecoration: "none",
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                lineHeight: "1.6",
              }}
            >
              <span
                style={{
                  minWidth: "24px",
                  height: "24px",
                  background: "#3B64F4",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  marginTop: "1px",
                }}
              >
                {i + 1}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

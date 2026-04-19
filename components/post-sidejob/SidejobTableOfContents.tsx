import type { PostSidejob } from "@/app/generated/prisma/client";

type Props = {
  post: PostSidejob;
  isSidebar?: boolean;
};

type TocItem = {
  id: string;
  label: string;
};

function buildToc(post: PostSidejob): TocItem[] {
  const items: TocItem[] = [];
  if (post.h2_1_title) items.push({ id: "section-1", label: post.h2_1_title });
  if (post.h2_2_title) items.push({ id: "section-2", label: post.h2_2_title });
  if (post.h2_3_title) items.push({ id: "section-3", label: post.h2_3_title });
  if (post.h2_4_title) items.push({ id: "section-4", label: post.h2_4_title });
  if (post.h2_5_title) items.push({ id: "section-5", label: post.h2_5_title });
  if (post.h2_6_title) items.push({ id: "section-6", label: post.h2_6_title });
  if (post.h2_7_title) items.push({ id: "section-7", label: post.h2_7_title });
  return items;
}

export default function SidejobTableOfContents({ post, isSidebar = false }: Props) {
  const toc = buildToc(post);

  const listItems = toc.map((item, i) => (
    <li key={item.id} style={{ marginBottom: isSidebar ? "8px" : "10px" }}>
      <a
        href={`#${item.id}`}
        style={{
          fontSize: isSidebar ? "13px" : "14px",
          color: "#333",
          textDecoration: "none",
          display: "flex",
          gap: isSidebar ? "8px" : "10px",
          alignItems: "flex-start",
          lineHeight: "1.6",
        }}
      >
        <span
          style={{
            minWidth: isSidebar ? "20px" : "24px",
            height: isSidebar ? "20px" : "24px",
            background: "#3B64F4",
            color: "#fff",
            borderRadius: isSidebar ? "4px" : "6px",
            fontSize: isSidebar ? "11px" : "12px",
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
  ));

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
        <ol style={{ paddingLeft: "0", margin: "0", listStyle: "none" }}>{listItems}</ol>
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
      <ol style={{ paddingLeft: "0", margin: "0", listStyle: "none" }}>{listItems}</ol>
    </div>
  );
}

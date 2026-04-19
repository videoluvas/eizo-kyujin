// SidejobSection1.tsx
// H2① ○○は副業と両立しやすい仕事なのか？
import type { PostSidejob } from "@/app/generated/prisma/client";

type Props = { post: PostSidejob };

export default function SidejobSection1({ post }: Props) {
  if (!post.h2_1_title) return null;

  const items = [
    { h3: post.h3_1_1, p: post.p_1_1 },
    { h3: post.h3_1_2, p: post.p_1_2 },
    { h3: post.h3_1_3, p: post.p_1_3 },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-1" style={{ marginBottom: "48px" }}>
      <h2 style={h2Style}>{post.h2_1_title}</h2>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: "24px" }}>
          {item.h3 && <h3 style={h3Style}>{item.h3}</h3>}
          {item.p && <p style={pStyle}>{item.p}</p>}
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────
// SidejobSection2Income.tsx
// H2② 収入イメージ
// ─────────────────────────────────────────────
export function SidejobSection2Income({ post }: Props) {
  if (!post.h2_2_title) return null;

  const items = [
    { h3: post.h3_2_1, p: post.p_2_1, bg: "#f0f4ff", accent: "#3B64F4" },
    { h3: post.h3_2_2, p: post.p_2_2, bg: "#f0fff4", accent: "#2da562" },
    { h3: post.h3_2_3, p: post.p_2_3, bg: "#fff8f0", accent: "#e67e22" },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-2" style={{ marginBottom: "48px" }}>
      <h2 style={h2Style}>{post.h2_2_title}</h2>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: item.bg,
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "16px",
          }}
        >
          {item.h3 && (
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: item.accent, marginBottom: "8px" }}>
              {item.h3}
            </h3>
          )}
          {item.p && <p style={{ ...pStyle, margin: "0" }}>{item.p}</p>}
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────
// SidejobSection3Company.tsx
// H2③ 副業しやすい会社の特徴・見分け方
// ─────────────────────────────────────────────
export function SidejobSection3Company({ post }: Props) {
  if (!post.h2_3_title) return null;

  const items = [
    { h3: post.h3_3_1, p: post.p_3_1 },
    { h3: post.h3_3_2, p: post.p_3_2 },
    { h3: post.h3_3_3, p: post.p_3_3 },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-3" style={{ marginBottom: "48px" }}>
      <h2 style={h2Style}>{post.h2_3_title}</h2>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: "24px" }}>
          {item.h3 && <h3 style={h3Style}>{item.h3}</h3>}
          {item.p && <p style={pStyle}>{item.p}</p>}
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────
// SidejobSection4Points.tsx
// H2④ 求人選びのポイント（番号付きカード）
// ─────────────────────────────────────────────
export function SidejobSection4Points({ post }: Props) {
  if (!post.h2_4_title) return null;

  const items = [
    { h3: post.h3_4_1, p: post.p_4_1 },
    { h3: post.h3_4_2, p: post.p_4_2 },
    { h3: post.h3_4_3, p: post.p_4_3 },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-4" style={{ marginBottom: "48px" }}>
      <h2 style={h2Style}>{post.h2_4_title}</h2>
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
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a2b4a", marginBottom: "8px" }}>
                  {item.h3}
                </h3>
              )}
              {item.p && <p style={{ ...pStyle, margin: "0" }}>{item.p}</p>}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────
// SidejobSection5Interview.tsx
// H2⑤ 面接で副業を伝えるべきか（固定・H3×1・結論ボックス）
// ─────────────────────────────────────────────
export function SidejobSection5Interview({ post }: Props) {
  if (!post.h2_5_title) return null;

  return (
    <section id="section-5" style={{ marginBottom: "48px" }}>
      <h2 style={h2Style}>{post.h2_5_title}</h2>
      <div
        style={{
          background: "#fff8e1",
          border: "1px solid #ffe082",
          borderRadius: "10px",
          padding: "20px 24px",
        }}
      >
        {post.h3_5_1 && (
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#b8860b", marginBottom: "10px" }}>
            💡 {post.h3_5_1}
          </h3>
        )}
        {post.p_5_1 && <p style={{ ...pStyle, margin: "0" }}>{post.p_5_1}</p>}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SidejobSection6Fit.tsx
// H2⑥ 両立しやすい人・注意点
// ─────────────────────────────────────────────
export function SidejobSection6Fit({ post }: Props) {
  if (!post.h2_6_title) return null;

  const items = [
    { h3: post.h3_6_1, p: post.p_6_1 },
    { h3: post.h3_6_2, p: post.p_6_2 },
    { h3: post.h3_6_3, p: post.p_6_3 },
  ].filter((item) => item.h3 || item.p);

  return (
    <section id="section-6" style={{ marginBottom: "48px" }}>
      <h2 style={h2Style}>{post.h2_6_title}</h2>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: "24px" }}>
          {item.h3 && <h3 style={h3Style}>{item.h3}</h3>}
          {item.p && <p style={pStyle}>{item.p}</p>}
        </div>
      ))}
    </section>
  );
}

// ─────────────────────────────────────────────
// 共通スタイル
// ─────────────────────────────────────────────
const h2Style: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#1a2b4a",
  borderLeft: "5px solid #3B64F4",
  paddingLeft: "14px",
  marginBottom: "24px",
  lineHeight: "1.5",
};

const h3Style: React.CSSProperties = {
  fontSize: "17px",
  fontWeight: "700",
  color: "#2a3f6e",
  marginBottom: "10px",
  paddingBottom: "6px",
  borderBottom: "1px dashed #dde3f5",
};

const pStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.9",
  color: "#444",
  margin: "0",
};

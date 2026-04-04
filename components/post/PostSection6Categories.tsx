"use client";
import { useRouter } from "next/navigation";

type Category = {
  nameEn: string;
  name: string;
  group: string;
};

type Props = {
  categories: Category[];
  currentCategory: string;
};

export default function PostSection6Categories({ categories, currentCategory }: Props) {
  const router = useRouter();

  const related = categories.filter((c) => c.name !== currentCategory).slice(0, 12);

  return (
    <section id="section-6" style={{ marginBottom: "48px" }}>
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
        {currentCategory}に関連する求人カテゴリ
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {related.map((cat) => (
          <button
            key={cat.nameEn}
            onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(cat.name)}`)}
            className="btn btn-grey-small"
            style={{ cursor: "pointer", fontSize: "14px", padding: "8px 16px" }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}

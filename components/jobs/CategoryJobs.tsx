"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import JobGrid from "./JobGrid";

type Job = {
  id: number;
  url: string;
  title: string;
  company: string;
  jt: string | null;
  st: string | null;
  area: string | null;
  snippet: string | null;
  update: Date | null;
  category: string[];
};

type Category = {
  nameEn: string;
  name: string;
  group: string;
  keywords: string;
  order: number;
  icon: string;
};

type CategoryWithJobs = {
  category: Category;
  jobs: Job[];
};

type Props = {
  categoryJobs: CategoryWithJobs[];
};

export default function CategoryJobs({ categoryJobs }: Props) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const active = categoryJobs[activeIndex];

  return (
    <div>
      {/* タブ */}
      <div className="nav mt-50 wow animate__animated animate__fadeInUp">
        <ul className="nav-tabs" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
          {categoryJobs.map((item, index) => (
            <li key={item.category.nameEn}>
  <span
    className={activeIndex === index ? "active" : ""}
    onClick={() => setActiveIndex(index)}
    style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
  >
    {item.category.icon && (
      <Icon icon={item.category.icon} style={{ fontSize: "18px" }} />
    )}
    <h3 style={{ fontSize: "12px", fontWeight: "700", margin: 0 }}>{item.category.name}</h3>
  </span>
</li>
          ))}
        </ul>
      </div>

      {/* 求人一覧 */}
      <div className="mt-50">
        <JobGrid jobs={active.jobs} layout="grid4" />
      </div>

      {/* もっと見るボタン */}
      <div className="text-center mt-40">
        <span
          className="btn btn-default hover-up"
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`/jobs-list?category=${encodeURIComponent(active.category.name)}`)}
        >
          このカテゴリの求人一覧を見る
        </span>
      </div>
    </div>
  );
}
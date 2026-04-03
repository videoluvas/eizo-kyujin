"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Briefcase, MapPin, Grid3X3, Search, ChevronDown } from "lucide-react";

type WorkStyle = { id: number; name: string };
type Area = { id: number; name: string };
type Category = { nameEn: string; name: string; group: string };

type Props = {
  workStyles: WorkStyle[];
  areas: Area[];
  categories: Category[];
  mode: "top" | "list";
};

export default function SearchForm({ workStyles, areas, categories, mode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [workStyleOpen, setWorkStyleOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedWorkStyle, setSelectedWorkStyle] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (mode === "list") {
      setSelectedWorkStyle(searchParams.get("workStyle") || "");
      setSelectedArea(searchParams.get("area") || "");
      const cat = searchParams.get("category");
      setSelectedCategories(cat ? cat.split(",") : []);
      setKeyword(searchParams.get("kw") || "");
    }
  }, [mode, searchParams]);

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const categoryLabel = selectedCategories.length === 0
    ? "カテゴリ"
    : selectedCategories.length === 1
    ? selectedCategories[0]
    : `${selectedCategories[0]} 他${selectedCategories.length - 1}件`;

  const groups = Array.from(new Set(categories.map((c) => c.group)));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedWorkStyle) params.set("workStyle", selectedWorkStyle);
    if (selectedArea) params.set("area", selectedArea);
    if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
    if (keyword) params.set("kw", keyword);
    params.set("page", "1");
    router.push(`/jobs-list?${params.toString()}`);
  };

  return (
    <div className="form-find text-start mt-40 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.1fr 1.1fr 1.5fr auto", gap: "0", alignItems: "center", maxWidth: "1680px", width: "100%", margin: "0 auto" }}>

        {/* 働き方 */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px", padding: "0 18px", borderRight: "1px solid #e5e7eb", minHeight: "56px" }}>
          <Briefcase size={18} color="#94a3b8" />
          <span style={{ flex: 1, cursor: "pointer", fontSize: "14px", color: selectedWorkStyle ? "#4f5e64" : "#a0abb8" }} onClick={() => { setWorkStyleOpen(!workStyleOpen); setAreaOpen(false); setCategoryOpen(false); }}>
            {selectedWorkStyle || "働き方"}
          </span>
          <ChevronDown size={16} color="#94a3b8" />
          {workStyleOpen && (
            <ul className="dropdown-menu dropdown-menu-light show" style={{ position: "absolute", top: "100%", left: 0, zIndex: 9999, minWidth: "200px" }}>
              <li><span className={`dropdown-item ${selectedWorkStyle === "" ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => { setSelectedWorkStyle(""); setWorkStyleOpen(false); }}>すべて</span></li>
              {workStyles.map((ws) => (
                <li key={ws.id}>
                  <span className={`dropdown-item ${selectedWorkStyle === ws.name ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => { setSelectedWorkStyle(ws.name); setWorkStyleOpen(false); }}>
                    {ws.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* エリア */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px", padding: "0 18px", borderRight: "1px solid #e5e7eb", minHeight: "56px" }}>
          <MapPin size={18} color="#94a3b8" />
          <span style={{ flex: 1, cursor: "pointer", fontSize: "14px", color: selectedArea ? "#4f5e64" : "#a0abb8" }} onClick={() => { setAreaOpen(!areaOpen); setWorkStyleOpen(false); setCategoryOpen(false); }}>
            {selectedArea || "エリア"}
          </span>
          <ChevronDown size={16} color="#94a3b8" />
          {areaOpen && (
            <ul className="dropdown-menu dropdown-menu-light show" style={{ position: "absolute", top: "100%", left: 0, zIndex: 9999, minWidth: "200px", maxHeight: "300px", overflowY: "auto" }}>
              <li><span className={`dropdown-item ${selectedArea === "" ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => { setSelectedArea(""); setAreaOpen(false); }}>すべて</span></li>
              {areas.map((area) => (
                <li key={area.id}>
                  <span className={`dropdown-item ${selectedArea === area.name ? "active" : ""}`} style={{ cursor: "pointer" }} onClick={() => { setSelectedArea(area.name); setAreaOpen(false); }}>
                    {area.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* カテゴリ（複数選択・グループ分け） */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px", padding: "0 18px", borderRight: "1px solid #e5e7eb", minHeight: "56px" }}>
          <Grid3X3 size={18} color="#94a3b8" />
          <span style={{ flex: 1, cursor: "pointer", fontSize: "14px", color: selectedCategories.length > 0 ? "#4f5e64" : "#a0abb8" }} onClick={() => { setCategoryOpen(!categoryOpen); setWorkStyleOpen(false); setAreaOpen(false); }}>
            {categoryLabel}
          </span>
          <ChevronDown size={16} color="#94a3b8" />
          {categoryOpen && (
            <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 9999, background: "#fff", border: "thin solid #b4c0e0", borderRadius: "10px", boxShadow: "0px 10px 20px -5px rgba(10,42,105,0.06)", padding: "15px 20px", minWidth: "360px" }}>

              {groups.map((group) => (
                <div key={group} style={{ marginBottom: "15px" }}>
                  <p style={{ fontSize: "12px", color: "#a0abb8", fontWeight: 600, marginBottom: "8px", borderBottom: "1px solid #e0e6f7", paddingBottom: "5px" }}>{group}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {categories.filter((c) => c.group === group).map((cat) => (
                      <label key={cat.nameEn} className="cb-container" style={{ paddingLeft: "30px", marginBottom: "8px", marginRight: "12px", cursor: "pointer" }}>
                        <input type="checkbox" checked={selectedCategories.includes(cat.name)} onChange={() => toggleCategory(cat.name)} />
                        <span className="text-small">{cat.name}</span>
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
<div style={{ borderTop: "1px solid #e0e6f7", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  {selectedCategories.length > 0 ? (
    <span style={{ fontSize: "12px", color: "#66789c", cursor: "pointer", textDecoration: "underline" }} onClick={() => setSelectedCategories([])}>
      クリア
    </span>
  ) : <span />}
  <span className="btn btn-default font-sm" style={{ padding: "8px 20px", cursor: "pointer" }} onClick={() => setCategoryOpen(false)}>
    決定
  </span>
</div>
            </div>
          )}
        </div>

        {/* キーワード */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 18px", minHeight: "56px" }}>
          <Search size={18} color="#94a3b8" />
          <input className="form-input" type="text" placeholder="キーワードを入力" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }} style={{ border: "none", boxShadow: "none", padding: 0, background: "transparent" }} />
        </div>

        <button className="btn btn-default font-sm" onClick={handleSearch} style={{ minWidth: "160px", height: "56px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "16px", marginLeft: "10px" }}>
          <Search size={18} style={{ marginRight: "8px" }} />
          検索する
        </button>

      </div>
    </div>
    
  );
}
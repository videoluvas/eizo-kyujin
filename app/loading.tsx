"use client";
import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    return () => {
      // ローディング終了時に確実に消す
      const el = document.getElementById("preloader-active");
      if (el) el.style.display = "none";
    };
  }, []);

  return (
    <div id="preloader-active">
      <div className="preloader d-flex align-items-center justify-content-center">
        <div className="preloader-inner position-relative">
          <div className="text-center">
            <img src="/assets/imgs/template/loading.gif" alt="映像求人PRO" />
          </div>
        </div>
      </div>
    </div>
  );
}
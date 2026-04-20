import Link from "next/link";

export default function CTABanner() {
  return (
    <div style={{ marginBottom: "40px", marginTop: "8px" }}>
      <Link href="https://eizo-job.com/jobs-list">
        <img
          src="https://pub-647b9765a3c242dcac081e185c116796.r2.dev/CTA_banner.png"
          alt="映像求人PRO｜動画クリエイターのための転職求人ポータル"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        />
      </Link>
    </div>
  );
}

// scripts/backup-db.ts
import "dotenv/config";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

function getDateParts() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");

  return {
    date: `${yyyy}-${mm}-${dd}`,
    month: `${yyyy}-${mm}`,
  };
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function main() {
  const { date, month } = getDateParts();

  const DATABASE_URL = requiredEnv("DATABASE_URL");
  const R2_BUCKET = requiredEnv("R2_BUCKET");
  const R2_ENDPOINT = requiredEnv("R2_ENDPOINT");
  const AWS_ACCESS_KEY_ID = requiredEnv("AWS_ACCESS_KEY_ID");
  const AWS_SECRET_ACCESS_KEY = requiredEnv("AWS_SECRET_ACCESS_KEY");
  const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION || "auto";

  const backupDir = "/tmp/db-backup";
  const fileName = `db_backup_${date}.sql.gz`;
  const filePath = path.join(backupDir, fileName);
  const r2Key = `Database/${month}/${fileName}`;

  fs.mkdirSync(backupDir, { recursive: true });

  console.log("▶ DB backup start");
  console.log(`date: ${date}`);
  console.log(`file: ${filePath}`);
  console.log(`r2: s3://${R2_BUCKET}/${r2Key}`);

  try {
    execSync(
      `pg_dump "${DATABASE_URL}" ` +
        `--format=plain ` +
        `--no-owner ` +
        `--no-privileges ` +
        `--exclude-table=public.jobs ` +
        `| gzip > "${filePath}"`,
      {
        stdio: "inherit",
        env: {
          ...process.env,
          DATABASE_URL,
        },
      }
    );

    const stats = fs.statSync(filePath);
    console.log(`✅ dump created: ${stats.size} bytes`);

    execSync(
      `aws s3 cp "${filePath}" "s3://${R2_BUCKET}/${r2Key}" --endpoint-url "${R2_ENDPOINT}"`,
      {
        stdio: "inherit",
        env: {
          ...process.env,
          AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY,
          AWS_DEFAULT_REGION,
        },
      }
    );

    console.log("✅ upload success");
    console.log(
      `public url: https://pub-1641b12f23654fb69feb6d3d762231bb.r2.dev/${r2Key}`
    );

    const files = fs.readdirSync(backupDir);
    for (const file of files) {
      const fullPath = path.join(backupDir, file);
      const stat = fs.statSync(fullPath);
      const ageMs = Date.now() - stat.mtimeMs;
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

      if (stat.isFile() && ageMs > sevenDaysMs) {
        fs.unlinkSync(fullPath);
      }
    }

    console.log("✅ local cleanup done");
  } catch (error) {
    console.error("❌ backup failed");
    console.error(error);
    process.exit(1);
  }
}

main();
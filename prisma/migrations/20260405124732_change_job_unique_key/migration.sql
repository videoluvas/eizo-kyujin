/*
  Warnings:

  - A unique constraint covering the columns `[title,company]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "jobs_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "jobs_title_company_key" ON "jobs"("title", "company");

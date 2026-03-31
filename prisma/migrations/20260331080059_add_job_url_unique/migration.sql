/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "jobs_url_key" ON "jobs"("url");

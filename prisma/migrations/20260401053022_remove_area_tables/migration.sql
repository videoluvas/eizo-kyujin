/*
  Warnings:

  - You are about to drop the `area_companies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_lines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_municipalities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_prefectures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_regions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `area_stations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "area_join" DROP CONSTRAINT "area_join_line_cd_fkey";

-- DropForeignKey
ALTER TABLE "area_lines" DROP CONSTRAINT "area_lines_company_cd_fkey";

-- DropForeignKey
ALTER TABLE "area_stations" DROP CONSTRAINT "area_stations_line_cd_fkey";

-- DropTable
DROP TABLE "area_companies";

-- DropTable
DROP TABLE "area_join";

-- DropTable
DROP TABLE "area_lines";

-- DropTable
DROP TABLE "area_municipalities";

-- DropTable
DROP TABLE "area_prefectures";

-- DropTable
DROP TABLE "area_regions";

-- DropTable
DROP TABLE "area_stations";

-- CreateTable
CREATE TABLE "work_styles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "work_styles_name_key" ON "work_styles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "areas_name_key" ON "areas"("name");

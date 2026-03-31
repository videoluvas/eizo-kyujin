-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "category" TEXT;

-- CreateTable
CREATE TABLE "categories" (
    "name_en" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("name_en")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

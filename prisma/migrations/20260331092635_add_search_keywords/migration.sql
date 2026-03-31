-- CreateTable
CREATE TABLE "search_keywords" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "total" INTEGER,
    "current_start" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "search_keywords_keyword_key" ON "search_keywords"("keyword");

-- CreateTable
CREATE TABLE "area_companies" (
    "company_cd" INTEGER NOT NULL,
    "rr_cd" INTEGER,
    "company_name" TEXT,
    "company_name_k" TEXT,
    "company_name_h" TEXT,
    "company_name_r" TEXT,
    "company_url" TEXT,
    "company_type" INTEGER,
    "e_status" INTEGER,
    "e_sort" INTEGER,

    CONSTRAINT "area_companies_pkey" PRIMARY KEY ("company_cd")
);

-- CreateTable
CREATE TABLE "area_lines" (
    "line_cd" INTEGER NOT NULL,
    "company_cd" INTEGER,
    "line_name" TEXT,
    "line_name_k" TEXT,
    "line_name_h" TEXT,
    "line_color_c" TEXT,
    "line_color_t" TEXT,
    "line_type" INTEGER,
    "lon" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION,
    "zoom" INTEGER,
    "e_status" INTEGER,
    "e_sort" INTEGER,

    CONSTRAINT "area_lines_pkey" PRIMARY KEY ("line_cd")
);

-- CreateTable
CREATE TABLE "area_stations" (
    "station_cd" INTEGER NOT NULL,
    "station_g_cd" INTEGER,
    "station_name" TEXT,
    "station_name_k" TEXT,
    "station_name_r" TEXT,
    "line_cd" INTEGER,
    "pref_cd" INTEGER,
    "post" TEXT,
    "address" TEXT,
    "lon" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION,
    "open_ymd" TEXT,
    "close_ymd" TEXT,
    "e_status" INTEGER,
    "e_sort" INTEGER,

    CONSTRAINT "area_stations_pkey" PRIMARY KEY ("station_cd")
);

-- CreateTable
CREATE TABLE "area_join" (
    "line_cd" INTEGER NOT NULL,
    "station_cd1" INTEGER NOT NULL,
    "station_cd2" INTEGER NOT NULL,

    CONSTRAINT "area_join_pkey" PRIMARY KEY ("line_cd","station_cd1","station_cd2")
);

-- CreateTable
CREATE TABLE "area_municipalities" (
    "municipality_cd" INTEGER NOT NULL,
    "municipality_name" TEXT,
    "municipality_name_kana" TEXT,
    "municipality_name_romaji" TEXT,
    "pref_cd" INTEGER,
    "prefecture_name" TEXT,
    "prefecture_name_kana" TEXT,
    "prefecture_name_romaji" TEXT,

    CONSTRAINT "area_municipalities_pkey" PRIMARY KEY ("municipality_cd")
);

-- CreateTable
CREATE TABLE "area_prefectures" (
    "pref_cd" INTEGER NOT NULL,
    "prefecture_name" TEXT,
    "prefecture_name_kana" TEXT,
    "prefecture_name_romaji" TEXT,
    "region_cd" INTEGER,

    CONSTRAINT "area_prefectures_pkey" PRIMARY KEY ("pref_cd")
);

-- CreateTable
CREATE TABLE "area_regions" (
    "region_cd" INTEGER NOT NULL,
    "region_name" TEXT,

    CONSTRAINT "area_regions_pkey" PRIMARY KEY ("region_cd")
);

-- CreateIndex
CREATE INDEX "area_lines_company_cd_idx" ON "area_lines"("company_cd");

-- CreateIndex
CREATE INDEX "area_stations_line_cd_idx" ON "area_stations"("line_cd");

-- CreateIndex
CREATE INDEX "area_stations_pref_cd_idx" ON "area_stations"("pref_cd");

-- CreateIndex
CREATE INDEX "area_stations_station_name_idx" ON "area_stations"("station_name");

-- CreateIndex
CREATE INDEX "area_join_station_cd1_idx" ON "area_join"("station_cd1");

-- CreateIndex
CREATE INDEX "area_join_station_cd2_idx" ON "area_join"("station_cd2");

-- CreateIndex
CREATE INDEX "area_municipalities_pref_cd_idx" ON "area_municipalities"("pref_cd");

-- CreateIndex
CREATE INDEX "area_municipalities_municipality_name_idx" ON "area_municipalities"("municipality_name");

-- CreateIndex
CREATE INDEX "area_prefectures_region_cd_idx" ON "area_prefectures"("region_cd");

-- AddForeignKey
ALTER TABLE "area_lines" ADD CONSTRAINT "area_lines_company_cd_fkey" FOREIGN KEY ("company_cd") REFERENCES "area_companies"("company_cd") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area_stations" ADD CONSTRAINT "area_stations_line_cd_fkey" FOREIGN KEY ("line_cd") REFERENCES "area_lines"("line_cd") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area_join" ADD CONSTRAINT "area_join_line_cd_fkey" FOREIGN KEY ("line_cd") REFERENCES "area_lines"("line_cd") ON DELETE RESTRICT ON UPDATE CASCADE;

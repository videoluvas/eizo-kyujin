"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Category = {
  nameEn: string;
  name: string;
  group: string;
};

type Props = {
  categories: Category[];
};

const groupConfig: Record<string, { label: string; icon: string }> = {
  業界: { label: "業界", icon: "assets/imgs/page/homepage1/finance.svg" },
  技術: { label: "技術", icon: "assets/imgs/page/homepage1/lightning.svg" },
  役職: { label: "役職", icon: "assets/imgs/page/homepage1/management.svg" },
  特徴: { label: "特徴", icon: "assets/imgs/page/homepage1/marketing.svg" },
};

const groupOrder = ["業界", "技術", "役職", "特徴"];

const CategorySlider = ({ categories }: Props) => {
  const router = useRouter();

  // グループごとにカテゴリをまとめる
  const grouped = groupOrder.map((group) => ({
    group,
    config: groupConfig[group],
    categoryNames: categories
      .filter((c) => c.group === group)
      .map((c) => c.name),
  }));

const handleClick = (categoryNames: string[]) => {
  const categoryParam = categoryNames.join(",");
  router.push(`/jobs-list?category=${encodeURIComponent(categoryParam)}`);
};

  return (
    <>
      <div className="swiper-container swiper-group-5">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 30 },
            575: { slidesPerView: 2, spaceBetween: 30 },
            767: { slidesPerView: 2, spaceBetween: 30 },
            991: { slidesPerView: 3, spaceBetween: 30 },
            1199: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="swiper-wrapper pb-70 pt-5 swiper-grid-jobobx"
        >
          {grouped.map((item) => (
            <SwiperSlide key={item.group}>
              <div
                className="swiper-slide hover-up"
                onClick={() => handleClick(item.categoryNames)}
                style={{ cursor: "pointer" }}
              >
                <div className="item-logo">
                  <div className="image-left">
                    <img alt={item.group} src={item.config.icon} />
                  </div>
                  <div className="text-info-right">
                    <h3>{item.config.label}</h3>
                    <p className="font-xs" style={{ color: "#a0aec0" }}>
                      {item.categoryNames.length}カテゴリ
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />
      </div>
      <div className="category-slider-mobile-grid">
        {grouped.map((item) => (
          <div
            key={item.group}
            className="item-logo hover-up"
            onClick={() => handleClick(item.categoryNames)}
            style={{ cursor: "pointer" }}
          >
            <div className="image-left">
              <img alt={item.group} src={item.config.icon} />
            </div>
            <div className="text-info-right">
              <h3>{item.config.label}</h3>
              <p className="font-xs" style={{ color: "#a0aec0" }}>
                {item.categoryNames.length}カテゴリ
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategorySlider;
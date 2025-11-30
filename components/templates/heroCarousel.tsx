"use client";

import Image from "next/image";
import { brand } from "@/brand";
import { SwiperSlide } from "swiper/react";
import Carousel from "../modules/carousel";
import { PageSectionItemT } from "@/types/api.types";

function HeroCarousel({ carousel }: { carousel: PageSectionItemT[] }) {
  return (
    <Carousel className="lg:h-[65vh] max-lg:aspect-video">
      {carousel.map((item) => (
        <SwiperSlide key={item.id} className="pb-16">
          <Image
            width={1472}
            height={828}
            alt={item.name || ""}
            className="w-full aspect-video rounded-lg"
            src={brand.apiBaseUrl + (item.mediaPath || "")}
          />
        </SwiperSlide>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;

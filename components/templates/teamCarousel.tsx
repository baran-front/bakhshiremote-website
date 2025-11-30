"use client";

import Image from "next/image";
import { SwiperSlide } from "swiper/react";

import { getMenuLinksByGroup } from "@/lib/fetchs";
import { useQuery } from "@tanstack/react-query";
import Carousel from "../modules/carousel";
import { brand } from "@/brand";

function TeamCarousel() {
  const { data: team } = useQuery({
    queryKey: ["links-by-team"], queryFn: () =>
      getMenuLinksByGroup({ groupnames: "team" })
  });

  return (
    <div className="wrapper mt-24 lg:mt-40">
      <h6 className="heading text-center">تیم ما</h6>
      <p className="lg:max-w-5xl mt-3 text-center typography mx-auto">
        در این بخش پربازدیدترین و مفیدترین مطالب درباره ERP و مدیریت سازمانی را
        مشاهده کنید. این مقالات توسط کاربران مورد توجه قرار گرفته و برای بهبود
        عملکرد کسب‌وکار شما توصیه می‌شوند.
      </p>
      <Carousel
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="mt-6"
      >
        {team?.result?.data?.map((member) => (
          <SwiperSlide className="pb-16" key={member.id}>
            <div className="size-full flex items-center justify-center flex-col gap-3">
              <Image
                width={200}
                height={200}
                alt={member.name || ""}
                src={
                  brand.apiBaseUrl + (member.imageUrl || "")
                }
                className="w-full aspect-square rounded-lg object-cover"
              />
              <span className="title mt-3">{member.name}</span>
              <span className="typography opacity-75">
                {member.description}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
}

export default TeamCarousel;

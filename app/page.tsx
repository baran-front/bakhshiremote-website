"use client";

import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { ClockIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import Carousel from "@/components/modules/carousel";
import { getCategory, getPageInfo } from "@/lib/fetchs";
import Image from "next/image";
import { brand } from "@/brand";
import ProductCard from "@/components/modules/productCard";
import { mapSectionItemToProduct } from "@/lib/data";
import { shuffle } from "lodash";

function HomePage() {
  const { data: pageInfoData, isLoading } = useQuery({
    queryKey: ["pageInfo", "12"],
    queryFn: () => getPageInfo({ pageId: "12" }),
  });

  const carousel =
    pageInfoData?.result?.data?.pageSections.find(
      (section) => section.title === "اسلایدر"
    )?.items || [];

  const products =
    pageInfoData?.result?.data?.pageSections.find(
      (section) => section.title === "جدید ترین محصولات"
    )?.items || [];

  const specialProducts = pageInfoData?.result?.data?.pageSections.find(
    (section) => section.title === "محصولات ویژه"
  );

  const banners =
    pageInfoData?.result?.data?.pageSections.find(
      (section) => section.title === "بنر ها"
    )?.items || [];

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories", 1],
    queryFn: async () => {
      const res = await getCategory({ type: 1 });
      if (res?.result?.data) {
        res.result.data = shuffle(res.result.data);
      }
      return res;
    },
  });

  return (
    <>
      <div className="wrapper mt-10 lg:mt-14">
        {isLoading ? null : (
          <Carousel>
            {carousel.map((item) => (
              <SwiperSlide key={item.id} className="pb-16">
                <Link
                  className="w-full aspect-16/6 block"
                  href={`/products/${item.linkUrl}`}
                >
                  <Image
                    width={1471}
                    height={551}
                    alt={item.name || ""}
                    className="rounded-lg size-full"
                    src={brand.apiBaseUrl + (item.mediaPath || "")}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </div>

      <div className="wrapper mt-24 lg:mt-40 flex items-center justify-center flex-col">
        <h1 className="heading">دسته بندی محصولات</h1>
        {isCategoriesLoading ? null : (
          <Carousel
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="max-lg:w-full lg:w-1/2 mt-6"
          >
            {categoriesData?.result?.data.slice(0, 8).map((category) => (
              <SwiperSlide key={category.id} className="pb-16">
                <Link className="group" href={`/products?category=${category.id}`}>
                  <div className="w-full aspect-square border group-hover:border-foreground transition-colors p-3 rounded-full flex items-center justify-center">
                    <Image
                      width={200}
                      height={200}
                      className="size-full rounded-full"
                      alt={category.name || ""}
                      src={brand.apiBaseUrl + (category.thumbnail || "")}
                    />
                  </div>
                  <p className="text-center mt-3">{category.name}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="flex items-center gap-3">
          <h2 className="heading">جدید ترین محصولات</h2>
          <Link href={"/products"} className="mr-auto">
            <Button variant="outline">همه</Button>
          </Link>
        </div>

        {isLoading ? null : (
          <Carousel
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="mt-6"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="pb-16">
                <ProductCard product={mapSectionItemToProduct(product)} />
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="bg-red-500 rounded-lg p-6">
          <div className="flex items-center flex-wrap gap-3">
            <h3 className="heading not-dark:text-background">
              {specialProducts?.title}
            </h3>
            {/* <div className="px-3 py-1 bg-white flex items-center gap-3 text-black rounded-sm">
            <span>14:12:9</span>
            <ClockIcon className="size-5" />
          </div> */}
            <Link href={"/products"} className="mr-auto">
              <Button
                className="border border-background dark:border-foreground not-dark:text-background"
                variant="unstyled"
              >
                همه
              </Button>
            </Link>
          </div>

          {isLoading ? null : (
            <Carousel
              deactiveNavigationClassname="bg-white/25"
              activeNavigationClassname="bg-white"
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              className="mt-6"
            >
              {specialProducts?.items.map((product) => (
                <SwiperSlide key={product.id} className="pb-16">
                  <ProductCard
                    isSpecial
                    product={mapSectionItemToProduct(product)}
                  />
                </SwiperSlide>
              ))}
            </Carousel>
          )}
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="flex items-center gap-3">
          <h4 className="heading">جدید ترین محصولات</h4>
          <Link href={"/products"} className="mr-auto">
            <Button variant="outline">همه</Button>
          </Link>
        </div>

        {isLoading ? null : (
          <Carousel
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="mt-6"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="pb-16">
                <ProductCard product={mapSectionItemToProduct(product)} />
              </SwiperSlide>
            ))}
          </Carousel>
        )}
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {banners.map((item, index) => (
          <Link
            className={`w-full aspect-16/6 rounded-lg card-hover ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
            href={`/products/${item.linkUrl}`}
            key={item.id}
          >
            <Image
              width={1472}
              height={552}
              alt={item.name || ""}
              src={brand.apiBaseUrl + (item.mediaPath || "")}
              className="rounded-lg size-full"
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default HomePage;

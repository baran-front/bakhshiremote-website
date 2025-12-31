"use client";

import { CategoryT, PageSectionItemT, PageSectionT } from "@/types/api.types"
import Carousel from "../modules/carousel"
import { SwiperSlide } from "swiper/react"
import Link from "next/link"
import Image from "next/image"
import { brand } from "@/brand"
import { Button } from "../ui/button";
import ProductCard from "../modules/productCard";
import { mapSectionItemToProduct } from "@/lib/data";

function Home({ carousel, categories, products, specialProducts, banners }: { carousel: PageSectionItemT[]; products: PageSectionItemT[]; categories: CategoryT[]; specialProducts: PageSectionT | undefined; banners: PageSectionItemT[]; }) {
  return (
    <>
      <div className="wrapper mt-10 lg:mt-14">
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
                  className="rounded-2xl size-full"
                  src={brand.apiBaseUrl + (item.mediaPath || "")}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Carousel>
      </div>

      <div className="wrapper mt-24 lg:mt-40 flex items-center justify-center flex-col">
        <h1 className="heading">دسته بندی محصولات</h1>
        <Carousel
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          className="max-lg:w-full lg:w-2/3 mt-6"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id} className="pb-16">
              <Link className="group" href={`/products?category=${category.id}`}>
                <div className="w-full aspect-square border-2 group-hover:border-primary transition-colors p-3 rounded-full flex items-center justify-center">
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
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="flex items-center gap-3">
          <h2 className="heading">جدید ترین محصولات</h2>
          <Link href={"/products"} className="mr-auto">
            <Button variant="outline">همه</Button>
          </Link>
        </div>

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
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="bg-red-500 rounded-2xl p-6">
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
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="flex items-center gap-3">
          <h4 className="heading">جدید ترین محصولات</h4>
          <Link href={"/products"} className="mr-auto">
            <Button variant="outline">همه</Button>
          </Link>
        </div>

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
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {banners.map((item, index) => (
          <Link
            className={`w-full aspect-16/6 rounded-2xl card-hover ${index === 0 ? "lg:col-span-2" : ""
              }`}
            href={`/products/${item.linkUrl}`}
            key={item.id}
          >
            <Image
              width={1472}
              height={552}
              alt={item.name || ""}
              src={brand.apiBaseUrl + (item.mediaPath || "")}
              className="rounded-2xl size-full"
            />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Home
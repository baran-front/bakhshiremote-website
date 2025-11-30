"use client";

import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { ClockIcon, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Carousel from "@/components/modules/carousel";

function HomePage() {
  return (
    <>
      <div className="wrapper mt-10 lg:mt-14">
        <Carousel className="lg:h-[65vh] max-lg:aspect-video">
          <SwiperSlide className="pb-16">
            <div className="size-full rounded-lg bg-card"></div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="size-full rounded-lg bg-card"></div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="size-full rounded-lg bg-card"></div>
          </SwiperSlide>
        </Carousel>
      </div>

      <div className="wrapper mt-24 lg:mt-40 flex items-center justify-center flex-col">
        <h1 className="heading">دسته بندی محصولات</h1>
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
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="w-full aspect-square border p-3 rounded-full">
              <div className="size-full bg-card rounded-full"></div>
            </div>
          </SwiperSlide>
        </Carousel>
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="flex items-center gap-3">
          <h2 className="heading">جدید ترین محصولات</h2>
          <Link href={"/"} className="mr-auto">
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
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Carousel>
      </div>

      <div className="bg-red-700 dark:bg-red-900 not-dark:text-background rounded-lg p-6 wrapper mt-24 lg:mt-40">
        <div className="flex items-center flex-wrap gap-3">
          <h3 className="heading">محصولات ویژه زمستانه</h3>
          <div className="px-3 py-1 bg-white flex items-center gap-3 text-black rounded-sm">
            <span>14:12:9</span>
            <ClockIcon className="size-5" />
          </div>
          <Link href={"/"} className="mr-auto">
            <Button
              className="border border-background dark:border-foreground"
              variant="unstyled"
            >
              همه
            </Button>
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
          <SwiperSlide className="pb-16">
            <div className="unstyled-card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-background text-red-700 dark:bg-foreground p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button
                  size={"icon"}
                  variant={"unstyled"}
                  className="border border-background dark:border-foreground"
                >
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="unstyled-card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-background text-red-700 dark:bg-foreground p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button
                  size={"icon"}
                  variant={"unstyled"}
                  className="border border-background dark:border-foreground"
                >
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="unstyled-card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-background text-red-700 dark:bg-foreground p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button
                  size={"icon"}
                  variant={"unstyled"}
                  className="border border-background dark:border-foreground"
                >
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="unstyled-card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-background text-red-700 dark:bg-foreground p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button
                  size={"icon"}
                  variant={"unstyled"}
                  className="border border-background dark:border-foreground"
                >
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="unstyled-card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-background text-red-700 dark:bg-foreground p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button
                  size={"icon"}
                  variant={"unstyled"}
                  className="border border-background dark:border-foreground"
                >
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Carousel>
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <div className="flex items-center gap-3">
          <h4 className="heading">جدید ترین محصولات</h4>
          <Link href={"/"} className="mr-auto">
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
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="pb-16">
            <div className="card">
              <div className="card-image bg-background"></div>
              <p className="title">نام محصول</p>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    15.000.000 تومان{" "}
                    <span className="bg-red-700 dark:bg-red-900 not-dark:text-background p-1 text-xs rounded">
                      23%
                    </span>
                  </p>
                  <p className="text-sm opacity-50 line-through">17.000.000</p>
                </div>
                <Button size={"icon"} variant={"outline"}>
                  <ShoppingCartIcon />
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Carousel>
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:h-screen gap-3">
        <div className="bg-card rounded-lg max-lg:aspect-square lg:col-span-2"></div>
        <div className="bg-card rounded-lg max-lg:aspect-square"></div>
        <div className="bg-card rounded-lg max-lg:aspect-square"></div>
      </div>
    </>
  );
}

export default HomePage;

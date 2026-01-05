"use client";

import { ComponentProps } from "react";
import Link, { LinkProps } from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ProductT } from "@/types/api.types";
import Image from "next/image";
import { brand } from "@/brand";
import BookmarkProductButton from "../templates/bookmarkProductButton";

function ProductCard({
  isSpecial,
  className,
  product,
  ...p
}: Omit<LinkProps, "href"> &
  Omit<ComponentProps<"a">, "href"> & { product?: ProductT, isSpecial?: boolean }) {
  return (
    <Link
      href={`/products/${product?.id}`}
      className={cn(
        "card card-hover block group",
        isSpecial ? "bg-white text-black" : "hover:bg-transparent border-2 border-transparent transition-all hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/30",
        className
      )}
      {...p}
    >
      <Image
        width={373}
        height={210}
        alt={product?.name || ""}
        className="card-thumbnail"
        src={brand.apiBaseUrl + (product?.masterImage || "")}
      />
      <div className="flex items-center justify-between">
        <p className="line-clamp-1">{product?.name}</p>
        {product && (
          <BookmarkProductButton
            variant={"unstyled"}
            className="hover:bg-foreground/5"
            product={product}
          />
        )}
      </div>
      {product && (
        <div className="flex items-center gap-3">
          {(() => {
            const hasDiscount = (product.discountPercent || 0) > 0;
            const masterPrice = product.masterPrice || 0;
            const discountAmount = hasDiscount
              ? Math.floor((masterPrice * (product.discountPercent || 0)) / 100)
              : 0;
            const displayPrice = Math.max(masterPrice - discountAmount, 0);
            return (
              <>
                <span className="font-yekan-bakh-bold">
                  {displayPrice.toLocaleString("fa")} تومان
                </span>
                {hasDiscount && (
                  <>
                    <span className="bg-primary p-1 rounded text-xs text-foreground not-dark:text-background">
                      {product.discountPercent} %
                    </span>
                    <span className="opacity-60 line-through text-xs mr-auto">
                      {masterPrice.toLocaleString("fa")} تومان
                    </span>
                  </>
                )}
              </>
            );
          })()}
        </div>
      )}
      <Button
        variant={"unstyled"}
        className={`w-full bg-black/10 group-hover:bg-primary group-hover:text-white shadow-lg shadow-transparent hover:shadow-primary/50 max-lg:in-[.swiper-slide-active]:bg-primary max-lg:in-[.swiper-slide-active]:text-white max-lg:in-[.swiper-slide-active]:shadow-primary/50`}
      >
        <span>جزئیات</span>
        <ArrowLeftIcon />
      </Button>
    </Link>
  );
}

export default ProductCard;

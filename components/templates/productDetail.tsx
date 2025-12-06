"use client";

import Image from "next/image";
import { MessageSquareTextIcon } from "lucide-react";

import { brand } from "@/brand";
import ProductCounter from "@/components/templates/productCounter";
import ShareButton from "@/components/modules/shareButton";
import BookmarkProductButton from "@/components/templates/bookmarkProductButton";
import { ProductT } from "@/types/api.types"; 
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

function ProductDetail({ product }: { product: ProductT }) {
  const [currentProduct] = useState<ProductT>(product);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-6">
      <div className="lg:col-span-2">
        <h1 className="heading leading-relaxed lg:hidden">
          {currentProduct.name}
        </h1>
        <Image
          width={960}
          height={540}
          alt={currentProduct.name || ""}
          className="w-full aspect-video rounded-lg"
          src={brand.apiBaseUrl + (currentProduct.masterImage || "")}
        />
      </div>

      <div className="lg:col-span-2 flex flex-col gap-3 justify-between">
        <h1 className="heading leading-relaxed max-lg:hidden">
          {currentProduct.name}
        </h1>
      </div>

      <div className="flex flex-col max-sm:flex-col-reverse gap-6">
        <div className="flex items-center justify-center sm:justify-end gap-3">
          <Link href="#comments">
            <Button variant={"ghost"}>
              <span>{currentProduct.commentsCount} نظر</span>
              <MessageSquareTextIcon />
            </Button>
          </Link>
          <div className="ps-3 border-s-2">
            <BookmarkProductButton product={currentProduct} variant={"ghost"} />
          </div>
          <ShareButton
            variant={"ghost"}
            title={currentProduct.name}
            text={`${currentProduct.name} - ${brand.name}`}
          />
        </div>

        <ProductCounter product={currentProduct} />
      </div>
    </div>
  );
}

export default ProductDetail;

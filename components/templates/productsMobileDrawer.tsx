"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { FunnelIcon } from "lucide-react";
import SelectSearchParamsFilter from "../modules/selectSearchParamsFilter";
import SearchParamsRangeSlider from "../modules/searchParamsRangeSlider";
import ProductsRegionSelect from "./productsRegionSelect";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductsPriceRange } from "@/lib/fetchs";


function ProductsMobileDrawer({ categories, sortOptions }: { sortOptions: { label: string; value: string }[]; categories: { label: string; value: string }[] }) {
  const pathname = usePathname();
  const sp = useSearchParams();

  const { data: productsPriceRange } = useQuery({
    queryKey: ["products-price-range"],
    queryFn: () => getProductsPriceRange(),
  })

  const [open, setOpen] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setOpen(false);
    })
  }, [pathname, sp, setOpen])

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center justify-center col-span-2 lg:hidden">
          <Button variant="outline" size={"icon"}><FunnelIcon /></Button>
        </div>
      </DrawerTrigger>

      <DrawerContent>
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle>فیلتر محصولات</DrawerTitle>
          </DrawerHeader>
          <div className="p-3 space-y-3">
            <SelectSearchParamsFilter
              className="w-full"
              searchParamsKey="sort"
              options={sortOptions}
              placeholder="مرتب سازی بر اساس..."
            />

            <SelectSearchParamsFilter
              className="w-full"
              searchParamsKey="category"
              options={categories}
              placeholder="دسته بندی..."
            />

            <ProductsRegionSelect />

            <SearchParamsRangeSlider
              step={1000}
              className="w-full"
              label="محدوده قیمت"
              searchParamsKey="priceRange"
              min={productsPriceRange?.result?.[0]?.min || 0}
              max={productsPriceRange?.result?.[0]?.max || 0}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ProductsMobileDrawer
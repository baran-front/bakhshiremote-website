import Faq from "@/components/templates/faq";
import Socials from "@/components/templates/socials";
import ProductCard from "@/components/modules/productCard";
import { getProducts } from "@/lib/fetchs";
import { getCategory } from "@/lib/fetchs";
import SelectSearchParamsFilter from "@/components/modules/selectSearchParamsFilter";
import { NextPageProps } from "@/types/app.types";
import SearchParamsSearch from "@/components/modules/searchParamsSearch";
import SearchParamsRangeSlider from "@/components/modules/searchParamsRangeSlider";
import ProductsRegionSelect from "@/components/templates/productsRegionSelect";
import SpPagination from "@/components/modules/spPagination";
import ProductsMobileDrawer from "@/components/templates/productsMobileDrawer";
import Breadcrumbs from "@/components/modules/breadcrumbs";

const SORT_OPTIONS = [
  { label: "جدیدترین", value: "NEWEST" },
  { label: "قدیمی‌ترین", value: "OLDEST" },
  { label: "ارزان‌ترین", value: "CHEAPEST" },
  { label: "گران‌ترین", value: "EXPENSIVE" },
];

async function ProductsPage({ searchParams }: NextPageProps) {
  const sp = await searchParams;
  const sort = sp.sort;
  const search = sp.search;
  const pageNumber = +(sp.pageNumber || "NaN") || 1;
  const priceRange = sp.priceRange;
  const minPrice = priceRange ? +priceRange.split("-")[0] : undefined;
  const maxPrice = priceRange ? +priceRange.split("-")[1] : undefined;
  const categoryId = sp.category ? +sp.category : undefined;
  const products = await getProducts({
    keyword: search || "",
    orderBy: [sort || ""],
    pageNumber: pageNumber,
    pageSize: 10,
    minPrice,
    maxPrice,
    categoryId,
  });

  const categories = ((await getCategory({ type: 1 })).result?.data || []).map(
    (category) => ({
      label: category.name,
      value: category.id.toString(),
    })
  );

  return (
    <>
      <Breadcrumbs links={[{ name: "محصولات", href: "/products" }]} />

      <div className="wrapper grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10 lg:mt-14">
        <div className="lg:space-y-3 lg:h-max lg:sticky lg:top-26 max-lg:flex max-lg:gap-3">
          <SearchParamsSearch
            className="w-full max-sm:col-span-10 max-lg:col-span-2"
            placeholder="جستجو..."
          />

          <ProductsMobileDrawer
            categories={categories}
            sortOptions={SORT_OPTIONS}
          />

          <SelectSearchParamsFilter
            className="w-full max-sm:hidden"
            searchParamsKey="sort"
            options={SORT_OPTIONS}
            placeholder="مرتب سازی بر اساس..."
          />

          <SearchParamsRangeSlider
            className="w-full max-sm:hidden"
            searchParamsKey="priceRange"
            min={0}
            max={1000000}
            step={1000}
            label="محدوده قیمت"
          />

          <SelectSearchParamsFilter
            className="w-full max-sm:hidden"
            searchParamsKey="category"
            options={categories}
            placeholder="دسته بندی..."
          />

          <ProductsRegionSelect className="max-sm:hidden" />
        </div>

        <div className="lg:col-span-3 h-max">
          <div className="card-grid-wrapper">
            {products.result?.data?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <SpPagination
            pageSize={10}
            className="mt-6"
            pageParamName="pageNumber"
            totalPages={products.result?.data?.totalPages}
            totalCount={products.result?.data?.totalCount}
          />
        </div>
      </div>

      <Faq />
      <Socials />
    </>
  );
}

export default ProductsPage;

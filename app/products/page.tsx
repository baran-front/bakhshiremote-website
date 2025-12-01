import Faq from "@/components/templates/faq";
import Socials from "@/components/templates/socials";
import ProductCard from "@/components/modules/productCard";
import { getProducts } from "@/lib/fetchs";
import ProductsCarousel from "@/components/templates/productsCarousel";
import { getCategory, getPageInfo } from "@/lib/fetchs";
import SelectSearchParamsFilter from "@/components/modules/selectSearchParamsFilter";
import { NextPageProps } from "@/types/app.types";
import SearchParamsSearch from "@/components/modules/searchParamsSearch";
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

const PRICE_RANGE_OPTIONS = [
  { label: "0 تا 100,000", value: "0-100000" },
  { label: "100,000 تا 200,000", value: "100000-200000" },
  { label: "200,000 تا 300,000", value: "200000-300000" },
  { label: "300,000 تا 400,000", value: "300000-400000" },
  { label: "400,000 تا 500,000", value: "400000-500000" },
  { label: "500,000 تا 600,000", value: "500000-600000" },
];

async function ProductsPage({ searchParams }: NextPageProps) {
  const pageInfo = await getPageInfo({ pageId: "4" });
  const slides =
    pageInfo.result?.data?.pageSections.find(
      (section) => section.title === "اسلایدر"
    )?.items || [];

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

      <div className="wrapper mt-10 lg:mt-14">
        <div className="grid grid-cols-12 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
          <SearchParamsSearch
            className="w-full max-sm:col-span-10 max-lg:col-span-2"
            placeholder="جستجو..."
          />

          <ProductsMobileDrawer
            categories={categories}
            priceRangeOptions={PRICE_RANGE_OPTIONS}
            sortOptions={SORT_OPTIONS}
          />

          <SelectSearchParamsFilter
            className="w-full max-sm:hidden"
            searchParamsKey="sort"
            options={SORT_OPTIONS}
            placeholder="مرتب سازی بر اساس..."
          />

          <SelectSearchParamsFilter
            className="w-full max-sm:hidden"
            searchParamsKey="priceRange"
            options={PRICE_RANGE_OPTIONS}
            placeholder="محدوده قیمت..."
          />

          <SelectSearchParamsFilter
            className="w-full max-sm:hidden"
            searchParamsKey="category"
            options={categories}
            placeholder="دسته بندی..."
          />

          <ProductsRegionSelect className="max-sm:hidden" />
        </div>

        <div className="card-grid-wrapper mt-6">
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

      <Faq />
      <Socials />
    </>
  );
}

export default ProductsPage;

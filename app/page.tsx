import { shuffle } from "lodash";
import Home from "@/components/templates/home";
import { getCategory, getPageInfo } from "@/lib/fetchs";

async function HomePage() {
  const pageInfo = await getPageInfo({ pageId: "12" })

  const carousel =
    pageInfo?.result?.data?.pageSections.find(
      (section) => section.title === "اسلایدر"
    )?.items || [];

  const products =
    pageInfo?.result?.data?.pageSections.find(
      (section) => section.title === "جدید ترین محصولات"
    )?.items || [];

  const specialProducts = pageInfo?.result?.data?.pageSections.find(
    (section) => section.title === "محصولات ویژه"
  );

  const banners =
    pageInfo?.result?.data?.pageSections.find(
      (section) => section.title === "بنر ها"
    )?.items || [];

  const categories = shuffle((await getCategory({ type: 1 })).result?.data || []).slice(0, 8);

  return (
    <Home banners={banners} carousel={carousel} products={products} specialProducts={specialProducts} categories={categories} />
  );
}

export default HomePage;

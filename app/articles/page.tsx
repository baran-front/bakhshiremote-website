import Faq from "@/components/templates/faq";
import Socials from "@/components/templates/socials";
import { NextPageProps } from "@/types/app.types";
import {
  getArticleCategories,
  getArticles,
} from "@/lib/fetchs";
import ArticlesCategoryTabs from "@/components/templates/articlesCategoryTabs";
import SpPagination from "@/components/modules/spPagination";
import ArticleCard from "@/components/modules/articleCard";
import Breadcrumbs from "@/components/modules/breadcrumbs";

async function ArticlesPage({ searchParams }: NextPageProps) {
  const sp = await searchParams;

  const pageNumber = +(sp.pageNumber || "NaN") || 1;
  const search = sp.search;
  const category = sp.category;

  const [categories, articles] = await Promise.all([
    getArticleCategories(),
    getArticles({
      blogPostCategoryId: category ? +category : null,
      keyword: search || "",
      pageNumber: pageNumber,
      pageSize: 10,
      orderBy: [""],
    }),
  ]);

  return (
    <>
      <Breadcrumbs links={[{ name: "اخبار و مقالات", href: "/articles" }]} />

      <div className="wrapper mt-10 lg:mt-14">
        <div className="flex items-center max-lg:flex-col gap-6 mt-6">
          <h6 className="heading lg:pe-6 lg:border-e-2">دسته بندی مقالات</h6>
          {categories.result?.data ? (
            <ArticlesCategoryTabs categories={categories.result.data} />
          ) : null}
        </div>

        <div className="card-grid-wrapper mt-6">
          {articles.result?.data?.data?.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>

        <SpPagination
          pageSize={10}
          className="mt-6"
          pageParamName="pageNumber"
          totalPages={articles.result?.data?.totalPages}
          totalCount={articles.result?.data?.totalCount}
        />
      </div>

      <Faq />
      <Socials />
    </>
  );
}

export default ArticlesPage;

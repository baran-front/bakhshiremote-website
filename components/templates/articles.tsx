import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ArticleT } from "@/types/api.types";
import ArticleCard from "../modules/articleCard";

function Articles({ articles }: { articles: ArticleT[] }) {
  return (
    <div className="wrapper mt-24 lg:mt-40">
      <div className="flex items-center justify-between">
        <h6 className="heading">اخبار و مقالات</h6>
        <Button variant={"soft"}>
          <span>مشاهده همه</span>
          <ArrowLeftIcon className="size-5" />
        </Button>
      </div>

      <div className="card-flex-wrapper mt-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Articles;

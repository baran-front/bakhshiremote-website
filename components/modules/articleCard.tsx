"use client";

import { brand } from "@/brand";
import { ArticleT } from "@/types/api.types";
import { ArrowLeftIcon, CalendarDaysIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function ArticleCard({ article }: { article: ArticleT }) {
  return (
    <Link href={`/articles/${article.id}`} className="card card-hover">
      <Image
        width={373}
        height={210}
        alt={article.title}
        className="w-full aspect-video rounded-lg"
        src={brand.apiBaseUrl + (article.imageUrl || "")}
      />
      <div className="flex items-center gap-3">
        <CalendarDaysIcon className="size-5" />
        <span>{new Date(article.published).toLocaleDateString("fa")}</span>
      </div>
      <p className="title line-clamp-1">{article.title}</p>
      <p className="line-clamp-3 leading-relaxed">{article.summery}</p>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="w-full bg-foreground/5 shadow-lg hover:bg-foreground/10"
      >
        <span>مشاهده مطلب</span>
        <ArrowLeftIcon className="size-5" />
      </Button>
    </Link>
  )
}

export default ArticleCard
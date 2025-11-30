"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MessageSquareTextIcon,
  Share2Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import ShareButton from "@/components/modules/shareButton";
import { ArticleT } from "@/types/api.types";
import Image from "next/image";
import { brand } from "@/brand";
import Breadcrumbs from "../modules/breadcrumbs";

function ArticleDetailContent({ article }: { article: ArticleT }) {
  const articleContentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: articleContentRef,
    offset: ["start start", "end end"],
  });

  const heightPercentage = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const widthPercentage = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <Breadcrumbs
        links={[
          { name: "اخبار و مقالات", href: "/articles" },
          { name: article.title, href: `/articles/${article.id}` },
        ]}
      />

      <div className="wrapper mt-10 lg:mt-14">
        <div className="grid gap-6 mt-6 grid-cols-1">
          <div className="flex items-center gap-3 flex-wrap justify-between">
            <h1 className="heading leading-relaxed">{article.title}</h1>
            <p className="flex items-center gap-3">
              <span>
                {new Date(article.published)
                  .toLocaleString("fa")
                  .split(",")
                  .join(" -")}
              </span>
              <span className="ps-3 border-s-2">
                {(() => {
                  const plainText =
                    article?.content?.replace(/<[^>]+>/g, "") || "";
                  const wordCount = plainText
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length;
                  const wordsPerMinute = 200;
                  const minutes = Math.max(
                    1,
                    Math.ceil(wordCount / wordsPerMinute)
                  );
                  return `${minutes} دقیقه مطالعه`;
                })()}
              </span>
            </p>
          </div>
          <Image
            width={1216}
            height={684}
            alt={article.title}
            className="w-full aspect-video rounded-lg max-lg:row-start-1"
            src={brand.apiBaseUrl + (article.imageUrl || "")}
          />
        </div>

        <div className="grid mt-6 grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="flex h-max items-center justify-center flex-col gap-6 sticky top-26 max-lg:hidden">
            <Button className="flex-col" variant={"ghost"}>
              <ThumbsUpIcon />
              <span>2</span>
            </Button>

            <Button className="flex-col" variant={"ghost"}>
              <MessageSquareTextIcon />
              <span>56</span>
            </Button>

            <ShareButton
              size={"icon"}
              variant={"ghost"}
              title={article.title}
            />

            <div className="w-1.5 h-[30vh] rounded-full bg-card">
              <motion.div
                className="w-full rounded-full bg-secondary relative"
                style={{ height: heightPercentage }}
              >
                <div className="size-3 bg-foreground rounded-full absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 ring-3 ring-secondary"></div>
              </motion.div>
            </div>
          </div>

          {/* Article content */}
          <div ref={articleContentRef} className="h-max lg:col-span-8">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />

            <div className="pt-6 mt-6 border-t-2">
              <div className="card shadow-lg flex items-center gap-3 space-y-0 max-lg:flex-col">
                <div className="flex items-center max-sm:flex-col gap-3">
                  <p>این مقاله رو دوست داشتی؟</p>
                  <div className="flex items-center gap-3">
                    <Button variant={"ghost"} size={"icon"}>
                      <ThumbsUpIcon />
                    </Button>
                    <Button variant={"ghost"} size={"icon"}>
                      <ThumbsDownIcon />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant={"ghost"} className="mr-auto">
                    <MessageSquareTextIcon />
                    <span>ثبت دیدگاه</span>
                  </Button>
                  <ShareButton
                    size={"default"}
                    variant={"ghost"}
                    title={article.title}
                  >
                    <Share2Icon />
                    <span>اشتراک گذاری</span>
                  </ShareButton>
                </div>
              </div>
            </div>
          </div>

          <div className="h-max col-span-3 space-y-3 sticky top-26 max-lg:hidden">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card aspect-video">
                تبلیغات {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-20 bg-background border-t-2 items-center justify-around fixed bottom-0 left-0 right-0 lg:hidden z-40">
        <Button variant={"ghost"}>
          <ThumbsUpIcon />
          <span>2</span>
        </Button>
        <Button variant={"ghost"}>
          <MessageSquareTextIcon />
          <span>56</span>
        </Button>
        <ShareButton variant={"ghost"} title={article.title} />

        <div className="h-2 w-full bg-card absolute bottom-0 left-0 right-0">
          <motion.div
            style={{ width: widthPercentage }}
            className="h-full bg-secondary relative"
          />
        </div>
      </div>
    </>
  );
}

export default ArticleDetailContent;

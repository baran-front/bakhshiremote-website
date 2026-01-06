import Image from "next/image";

import faqImg from "@/public/images/faq.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Link from "next/link";
import { Button } from "../ui/button";
import { getFaqs } from "@/lib/fetchs";
import { brand } from "@/brand";

async function Faq() {
  const faqs = await getFaqs({
    pageNumber: 1,
    pageSize: 5,
    keyword: "",
    orderBy: [""],
  });

  return (
    <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-6 mt-24 lg:mt-40">
      <div>
        <h6 className="heading max-lg:text-center">
          سوالات متداول، راهنمای جامع {brand.name}
        </h6>
        <p className="typography mt-6 max-lg:text-center">
          در این بخش به سوالاتی پاسخ داده‌ایم که معمولاً قبل از خرید یا استفاده برای کاربران پیش می‌آید.
          هدف ما شفاف‌سازی، صرفه‌جویی در زمان شما و جلوگیری از سردرگمی‌های رایج است.
          اگر پاسخ سوالتان را اینجا پیدا کردید، یعنی کارمان را درست انجام داده‌ایم.
        </p>
        <Image
          alt="faq"
          width={256}
          height={256}
          src={faqImg}
          className="w-full max-w-[256px] mx-auto lg:w-3/4 mt-6"
        />
      </div>

      <div>
        <Accordion collapsible type="single" className="space-y-6">
          {faqs.result?.data?.map((item) => (
            <AccordionItem
              key={item.id}
              className="w-full"
              value={`item-${item.id}`}
            >
              <AccordionTrigger className="w-full">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <p>{item.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Link
          href={"/faq"}
          className="w-full flex items-center justify-center mt-6"
        >
          <Button>
            <span>مشاهده همه</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Faq;

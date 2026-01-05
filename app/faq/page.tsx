import Image from "next/image";

import faqPageImage from "@/public/images/faq.png";
import { getFaqs } from "@/lib/fetchs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumbs from "@/components/modules/breadcrumbs";

async function FAQPage() {
  const faqs = await getFaqs({
    pageNumber: 1,
    pageSize: 999,
    keyword: "",
    orderBy: [""],
  });

  return (
    <>
      <Breadcrumbs links={[{ name: "سوالات متداول", href: "/faq" }]} />

      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3 lg:mt-6">
        <div className="flex flex-col justify-center max-lg:items-center">
          <h1 className="heading">سوالات متداول</h1>
          <p className="mt-3 typography max-lg:text-center">
            در این بخش به سوالاتی پاسخ داده‌ایم که معمولاً قبل از خرید یا استفاده برای کاربران پیش می‌آید.
            هدف ما شفاف‌سازی، صرفه‌جویی در زمان شما و جلوگیری از سردرگمی‌های رایج است.
            اگر پاسخ سوالتان را اینجا پیدا کردید، یعنی کارمان را درست انجام داده‌ایم.
          </p>
        </div>
        <div className="max-lg:row-start-1 flex justify-center items-center">
          <Image
            width={256}
            height={256}
            src={faqPageImage}
            alt="سوالات متداول"
            className="w-full max-w-[256px]"
          />
        </div>
      </div>

      <div className="wrapper mt-12 lg:mt-24">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
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
      </div>
    </>
  );
}

export default FAQPage;

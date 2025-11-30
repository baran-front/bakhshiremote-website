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
          سوالات متداول راهنمای جامع فعالیت در دنیای گیم و دیجیتال
        </h6>
        <p className="typography mt-6 max-lg:text-center">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد.
        </p>
        <Image
          src={faqImg}
          alt="faq"
          width={447}
          height={377}
          className="w-full lg:w-3/4 mt-6"
        />
      </div>

      <div>
        <Accordion collapsible type="single" className="space-y-3">
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

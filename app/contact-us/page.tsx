import Image from "next/image";

import { brand } from "@/brand";
import ContactUsForm from "@/components/templates/contactUsForm";
import { getMenuLinksByGroup } from "@/lib/fetchs";
import Breadcrumbs from "@/components/modules/breadcrumbs";

async function ContactUsPage() {
  const contactUs = await getMenuLinksByGroup({ groupnames: "contact-us" });

  return (
    <>
      <Breadcrumbs links={[{ name: "درباره ما", href: "/about-us" }]} />

      <ContactUsForm />

      <div className="wrapper f-center flex-col mt-24 lg:mt-40">
        <h2 className="heading text-center">
          ارتباط با ما{" "}
          <span className="text-primary">تضمین اینده کسب و کار</span> شماست...
        </h2>
        <p className="mt-6 text-center">
          اجازه دهید با راهکارهای تخصصی و پشتیبانی دلسوزانه، مسیر موفقیت شما را
          هموار کنیم
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-6 gap-3">
          {contactUs.result?.data?.map((item) => (
            <div
              key={item.id}
              className="card border border-primary flex justify-center items-center flex-col gap-3"
            >
              <Image
                alt={item.name || ""}
                width={48}
                height={48}
                src={brand.apiBaseUrl + (item.imageUrl || "")}
              />
              <span className="title">{item.name}</span>
              <p className="text-center max-lg:text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ContactUsPage;

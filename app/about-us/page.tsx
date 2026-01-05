import Image from "next/image";
import { StarIcon } from "lucide-react";

import aboutUsImg from "@/public/images/about-us.png";
import aboutUsOurValuesImg from "@/public/images/about-us_our-values.png";
import aboutUsOurFutureImg from "@/public/images/about-us_our-future.png";
import aboutUsOurMissionImg from "@/public/images/about-us_our-mission.png";
import aboutUsOurAbilitiesImg from "@/public/images/about-us_our-abilities.png";
import Socials from "@/components/templates/socials";
import Breadcrumbs from "@/components/modules/breadcrumbs";
import { brand } from "@/brand";
import Faq from "@/components/templates/faq";

function AboutUsPage() {
  return (
    <>
      <Breadcrumbs links={[{ name: "درباره ما", href: "/about-us" }]} />

      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3 lg:mt-6">
        <div className="flex flex-col max-lg:items-center justify-center">
          <h1 className="heading">درباره {brand.name}</h1>
          <p className="typography opacity-75 mt-6">
            ما در این وب‌سایت روی ارائه راهکارهای مطمئن در حوزه ریموت و قفل‌های ایمنی تمرکز کرده‌ایم، چون امنیت شوخی‌بردار نیست.
            هدف ما فراهم کردن محصولاتی با کیفیت، کاربری ساده و دوام بالا برای استفاده روزمره است.
            با تکیه بر تجربه و بررسی دقیق محصولات، تلاش می‌کنیم انتخابی آگاهانه و بدون دردسر برای شما بسازیم.
            اینجا قرار نیست اغراق بفروشیم، فقط امنیتی که واقعاً کار می‌کند.
          </p>
        </div>
        <Image
          width={300}
          height={300}
          src={aboutUsImg}
          alt={`درباره ${brand.name}`}
          className="max-lg:row-start-1 max-w-full mx-auto"
        />
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex justify-center flex-col max-lg:items-center col-span-2">
          <h1 className="heading">داستان ما</h1>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            داستان ما از جایی شروع شد که فهمیدیم امنیت نباید پیچیده، گران یا نمایشی باشد.
            با تمرکز روی ریموت‌ها و قفل‌های ایمنی، تصمیم گرفتیم راهکارهایی ارائه دهیم که واقعاً قابل اعتماد باشند.
            مسیرمان با آزمون، بررسی و انتخاب وسواس‌گونه محصولات شکل گرفت، نه شعارهای توخالی.
            امروز این وب‌سایت نتیجه همان وسواس است؛ امنیت ساده، کاربردی و بی‌دردسر.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 font-yekan-bakh-semi-bold">
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">+1000</span>
            <span className="text-sm lg:text-base">محصول</span>
          </div>
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">100%</span>
            <span className="text-sm lg:text-base">امنیت بیشتر</span>
          </div>
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">+10</span>
            <span className="text-sm lg:text-base">دسته بندی مختلف</span>
          </div>
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">+5</span>
            <span className="text-sm lg:text-base">سال تجربه</span>
          </div>
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Image
          width={616}
          height={393}
          alt="Our mission"
          src={aboutUsOurMissionImg}
          className="rounded-2xl w-full h-auto"
        />
        <div className="flex justify-center flex-col max-lg:items-center">
          <h2 className="heading">ماموریت ما</h2>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            ماموریت ما ارائه راهکارهای امن، قابل اعتماد و ساده در حوزه ریموت و قفل‌های ایمنی است.
            ما تلاش می‌کنیم با انتخاب محصولات باکیفیت و کاربردی، امنیت را برای همه دسترس‌پذیر کنیم.
            تمرکز ما بر رضایت واقعی کاربر، کاهش ریسک و افزایش آرامش خاطر در استفاده روزمره است.
            هدف نهایی ما اعتمادسازی بلندمدت است، نه فروش مقطعی و پر سر و صدا.
          </p>
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex justify-center flex-col max-lg:items-center">
          <h2 className="heading">ویژگی‌های منحصربه‌فرد ما</h2>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            ما روی کیفیت واقعی تمرکز می‌کنیم، نه مشخصات اغراق‌شده روی کاغذ.
            محصولات قبل از عرضه از نظر امنیت، دوام و کارایی بررسی می‌شوند.
            پشتیبانی شفاف و پاسخ‌گو بخشی از تعهد ماست، نه یک گزینه اضافی.
            سادگی در انتخاب و استفاده، چیزی است که ما را از بقیه جدا می‌کند.
          </p>
        </div>
        <Image
          width={616}
          height={393}
          alt="Our mission"
          src={aboutUsOurAbilitiesImg}
          className="rounded-2xl w-full h-auto max-lg:row-start-1"
        />
      </div>

      <div className="wrapper mt-24 lg:mt-40">
        <h2 className="heading max-lg:text-center">چهارچوب ارزش‌های ویرالرن</h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Image
            width={616}
            height={393}
            alt="Our mission"
            src={aboutUsOurValuesImg}
            className="rounded-2xl w-full h-auto sticky top-26"
          />
          <div className="flex justify-center flex-col gap-6 max-lg:items-center">
            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title">یکپارچگی در خدمات</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                یکپارچگی در خدمات یعنی از لحظه انتخاب محصول تا پشتیبانی پس از خرید، همه‌چیز هماهنگ و بدون تناقض باشد.
                ما تلاش می‌کنیم اطلاعات، فروش و خدمات پس از فروش در یک مسیر مشخص و شفاف حرکت کنند.
                این رویکرد باعث می‌شود کاربر سردرگم نشود و تجربه‌ای قابل اعتماد داشته باشد.
                کمتر قول می‌دهیم، اما همان را یکدست و درست اجرا می‌کنیم.
              </p>
            </div>

            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title">تمرکز بر امنیت</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                تمرکز بر امنیت برای ما یک شعار نیست، اصل ماجراست.
                هر ریموت و قفل ایمنی با معیارهای سخت‌گیرانه از نظر کدگذاری، دوام و عملکرد بررسی می‌شود.
                هدف ما کاهش ریسک دسترسی غیرمجاز و افزایش آرامش خاطر کاربران است.
                اگر محصولی واقعاً امن نباشد، جایی در انتخاب‌های ما ندارد.
              </p>
            </div>

            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title">نوآوری مستمر</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                نوآوری برای ما یک توقف‌ناپذیر است، نه یک پروژه کوتاه‌مدت.
                همیشه دنبال روش‌ها و تکنولوژی‌های جدید هستیم تا امنیت و راحتی کاربران را ارتقا دهیم.
                محصولات و خدمات ما به‌طور مستمر بررسی و بهبود می‌شوند تا استانداردهای روز را رعایت کنند.
                هدف نهایی ارائه تجربه‌ای به‌روز، کارآمد و بدون دغدغه است.
              </p>
            </div>

            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title">سهولت استفاده</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                سهولت استفاده برای ما یکی از اصول اصلی است، نه یک گزینه اضافی.
                محصولات طوری طراحی شده‌اند که نصب و کاربری‌شان ساده و بدون دردسر باشد.
                تمرکز ما بر کاهش پیچیدگی‌های فنی و صرفه‌جویی در وقت کاربران است.
                هدف نهایی تجربه‌ای راحت، روان و بدون نیاز به دانش تخصصی است.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex justify-center flex-col max-lg:items-center">
          <h2 className="heading">چشم‌انداز آینده</h2>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            در {brand.name} چشم‌انداز آینده ما ایجاد محیطی امن و مطمئن برای همه کاربران است، بدون اینکه امنیت پیچیده یا دست‌نیافتنی باشد.
            می‌خواهیم با توسعه مستمر محصولات و خدمات، استانداردهای جدیدی در حوزه ریموت و قفل‌های ایمنی تعریف کنیم.
            تمرکز ما بر ترکیب فناوری، نوآوری و سادگی استفاده برای تجربه‌ای بی‌دغدغه است.
            هدف نهایی تبدیل شدن به مرجعی قابل اعتماد و پیشرو در صنعت امنیت خانگی و صنعتی است.
          </p>
        </div>
        <Image
          width={616}
          height={393}
          alt="Our mission"
          src={aboutUsOurFutureImg}
          className="rounded-2xl w-full h-auto"
        />
      </div>

      <Faq />

      <Socials />
    </>
  );
}

export default AboutUsPage;

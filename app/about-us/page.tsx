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

function AboutUsPage() {
  return (
    <>
      <Breadcrumbs links={[{ name: "درباره ما", href: "/about-us" }]} />

      <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10 lg:mt-14">
        <div className="flex flex-col max-lg:items-center justify-center">
          <h1 className="heading">درباره {brand.name}</h1>
          <p className="typography opacity-75 mt-6">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            است.
          </p>
        </div>
        <Image
          width={616}
          height={393}
          src={aboutUsImg}
          alt={`درباره ${brand.name}`}
          className="max-lg:row-start-1 max-w-full mx-auto"
        />
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex justify-center flex-col max-lg:items-center col-span-2">
          <h1 className="heading">داستان ما</h1>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            هر داستان موفقی از یک چالش آغاز می‌شود. در میان دغدغه‌های روزمره‌ی
            مدیریت کلاس‌ها، پیگیری پیشرفت دانش‌آموزان و هماهنگی ابزارهای مختلف
            آموزشی، مدرسان با مشکلات فراوانی روبرو شدند. ما تصمیم گرفتیم تا با
            خلق یک سامانه جامع، این چالش‌ها را از ریشه برطرف کنیم. ویرالرن از
            نیاز واقعی به یک بستر یکپارچه متولد شد؛ بسترهایی که هم زمان کارایی
            مدیریتی و کیفیت یادگیری را افزایش دهد.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 font-yekan-bakh-semi-bold">
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">+۲۰،۰۰۰</span>
            <span className="text-sm lg:text-base">دانش پذیر</span>
          </div>
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">۵۰٪</span>
            <span className="text-sm lg:text-base">فروش بیشتر</span>
          </div>
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">+۲۰،۰۰۰</span>
            <span className="text-sm lg:text-base">دانش پذیر</span>
          </div>
          <div className="aspect-video card border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10 flex items-center justify-center flex-col">
            <span className="text-2xl lg:text-3xl text-primary">۳۰۰</span>
            <span className="text-sm lg:text-base">مدرس</span>
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
            ما در ویرالرن بر این باوریم که:
            {'"'}ما معتقدیم تدریس تدریس به عنوان یک امر مقدس، باید بهینه و
            کارآمد باشد و این امر مستلزم استفاده از ابزارهای هوشمند است. این
            اعتقاد، ما را به خلق ویرالرن هدایت کرد.{'"'}
            ماموریت ما ایجاد فضایی است که در آن مدرسان بتوانند با استفاده از
            امکانات پیشرفته، به‌سادگی کلاس‌های خود را مدیریت کرده و دانش‌آموزان
            را در مسیر یادگیری همراهی کنند. از طراحی دوره‌های آموزشی گرفته تا
            ارزیابی پیشرفت و مدیریت مالی، همه چیز در یک محیط منسجم و امن ارائه
            می‌شود.
          </p>
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex justify-center flex-col max-lg:items-center">
          <h2 className="heading">ویژگی‌های منحصربه‌فرد ما</h2>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            یکپارچگی کامل: تمامی ابزارهای مورد نیاز برای مدیریت آموزشی در یک
            بستر جمع‌آوری شده‌اند.
            سفارشی‌سازی حرفه‌ای: امکان ایجاد تجربه کاربری شخصی‌سازی‌شده مطابق با
            نیاز هر برند.
            تکنولوژی به‌روز: استفاده از فناوری‌های پیشرفته نظیر گیمیفیکیشن،
            آزمون‌های هوشمند و ابزارهای تعامل زنده.
            امنیت و پشتیبانی: تضمین حفظ حقوق و کپی‌رایت مدرسان و ارائه پشتیبانی
            مداوم.
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
                ویرالرن متعهد است تمام ابزارهای مورد نیاز مدرسان و دانش پذیران
                را در یک بستر یکپارچه و هماهنگ ارائه دهد تا بهره‌وری آن‌ها
                افزایش یابد و پراکندگی ذهنی آنها از بین برود.
              </p>
            </div>

            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title">تمرکز بر رشد و برندینگ مدرسان</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                ویرالرن به‌عنوان یک ERP آموزشی، به مدرسان کمک می‌کند تا علاوه بر
                تدریس، کسب و کار خود را مدیریت کنند و برند شخصی خود را بسازند و
                رشد پایدار داشته باشند. ویرالرن متعهد است که مدیریت دوره‌ها،
                تعاملات، فروش و بازاریابی را برای مدرسان آسان‌تر و کارآمدتر کند.
              </p>
            </div>

            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title">نوآوری مستمر</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                ویرالرن همواره در حال طراحی و توسعه ابزارهای نوآورانه برای پاسخ
                به چالش‌های آموزشی و بهبود کیفیت خدمات است.
              </p>
            </div>

            <div className="card p-6 group border border-transparent hover:border-primary shadow-2xl shadow-transparent hover:shadow-primary/10">
              <div className="flex items-center gap-3">
                <StarIcon className="text-primary group-hover:fill-primary size-7" />
                <p className="title"> ساده‌سازی فرایندهای مدیریتی</p>
              </div>
              <p className="mt-3 typography opacity-75 text-center lg:text-justify">
                ویرالرن متعهد است که مدیریت دوره‌ها، تعاملات، فروش و بازاریابی
                را برای مدرسان آسان‌تر و کارآمدتر کند.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mt-24 lg:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex justify-center flex-col max-lg:items-center">
          <h2 className="heading">چشم‌انداز آینده</h2>
          <p className="mt-6 typography opacity-75 text-center lg:text-justify">
            در ویرالرن همواره در جستجوی نوآوری و بهبود مستمر هستیم. چشم‌انداز
            ما، ایجاد تجربه‌ای آموزشی است که نه تنها برای مدرسان و دانش‌پذیران
            بلکه موسسات و آکادمی ها نیز مؤثر باشد. ما متعهدیم تا با
            به‌روزرسانی‌های مداوم و افزودن امکانات جدید، همیشه در کنار شما
            باشیم.
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

      {/* <TeamCarousel /> */}

      <Socials />
    </>
  );
}

export default AboutUsPage;

import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";

function Breadcrumbs({ links }: { links: { name: string; href: string }[] }) {
  return (
    <div className="wrapper mt-10 lg:mt-14">
      <div className="flex items-center overflow-x-auto gap-1.5">
        <Link href={"/"}>
          <Button variant={"ghost"}>
            <HomeIcon />
            <span>صفحه اصلی</span>
          </Button>
        </Link>
        {links.map((item, index) => (
          <>
            <ChevronLeftIcon className="size-5 min-w-5" />
            <Link href={item.href}>
              <Button
                className={
                  index + 1 === links.length ? "font-yekan-bakh-semi-bold" : ""
                }
                variant={"ghost"}
              >
                <span>{item.name}</span>
              </Button>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumbs;

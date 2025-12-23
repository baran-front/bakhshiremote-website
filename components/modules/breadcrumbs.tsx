import Link from "next/link";
import { Button } from "../ui/button";
import { Fragment } from "react/jsx-runtime";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";

function Breadcrumbs({ links }: { links: { name: string; href: string }[] }) {
  return (
    <div className="wrapper mt-10 lg:mt-14">
      <div className="flex items-center overflow-x-auto gap-1">
        <Link href={"/"}>
          <Button variant={"ghost"}>
            <HomeIcon />
            <span>صفحه اصلی</span>
          </Button>
        </Link>
        {links.map((item, index) => (
          <Fragment key={index}>
            <ChevronLeftIcon className="size-3 min-w-3" />
            <Link href={item.href}>
              <Button
                size={"sm"}
                variant={"ghost"}
                className={
                  index + 1 === links.length ? "font-yekan-bakh-semi-bold" : ""
                }
              >
                <span>{item.name}</span>
              </Button>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumbs;

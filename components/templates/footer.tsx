"use client";

import Image from "next/image";
import { ArrowLeftIcon, MailIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { InputGroupInput } from "../ui/input-group";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMenuLinksByGroup } from "@/lib/fetchs";
import { CSSProperties } from "react";
import { brand } from "@/brand";
import { useTheme } from "next-themes";

function Footer() {
  const pathname = usePathname();
  const { theme, systemTheme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const { data: links } = useQuery({
    queryKey: ["links-by-footer"],
    queryFn: () => getMenuLinksByGroup({ groupnames: "footer" }),
  });

  const { data: socials } = useQuery({
    queryKey: ["links-by-social"],
    queryFn: () => getMenuLinksByGroup({ groupnames: "social" }),
  });

  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <footer className="wrapper mt-24 lg:mt-40 mb-6 lg:mb-8">
      <div className="bg-linear-to-bl from-secondary to-primary p-0.5 rounded-2xl">
        <div className="bg-card rounded-2xl p-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b">
            {links?.result?.data?.map((item) => (
              <div
                key={item.id}
                className="space-y-3 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center"
              >
                <p className="title max-lg:text-center">{item.name}</p>
                {item.children.length ? (
                  <ul className="space-y-3">
                    {item.children.map((childItem) => (
                      <li className="max-lg:text-center" key={childItem.id}>
                        {childItem.linkUrl?.startsWith("/") ? (

                          <Link href={childItem.linkUrl || ""}>
                            <Button
                              variant={"ghostPrimary"}
                            >
                              {childItem.name}
                            </Button>
                          </Link>
                        ) : <p className="text-sm">{childItem.name}</p>}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="space-y-6 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center">
              <label className="block" htmlFor="email">
                عضویت در خبرنامه
              </label>
              <div className="flex items-center gap-3">
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="ایمیل"
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                <Button size={"icon"}>
                  <ArrowLeftIcon />
                </Button>
              </div>
              <div className="w-full flex items-center max-lg:justify-center gap-3">
                <div className="max-sm:w-full max-sm:aspect-square sm:size-16 rounded-lg bg-background"></div>
                <div className="max-sm:w-full max-sm:aspect-square sm:size-16 rounded-lg bg-background"></div>
              </div>
              <Button
                size="icon"
                variant="outline"
                aria-label="تغییر تم صفحه"
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              >
                <SunIcon className="not-dark:hidden" />
                <MoonIcon className="dark:hidden" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col gap-3 mt-12">
            <Image width={58} height={56} alt={brand.name} src={currentTheme === "light" ? brand.logoImg.light : brand.logoImg.dark} />
            <p dir="ltr">@{new Date().getFullYear()} وب سایت {brand.name}</p>
            <div className="flex items-center gap-3">
              {socials?.result?.data?.map((item) => (
                <Link
                  style={
                    {
                      "--social-shadow-color": item.description,
                    } as CSSProperties
                  }
                  className="outline-2 outline-offset-2 outline-transparent rounded-full transition-colors hover:outline-(--social-shadow-color)"
                  href={item.linkUrl || ""}
                  key={item.id}
                >
                  <Image
                    width={32}
                    height={32}
                    alt={item.name || ""}
                    src={brand.apiBaseUrl + (item.imageUrl || "")}
                  />
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-center flex-wrap gap-1.5">
              {links?.result?.data
                ?.find((item) => item.name === "ارتباط با ما")
                ?.children.map((item) => (
                  <Link href={item.linkUrl || ""} key={item.id}>
                    <Button variant={"unstyled"} className="hover:underline">
                      {item.name}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { brand } from "@/brand";
import { Button } from "../../ui/button";
import { useQuery } from "@tanstack/react-query";
import HeaderMobileSheet from "./headerMobileSheet";
import HeaderLoginButton from "./headerLoginButton";
import HeaderSearchButton from "./headerSearchButton";
import HeaderProfileButton from "./headerProfileButton";
import { getMenuLinksByGroup, getMe } from "@/lib/fetchs";
import { getCookie } from "cookies-next/client";

export function Header() {
  const pathname = usePathname();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe({ token: getCookie("token") || "" }),
  });

  const { data: links, isLoading } = useQuery({
    queryKey: ["links-by-header"],
    queryFn: () => getMenuLinksByGroup({ groupnames: "header" }),
  });

  const handleActiveLink = (link: string) => {
    if (link === "/") {
      return pathname === link;
    }

    if (link.endsWith("/")) {
      return pathname.endsWith(link.split("/")[1]);
    }

    return pathname.includes(link);
  };

  return (
    <header className="sticky top-0 bg-background/50 backdrop-blur-md shadow-lg z-40">
      <nav className="wrapper flex items-center gap-6 h-20">
        <Link
          className="flex items-center gap-3 lg:pe-6 lg:border-e-2"
          href={"/"}
        >
          <Image
            width={50}
            height={50}
            alt="گیم مستر"
            src={brand.logoImg}
            className="h-full w-auto"
          />
          <span className="max-sm:hidden">{brand.name}</span>
        </Link>

        <div className="flex items-center gap-3 bg-card p-1.5 rounded-full max-lg:hidden">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Button
                key={index}
                variant={"unstyled"}
                className="w-30 bg-background animate-pulse"
              />
            ))}
          {links?.result?.data?.map((item) => (
            <Link href={item.linkUrl || ""} key={item.name}>
              <Button
                className={
                  handleActiveLink(item.linkUrl || "")
                    ? ""
                    : "border border-transparent hover:border-primary"
                }
                variant={
                  handleActiveLink(item.linkUrl || "") ? "default" : "unstyled"
                }
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <HeaderSearchButton />

        <div className="ps-3 lg:ps-6 border-s-2">
          <HeaderMobileSheet
            handleActiveLink={handleActiveLink}
            links={links?.result?.data || []}
          />

          {user?.status === 200 ? (
            <HeaderProfileButton />
          ) : (
            <HeaderLoginButton
              variant={"ghost"}
              className="ring-4 ring-card dark:ring-black/50 inset-shadow-xs inset-shadow-card not-dark:inset-shadow-black/20 border border-transparent hover:border-primary max-lg:hidden"
            />
          )}
        </div>
      </nav>
    </header>
  );
}

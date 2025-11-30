import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getMe } from "@/lib/fetchs";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next/client";
import { BookmarkIcon, ChevronDownIcon, LayoutGridIcon, ShoppingCartIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";

function HeaderProfileButton() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe({ token: getCookie("token") || "" }),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hidden lg:flex lg:items-center lg:gap-1.5 group">
          <UserCircleIcon className="size-5" />
          <p className="text-sm lg:group-hover:bg-card lg:transition-colors hidden lg:flex lg:items-center h-10 px-3 gap-1.5 rounded-full">
            <span>
              {user?.result?.firstName || "کاربر"}{" "}
              {user?.result?.lastName || "ناشناس"}
            </span>
            <ChevronDownIcon className="lg:size-5" />
          </p>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-3 [&_a]:block [&_button]:w-full [&_button]:justify-start [&_button]:gap-3" align="end">
        <Link className="max-lg:hidden!" href={"/dashboard/desk"}>
          <Button variant={"ghost"}>
            <LayoutGridIcon />
            <span>داشبورد</span>
          </Button>
        </Link>
        <Link className="lg:hidden!" href={"/dashboard"}>
          <Button variant={"ghost"}>
            <LayoutGridIcon />
            <span>داشبورد</span>
          </Button>
        </Link>
        <Link href={"/dashboard/favorites"}>
          <Button variant={"ghost"}>
            <BookmarkIcon />
            <span>علاقه مندی ها</span>
          </Button>
        </Link>
        <Link href={"/cart"}>
          <Button variant={"ghost"}>
            <ShoppingCartIcon />
            <span>سبد خرید</span>
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
}

export default HeaderProfileButton;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { ComponentProps } from "react";

function RemoveFiltersButton({ ...props }: ComponentProps<typeof Button>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if there are any search params
  const hasSearchParams = searchParams && searchParams.toString().length > 0;

  const handleRemoveFilters = () => {
    // Navigate to pathname without any query params
    router.push(pathname, {
      scroll: false
    });
  };

  return (
    <Button
      disabled={!hasSearchParams}
      onClick={handleRemoveFilters}
      {...props}
    >
      <span>حذف فیلترها</span>
      <XIcon />
    </Button>
  );
}

export default RemoveFiltersButton;

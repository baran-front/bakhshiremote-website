"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function DashboardFavoritesTabs({
  categories,
}: {
  categories: { label: string; value: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const sp = new URLSearchParams(searchParams?.toString());
    sp.set("category", value);
    router.push(`${pathname}?${sp.toString()}`);
  };

  const activeCategory = searchParams?.get("category");

  return (
    <ToggleGroup
      type="single"
      onValueChange={handleChange}
      defaultValue={activeCategory || "all"}
      className="w-full overflow-x-auto [&_button]:flex-1/4 [&_button]:min-w-max"
    >
      <ToggleGroupItem value="all">همه</ToggleGroupItem>
      {categories.map((category) => (
        <ToggleGroupItem key={category.value} value={category.value}>
          {category.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export default DashboardFavoritesTabs;

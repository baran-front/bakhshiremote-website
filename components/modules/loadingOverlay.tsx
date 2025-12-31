import Image from "next/image";
import { brand } from "@/brand";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Logo container with pulse animation */}
        <div className="relative animate-pulse-slow">
          {/* Light theme logo */}
          <Image
            width={120}
            height={120}
            alt={brand.name}
            src={brand.logoImg.light}
            className="h-24 w-auto object-contain dark:hidden"
            priority
          />
          {/* Dark theme logo */}
          <Image
            width={120}
            height={120}
            alt={brand.name}
            src={brand.logoImg.dark}
            className="h-24 w-auto object-contain hidden dark:block"
            priority
          />
        </div>

        {/* Spinner */}
        <div className="loading-spinner">
          <div className="loading-spinner-inner"></div>
        </div>

        {/* Brand name */}
        <p className="text-foreground/70 text-sm font-yekan-bakh animate-pulse">
          در حال بارگذاری...
        </p>
      </div>
    </div>
  );
}


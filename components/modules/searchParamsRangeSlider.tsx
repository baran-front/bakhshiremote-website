"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RangeSlider from "./rangeSlider";
import { ComponentProps, useMemo, useRef } from "react";

interface SearchParamsRangeSliderProps extends Omit<ComponentProps<typeof RangeSlider>, "value" | "onChange" | "onInput" | "defaultValue"> {
  searchParamsKey: string;
}

function SearchParamsRangeSlider({
  searchParamsKey,
  min,
  max,
  step,
  className,
  ...props
}: SearchParamsRangeSliderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingValueRef = useRef<[number, number] | null>(null);
  const isUpdatingRef = useRef(false);

  // Parse current value from search params (format: "min-max")
  const currentValue = useMemo(() => {
    const priceRange = searchParams?.get(searchParamsKey);
    if (priceRange) {
      const [minVal, maxVal] = priceRange.split("-").map(Number);
      if (!isNaN(minVal) && !isNaN(maxVal)) {
        return [minVal, maxVal] as [number, number];
      }
    }
    return [min, max] as [number, number];
  }, [searchParams, searchParamsKey, min, max]);

  const updateSearchParams = (value: [number, number]) => {
    // Prevent multiple simultaneous updates
    if (isUpdatingRef.current) {
      return;
    }

    isUpdatingRef.current = true;
    const sp = new URLSearchParams(searchParams?.toString());
    const [minVal, maxVal] = value;

    // If the range is at the default min/max, remove the param
    if (minVal === min && maxVal === max) {
      sp.delete(searchParamsKey);
    } else {
      sp.set(searchParamsKey, `${minVal}-${maxVal}`);
    }

    router.push(`${pathname}?${sp.toString()}`, {
      scroll: false
    });

    // Reset flag after a short delay to allow next update
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  };

  // Handle input during dragging - only update display, not search params
  const handleInput = (value: [number, number]) => {
    // Store the pending value
    pendingValueRef.current = value;

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to update search params after user stops dragging
    debounceTimeoutRef.current = setTimeout(() => {
      if (pendingValueRef.current) {
        updateSearchParams(pendingValueRef.current);
        pendingValueRef.current = null;
      }
    }, 1_000); // Wait 1 second after user stops dragging
  };

  // Handle change when user releases mouse - update immediately and cancel debounce
  const handleChange = (value: [number, number]) => {
    // Clear any pending debounced update
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    // Only update if we're not already updating (prevents duplicate updates)
    if (!isUpdatingRef.current) {
      updateSearchParams(value);
    }
    pendingValueRef.current = null;
  };

  return (
    <RangeSlider
      min={min}
      max={max}
      step={step}
      value={currentValue}
      onInput={handleInput}
      onChange={handleChange}
      className={className}
      {...props}
    />
  );
}

export default SearchParamsRangeSlider;


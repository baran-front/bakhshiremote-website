"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import rangeSlider, { type RangeSlider as RangeSliderT } from "range-slider-input";
import "range-slider-input/dist/style.css";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  onInput?: (value: [number, number]) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

function RangeSlider({
  min,
  max,
  step,
  value,
  defaultValue = [min, max],
  onChange,
  onInput,
  disabled = false,
  className,
  label,
}: RangeSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderInstanceRef = useRef<RangeSliderT | null>(null);
  const [internalValue, setInternalValue] = useState<[number, number]>(
    value || defaultValue
  );
  // Track display value separately to update during dragging
  const [displayValue, setDisplayValue] = useState<[number, number]>(
    value || defaultValue
  );
  const isControlled = value !== undefined;

  // Memoize callbacks to prevent unnecessary re-renders
  const handleInput = useCallback(
    (newValue: [number, number], userInteraction: boolean) => {
      // Always update display value for immediate feedback
      setDisplayValue(newValue);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onInput?.(newValue);
      if (userInteraction) {
        onChange?.(newValue);
      }
    },
    [isControlled, onChange, onInput]
  );

  // Initialize the slider (only once on mount)
  useEffect(() => {
    const element = sliderRef.current;
    if (!element) return;

    // Initialize the slider with initial values
    const initialValue = isControlled && value ? value : internalValue;
    setDisplayValue(initialValue);
    const slider = rangeSlider(element, {
      min,
      max,
      step,
      value: initialValue,
      disabled,
      onInput: handleInput,
    });

    sliderInstanceRef.current = slider;

    // Cleanup
    return () => {
      if (sliderInstanceRef.current) {
        sliderInstanceRef.current.removeGlobalEventListeners();
        sliderInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Update slider when controlled value changes
  useEffect(() => {
    if (isControlled && sliderInstanceRef.current && value) {
      sliderInstanceRef.current.value(value);
      setDisplayValue(value);
    }
  }, [value, isControlled]);

  // Update slider when props change
  useEffect(() => {
    if (sliderInstanceRef.current) {
      sliderInstanceRef.current.min(min);
      sliderInstanceRef.current.max(max);
      sliderInstanceRef.current.step(step);
      sliderInstanceRef.current.disabled(disabled);
    }
  }, [min, max, step, disabled]);

  // Use displayValue for immediate updates during dragging, fallback to prop/internal value
  const currentValue = displayValue;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground inline-block">{label}</label>
      )}
      <div
        ref={sliderRef}
        className="range-slider"
      />
      {currentValue && (
        <div className="flex items-center justify-between text-sm text-foreground/70">
          <span>{currentValue[1].toLocaleString("fa")} <span className="text-xs">تومان</span></span>
          <span>{currentValue[0].toLocaleString("fa")} <span className="text-xs">تومان</span></span>
        </div>
      )}
    </div>
  );
}

export default RangeSlider;
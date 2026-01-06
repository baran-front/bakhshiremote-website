"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const SelectSearchContext = React.createContext<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
} | null>(null);

export const useSelectSearch = () => {
  const context = React.useContext(SelectSearchContext);
  return context;
};

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 rounded-full border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "focus-visible:ring-primary/20 hover:ring-primary/20 focus-visible:border-primary hover:border-primary focus-visible:placeholder:text-foreground ring-[3px] ring-transparent",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  searchable,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  searchable?: boolean;
}) {
  const [searchTerm, setSearchTerm] = React.useState("");

  // Reset search term when select closes
  React.useEffect(() => {
    const handleClose = () => {
      setSearchTerm("");
    };

    // This will be called when the content unmounts (select closes)
    return () => {
      handleClose();
    };
  }, []);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-card data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl p-1.5 border shadow-md",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        onCloseAutoFocus={() => {
          setSearchTerm("");
        }}
        {...props}
      >
        <SelectSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          {searchable && <SelectSearch />}
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectSearchContext.Provider>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const searchContext = useSelectSearch();

  // Extract text content from children (handles both string and React nodes)
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node);
    }
    if (Array.isArray(node)) {
      return node.map(getTextContent).join("");
    }
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      if (props?.children) {
        return getTextContent(props.children);
      }
    }
    return "";
  };

  const itemText = getTextContent(children);
  const shouldShow = !searchContext?.searchTerm ||
    itemText.toLowerCase().includes(searchContext.searchTerm.toLowerCase());

  if (!shouldShow) {
    return null;
  }

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-primary/10 focus:text-primary relative flex w-full cursor-default items-center gap-2 rounded-full py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

function SelectSearch({
  className,
  placeholder = "جستجو...",
  ...props
}: React.ComponentProps<"input"> & {
  placeholder?: string;
}) {
  const searchContext = useSelectSearch();

  if (!searchContext) {
    return null;
  }

  const { searchTerm, setSearchTerm } = searchContext;

  return (
    <div className="sticky top-0 z-10 mb-1.5 bg-background rounded-full">
      <div className="relative">
        <SearchIcon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn("pr-9", className)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Escape") {
              setSearchTerm("");
            }
          }}
          {...props}
        />
      </div>
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSearch,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      "cursor-pointer",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, disabled, onClick, ...props }: any) => (
  <button
    aria-label="Go to previous page"
    className={cn(
      "bg-neutral-800 h-10 w-10 shadow flex rounded-full justify-center items-center",
      disabled && "bg-neutral-200"
    )}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <ArrowLeft
      className={cn("text-white h-5 w-5", disabled && "text-neutral-800")}
    />
  </button>
);

const PaginationNext = ({ className, disabled, onClick, ...props }: any) => (
  <button
    aria-label="Go to next page"
    className={cn(
      "bg-neutral-800 h-10 shadow w-10 flex rounded-full justify-center items-center",
      disabled && "bg-neutral-200"
    )}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <ArrowRight
      className={cn("text-white h-5 w-5", disabled && "text-neutral-800")}
    />
  </button>
);

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  /** Path of the paginated listing, e.g. "/ogloszenia" */
  basePath: string;
}

function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

function visiblePages(current: number, total: number, maxVisible = 5) {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + maxVisible - 1);
  if (end === total) {
    start = Math.max(1, end - maxVisible + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  totalPages,
  currentPage,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = visiblePages(currentPage, totalPages);
  const showStartEllipsis = pages[0] > 1;
  const showEndEllipsis = pages[pages.length - 1] < totalPages;

  const itemClass =
    "inline-flex size-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors";

  return (
    <nav aria-label="Paginacja" className="flex justify-center">
      <ul className="flex items-center gap-1.5">
        <li>
          {currentPage > 1 ? (
            <Link
              href={pageHref(basePath, currentPage - 1)}
              rel="prev"
              aria-label="Poprzednia strona"
              className={cn(itemClass, "text-navy-800 hover:bg-navy-100")}
            >
              <ChevronLeft aria-hidden className="size-5" />
            </Link>
          ) : (
            <span className={cn(itemClass, "text-navy-300")} aria-hidden>
              <ChevronLeft className="size-5" />
            </span>
          )}
        </li>

        {showStartEllipsis && (
          <>
            <li>
              <Link
                href={pageHref(basePath, 1)}
                className={cn(itemClass, "text-navy-800 hover:bg-navy-100")}
              >
                1
              </Link>
            </li>
            <li aria-hidden className="px-1 text-navy-400">
              …
            </li>
          </>
        )}

        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span
                aria-current="page"
                className={cn(itemClass, "bg-navy-800 text-white")}
              >
                {page}
              </span>
            ) : (
              <Link
                href={pageHref(basePath, page)}
                className={cn(itemClass, "text-navy-800 hover:bg-navy-100")}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {showEndEllipsis && (
          <>
            <li aria-hidden className="px-1 text-navy-400">
              …
            </li>
            <li>
              <Link
                href={pageHref(basePath, totalPages)}
                className={cn(itemClass, "text-navy-800 hover:bg-navy-100")}
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={pageHref(basePath, currentPage + 1)}
              rel="next"
              aria-label="Następna strona"
              className={cn(itemClass, "text-navy-800 hover:bg-navy-100")}
            >
              <ChevronRight aria-hidden className="size-5" />
            </Link>
          ) : (
            <span className={cn(itemClass, "text-navy-300")} aria-hidden>
              <ChevronRight className="size-5" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

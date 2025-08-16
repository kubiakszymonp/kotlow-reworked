"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  maxPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showEllipsis?: boolean;
  maxVisiblePages?: number;
}

export function CustomPagination({
  maxPages,
  currentPage = 1,
  onPageChange,
  showEllipsis = true,
  maxVisiblePages = 5,
}: CustomPaginationProps) {
  const [current, setCurrent] = useState(currentPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > maxPages) return;
    setCurrent(page);
    onPageChange?.(page);
  };

  const getVisiblePages = () => {
    if (maxPages <= maxVisiblePages) {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, current - half);
    const end = Math.min(maxPages, start + maxVisiblePages - 1);

    if (end === maxPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = showEllipsis && visiblePages[0] > 2;
  const showEndEllipsis =
    showEllipsis && visiblePages[visiblePages.length - 1] < maxPages - 1;

  if (maxPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(current - 1);
            }}
            className={
              current <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
            size="default"
          />
        </PaginationItem>

        {showStartEllipsis && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
              isActive={current === 1}
              size="default"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              isActive={current === page}
              size="default"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {showEndEllipsis && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(maxPages);
              }}
              isActive={current === maxPages}
              size="default"
            >
              {maxPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(current + 1);
            }}
            className={
              current >= maxPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            size="default"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

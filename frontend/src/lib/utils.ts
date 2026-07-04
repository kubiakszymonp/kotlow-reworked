import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** CMS link values are free-form strings; guarantee an absolute path. */
export function normalizeHref(link?: string | null): string {
  if (!link) return "/";
  if (/^(https?:)?\/\//.test(link) || link.startsWith("mailto:") || link.startsWith("tel:")) {
    return link;
  }
  return link.startsWith("/") ? link : `/${link}`;
}

/** Derive a plain-text excerpt (e.g. meta description) from CMS HTML. */
export function htmlToExcerpt(html?: string | null, maxLength = 160): string {
  if (!html) return "";
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&oacute;/g, "ó")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}

export function formatDate(value?: string | Date | null): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

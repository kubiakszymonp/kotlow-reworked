import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  /** h1 for page titles, h2 for in-page sections */
  level?: 1 | 2;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  level = 2,
  align = "center",
  className,
}: SectionHeadingProps) {
  if (!title && !subtitle) {
    return null;
  }

  const HeadingTag = level === 1 ? "h1" : "h2";

  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {title && (
        <HeadingTag className="font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
          {title}
        </HeadingTag>
      )}
      <div
        aria-hidden
        className={cn(
          "mt-4 h-0.5 w-16 bg-gold-500",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}

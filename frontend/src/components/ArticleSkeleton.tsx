export function ArticleSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-[8/5] animate-pulse bg-navy-100" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-navy-100" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-navy-100" />
        <div className="h-5 w-3/5 animate-pulse rounded bg-navy-100" />
        <div className="mt-2 h-4 w-28 animate-pulse rounded bg-navy-100" />
      </div>
    </div>
  );
}

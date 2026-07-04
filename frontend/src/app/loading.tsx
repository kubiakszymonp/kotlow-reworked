import { ArticleSkeleton } from "@/components/ArticleSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto mb-12 h-9 w-64 animate-pulse rounded bg-navy-100" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}

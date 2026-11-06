import { Skeleton } from "@/components/ui/skeleton";

export function EventsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <span className="sr-only">Loading events</span>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div role="status" className="flex flex-col gap-6">
      <span className="sr-only">Loading events</span>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-xl border border-border bg-card md:flex-row"
        >
          <Skeleton className="h-48 w-full rounded-none md:w-72" />
          <div className="flex-1 space-y-3 p-6">
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventDetailsSkeleton() {
  return (
    <div role="status" className="mx-auto max-w-6xl px-6 py-8">
      <span className="sr-only">Loading event</span>
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-6 h-72 w-full md:h-96" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-56 w-full" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-4">
      <span className="sr-only">Loading profile</span>
      <Skeleton className="size-24 rounded-full" />
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}

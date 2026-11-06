import { Suspense } from "react";

import { EventsGrid } from "@/components/event/EventsGrid";
import { EventsGridSkeleton } from "@/components/skeletons";
import { SectionHeading } from "@/components/section-heading";
import type { IEvent } from "@/lib/types/event";

async function UpcomingEvents() {
  let data: IEvent[];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load events");
    data = await res.json();
  } catch {
    return (
      <p role="status" className="py-16 text-center text-muted-foreground">
        Events are unavailable right now. Please try again later.
      </p>
    );
  }

  return (
    <>
      <p className="mt-5 mb-6 text-sm text-muted-foreground">
        Showing {data.length} upcoming events
      </p>
      <EventsGrid events={data} />
    </>
  );
}

export default function UpcomingEventsPage() {
  return (
    <main className="w-full bg-background px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          as="h1"
          title="Upcoming Events"
          subtitle="Find a community service event near you and join the effort."
        />
        <Suspense fallback={<div className="mt-10"><EventsGridSkeleton /></div>}>
          <UpcomingEvents />
        </Suspense>
      </div>
    </main>
  );
}

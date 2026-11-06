import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { EventsGrid } from "@/components/event/EventsGrid";
import { EventsGridSkeleton } from "@/components/skeletons";
import type { IEvent } from "@/lib/types/event";

async function RecentEvents() {
  let events: IEvent[];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-events`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to load recent events");
    events = await response.json();
    if (!Array.isArray(events)) throw new Error("Invalid events");
  } catch {
    return (
      <p role="status" className="py-16 text-center text-muted-foreground">
        Upcoming events are unavailable right now. Please try again later.
      </p>
    );
  }

  return <EventsGrid events={events} />;
}

export default function RecentUpcomingEvents() {
  return (
    <section className="w-full bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            title="Recent Upcoming Events"
            subtitle="The next service events coming up in your community. Pick one and show up."
          />
          <Button
            render={<Link href="/upcoming-events" />}
            nativeButton={false}
            variant="outline"
          >
            All Events
            <ArrowRight />
          </Button>
        </div>
        <Suspense fallback={<EventsGridSkeleton />}>
          <RecentEvents />
        </Suspense>
      </div>
    </section>
  );
}

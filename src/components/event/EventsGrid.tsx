import { EventCard } from "@/components/event/EventCard";
import type { IEvent } from "@/lib/types/event";

export function EventsGrid({ events }: { events: IEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
        No upcoming events yet. Be the first to organise one for your
        neighbourhood!
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

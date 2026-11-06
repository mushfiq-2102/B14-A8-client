import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EventImage from "@/components/event/EventImage";
import { formatEventDate } from "@/lib/format";
import type { IEvent } from "@/lib/types/event";

export function EventCard({ event }: { event: IEvent }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted">
        <EventImage
          src={event.imageUrl}
          alt={event.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Badge variant="secondary" className="absolute top-3 left-3">
          {event.eventType}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-xl font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4 shrink-0 text-primary" />
            {formatEventDate(event.eventDate)}
          </p>
        </div>

        <Button
          render={<Link href={`/events/${event._id}`} />}
          nativeButton={false}
          className="mt-5 w-full"
        >
          View Event
          <ArrowUpRight />
        </Button>
      </div>
    </article>
  );
}

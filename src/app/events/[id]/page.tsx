import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import EventImage from "@/components/event/EventImage";
import JoinEventButton from "@/components/event/JoinEventButton";
import { EventDetailsSkeleton } from "@/components/skeletons";
import { formatEventDate, todayISO } from "@/lib/format";
import type { IEvent } from "@/lib/types/event";

async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`, {
      cache: "no-store",
    });
  } catch {
    return (
      <p role="status" className="py-24 text-center text-muted-foreground">
        This event is unavailable right now. Please try again later.
      </p>
    );
  }
  if (!res.ok) notFound();
  const event: IEvent = await res.json();

  const isPast = event.eventDate < todayISO();

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <Link
        href="/upcoming-events"
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Upcoming Events
      </Link>

      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-xl bg-muted md:h-96">
        <EventImage
          src={event.imageUrl}
          alt={event.title}
          sizes="100vw"
          priority
        />
      </div>

      <div className="mt-6 grid gap-8 rounded-xl border border-border bg-card p-6 lg:grid-cols-[1fr_300px]">
        <div>
          <Badge variant="secondary">{event.eventType}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {event.title}
          </h1>

          <h2 className="mt-8 text-xl font-semibold text-foreground">
            About This Event
          </h2>
          <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
            {event.description}
          </p>
        </div>

        <aside className="h-fit rounded-lg border border-border p-5">
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Tag className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">Type</span>
                {event.eventType}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">Date</span>
                {formatEventDate(event.eventDate)}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="block text-xs text-muted-foreground">Location</span>
                {event.location}
              </span>
            </li>
          </ul>
          <JoinEventButton eventId={event._id} isPast={isPast} />
        </aside>
      </div>
    </main>
  );
}

export default function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails params={params} />
    </Suspense>
  );
}

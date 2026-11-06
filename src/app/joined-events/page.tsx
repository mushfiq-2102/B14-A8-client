import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import JoinedEventCard from "@/components/event/JoinedEventCard";
import { EventsListSkeleton } from "@/components/skeletons";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import type { IJoinedEvent } from "@/lib/types/joined-event";

async function JoinedEvents() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const token = await getTokenFromServer();

  let res: Response;
  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(user?.email ?? "")}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
  } catch {
    return (
      <p role="status" className="py-16 text-center text-muted-foreground">
        We could not load your events right now. Please try again later.
      </p>
    );
  }

  if (!res.ok) {
    return (
      <p role="status" className="py-16 text-center text-muted-foreground">
        We could not load your joined events right now. Please try again later.
      </p>
    );
  }

  const joinedEvents: IJoinedEvent[] = await res.json();

  if (joinedEvents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="text-muted-foreground">
          You haven&apos;t joined any events yet.
        </p>
        <Button
          render={<Link href="/upcoming-events" />}
          nativeButton={false}
          className="mt-5"
        >
          Find an Event
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {joinedEvents.map((joinedEvent) => (
        <JoinedEventCard joinedEvent={joinedEvent} key={joinedEvent._id} />
      ))}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <SectionHeading
        as="h1"
        title="Joined Events"
        subtitle="Every event you signed up for, ordered by date."
        className="mb-8"
      />
      <Suspense fallback={<EventsListSkeleton />}>
        <JoinedEvents />
      </Suspense>
    </main>
  );
}

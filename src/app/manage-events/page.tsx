import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import ManageEventCard from "@/components/event/ManageEventCard";
import { EventsListSkeleton } from "@/components/skeletons";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import type { IEvent } from "@/lib/types/event";

async function ManageEvents() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const token = await getTokenFromServer();

  let res: Response;
  try {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/manage-events/${encodeURIComponent(user?.email ?? "")}`,
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
        We could not load your events right now. Please try again later.
      </p>
    );
  }

  const events: IEvent[] = await res.json();

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="text-muted-foreground">
          You haven&apos;t created any events yet.
        </p>
        <Button
          render={<Link href="/create-event" />}
          nativeButton={false}
          className="mt-5"
        >
          Create Your First Event
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {events.map((event) => (
        <ManageEventCard event={event} key={event._id} />
      ))}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <SectionHeading
        as="h1"
        title="Manage Events"
        subtitle="Update or remove the events you have created."
        className="mb-8"
      />
      <Suspense fallback={<EventsListSkeleton />}>
        <ManageEvents />
      </Suspense>
    </main>
  );
}

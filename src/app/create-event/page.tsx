"use client";

import { useRouter } from "next/navigation";

import EventForm from "@/components/event/EventForm";
import { SectionHeading } from "@/components/section-heading";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { notifyError, notifySuccess } from "@/lib/notify";
import type { EventFormData } from "@/lib/types/event";

export default function CreateEventPage() {
  const router = useRouter();

  const handleCreate = async (form: EventFormData) => {
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) {
      notifyError("Could not create event", result.message);
      return;
    }

    notifySuccess("Event created", "Your event is now live for volunteers.");
    router.push("/upcoming-events");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          as="h1"
          title="Create a New Event"
          subtitle="Share the details and let your neighbours join in."
        />
        <div className="mt-10 rounded-xl border border-border bg-card p-8 shadow-sm">
          <EventForm
            submitLabel="Create Event"
            onSubmit={handleCreate}
            onCancel={() => router.push("/upcoming-events")}
          />
        </div>
      </div>
    </main>
  );
}

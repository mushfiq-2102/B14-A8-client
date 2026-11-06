"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/event/EventForm";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { notifyError, notifySuccess } from "@/lib/notify";
import type { EventFormData, IEvent } from "@/lib/types/event";

const EditEventDialog = ({ event }: { event: IEvent }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { title, description, eventType, imageUrl, location, eventDate } = event;
  const initialForm: EventFormData = {
    title,
    description,
    eventType,
    imageUrl,
    location,
    eventDate,
  };

  const handleUpdate = async (form: EventFormData) => {
    const token = await getTokenFromClient();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/event/${event._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      notifyError("Could not update event", data.message);
      return;
    }

    notifySuccess("Event updated", "Your changes have been saved.");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Pencil />
        Edit
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update the details below. The event date must be in the future.
          </DialogDescription>
        </DialogHeader>
        <EventForm
          initialForm={initialForm}
          submitLabel="Update Event"
          onSubmit={handleUpdate}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;

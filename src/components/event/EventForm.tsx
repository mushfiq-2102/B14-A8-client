"use client";

import { useState } from "react";
import { PackageCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypes } from "@/lib/constants";
import { tomorrowISO } from "@/lib/format";
import { notifyError } from "@/lib/notify";
import { validateEvent } from "@/lib/validation";
import type { EventFormData } from "@/lib/types/event";

export const emptyEventForm: EventFormData = {
  title: "",
  description: "",
  eventType: "",
  imageUrl: "",
  location: "",
  eventDate: "",
};

export default function EventForm({
  initialForm = emptyEventForm,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initialForm?: EventFormData;
  submitLabel: string;
  onSubmit: (form: EventFormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof EventFormData, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validateEvent(form);
    if (error) {
      notifyError("Please check the form", error);
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        location: form.location.trim(),
        imageUrl: form.imageUrl.trim(),
        description: form.description.trim(),
      });
    } catch {
      notifyError("Network error", "Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            placeholder="Winter Clothes Distribution"
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Event Type</Label>
            <Select
              value={form.eventType}
              onValueChange={(value) => update("eventType", value ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="eventDate">Event Date</Label>
            <Input
              id="eventDate"
              type="date"
              min={tomorrowISO()}
              value={form.eventDate}
              onChange={(event) => update("eventDate", event.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Mirpur 10, Dhaka"
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imageUrl">Thumbnail Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/event.jpg"
            value={form.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell volunteers what the event is about and what to bring..."
            className="min-h-36"
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            required
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X />
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          <PackageCheck />
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

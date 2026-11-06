import type { EventFormData } from "@/lib/types/event";
import { todayISO } from "@/lib/format";

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export function validateEvent(form: EventFormData): string | null {
  if (form.title.trim().length < 5) {
    return "Event title must be at least 5 characters long.";
  }
  if (!form.eventType) {
    return "Please choose an event type.";
  }
  if (form.location.trim().length < 3) {
    return "Please enter the event location.";
  }
  if (!isHttpsUrl(form.imageUrl.trim())) {
    return "Thumbnail must be a valid image URL starting with https://";
  }
  if (!form.eventDate) {
    return "Please choose the event date.";
  }
  if (form.eventDate <= todayISO()) {
    return "Event date must be in the future.";
  }
  if (form.description.trim().length < 20) {
    return "Description must be at least 20 characters long.";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  return null;
}

export function validateProfile(name: string, image: string): string | null {
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }
  if (!isHttpsUrl(image.trim())) {
    return "Photo URL must be a valid link starting with https://";
  }
  return null;
}

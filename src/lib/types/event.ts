export interface IEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  email: string;
}

export type EventFormData = Omit<IEvent, "_id" | "email">;

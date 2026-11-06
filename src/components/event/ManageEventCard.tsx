import Link from "next/link";
import { CalendarDays, Eye, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EventImage from "@/components/event/EventImage";
import EditEventDialog from "@/components/event/EditEventDialog";
import DeleteEventDialog from "@/components/event/DeleteEventDialog";
import { formatEventDate } from "@/lib/format";
import type { IEvent } from "@/lib/types/event";

const ManageEventCard = ({ event }: { event: IEvent }) => {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full shrink-0 bg-muted md:w-72">
          <EventImage
            src={event.imageUrl}
            alt={event.title}
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            <Badge variant="secondary">{event.eventType}</Badge>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">
              {event.title}
            </h2>
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                {formatEventDate(event.eventDate)}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {event.location}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button
              render={<Link href={`/events/${event._id}`} />}
              nativeButton={false}
              variant="outline"
            >
              <Eye />
              View
            </Button>
            <EditEventDialog event={event} />
            <DeleteEventDialog id={event._id} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ManageEventCard;

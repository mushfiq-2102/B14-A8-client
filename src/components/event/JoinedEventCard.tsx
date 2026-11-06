import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EventImage from "@/components/event/EventImage";
import { formatEventDate } from "@/lib/format";
import type { IJoinedEvent } from "@/lib/types/joined-event";

const JoinedEventCard = ({ joinedEvent }: { joinedEvent: IJoinedEvent }) => {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full shrink-0 bg-muted md:w-72">
          <EventImage
            src={joinedEvent.imageUrl}
            alt={joinedEvent.title}
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            <Badge variant="secondary">{joinedEvent.eventType}</Badge>
            <h2 className="mt-3 text-2xl font-semibold text-foreground">
              {joinedEvent.title}
            </h2>
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                {formatEventDate(joinedEvent.eventDate)}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {joinedEvent.location}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              render={<Link href={`/events/${joinedEvent.eventId}`} />}
              nativeButton={false}
            >
              View Event
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JoinedEventCard;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { notifyError, notifySuccess } from "@/lib/notify";

export default function JoinEventButton({
  eventId,
  isPast,
}: {
  eventId: string;
  isPast: boolean;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (isPending) return;

    if (!session?.user) {
      notifyError("Login required", "Please log in to join this event.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const token = await getTokenFromClient();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/join-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const result = await res.json();

      if (!res.ok) {
        notifyError("Could not join event", result.message);
        return;
      }
    } catch {
      notifyError("Network error", "Could not reach the server. Please try again.");
      return;
    } finally {
      setLoading(false);
    }

    setJoined(true);
    notifySuccess("You're in!", "Find this event under Joined Events.");
  };

  if (isPast) {
    return (
      <Button disabled className="mt-4 w-full">
        This event has ended
      </Button>
    );
  }

  return (
    <Button
      onClick={handleJoin}
      disabled={loading || joined}
      className="mt-4 w-full"
    >
      {joined ? <CheckCircle2 /> : <HeartHandshake />}
      {joined ? "Joined" : loading ? "Joining..." : "Join Event"}
    </Button>
  );
}

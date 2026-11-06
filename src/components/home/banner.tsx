import Link from "next/link";
import { ArrowRight, HeartPulse, Shirt, TreePine, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const causes = [
  { icon: Shirt, label: "Winter clothes drives", place: "Mirpur 10, Dhaka" },
  { icon: Trash2, label: "Neighbourhood cleanups", place: "Dhanmondi, Dhaka" },
  { icon: TreePine, label: "Tree plantations", place: "Uttara, Dhaka" },
  { icon: HeartPulse, label: "Free health camps", place: "Mohammadpur, Dhaka" },
];

export function Banner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b2a20] text-white">
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[#f5c542]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <h1 className="text-5xl leading-[1.05] font-bold tracking-tight md:text-6xl">
            Your neighbourhood needs you this weekend.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
            Find a service event close to home, sign up in one click, or
            organise your own. From blanket distributions in Mohammadpur to
            cleanups in Mirpur, every pair of hands counts.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              render={<Link href="/upcoming-events" />}
              nativeButton={false}
              size="lg"
              className="bg-[#f5c542] text-[#0b2a20] hover:bg-[#f5c542]/90"
            >
              Browse Upcoming Events
              <ArrowRight />
            </Button>
            <Button
              render={<Link href="/create-event" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Create an Event
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {causes.map((cause) => (
            <Link
              key={cause.label}
              href="/upcoming-events"
              className="rounded-xl border border-white/15 bg-white/5 p-6 transition-colors hover:bg-white/10"
            >
              <cause.icon className="size-8 text-[#f5c542]" />
              <p className="mt-5 text-lg font-semibold">{cause.label}</p>
              <p className="mt-1 text-sm text-white/70">{cause.place}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CalendarPlus, HeartHandshake, ListChecks, PencilRuler } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const features = [
  {
    icon: CalendarPlus,
    title: "Create Events in Minutes",
    description:
      "Post a cleanup, plantation or donation drive with its location and date, and let the community know.",
  },
  {
    icon: HeartHandshake,
    title: "Join with One Click",
    description:
      "Browse upcoming events, open the details and join the ones that matter to you straight away.",
  },
  {
    icon: ListChecks,
    title: "Track Your Joined Events",
    description:
      "See every event you signed up for in one place, sorted by the date you need to show up.",
  },
  {
    icon: PencilRuler,
    title: "Manage Your Own Events",
    description:
      "Update the details or remove an event you organised. Only you can change your own events.",
  },
];

export function Features() {
  return (
    <section className="w-full bg-secondary/60 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Everything You Need to Do Good Together"
          subtitle="HandInHand keeps organising and volunteering simple, so more time goes into the work itself."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <feature.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

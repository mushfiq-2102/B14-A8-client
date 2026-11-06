"use client";

import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notifySuccess } from "@/lib/notify";

export function Newsletter() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    notifySuccess("You're subscribed", "We'll email you when new events are announced.");
  };

  return (
    <section className="w-full bg-background px-6 py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-2xl bg-primary px-8 py-12 text-primary-foreground md:grid-cols-2 md:px-14">
        <div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Never Miss an Event Near You
          </h2>
          <p className="mt-3 text-base leading-relaxed text-primary-foreground/80">
            Get a short note whenever new community service events are
            announced in your area.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-11 bg-background pl-9 text-foreground"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-11 bg-[#f5c542] text-[#0b2a20] hover:bg-[#f5c542]/90"
          >
            Subscribe
            <ArrowRight />
          </Button>
        </form>
      </div>
    </section>
  );
}

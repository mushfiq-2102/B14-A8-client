import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import RecentUpcomingEvents from "@/components/home/recent-events";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <RecentUpcomingEvents />
      <Gallery />
      <Newsletter />
    </main>
  );
}

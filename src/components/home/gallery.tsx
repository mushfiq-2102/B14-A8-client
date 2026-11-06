import { SectionHeading } from "@/components/section-heading";
import { GalleryTile } from "@/components/home/gallery-tile";

// Free-to-use photos from Unsplash (no attribution required).
const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

const photos = [
  { src: photo("1599059813005-11265ba4b4ce"), caption: "Volunteers sorting food donations" },
  { src: photo("1758599668429-121d54188b9c"), caption: "Cleaning up the neighbourhood park" },
  { src: photo("1783028104792-8506735c0383"), caption: "Setting up a distribution point" },
  { src: photo("1582213782179-e0d53f98f2ca"), caption: "Teams coming together for a cause" },
  { src: photo("1469571486292-0ba58a3f068b"), caption: "Hands together for the community" },
  { src: photo("1511632765486-a01980e01a18"), caption: "Standing by each other" },
];

export function Gallery() {
  return (
    <section className="w-full bg-secondary/60 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Moments From the Field"
          subtitle="A look at what volunteers achieve when a community shows up together."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((item) => (
            <GalleryTile key={item.src} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

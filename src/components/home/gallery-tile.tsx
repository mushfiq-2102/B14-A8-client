"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

export function GalleryTile({ src, caption }: { src: string; caption: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary">
      {failed ? (
        <span className="flex h-full w-full items-center justify-center text-primary/60">
          <Camera className="size-10" />
        </span>
      ) : (
        <Image
          src={src}
          alt={caption}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          ref={(img) => {
            if (img?.complete && img.naturalWidth === 0) setFailed(true);
          }}
          onError={() => setFailed(true)}
        />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-3 text-sm font-medium text-white">
        {caption}
      </figcaption>
    </figure>
  );
}

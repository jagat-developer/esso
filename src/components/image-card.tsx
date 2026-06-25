import Image from "next/image";
import type { ImageAsset } from "@/data/business";

export function ImageCard({
  image,
  label,
  priority = false,
  className = "",
}: {
  image: ImageAsset;
  label: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`image-frame ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(min-width: 1024px) 48vw, 100vw"
      />
      <figcaption className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between gap-4 text-white">
        <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] backdrop-blur-md">
          {label}
        </span>
        <span className="hidden max-w-[14rem] text-right text-[10px] font-semibold leading-4 text-white/68 sm:block">
          {image.credit}
        </span>
      </figcaption>
    </figure>
  );
}

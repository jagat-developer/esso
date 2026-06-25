import { MapPin, Navigation } from "lucide-react";
import { businessProfile } from "@/data/business";

export function MapEmbed({
  title = "Map to Esso Bloomington",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const address = businessProfile.address;

  return (
    <div
      className={`relative overflow-hidden rounded-[8px] border border-black/10 bg-[#e8e1d7] shadow-xl shadow-black/5 ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,19,15,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(23,19,15,0.08)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="absolute left-1/2 top-1/2 z-10 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e1251b] text-white shadow-xl shadow-red-950/20">
        <MapPin size={25} aria-hidden="true" />
      </div>
      <iframe
        className="map-embed relative z-20 opacity-90"
        src={businessProfile.embedMapUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
      <div className="absolute inset-x-4 bottom-4 z-30 rounded-[8px] bg-[#17130f]/92 p-4 text-white shadow-xl shadow-black/20 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-black">{businessProfile.name}</div>
            <div className="mt-1 text-xs font-semibold leading-5 text-white/70">
              {address.street}, {address.locality}, {address.region}{" "}
              {address.postalCode}
            </div>
          </div>
          <a
            href={businessProfile.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 text-xs font-black text-[#17130f]"
          >
            Open map
            <Navigation size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

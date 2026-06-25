import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { businessProfile, servicePages } from "@/data/business";

export function SiteFooter() {
  const address = businessProfile.address;

  return (
    <footer className="border-t border-black/10 bg-[#17130f] text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="display-type text-3xl font-black">
            {businessProfile.name}
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            Fuel, retail diesel, DEF, parking, LCBO Bloomington,
            Country Style, convenience store items, and practical route
            convenience at {address.street}, {address.locality}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${businessProfile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#17130f]"
            >
              <Mail size={16} aria-hidden="true" />
              Email store
            </a>
            <a
              href={businessProfile.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-extrabold text-white transition-colors hover:bg-white/10"
            >
              <MapPin size={16} aria-hidden="true" />
              Open map
            </a>
          </div>
        </div>

        <div>
          <div className="text-sm font-black uppercase tracking-[0.14em] text-white/45">
            Pages
          </div>
          <div className="mt-4 grid gap-3">
            {servicePages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="text-sm font-bold text-white/76 transition-colors hover:text-white"
              >
                {page.title}
              </Link>
            ))}
            <Link
              href="/offers/free-samosa-pop-with-gas"
              className="text-sm font-bold text-white/76 transition-colors hover:text-white"
            >
              Free samosa and pop offer
            </Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-black uppercase tracking-[0.14em] text-white/45">
            Verified Source Links
          </div>
          <div className="mt-4 grid gap-3">
            {businessProfile.sourceUrls.slice(0, 4).map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-white/76 transition-colors hover:text-white"
              >
                Source
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="site-shell border-t border-white/10 py-6 text-xs font-semibold text-white/45">
        © {new Date().getFullYear()} {businessProfile.name}. Offer and LCBO hours may
        vary; ask in store for current details.
      </div>
    </footer>
  );
}

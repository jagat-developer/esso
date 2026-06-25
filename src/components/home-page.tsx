import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Gift,
  MapPin,
  Navigation,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, FloatIn } from "@/components/animated";
import { ImageCard } from "@/components/image-card";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import {
  amenities,
  businessProfile,
  homeFaq,
  images,
  offerPage,
  servicePages,
} from "@/data/business";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  offerSchema,
} from "@/lib/seo";

export function HomePage() {
  const address = businessProfile.address;
  const primaryServices = servicePages.slice(0, 5);

  return (
    <main>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={faqSchema(homeFaq)} />
      <JsonLd data={offerSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: businessProfile.name, url: absoluteUrl("/") },
        ])}
      />

      <section className="site-shell grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[0.86fr_1.14fr] lg:py-16">
        <FadeIn>
          <div className="eyebrow">Bloomington Road + Highway 48</div>
          <h1 className="display-type mt-6 max-w-[11ch] text-5xl font-black leading-[0.98] text-[#17130f] sm:text-[64px] sm:leading-[4.6rem]">
            Premium route stop for fuel, LCBO and coffee.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#625a50]">
            Esso Bloomington brings together 24-hour fuel, commercial cardlock
            diesel, DEF, parking, LCBO Bloomington, Country Style, convenience
            store essentials, and the client-provided samosa and pop offer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/directions"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-black text-white shadow-xl shadow-black/10 transition-colors hover:bg-[#004a98]"
            >
              Get directions
              <Navigation size={17} aria-hidden="true" />
            </Link>
            <a
              href={`tel:${businessProfile.phone}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 text-sm font-black text-[#17130f] transition-colors hover:bg-white"
            >
              Call {businessProfile.phone.replace("+1-", "")}
              <Phone size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {[
              ["24 hr", "fuel access"],
              ["Diesel", "cardlock + DEF"],
              ["LCBO", "Bloomington"],
            ].map(([value, label]) => (
              <div key={value} className="border-l border-black/10 pl-4">
                <div className="display-type text-3xl font-black text-[#17130f]">
                  {value}
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#625a50]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FloatIn delay={0.08} className="relative">
          <div className="grid gap-4 sm:grid-cols-[0.82fr_1.18fr]">
            <div className="grid gap-4">
              <div className="premium-card rounded-[8px] p-5">
                <div className="flex items-center gap-2 text-sm font-black text-[#17130f]">
                  <Clock3 size={18} className="text-[#e1251b]" />
                  Open for fuel
                </div>
                <div className="display-type mt-3 text-5xl font-black">24</div>
                <div className="mt-1 text-sm font-bold text-[#625a50]">
                  hours, every day
                </div>
              </div>
              <ImageCard
                image={images.offer}
                label="Samosa + pop"
                priority
                className="h-64"
              />
            </div>
            <div className="grid gap-4">
              <ImageCard
                image={images.fuel}
                label="Gas + diesel"
                priority
                className="h-[28rem]"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[8px] bg-[#ff6b2c] p-5 text-white shadow-xl shadow-orange-900/10">
                  <div className="text-sm font-black uppercase tracking-[0.12em] text-white/75">
                    Offer
                  </div>
                  <div className="display-type mt-2 text-4xl font-black">
                    Free
                  </div>
                  <div className="mt-2 text-sm font-bold leading-5">
                    samosa and can of pop with gas purchase
                  </div>
                </div>
                <div className="rounded-[8px] bg-[#ffd967] p-5 text-[#17130f] shadow-xl shadow-yellow-900/10">
                  <div className="text-sm font-black uppercase tracking-[0.12em] text-black/50">
                    Location
                  </div>
                  <div className="display-type mt-2 text-2xl font-black leading-tight">
                    Near Hwy 48
                  </div>
                  <div className="mt-2 text-sm font-bold leading-5">
                    Bloomington Rd access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FloatIn>
      </section>

      <section className="section-pad">
        <div className="site-shell">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <div className="eyebrow mx-auto">One-stop Bloomington</div>
            <h2 className="display-type mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Fuel stop, errand stop, coffee stop.
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-[#625a50]">
              Programmatic SEO pages map every real service to a local search
              need: gas, commercial cardlock diesel, parking, LCBO Bloomington,
              Country Style, convenience store items, and the in-store offer.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn
                  as="article"
                  delay={index * 0.04}
                  key={service.slug}
                  className="premium-card group rounded-[8px] p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="grid h-11 w-11 place-items-center rounded-[8px] text-white"
                    style={{ backgroundColor: service.color }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-xl font-black text-[#17130f]">
                    {service.title}
                  </h3>
                  <p className="mt-3 min-h-24 text-sm font-medium leading-7 text-[#625a50]">
                    {service.description}
                  </p>
                  <Link
                    href={`/${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#17130f]"
                  >
                    Explore page
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </FadeIn>
              );
            })}
            <FadeIn
              as="article"
              delay={0.2}
              className="rounded-[8px] bg-[#17130f] p-6 text-white shadow-2xl shadow-black/20"
            >
              <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#e1251b] text-white">
                <Gift size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-xl font-black">{offerPage.title}</h3>
              <p className="mt-3 min-h-24 text-sm font-medium leading-7 text-white/70">
                Ask in store about the limited-time free samosa and pop offer
                with gas purchase. While supplies last.
              </p>
              <Link
                href="/offers/free-samosa-pop-with-gas"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white"
              >
                View offer
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fffdf8]/60">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="eyebrow">Amenities</div>
            <h2 className="display-type mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Everything a route stop should solve.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#625a50]">
              The site turns each amenity into clear, indexable content while
              keeping the homepage polished and quick to scan.
            </p>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-2">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <FadeIn
                  key={amenity.label}
                  delay={index * 0.035}
                  className="flex min-h-20 items-center gap-4 rounded-[8px] border border-black/10 bg-white/74 p-4"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#17130f] text-white">
                    <Icon size={19} aria-hidden="true" />
                  </div>
                  <div className="text-sm font-black text-[#17130f]">
                    {amenity.label}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <FadeIn className="soft-panel rounded-[8px] p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#7b251a]">
                <Star size={18} className="text-[#d99a2b]" aria-hidden="true" />
                Most popular at this address
              </div>
              <div className="mt-8 grid gap-4">
                {[
                  ["Esso", "3.7", "343 reviews"],
                  ["LCBO Bloomington Esso", "4.2", "109 reviews"],
                  ["Country Style", "3.6", "7 reviews"],
                ].map(([name, rating, reviews]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between border-b border-black/10 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <div className="text-lg font-black text-[#17130f]">
                        {name}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#625a50]">
                        Google screenshot reference
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="display-type text-3xl font-black text-[#17130f]">
                        {rating}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#625a50]">
                        {reviews}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="rounded-[8px] bg-[#17130f] p-6 text-white sm:p-8">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-white/60">
                <BadgeCheck size={18} className="text-[#ff6b2c]" aria-hidden="true" />
                Verified business facts
              </div>
              <ul className="mt-8 grid gap-4 text-sm font-semibold leading-7 text-white/76">
                <li>Official Esso listing confirms 5241 Bloomington Rd, 24-hour fuel, diesel, premium gas, air tower, pay-at-pump, and ATM.</li>
                <li>Client form adds commercial cardlock diesel, Key to the Highway, Esso Fleet, DEF, parking, Beer Store, convenience store, samosas, patties, and Indian chai.</li>
                <li>Directory sources confirm Esso & LCBO Bloomington and Country Style association at the same address.</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fffdf8]/60">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <div className="eyebrow">Directions</div>
            <h2 className="display-type mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Find the stop at Bloomington and 48.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#625a50]">
              {address.street}, {address.locality}, {address.region}{" "}
              {address.postalCode}. Use the embedded map for quick orientation,
              then open Google Maps when you are ready to route.
            </p>
            <Link
              href="/directions"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#17130f] px-6 text-sm font-black text-white hover:bg-[#004a98]"
            >
              Directions page
              <MapPin size={17} aria-hidden="true" />
            </Link>
          </FadeIn>
          <FadeIn delay={0.08}>
            <MapEmbed title="Map to Esso Bloomington at 5241 Bloomington Rd" />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_1fr]">
          <FadeIn>
            <div className="eyebrow">Frequently asked</div>
            <h2 className="display-type mt-5 text-4xl font-black leading-tight sm:text-5xl">
              Clear answers for search and customers.
            </h2>
          </FadeIn>
          <div className="grid gap-3">
            {homeFaq.map((item, index) => (
              <FadeIn
                key={item.question}
                delay={index * 0.04}
                className="rounded-[8px] border border-black/10 bg-white/72 p-5"
              >
                <h3 className="text-base font-black text-[#17130f]">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm font-medium leading-7 text-[#625a50]">
                  {item.answer}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="site-shell overflow-hidden rounded-[8px] bg-[#17130f] text-white shadow-2xl shadow-black/20">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center">
              <div className="eyebrow border-white/15 bg-white/10 text-white">
                Route better
              </div>
              <h2 className="display-type mt-5 max-w-[10ch] text-4xl font-black leading-tight sm:text-6xl">
                Stop once. Handle more.
              </h2>
              <p className="mt-5 max-w-lg text-base font-medium leading-8 text-white/70">
                Gas, commercial cardlock diesel, LCBO Bloomington, Country
                Style, parking, convenience store items, and a simple offer make
                Esso Bloomington a practical stop with a premium web presence.
              </p>
              <Link
                href="/offers/free-samosa-pop-with-gas"
                className="mt-7 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#17130f]"
              >
                See the offer
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-[8px]">
              <Image
                src={images.countryStyle.src}
                alt={images.countryStyle.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

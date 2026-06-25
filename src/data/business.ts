import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Beer,
  Coffee,
  Fuel,
  Gift,
  MapPin,
  ParkingCircle,
  ShieldCheck,
  Truck,
  Wind,
} from "lucide-react";

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bloomingtonesso.ca",
  name: "Esso Bloomington",
};

export type BusinessProfile = {
  name: string;
  legalName: string;
  alternateNames: string[];
  phone: string;
  stationPhone: string;
  email: string;
  contactName: string;
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  intersection: string;
  mapUrl: string;
  embedMapUrl: string;
  hours: string;
  sourceUrls: string[];
};

export const businessProfile: BusinessProfile = {
  name: "Esso Bloomington",
  legalName: "Esso Bloomington",
  alternateNames: [
    "Bloomington Esso",
    "Esso & LCBO Bloomington",
    "LCBO Bloomington Esso",
  ],
  phone: "+1-905-640-1076",
  stationPhone: "+1-905-640-1076",
  email: "vpetroinc@gmail.com",
  contactName: "Jay Bhatia",
  address: {
    street: "5241 Bloomington Rd",
    locality: "Stouffville",
    region: "ON",
    postalCode: "L4A 7X3",
    country: "CA",
  },
  coordinates: {
    latitude: 43.999828,
    longitude: -79.289968,
  },
  intersection: "Bloomington Road and Highway 48",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=5241%20Bloomington%20Rd%20Stouffville%20ON%20L4A%207X3",
  embedMapUrl:
    "https://www.google.com/maps?q=5241%20Bloomington%20Rd%2C%20Stouffville%2C%20ON%20L4A%207X3&output=embed",
  hours: "Fuel available 24 hours. LCBO Bloomington hours may vary; verify in store.",
  sourceUrls: [
    "https://www.esso.ca/en-ca/find-station/stouffville-on-esso-200303662",
    "https://www.yellowpages.ca/bus/Ontario/Stouffville/Esso-LCBO-Bloomington/5983722.html",
    "https://locations.countrystyle.com/",
    "https://hellolcbo.com/app/answers/detail/a_id/190/~/lcbo-convenience-outlet-directory",
    "https://ww4.yorkmaps.ca/locateit/BusinessDirectory/Whitchurch-Stouffville/44/index.html",
  ],
};

export type ImageAsset = {
  src: string;
  alt: string;
  credit: string;
};

export const images = {
  fuel: {
    src: "https://images.unsplash.com/photo-1644246905181-c3753e9a82bd?auto=format&fit=crop&fm=jpg&q=80&w=1800",
    alt: "A driver filling a vehicle with fuel at a modern pump",
    credit: "Fuel photo by engin akyurt on Unsplash",
  },
  diesel: {
    src: "https://images.unsplash.com/photo-1668532074800-2f2dae0a2d11?auto=format&fit=crop&fm=jpg&q=76&w=1800",
    alt: "Diesel pump nozzles at a service station at night",
    credit: "Diesel pump photo by 67street art on Unsplash",
  },
  truck: {
    src: "https://images.unsplash.com/photo-1719495439037-ca335257edbd?auto=format&fit=crop&fm=jpg&q=76&w=1800",
    alt: "Trucks parked in a lot under a night sky",
    credit: "Truck parking photo by Walter Coppola on Unsplash",
  },
  lcbo: {
    src: "https://images.unsplash.com/photo-1642191572835-91e21597c43b?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Wine, beer, cider, and ready-to-drink beverages on retail shelves",
    credit: "Beverage shelf photo by Richard Bell on Unsplash",
  },
  countryStyle: {
    src: "https://images.unsplash.com/photo-1727483832906-2ea0a8c375e1?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Coffee and grab-and-go counter inside a convenience stop",
    credit: "Coffee counter photo by Krish Parmar on Unsplash",
  },
  offer: {
    src: "https://images.unsplash.com/photo-1589301773859-bb024d3ad558?auto=format&fit=crop&fm=jpg&q=78&w=1800",
    alt: "Fresh samosas served with dipping sauce",
    credit: "Samosa photo by Shreyak Singh on Unsplash",
  },
} satisfies Record<string, ImageAsset>;

export type ServicePage = {
  slug: string;
  navLabel: string;
  title: string;
  eyebrow: string;
  description: string;
  h1: string;
  intro: string;
  image: ImageAsset;
  icon: LucideIcon;
  color: string;
  highlights: string[];
  seoKeywords: string[];
  faq: Array<{ question: string; answer: string }>;
  schemaType: "GasStation" | "LocalBusiness" | "FoodEstablishment" | "LiquorStore";
};

export const servicePages: ServicePage[] = [
  {
    slug: "gas-station-whitchurch-stouffville",
    navLabel: "Gas",
    title: "Gas Station in Whitchurch-Stouffville",
    eyebrow: "24-hour fuel",
    description:
      "Esso Bloomington is a gas station near Bloomington Road and Highway 48 with 24-hour fuel, premium gas, retail diesel, parking, DEF, air, ATM, and Bloomington Convenience Store essentials.",
    h1: "Gas station near Highway 48 and Bloomington Road",
    intro:
      "Pull in for a clean, convenient stop with 24-hour fuel access, premium gas, retail diesel, DEF, air pump, vacuum, ATM, LCBO convenience, Beer Store, Country Style, and quick food under one practical roof.",
    image: images.fuel,
    icon: Fuel,
    color: "#e1251b",
    highlights: [
      "24-hour fuel access",
      "Premium gasoline available",
      "Pay at the pump",
      "Bloomington Convenience Store, air pump, vacuum, and ATM on site",
    ],
    seoKeywords: [
      "Esso Bloomington gas station Whitchurch-Stouffville",
      "gas station Highway 48",
      "gas station Bloomington Road",
    ],
    faq: [
      {
        question: "Is Esso Bloomington open for fuel 24 hours?",
        answer:
          "The official Esso station listing for Bloomington Esso shows fuel access as open 24 hours.",
      },
      {
        question: "Where is Esso Bloomington located?",
        answer:
          "Esso Bloomington is at 5241 Bloomington Rd, Stouffville, ON L4A 7X3, near Bloomington Road and Highway 48.",
      },
    ],
    schemaType: "GasStation",
  },
  {
    slug: "diesel-pump-whitchurch-stouffville",
    navLabel: "Diesel",
    title: "Retail Diesel in Whitchurch-Stouffville",
    eyebrow: "Retail diesel + DEF",
    description:
      "Find retail diesel, DEF, Key to the Highway, and Esso Fleet support at Esso Bloomington near Highway 48.",
    h1: "Retail diesel near Highway 48",
    intro:
      "Esso Bloomington supports local drivers, truck drivers, fleets, and work vehicles with retail diesel, DEF, Key to the Highway, Esso Fleet, parking, and route-ready access from Bloomington Road.",
    image: images.diesel,
    icon: Truck,
    color: "#004a98",
    highlights: [
      "Retail diesel",
      "Key to the Highway and Esso Fleet support",
      "DEF available",
      "Parking, air pump, vacuum, ATM, and convenience in one stop",
    ],
    seoKeywords: [
      "diesel pump Whitchurch-Stouffville",
      "retail diesel Stouffville",
      "diesel near Highway 48",
      "DEF near Highway 48",
      "Esso Fleet Stouffville",
      "diesel Bloomington Road",
    ],
    faq: [
      {
        question: "Does Esso Bloomington have retail diesel?",
        answer:
          "Yes. The client-provided business details list retail diesel, and the official Esso listing includes Synergy Diesel Efficient / Diesel.",
      },
      {
        question: "Can fleet drivers use Key to the Highway or Esso Fleet?",
        answer:
          "The client-provided details list Key to the Highway and Esso Fleet. Drivers should confirm current fleet terms in store.",
      },
    ],
    schemaType: "GasStation",
  },
  {
    slug: "truck-parking-whitchurch-stouffville",
    navLabel: "Truck Parking",
    title: "Truck Parking Near Stouffville",
    eyebrow: "Route-ready stop",
    description:
      "Esso Bloomington offers parking, retail diesel, DEF, fuel, Country Style, and LCBO Bloomington at 5241 Bloomington Rd near Highway 48.",
    h1: "Parking with retail diesel, coffee, and convenience",
    intro:
      "For drivers who need a practical pause near Highway 48, Esso Bloomington pairs parking with retail diesel, DEF, gas, grab-and-go coffee, LCBO Bloomington, air, and ATM access.",
    image: images.truck,
    icon: ParkingCircle,
    color: "#d99a2b",
    highlights: [
      "Parking listed by client",
      "Retail diesel and DEF",
      "Country Style coffee, donuts, sandwiches, bagels, and Indian chai",
      "Easy directions from Bloomington Road",
    ],
    seoKeywords: [
      "truck parking Stouffville",
      "truck parking near Highway 48",
      "truck parking Whitchurch-Stouffville",
    ],
    faq: [
      {
        question: "Does Esso Bloomington offer parking?",
        answer:
          "Parking is included in the client-provided business details for Esso Bloomington.",
      },
      {
        question: "Can truck drivers get diesel and coffee here?",
        answer:
          "Yes. The client details list retail diesel, DEF, and Country Style coffee, donuts, sandwiches, bagels, and Indian chai.",
      },
    ],
    schemaType: "LocalBusiness",
  },
  {
    slug: "lcbo-bloomington",
    navLabel: "LCBO",
    title: "LCBO Bloomington Esso",
    eyebrow: "LCBO convenience outlet",
    description:
      "LCBO Bloomington Esso at 5241 Bloomington Rd is part of the one-stop Esso Bloomington location in Stouffville.",
    h1: "LCBO Bloomington inside your one-stop route stop",
    intro:
      "Stop for fuel, retail diesel, Country Style, LCBO convenience, Beer Store, and Bloomington Convenience Store at the same Bloomington Road address. It is built for quick errands without adding another stop to the route.",
    image: images.lcbo,
    icon: Beer,
    color: "#a36b12",
    highlights: [
      "LCBO Bloomington association verified by directory sources",
      "LCBO convenience and Beer Store",
      "Same address as Esso Bloomington",
      "Hours may vary; verify in store",
    ],
    seoKeywords: [
      "LCBO Bloomington Esso",
      "LCBO Bloomington Road",
      "LCBO Stouffville convenience outlet",
    ],
    faq: [
      {
        question: "Is there an LCBO at Esso Bloomington?",
        answer:
          "Public directory sources identify the location as Esso & LCBO Bloomington and LCBO convenience outlet directory data associates the outlet with 5241 Bloomington Rd.",
      },
      {
        question: "Are LCBO hours the same as fuel hours?",
        answer:
          "Fuel is listed as 24 hours by Esso. LCBO Bloomington hours may vary, so customers should verify in store.",
      },
    ],
    schemaType: "LiquorStore",
  },
  {
    slug: "country-style",
    navLabel: "Country Style",
    title: "Country Style at Esso Bloomington",
    eyebrow: "Coffee and quick food",
    description:
      "Country Style at Esso Bloomington gives drivers coffee, donuts, sandwiches, bagels, Indian chai, and quick snacks at 5241 Bloomington Rd.",
    h1: "Country Style coffee, donuts, bagels, and chai",
    intro:
      "Country Style gives the stop its comfort layer: coffee, donuts, sandwiches, bagels, Indian chai, and a familiar pause before returning to Bloomington Road or Highway 48.",
    image: images.countryStyle,
    icon: Coffee,
    color: "#ff6b2c",
    highlights: [
      "Country Style associated with the same address",
      "Coffee, donuts, sandwiches, and bagels",
      "Indian chai for warm grab-and-go comfort",
      "Convenient add-on with fuel and LCBO Bloomington",
      "Useful for local community, truck drivers, morning routes, and workday stops",
    ],
    seoKeywords: [
      "Country Style Bloomington Road",
      "Country Style Stouffville",
      "Indian chai Stouffville",
      "donuts sandwiches bagels Bloomington Road",
      "coffee near Highway 48 Stouffville",
    ],
    faq: [
      {
        question: "Is Country Style at this Bloomington Road address?",
        answer:
          "Country Style location sources and York Region directory data associate Country Style with Esso Bloomington at 5241 Bloomington Rd.",
      },
      {
        question: "Can I get coffee when I stop for gas?",
        answer:
          "Yes. The location combines Esso Bloomington fuel with Country Style coffee, donuts, sandwiches, bagels, and Indian chai.",
      },
    ],
    schemaType: "FoodEstablishment",
  },
];

export const offerPage: ServicePage = {
  slug: "free-drink-with-gas",
  navLabel: "Offer",
  title: "Free Coffee, Water, or Pop on $60+ Spend",
  eyebrow: "Limited-time offer",
  description:
    "Spend $60 or more at Esso Bloomington and pick up a free coffee, bottled water, or can of pop on us. Limited-time offer at Bloomington Road and Highway 48.",
  h1: "Free coffee, water, or can of pop on a $60+ spend",
  intro:
    "Spend $60 or more on fuel or in store and we will treat you to a free coffee, bottled water, or can of pop. It is our small way of thanking drivers and truckers who stop at Bloomington Road and Highway 48 — ask the attendant or staff inside to redeem.",
  image: images.countryStyle,
  icon: Gift,
  color: "#e1251b",
  highlights: [
    "Free coffee, bottled water, or can of pop",
    "On any $60+ spend in store or at the pump",
    "Promotion for all customers — local drivers and truckers welcome",
    "Ask the attendant or in-store staff to redeem",
    "Limited-time offer while supplies last",
  ],
  seoKeywords: [
    "free coffee with gas Stouffville",
    "free pop with fuel Bloomington Road",
    "Esso Bloomington offer",
    "gas station promotion Highway 48",
    "trucker promotion Whitchurch-Stouffville",
  ],
  faq: [
    {
      question: "How do I get the free coffee, water, or pop offer?",
      answer:
        "Spend $60 or more on fuel or in store at Esso Bloomington and ask the attendant or staff inside to redeem your free coffee, bottled water, or can of pop. The offer is treated as limited-time, while supplies last, and subject to store terms.",
    },
    {
      question: "Does the $60 spend have to be on fuel?",
      answer:
        "No. Any combined $60+ spend at the pump or in the store qualifies — fuel, convenience items, Country Style, or LCBO Bloomington purchases all count toward the threshold.",
    },
    {
      question: "Is the free drink offer available every day?",
      answer:
        "Availability can change without notice. The website presents the offer conservatively and asks customers to confirm current terms in store.",
    },
  ],
  schemaType: "FoodEstablishment",
};

export const allPages = [...servicePages, offerPage];

export const amenities = [
  { label: "24-hour fuel", icon: Fuel },
  { label: "Retail diesel", icon: Truck },
  { label: "Key to the Highway", icon: ShieldCheck },
  { label: "Esso Fleet", icon: Fuel },
  { label: "DEF", icon: Wind },
  { label: "Parking", icon: ParkingCircle },
  { label: "LCBO convenience", icon: Beer },
  { label: "Beer Store convenience", icon: Beer },
  { label: "Bloomington Convenience store", icon: ShieldCheck },
  { label: "Country Style", icon: Coffee },
  { label: "PC Optimum points on fuel", icon: BadgeCheck },
  { label: "Free coffee / water / can of pop", icon: Gift },
  { label: "Donuts, sandwiches, bagels", icon: Coffee },
  { label: "Samosas, patties, Indian chai", icon: Gift },
  { label: "Air tower — air pump / vacuum", icon: Wind },
  { label: "ATM", icon: ShieldCheck },
  { label: "Directions ready", icon: MapPin },
];

export const homeFaq = [
  {
    question: "What businesses are at 5241 Bloomington Rd?",
    answer:
      "Public listings and client details identify Esso Bloomington, LCBO Bloomington, and Country Style at or associated with 5241 Bloomington Rd in Stouffville.",
  },
  {
    question: "What fuel is available?",
    answer:
      "The official Esso listing includes Synergy Diesel Efficient / Diesel and Synergy Supreme+ Premium Gasoline. Client details add retail diesel, DEF, Key to the Highway, and Esso Fleet.",
  },
  {
    question: "Does the location have parking?",
    answer:
      "Parking is listed in the client-provided business details and is presented as an on-site amenity for the local community and truck drivers.",
  },
  {
    question: "What food and convenience items are listed?",
    answer:
      "The client form lists free coffee, water, can of pop, Country Style coffee, donuts, sandwiches, bagels, samosas, patties, Indian chai, LCBO convenience, Beer Store, and Bloomington Convenience Store.",
  },
  {
    question: "What are the offer terms?",
    answer:
      "Spend $60 or more at Esso Bloomington and ask the attendant or in-store staff for your free coffee, bottled water, or can of pop. It is a limited-time offer while supplies last; confirm current terms in store.",
  },
  {
    question: "Can I earn PC Optimum points on fuel here?",
    answer:
      "Yes. As an Esso and Mobil location, Esso Bloomington participates in the PC Optimum program — present or scan your PC Optimum card at the pump or inside to earn points on every litre of gas or diesel, and redeem points toward groceries, fuel, and more at participating retailers.",
  },
];

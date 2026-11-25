// Business details and navigation. Safe to import from client components.
// Only facts supplied by the business belong here; never add hours, prices,
// reviews, licences or similar without the owner's confirmation.

export const site = {
  name: "Affordable Plastering",
  tagline: "Good walls. Great spaces.",
  description: "Plastering & drywall contractor in Hudson, New Hampshire.",
  owner: { name: "Dominic", role: "Owner" },
  phone: {
    display: "(603) 718-4173",
    e164: "+16037184173",
    href: "tel:+16037184173",
  },
  address: {
    street: "2 Shingle Mill Rd",
    locality: "Hudson",
    region: "NH",
    regionName: "New Hampshire",
    postalCode: "03051",
    country: "US",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=2%20Shingle%20Mill%20Rd%2C%20Hudson%2C%20NH%2003051",
  themeColor: "#222722",
} as const;

type NavItem = { href: string; label: string; mobileLabel?: string };

// Route-qualified hashes ("/#services") so the links also work from the 404 page.
export const mainNav: NavItem[] = [
  { href: "/#services", label: "Our services" },
  { href: "/#approach", label: "Our approach" },
  { href: "/#inspiration", label: "The finish" },
  {
    href: "/#contact",
    label: "Contact",
    mobileLabel: `Contact ${site.owner.name}`,
  },
];

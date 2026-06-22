import "./globals.css";

export const metadata = {
  icons: { icon: "/favicon.svg" },

  title: {
    default: "HandyYet | Handyman Services in Huntington Beach & Orange County",
    template: "%s | HandyYet – Handyman Orange County",
  },
  description:
    "HandyYet provides fast, affordable handyman services in Huntington Beach and Orange County, CA. TV mounting, furniture assembly, plumbing, electrical, smart home setup, and small home repairs. Call (949) 828-3959.",

  keywords: [
    "handyman Huntington Beach",
    "handyman Orange County",
    "handyman near me",
    "TV mounting Huntington Beach",
    "furniture assembly Orange County",
    "home repair Huntington Beach CA",
    "plumber handyman Orange County",
    "electrician handyman Huntington Beach",
    "smart home setup Orange County",
    "affordable handyman Orange County",
  ],

  openGraph: {
    title: "HandyYet | Handyman Services in Huntington Beach & Orange County",
    description:
      "Fast, affordable handyman services in Huntington Beach & Orange County, CA. TV mounting, plumbing, electrical, assembly, and more. Book online or call (949) 828-3959.",
    url: "https://handyyet.com",
    siteName: "HandyYet",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://handyyet.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HandyYet – Handyman Services in Huntington Beach, CA",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HandyYet | Handyman in Huntington Beach & Orange County",
    description:
      "Fast, affordable handyman in Huntington Beach & Orange County. TV mounting, plumbing, electrical, and more.",
    images: ["https://handyyet.com/images/og-image.jpg"],
  },

  alternates: {
    canonical: "https://handyyet.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// LocalBusiness structured data for Google
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "HandyYet",
  description:
    "Fast, affordable handyman services in Huntington Beach and Orange County, CA.",
  url: "https://handyyet.com",
  telephone: "+1-949-828-3959",
  email: "admin@handyyet.com",
  priceRange: "$$",
  image: "https://handyyet.com/images/hero.jpg",
  logo: "https://handyyet.com/favicon.svg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Huntington Beach",
    addressRegion: "CA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.6595,
    longitude: -117.9988,
  },
  areaServed: [
    { "@type": "City", name: "Huntington Beach" },
    { "@type": "City", name: "Newport Beach" },
    { "@type": "City", name: "Costa Mesa" },
    { "@type": "City", name: "Irvine" },
    { "@type": "City", name: "Fountain Valley" },
    { "@type": "City", name: "Westminster" },
    { "@type": "City", name: "Garden Grove" },
    { "@type": "County", name: "Orange County" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Handyman Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "TV Mounting" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Furniture Assembly" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plumbing Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrical Work" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Smart Home Setup" } },
    ],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "85",
    bestRating: "5",
    worstRating: "5",
  },
  sameAs: [
    "https://www.yelp.com/biz/handyyet-huntington-beach",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

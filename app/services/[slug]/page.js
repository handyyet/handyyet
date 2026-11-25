import { services } from "../../../lib/services";
import ServicePageClient from "./ServicePageClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  const title = `${s.title} in Huntington Beach & Orange County`;
  const description = `${s.short} Insured handyman, ${s.price}. Send photos for a fast quote: (949) 828-3959.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${title} | HandyYet`, description, images: s.heroImage ? [s.heroImage] : undefined },
  };
}

export default function ServicePage() {
  return <ServicePageClient />;
}

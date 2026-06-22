// app/sitemap.js
// Place this file at: app/sitemap.js
// Next.js will auto-serve it at /sitemap.xml

export default function sitemap() {
  const baseUrl = "https://handyyet.com";

  const services = [
    "tv-mounting",
    "furniture-assembly",
    "smart-home",
    "general-handyman",
    "plumbing",
    "electrical",
  ];

  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/pricing`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/reviews`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${baseUrl}/work`, priority: 0.7, changeFrequency: "weekly" },
  ];

  const servicePages = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...servicePages].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));
}

// app/robots.js
// Place this file at: app/robots.js
// Next.js will auto-serve it at /robots.txt

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://handyyet.com/sitemap.xml",
  };
}

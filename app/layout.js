import "./globals.css";

export const metadata = {
  icons: { icon: '/favicon.svg' },
  title: "HandyYet | Handyman Services in Orange County",
  description:
    "HandyYet provides fast handyman services, TV mounting, furniture assembly, smart home setup, and small home repairs in Orange County.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

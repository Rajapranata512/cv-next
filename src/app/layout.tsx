// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const siteUrl = "https://cv-next-pied.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Raja Adi Pranata | Portfolio & CV",
  description:
    "Final-year Computer Science & Statistics student. I build data pipelines, dashboards, and pragmatic web features.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Raja Adi Pranata | Portfolio & CV",
    description:
      "Data pipelines, dashboards, and modern web features. View projects, community work, and contact.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Raja Adi Pranata — Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Adi Pranata | Portfolio & CV",
    description: "Data pipelines, dashboards, and modern web features.",
    images: ["/og-cover.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Raja Adi Pranata",
    url: siteUrl,
    sameAs: [
      "mailto:raja.pranata@binus.ac.id",
      "https://github.com/Rajapranata512",
      "https://www.linkedin.com/in/raja-adi-pranata-507704251/",
    ],
    worksFor: { "@type": "CollegeOrUniversity", name: "BINUS University" },
    jobTitle: "Computer Science & Statistics Student",
  };

  return (
    <html lang="en" className="h-full">
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          // Tidak memaksa putih; warna diatur oleh .page-bg
          "min-h-dvh text-slate-900 antialiased dark:text-slate-100",
          "overflow-x-hidden",
        ].join(" ")}
      >
        {/* Latar halaman global (aurora + grain + edge glow) */}
        <div className="page-bg fixed inset-0 -z-10" />
        <div className="edge-left" />
        <div className="edge-right" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Konten */}
        {children}

        <footer className="mt-12 py-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} Raja Adi Pranata 
        </footer>
      </body>
    </html>
  );
}

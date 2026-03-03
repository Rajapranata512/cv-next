// src/app/layout.tsx
import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const siteUrl = "https://cv-next-pied.vercel.app";

import { AdaptiveQualityProvider } from "@/components/ui/AdaptiveQualityProvider";
import { AdaptiveVisualEffects } from "@/components/ui/AdaptiveVisualEffects";

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

import { SmoothScroll } from "@/components/ui/SmoothScroll";

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
          displayFont.variable,
          bodyFont.variable,
          "min-h-dvh text-foreground antialiased selection:bg-primary/10",
          "overflow-x-hidden focus:scroll-auto",
        ].join(" ")}
      >
        <AdaptiveQualityProvider>
          <SmoothScroll>
            <AdaptiveVisualEffects />
            {/* JSON-LD */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Konten */}
            {children}
          </SmoothScroll>
        </AdaptiveQualityProvider>
      </body>
    </html>
  );
}

// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Raja Adi Pranata | CV",
  description: "CV dan portofolio yang profesional dan simpel.",
  metadataBase: new URL("https://example.com"), // ganti saat deploy
  openGraph: {
    title: "Raja Adi Pranata | CV",
    description: "CV dan portofolio yang profesional dan simpel.",
    type: "website",
    url: "https://example.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-white text-slate-900">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-sky-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Lewati ke konten
        </a>

        <nav className="no-print sticky top-0 z-20 bg-white/85 backdrop-blur border-b border-slate-200">
          <div className="mx-auto max-w-7xl h-14 px-6 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-wide"></Link>
            <div className="flex items-center gap-5 text-sm">
              <Link href="/#projects" className="hover:underline">Projects</Link>
              <Link href="/#experience" className="hover:underline">Experience</Link>
              <Link href="/cv" className="hover:underline">CV</Link>
              <Link href="/#contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </nav>

        <div id="content" className="min-h-dvh flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="my-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Raja Adi Pranata.
      </footer>
        </div>
      </body>
    </html>
  );
}

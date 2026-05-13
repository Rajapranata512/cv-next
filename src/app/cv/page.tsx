// src/app/cv/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { SiWhatsapp, SiFigma } from "react-icons/si";

const PROFILE = {
  name: "Raja Adi Pranata",
  title: "Computer Science & Statistics Student",
  email: "raja.pranata@binus.ac.id",
  phoneDisplay: "+62 856-9489-0848",
  phoneE164: "+6285694890848",
  waNumber: "6285694890848",
  waPrefill:
    "Hi%2C%20I%27d%20like%20to%20get%20in%20touch%20regarding%20an%20opportunity.",
  githubLabel: "github.com/Rajapranata512",
  githubUrl: "https://github.com/Rajapranata512",
  linkedinLabel: "linkedin.com/in/raja-adi-pranata-507704251",
  linkedinUrl: "https://www.linkedin.com/in/raja-adi-pranata-507704251/",
  portfolioLabel: "cv-next-pied.vercel.app",
  portfolioUrl: "https://cv-next-pied.vercel.app/",
};

const WA_LINK = `https://wa.me/${PROFILE.waNumber}?text=${PROFILE.waPrefill}`;

// Sertifikat Bahasa Inggris
// File HARUS ada di: public/certificates/beelingua.pdf (dan harus di-commit + push)
const CERT_EN = {
  label: "Beelingua (PDF)",
  path: "/certificates/beelingua.pdf?v=4",
};

const cls = (...s: Array<string | false | undefined | null>) =>
  s.filter(Boolean).join(" ");

const CARD =
  "rounded-2xl border border-slate-200 bg-white shadow-sm " +
  "print:rounded-none print:border-0 print:bg-transparent print:shadow-none";

const PAD = "p-5 print:p-0";
const H2 = "text-[15px] font-bold text-slate-900 print:text-[9.5px] print:leading-tight";
const MUTED = "text-slate-600 print:text-slate-700";
const BODY = "text-slate-900";
const LI = "leading-snug print:leading-[1.22]";
const A =
  "underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500 print:no-underline print:text-slate-800";

function BadgeSep() {
  return <span className="mx-2 text-slate-400 print:mx-1 print:text-slate-500">|</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between print:mb-1 print:border-b print:border-slate-300 print:pb-0.5">
      <h2 className={H2}>{children}</h2>
    </div>
  );
}

export default function CVPage() {
  return (
    <main
      className={cls(
        "cv-print-root mx-auto max-w-[860px] px-6 py-8",
        "text-[14px] leading-relaxed",
        "print:m-0 print:w-full print:max-w-none print:px-0 print:py-0",
        "print:text-[9.5px] print:leading-[1.22] print:text-black"
      )}
    >
      {/* =========================
          PROFILE HEADER
         ========================= */}
      <section className={cls(CARD, "mb-3 p-3 print:mb-3 print:border-b print:border-slate-300 print:p-0 print:pb-2")}>
        <div className="flex items-start gap-3 print:gap-2.5">
          <Image
            src="/avatar.jpg"
            width={72}
            height={72}
            alt="Profile photo"
            className="h-16 w-16 rounded-xl object-cover print:h-16 print:w-16 print:rounded-md"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-[15px] font-extrabold leading-tight text-slate-900 print:text-[14px]">
                  {PROFILE.name}
                </h1>
                <p className={cls("text-[10px] leading-snug print:text-[9px]", MUTED)}>{PROFILE.title}</p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-2">
                <div className={cls("text-[10px] print:text-[8.5px]", MUTED, "text-right")}>Jakarta, Indonesia</div>
                <button
                  type="button"
                  className={cls(
                    "no-print rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700",
                    "transition hover:bg-slate-50 hover:text-slate-950 print:hidden"
                  )}
                  onClick={() => window.print()}
                >
                  Print to PDF
                </button>
              </div>
            </div>

            <div className={cls("mt-1 text-[10px] leading-snug print:mt-1 print:text-[8.5px]", BODY)}>
              <div className="flex flex-wrap items-center">
                <span className="font-semibold">Email:</span>&nbsp;
                <a className={A} href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
                <BadgeSep />
                <span className="font-semibold">Phone:</span>&nbsp;
                <a className={A} href={`tel:${PROFILE.phoneE164}`}>
                  {PROFILE.phoneDisplay}
                </a>
                <BadgeSep />
                <span className="font-semibold">WhatsApp:</span>&nbsp;
                <a className={A} href={WA_LINK} target="_blank" rel="noreferrer">
                  wa.me/{PROFILE.waNumber}
                </a>
              </div>

              <div className="flex flex-wrap items-center">
                <span className="font-semibold">GitHub:</span>&nbsp;
                <a className={A} href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                  {PROFILE.githubLabel}
                </a>
                <BadgeSep />
                <span className="font-semibold">LinkedIn:</span>&nbsp;
                <a className={A} href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
                  {PROFILE.linkedinLabel}
                </a>
                <BadgeSep />
                <span className="font-semibold">Portfolio:</span>&nbsp;
                <a className={A} href={PROFILE.portfolioUrl} target="_blank" rel="noreferrer">
                  {PROFILE.portfolioLabel}
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TOP GRID (2 columns, print-safe)
         ========================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 print:grid-cols-2 print:gap-x-5 print:gap-y-2.5">
        <section className={cls(CARD, PAD, "avoid-break print:col-span-2")}>
          <SectionTitle>Summary</SectionTitle>
          <p className={cls(BODY, "text-slate-900 print:text-black")}>
            Final-year Computer Science and Statistics student targeting web/full-stack and data analytics internships.
            Experienced building Laravel/Next.js applications, deploying projects to Vercel and cPanel, and translating
            data work in Python, R, SQL, and Tableau into clear dashboards and reports. Comfortable working across UI,
            backend workflows, deployment, and analytical problem solving.
          </p>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Skills</SectionTitle>
          <ul className="list-disc ps-5 space-y-1 print:space-y-0.5">
            <li className={LI}>
              <span className="font-semibold">Web:</span> Next.js, TypeScript, Laravel, Livewire, Filament, Tailwind
            </li>
            <li className={LI}>
              <span className="font-semibold">Data:</span> Python, R, SQL/MySQL, Tableau, statistical analysis
            </li>
            <li className={LI}>
              <span className="font-semibold">Tools:</span> GitHub, Vercel, cPanel, Figma
            </li>
          </ul>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Education</SectionTitle>
          <div className={BODY}>
            <p className="font-semibold">BINUS University</p>
            <p>Computer Science &amp; Statistics</p>
            <p className={cls("text-sm print:text-[8.5px]", MUTED)}>2022 - Present</p>
          </div>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Community</SectionTitle>
          <div className={BODY}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">HIMSTAT (Statistics Student Association)</p>
              <p className={cls("text-sm whitespace-nowrap print:text-[8.5px]", MUTED)}>2022 - 2023</p>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1 print:mt-1 print:space-y-0.5">
              <li className={LI}>Event Lead for Community Service (P2M) in 2022.</li>
              <li className={LI}>Committee member for the SPSS workshop in 2023.</li>
            </ul>
          </div>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Languages</SectionTitle>
          <ul className="list-disc ps-5 space-y-1 print:space-y-0.5">
            <li className={LI}>
              <span className="font-semibold">Indonesian</span> | Native (daily communication)
            </li>

            <li className={LI}>
              <span className="font-semibold">English</span> | Intermediate (professional working proficiency)
            </li>
          </ul>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Certifications</SectionTitle>
          <div className={BODY}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">Beelingua English Certificate</p>
              <a
                className={cls(A, "shrink-0 text-sm print:text-[8.5px]")}
                href={CERT_EN.path}
                target="_blank"
                rel="noreferrer"
              >
                PDF
              </a>
            </div>
            <p className={cls("mt-1 text-sm print:mt-0.5 print:text-[8.5px]", MUTED)}>
              English language proficiency certificate.
            </p>
          </div>
        </section>
      </div>

      {/* =========================
          SELECTED PROJECTS
         ========================= */}
      <section className={cls(CARD, PAD, "mt-5 print:mt-3")}>
        <SectionTitle>Selected Technical Projects</SectionTitle>

        <div className="space-y-3 print:columns-2 print:gap-6 print:space-y-0">
          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">Asosiasi Alumni DRM BINUS Website</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2026</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Laravel 12 platform for alumni content, profiles, events, articles, donations, documents, and analytics.</li>
              <li className={LI}>Built admin workflows with Filament, authenticated alumni features, upload flows, and visitor analytics.</li>
              <li className={LI}>
                Deployed through cPanel/public_html setup, Vite assets, storage handling, cron optimization, and GitHub Actions.
              </li>
              <li className={LI}>
                Site:&nbsp;
                <a className={A} href="https://asosiasidrm.id/" target="_blank" rel="noreferrer">
                  asosiasidrm.id
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">IDX Trading Lab</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2026</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Trading-focused web lab for exploring Indonesian market data and analysis workflows.</li>
              <li className={LI}>Designed scan-friendly data UI for market review and deployed the app on Vercel.</li>
              <li className={LI}>
                Live:&nbsp;
                <a className={A} href="https://idx-trading-lab.vercel.app/" target="_blank" rel="noreferrer">
                  idx-trading-lab.vercel.app
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">Foodies | Recipe Web App</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2026</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Laravel app for recipes with authentication, create-edit-delete recipe flow, and responsive detail pages.</li>
              <li className={LI}>Stack: Laravel 11, Blade, Tailwind CSS, Vite, SQLite/MySQL, InfinityFree.</li>
              <li className={LI}>
                Live:&nbsp;
                <a className={A} href="https://foodies.infinityfreeapp.com/" target="_blank" rel="noreferrer">
                  foodies.infinityfreeapp.com
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">Kripuk.com</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2025</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Next.js and Tailwind content/catalog site with responsive layout and Vercel deployment.</li>
              <li className={LI}>
                Live:&nbsp;
                <a className={A} href="https://kripuk-website-binus.vercel.app/" target="_blank" rel="noreferrer">
                  kripuk-website-binus.vercel.app
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">Palorant | Valorant-style Web Project</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2024</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Multi-page front-end project covering agents, maps, news, and bug report pages.</li>
              <li className={LI}>Stack: semantic HTML, modern CSS, vanilla JS, Figma prototype, GitHub Pages.</li>
              <li className={cls(LI, "flex items-center gap-2")}>
                <SiFigma className="h-4 w-4" aria-hidden />
                <a
                  className={A}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.figma.com/proto/smMeAYuwtlEs73TzAep2DR/project_lab?t=MMX8z7CteRkoMcMN-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&show-proto-sidebar=1"
                >
                  Prototype
                </a>
              </li>
              <li className={LI}>
                Live:&nbsp;
                <a className={A} href="https://rajapranata512.github.io/palorant-website/" target="_blank" rel="noreferrer">
                  rajapranata512.github.io/palorant-website/
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* =========================
          RESEARCH / ANALYTICS
         ========================= */}
      <section className={cls(CARD, PAD, "mt-5 print:mt-3")}>
        <SectionTitle>Research & Analytics</SectionTitle>

        <div className="space-y-3 print:columns-2 print:gap-6 print:space-y-0">
          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">Music & Mental Health Research Paper</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2023</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Python-based analysis of music usage as a treatment factor for mental health.</li>
              <li className={LI}>
                Published:&nbsp;
                <a className={A} href="https://journalcenter.org/index.php/jupti/article/view/1721" target="_blank" rel="noreferrer">
                  JUPTI
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">CCA Study | Campus Environment & Psychological Health</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2025</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Canonical Correlation Analysis in R using BINUS University student data.</li>
              <li className={LI}>
                PDF:&nbsp;
                <Link href="/papers/aol-multivariate.pdf" className={A} target="_blank">
                  View
                </Link>
                &nbsp;| Output:&nbsp;
                <Link href="/papers/aol-output-code.txt" className={A} target="_blank">
                  TXT
                </Link>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-0 print:mb-0">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold leading-tight text-slate-900">Business Analytics Dashboards</h3>
              <span className={cls("text-sm print:text-[8.5px]", MUTED)}>2025</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:mt-0.5 print:space-y-0.5 print:ps-3.5">
              <li className={LI}>Tableau Public dashboards for sales KPIs, executive overview, and business monitoring.</li>
              <li className={LI}>
                Link:&nbsp;
                <a className={A} href="https://public.tableau.com/app/profile/raja.adi.pranata/vizzes" target="_blank" rel="noreferrer">
                  Tableau Public
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* CONTACT (screen). Print header already includes contact + certificate */}
      <section id="contact" className={cls(CARD, PAD, "mt-5 no-print")}>
        <h2 className="mb-3 text-xl font-semibold text-slate-900">Contact</h2>
        <div className="space-y-1 text-slate-900">
          <p>
            Email:&nbsp;
            <a className={A} href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
          </p>

          <p className="flex flex-wrap items-center gap-2">
            Phone / WhatsApp:&nbsp;
            <a className={A} href={`tel:${PROFILE.phoneE164}`}>
              {PROFILE.phoneDisplay}
            </a>
            <span className="text-slate-400">|</span>
            <a className={A} href={WA_LINK} target="_blank" rel="noreferrer">
              wa.me/{PROFILE.waNumber}
            </a>
            <span className="text-slate-400">|</span>
            <a
              className={cls(
                "inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-xs",
                "hover:bg-slate-50"
              )}
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat via WhatsApp"
            >
              <SiWhatsapp className="h-4 w-4 text-green-600" aria-hidden />
              WhatsApp
            </a>
          </p>

          <p>
            Portfolio:&nbsp;
            <a className={A} href={PROFILE.portfolioUrl} target="_blank" rel="noreferrer">
              {PROFILE.portfolioLabel}
            </a>
          </p>

          <p>
            English Certificate:&nbsp;
            <a className={A} href={CERT_EN.path} target="_blank" rel="noreferrer">
              {CERT_EN.label}
            </a>
          </p>
        </div>
      </section>

      <footer className="mt-6 text-center text-xs text-slate-500 no-print">
        © {new Date().getFullYear()} {PROFILE.name} | Built with Next.js & Tailwind
      </footer>
    </main>
  );
}

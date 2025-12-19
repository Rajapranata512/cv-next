// src/app/cv/page.tsx
"use client";

import Link from "next/link";
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
  // Set ini di Vercel: NEXT_PUBLIC_SITE_URL=https://cv-next-pied.vercel.app
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://cv-next-pied.vercel.app").replace(
    /\/$/,
    ""
  ),
};

const WA_LINK = `https://wa.me/${PROFILE.waNumber}?text=${PROFILE.waPrefill}`;

// Sertifikat Bahasa Inggris
// File HARUS ada di: public/certificates/beelingua.pdf (dan harus di-commit + push)
const CERT_EN = {
  label: "Beelingua (PDF)",
  path: "/certificates/beelingua.pdf",
  absUrl: `${PROFILE.siteUrl}/certificates/beelingua.pdf`,
};

const cls = (...s: Array<string | false | undefined | null>) =>
  s.filter(Boolean).join(" ");

const CARD =
  "rounded-2xl border border-slate-200 bg-white shadow-sm " +
  "print:shadow-none print:border-slate-300 print:bg-white";

const PAD = "p-5 print:p-3";
const H2 = "text-[15px] font-bold tracking-tight text-slate-900 print:text-[11px]";
const MUTED = "text-slate-600 print:text-slate-700";
const BODY = "text-slate-900";
const LI = "leading-snug";
const A = "underline decoration-slate-300 underline-offset-2 hover:decoration-slate-500";

function BadgeSep() {
  return <span className="mx-2 text-slate-400 print:text-slate-500">|</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h2 className={H2}>{children}</h2>
    </div>
  );
}

export default function CVPage() {
  return (
    <main
      className={cls(
        "mx-auto max-w-[860px] px-6 py-8",
        "text-[14px] leading-relaxed",
        "print:px-0 print:py-0 print:text-[10px] print:leading-snug"
      )}
    >
      {/* =========================
          SCREEN HEADER (HIDE ON PRINT)
         ========================= */}
      <section className={cls(CARD, PAD, "mb-5 no-print")}>
        <div className="flex flex-wrap items-start gap-5">
          <img
            src="/avatar.jpg"
            width={92}
            height={92}
            alt="Profile photo"
            className="rounded-2xl object-cover"
          />

          <div className="min-w-[18rem]">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900">
              {PROFILE.name}
            </h1>
            <p className={cls("text-sm", MUTED)}>{PROFILE.title}</p>

            <div className="mt-2 flex flex-wrap items-center gap-y-2 text-sm">
              <a className={A} href={`mailto:${PROFILE.email}`}>
                {PROFILE.email}
              </a>
              <BadgeSep />
              <a className={A} href={`tel:${PROFILE.phoneE164}`}>
                {PROFILE.phoneDisplay}
              </a>
              <BadgeSep />
              <a className={A} href={WA_LINK} target="_blank" rel="noreferrer">
                wa.me/{PROFILE.waNumber}
              </a>
              <BadgeSep />
              <a className={A} href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
                {PROFILE.githubLabel}
              </a>
              <BadgeSep />
              <a className={A} href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
                {PROFILE.linkedinLabel}
              </a>
              <BadgeSep />
              <a className={A} href={PROFILE.portfolioUrl} target="_blank" rel="noreferrer">
                {PROFILE.portfolioLabel}
              </a>
              <BadgeSep />
              {/* Sertifikat clickable juga di screen */}
              <a className={A} href={CERT_EN.path} target="_blank" rel="noreferrer">
                {CERT_EN.label}
              </a>
            </div>
          </div>

          <div className="ms-auto flex gap-3">
            <a className="btn" href="#contact">
              Contact
            </a>
            <button type="button" className="btn" onClick={() => window.print()}>
              Print to PDF
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          PRINT HEADER (ONLY FOR PDF)
         ========================= */}
      <section className={cls(CARD, "print-only mb-3 p-3")}>
        <div className="flex items-start gap-3">
          <img
            src="/avatar.jpg"
            width={56}
            height={56}
            alt="Profile photo"
            className="rounded-xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-[15px] font-extrabold leading-tight tracking-tight text-slate-900">
                  {PROFILE.name}
                </h1>
                <p className={cls("text-[10px] leading-snug", MUTED)}>{PROFILE.title}</p>
              </div>

              <div className={cls("text-[10px]", MUTED, "text-right")}>Jakarta, Indonesia</div>
            </div>

            <div className={cls("mt-1 text-[10px] leading-snug", BODY)}>
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

              {/* Sertifikat clickable di PDF: pakai absolute URL */}
              <div className="flex flex-wrap items-center">
                <span className="font-semibold">English Certificate:</span>&nbsp;
                <a className={A} href={CERT_EN.absUrl} target="_blank" rel="noreferrer">
                  {CERT_EN.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TOP GRID (2 columns, print-safe)
         ========================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 print:gap-2.5">
        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Summary</SectionTitle>
          <p className={cls(BODY, "text-slate-900 print:text-black")}>
            Final-year student in Computer Science and Statistics with strong interest in data analytics and modern web
            development. Proficient in R and Python for data cleaning, analysis, and forecasting, and experienced in
            building polished UI with Next.js. Comfortable translating complex findings into clear, actionable insights
            through dashboards and concise reporting. Currently seeking an internship to contribute to data pipelines,
            analytics, and practical web features.
          </p>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Skills</SectionTitle>
          <ul className="list-disc ps-5 space-y-1 print:space-y-0.5">
            <li className={LI}>TypeScript, Next.js, Tailwind</li>
            <li className={LI}>HTML, CSS, Laravel</li>
            <li className={LI}>R, Python, SQL (MySQL)</li>
            <li className={LI}>Tableau, Figma</li>
          </ul>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Education</SectionTitle>
          <div className={BODY}>
            <p className="font-semibold">BINUS University</p>
            <p>Computer Science &amp; Statistics</p>
            <p className={cls("text-sm print:text-[10px]", MUTED)}>2022 - Present</p>
          </div>
        </section>

        <section className={cls(CARD, PAD, "avoid-break")}>
          <SectionTitle>Community</SectionTitle>
          <div className={BODY}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">HIMSTAT (Statistics Student Association)</p>
              <p className={cls("text-sm whitespace-nowrap print:text-[10px]", MUTED)}>2022 - 2023</p>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1 print:mt-1 print:space-y-0.5">
              <li className={LI}>Event Lead for Community Service (P2M) in 2022.</li>
              <li className={LI}>Committee member for the SPSS workshop in 2023.</li>
            </ul>
          </div>
        </section>

        <section className={cls(CARD, PAD, "avoid-break md:col-span-2 print:col-span-2")}>
          <SectionTitle>Languages</SectionTitle>
          <ul className="list-disc ps-5 space-y-1 print:space-y-0.5">
            <li className={LI}>
              <span className="font-semibold">Indonesian</span> | Native (daily communication)
            </li>

            <li className={LI}>
              <span className="font-semibold">English</span> | Intermediate (professional working proficiency)
              <div className={cls("mt-1 text-[13px] print:text-[10px]", MUTED)}>
                Certificate:&nbsp;
                <a className={A} href={CERT_EN.absUrl} target="_blank" rel="noreferrer">
                  {CERT_EN.label}
                </a>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* =========================
          PROJECTS
         ========================= */}
      <section className={cls(CARD, PAD, "mt-5 print:mt-2.5")}>
        <SectionTitle>College Projects</SectionTitle>

        <div className="space-y-3 print:space-y-0 print:columns-2 print:gap-6">
          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold text-slate-900">Paper</h3>
              <span className={cls("text-sm print:text-[10px]", MUTED)}>2023</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:space-y-0.5">
              <li className={LI}>Analisis Python Penggunaan Musik Sebagai Pengobatan Gangguan Mental.</li>
              <li className={LI}>
                Link:&nbsp;
                <a
                  className={A}
                  href="https://journalcenter.org/index.php/jupti/article/view/1721"
                  target="_blank"
                  rel="noreferrer"
                >
                  journalcenter.org/jupti/article/view/1721
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold text-slate-900">Palorant | Valorant-style Web Project</h3>
              <span className={cls("text-sm print:text-[10px]", MUTED)}>2024</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:space-y-0.5">
              <li className={LI}>Agents, Maps, News, and Bug Report pages for HCI lab assignment.</li>
              <li className={LI}>Stack: semantic HTML, modern CSS, vanilla JS, GitHub Pages.</li>
              <li className={cls(LI, "flex items-center gap-2")}>
                <SiFigma className="h-4 w-4" aria-hidden />
                <a
                  className={A}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.figma.com/proto/smMeAYuwtlEs73TzAep2DR/project_lab?t=MMX8z7CteRkoMcMN-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&show-proto-sidebar=1"
                >
                  View Prototype
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

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold text-slate-900">Campus Physical Environment and Psychological Health (CCA)</h3>
              <span className={cls("text-sm print:text-[10px]", MUTED)}>2025</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:space-y-0.5">
              <li className={LI}>Study using Canonical Correlation Analysis (CCA) in R.</li>
              <li className={LI}>Scope: BINUS University students (Jakarta/Kemanggisan).</li>
              <li className={LI}>
                PDF:&nbsp;
                <Link href="/papers/aol-multivariate.pdf" className={A} target="_blank">
                  View
                </Link>
                &nbsp;| Roles:&nbsp;
                <Link href="/papers/aol-pembagian-kerja.docx" className={A} target="_blank">
                  DOCX
                </Link>
                &nbsp;| Output:&nbsp;
                <Link href="/papers/aol-output-code.txt" className={A} target="_blank">
                  TXT
                </Link>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-3 print:mb-2">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold text-slate-900">Business Analytics Dashboards (Tableau Public)</h3>
              <span className={cls("text-sm print:text-[10px]", MUTED)}>2025</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:space-y-0.5">
              <li className={LI}>Interactive dashboards for sales KPIs and executive overview.</li>
              <li className={LI}>
                Link:&nbsp;
                <a
                  className={A}
                  href="https://public.tableau.com/app/profile/raja.adi.pranata/vizzes"
                  target="_blank"
                  rel="noreferrer"
                >
                  tableau.com/profile/raja.adi.pranata/vizzes
                </a>
              </li>
            </ul>
          </article>

          <article className="avoid-break mb-0 print:mb-0">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-semibold text-slate-900">Kripuk.com</h3>
              <span className={cls("text-sm print:text-[10px]", MUTED)}>2025</span>
            </div>
            <ul className="mt-1 list-disc ps-5 space-y-1 print:space-y-0.5">
              <li className={LI}>Content-plus catalog site on Next.js and Tailwind (Vercel).</li>
              <li className={LI}>
                Live:&nbsp;
                <a className={A} href="https://kripuk-website-binus.vercel.app/" target="_blank" rel="noreferrer">
                  kripuk-website-binus.vercel.app
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
            <a className={A} href={CERT_EN.absUrl} target="_blank" rel="noreferrer">
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

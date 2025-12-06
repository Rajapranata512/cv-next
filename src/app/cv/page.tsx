// src/app/cv/page.tsx
"use client";

import Link from "next/link";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiLaravel,
  SiR,
  SiPython,
  SiMysql,
  SiTableau,
  SiFigma,
  SiWhatsapp,
} from "react-icons/si";

export default function CVPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8 print:py-0">
      {/* =========================
          PRINT HEADER (ONLY FOR PDF)
         ========================= */}
      <section className="card mb-6 print-only">
        <div className="flex flex-wrap items-start gap-5">
          <img
            src="/avatar.jpg"
            width={96}
            height={96}
            alt="Profile photo"
            className="rounded-2xl object-cover"
          />
          <div className="min-w-56">
            <h1 className="text-3xl font-bold leading-tight">Raja Adi Pranata</h1>
            <p className="text-sm text-muted">Computer Science &amp; Statistics Student</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a className="underline" href="mailto:raja.pranata@binus.ac.id">
                raja.pranata@binus.ac.id
              </a>
              <a
                className="underline"
                href="https://github.com/Rajapranata512"
                target="_blank"
                rel="noreferrer"
              >
                github.com/Rajapranata512
              </a>
              <a
                className="underline"
                href="https://www.linkedin.com/in/raja-adi-pranata-507704251/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/raja-adi-pranata-507704251
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SCREEN HEADER (HIDE ON PRINT)
         ========================= */}
      <section className="card mb-6 no-print">
        <div className="flex flex-wrap items-start gap-5">
          <img
            src="/avatar.jpg"
            width={96}
            height={96}
            alt="Profile photo"
            className="rounded-2xl object-cover"
          />
          <div className="min-w-56">
            <h1 className="text-3xl font-bold leading-tight">Raja Adi Pranata</h1>
            <p className="text-sm text-muted">Computer Science &amp; Statistics Student</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a className="underline" href="mailto:raja.pranata@binus.ac.id">
                raja.pranata@binus.ac.id
              </a>
              <a
                className="underline"
                href="https://github.com/Rajapranata512"
                target="_blank"
                rel="noreferrer"
              >
                github.com/Rajapranata512
              </a>
              <a
                className="underline"
                href="https://www.linkedin.com/in/raja-adi-pranata-507704251/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/raja-adi-pranata-507704251
              </a>
            </div>
          </div>

          <div className="ms-auto flex gap-3">
            <a className="btn" href="#contact">Contact</a>
            <button type="button" className="btn" onClick={() => window.print()}>
              Print to PDF
            </button>
          </div>
        </div>
      </section>

      {/* GRID 2 kolom: konten sudah disesuaikan dengan app/page */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* LEFT: Skills */}
        <section className="card">
          <h2 className="mb-2 text-lg font-semibold">Skills</h2>
          <ul className="list-disc ps-5 space-y-1">
            <li>TypeScript, Next.js, Tailwind</li>
            <li>HTML, CSS, Laravel</li>
            <li>R, Python, SQL (MySQL)</li>
            <li>Tableau, Figma</li>
          </ul>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {[
              SiTypescript,
              SiNextdotjs,
              SiTailwindcss,
              SiHtml5,
              SiCss3,
              SiLaravel,
              SiR,
              SiPython,
              SiMysql,
              SiTableau,
              SiFigma,
            ].map((Icon, i) => (
              <span
                key={i}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm"
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
            ))}
          </div>
        </section>

        {/* RIGHT: Summary */}
        <section className="card">
          <h2 className="mb-2 text-lg font-semibold">Summary</h2>
          <p>
            Hello, I’m Raja Adi Pranata, a final-year student in Computer Science and Statistics
            with a strong interest in data analytics and modern web development. Proficient in R,
            Python, and Next.js, with experience turning complex datasets into clear visualisations
            and actionable insights. Practical projects include interactive dashboards and small web
            applications. Seeking an internship where I can contribute to data pipelines and build
            practical web features.
          </p>
        </section>

        {/* LEFT: Education */}
        <section className="card">
          <h2 className="mb-2 text-lg font-semibold">Education</h2>
          <div>
            <p className="font-semibold">BINUS University</p>
            <p>Computer Science &amp; Statistics</p>
            <p className="text-sm text-muted">2022 — Present</p>
          </div>
        </section>

        {/* RIGHT: Community */}
        <section className="card">
          <h2 className="mb-2 text-lg font-semibold">Community</h2>
          <div>
            <div className="flex items-baseline justify-between">
              <p className="font-semibold">HIMSTAT (Statistics Student Association)</p>
              <p className="text-sm text-muted">2022 — 2023</p>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1">
              <li>Event Lead for Community Service (P2M) in 2022.</li>
              <li>Committee member for the SPSS workshop in 2023.</li>
            </ul>
          </div>
        </section>

        {/* FULL-WIDTH: College Projects */}
        <section className="md:col-span-2 card">
          <h2 className="mb-2 text-lg font-semibold">College Projects</h2>

          {/* 2023 — Paper */}
          <article className="mb-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">Paper</h3>
              <span className="text-sm text-muted">2023</span>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1">
              <li>Analisis Python Penggunaan Musik Sebagai Pengobatan Gangguan Mental.</li>
              <li>
                Link:{" "}
                <a
                  className="underline"
                  href="https://journalcenter.org/index.php/jupti/article/view/1721"
                  target="_blank"
                  rel="noreferrer"
                >
                  journalcenter.org/jupti/article/view/1721
                </a>
              </li>
            </ul>
          </article>

          {/* 2024 — Palorant */}
          <article className="mb-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">Palorant — Valorant-style Web Project</h3>
              <span className="text-sm text-muted">2024</span>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1">
              <li>Agents, Maps, News, and Bug Report pages for HCI lab assignment.</li>
              <li>Stack: semantic HTML, modern CSS, vanilla JS, GitHub Pages.</li>
              <li className="flex items-center gap-2">
                <SiFigma className="h-4 w-4" aria-hidden />{" "}
                <a
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.figma.com/proto/smMeAYuwtlEs73TzAep2DR/project_lab?t=MMX8z7CteRkoMcMN-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&show-proto-sidebar=1"
                >
                  View Prototype
                </a>
              </li>
              <li>
                Live:{" "}
                <a
                  className="underline"
                  href="https://rajapranata512.github.io/palorant-website/"
                  target="_blank"
                  rel="noreferrer"
                >
                  rajapranata512.github.io/palorant-website/
                </a>
              </li>
            </ul>
          </article>

          {/* 2025 — CCA Paper */}
          <article className="mb-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">
                The Effect of Campus Physical Environment on Students&apos; Psychological Health
              </h3>
              <span className="text-sm text-muted">2025</span>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1">
              <li>
                Empirical study using <strong>Canonical Correlation Analysis (CCA)</strong> linking campus
                physical environment features with students’ psychological health indicators.
              </li>
              <li>
                <strong>Scope:</strong> BINUS University students (Jakarta/Kemanggisan campuses); college
                student sample.
              </li>
              <li>
                Workflow: reliability &amp; validity (CR/AVE, CFA), <em>Wilks’ Lambda</em>, and canonical
                correlation estimation in R.
              </li>
              <li>
                PDF:{" "}
                <Link href="/papers/aol-multivariate.pdf" className="underline" target="_blank">
                  Download / View paper
                </Link>
                {" "}· Roles (DOCX):{" "}
                <Link href="/papers/aol-pembagian-kerja.docx" className="underline" target="_blank">
                  Task Allocation
                </Link>
                {" "}· Output (TXT):{" "}
                <Link href="/papers/aol-output-code.txt" className="underline" target="_blank">
                  output_code.txt
                </Link>
              </li>
            </ul>
          </article>

          {/* 2025 — Business Analytics Dashboards */}
          <article className="mb-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">Business Analytics Dashboards (Tableau Public)</h3>
              <span className="text-sm text-muted">2025</span>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1">
              <li>Interactive dashboards for sales KPIs, cohort/segmentation, and executive overview.</li>
              <li>
                Link:{" "}
                <a
                  className="underline"
                  href="https://public.tableau.com/app/profile/raja.adi.pranata/vizzes"
                  target="_blank"
                  rel="noreferrer"
                >
                  tableau.com/profile/raja.adi.pranata/vizzes
                </a>
              </li>
            </ul>
          </article>

          {/* 2025 — Kripuk */}
          <article>
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">Kripuk.com</h3>
              <span className="text-sm text-muted">2025</span>
            </div>
            <ul className="mt-2 list-disc ps-5 space-y-1">
              <li>Content-plus catalog site on Next.js and Tailwind (Vercel).</li>
              <li>Culture-focused storytelling with simple CMS structure.</li>
              <li>
                Live:{" "}
                <a
                  className="underline"
                  href="https://kripuk-website-binus.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  kripuk-website-binus.vercel.app
                </a>
              </li>
            </ul>
          </article>
        </section>
      </div>

      {/* CONTACT */}
      <section id="contact" className="card mt-6">
        <h2 className="mb-3 text-xl font-semibold">Contact</h2>
        <div className="space-y-1">
          <p>
            Email:{" "}
            <a className="underline" href="mailto:raja.pranata@binus.ac.id">
              raja.pranata@binus.ac.id
            </a>
          </p>
          <p className="flex flex-wrap items-center gap-2">
            Phone / WhatsApp:{" "}
            <a className="underline" href="tel:+6285694890848">
              +6285694890848
            </a>
            <a
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs shadow-sm hover:bg-slate-50 transition"
              href="https://wa.me/6285694890848?text=Hi%2C%20I%27d%20like%20to%20get%20in%20touch%20regarding%20an%20opportunity."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat via WhatsApp"
              title="Chat via WhatsApp"
            >
              <SiWhatsapp className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

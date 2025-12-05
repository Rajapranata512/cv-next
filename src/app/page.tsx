"use client";

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

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 print:py-0">
      {/* HERO */}
      <header className="mb-8 card no-print">
        <div className="flex flex-wrap items-center gap-5">
          <img
            src="/avatar.jpg"
            alt="Profile photo"
            width={96}
            height={96}
            className="rounded-2xl object-cover"
          />
          <div className="min-w-56">
            <h1 className="text-3xl font-bold leading-tight">Raja Adi Pranata</h1>
            <p className="text-sm text-muted">Computer Science &amp; Statistics Student</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
              <a className="underline" href="mailto:raja.pranata@binus.ac.id">raja.pranata@binus.ac.id</a>
              <a className="underline" href="https://github.com/Rajapranata512" target="_blank" rel="noreferrer">GitHub</a>
              <a className="underline" href="https://www.linkedin.com/in/raja-adi-pranata-507704251/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="ms-auto flex gap-2">
            <a className="btn" href="/cv">View CV</a>
            <a className="btn" href="#contact">Contact</a>
            <button className="btn" onClick={() => window.print()}>Save / Print PDF</button>
          </div>
        </div>
      </header>

      {/* SUMMARY */}
      <section className="card mb-8">
        <h2 className="mb-3 text-xl font-semibold">Summary</h2>
        <p>
          Final-year Computer Science and Statistics student with a strong interest in data analytics
          and modern web development. Proficient in R, Python, and Next.js, with experience turning complex
          datasets into clear visuals and actionable insights. Hands-on projects include interactive dashboards
          and small web applications. Seeking an internship where I can contribute to data pipelines and build
          practical web features.
        </p>
      </section>

      {/* SKILLS */}
      <section className="card mb-8">
        <h2 className="mb-3 text-xl font-semibold">Skills</h2>
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: "TypeScript", Icon: SiTypescript },
            { label: "Next.js", Icon: SiNextdotjs },
            { label: "Tailwind", Icon: SiTailwindcss },
            { label: "HTML", Icon: SiHtml5 },
            { label: "CSS", Icon: SiCss3 },
            { label: "Laravel", Icon: SiLaravel },
            { label: "R", Icon: SiR },
            { label: "Python", Icon: SiPython },
            { label: "SQL (MySQL)", Icon: SiMysql },
            { label: "Tableau", Icon: SiTableau },
            { label: "Figma", Icon: SiFigma },
          ].map(({ label, Icon }) => (
            <span
              key={label}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm hover:bg-slate-50 transition"
              title={label}
            >
              <Icon className="h-6 w-6" aria-hidden />
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="card mb-8" id="projects">
        <h2 className="mb-3 text-xl font-semibold">College Projects</h2>

        <article className="avoid-break mb-5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">Paper</h3>
            <span className="text-sm text-muted">2023</span>
          </div>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Analisis Python Penggunaan Musik Sebagai Pengobatan Gangguan Mental.</li>
            <li>
              Link:{" "}
              <a
                href="https://journalcenter.org/index.php/jupti/article/view/1721"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                journalcenter.org/jupti/article/view/1721
              </a>
            </li>
          </ul>
        </article>

        <article className="avoid-break mb-5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">Kripuk.com</h3>
            <span className="text-sm text-muted">2025</span>
          </div>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Media-commerce for Indonesian snacks with culture-driven storytelling.</li>
            <li>Stack: Next.js, Tailwind, Vercel.</li>
          </ul>
        </article>

        <article className="avoid-break">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">Palorant — Valorant-style Web Project</h3>
            <span className="text-sm text-muted">2024</span>
          </div>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Multi-page Valorant-inspired website for HCI Lab assignment: Agents, Maps, News, Bug Report.</li>
            <li>Stack: semantic HTML, modern CSS, vanilla JavaScript, GitHub Pages.</li>
            <li>
              Live:{" "}
              <a
                href="https://rajapranata512.github.io/palorant-website/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                https://rajapranata512.github.io/palorant-website/
              </a>
            </li>
          </ul>
        </article>
      </section>

      {/* EXPERIENCE */}
      <section className="card mb-8" id="experience">
        <h2 className="mb-3 text-xl font-semibold">Community</h2>
        <article className="avoid-break">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">Data Analyst Intern — ABC Company</h3>
            <span className="text-sm text-muted">Jun 2024 – Sep 2024</span>
          </div>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Built KPI dashboards in Tableau and automated reporting with R.</li>
            <li>Collaborated with the product team on A/B testing and analysis.</li>
          </ul>
        </article>
      </section>

      {/* EDUCATION */}
      <section className="card mb-8">
        <h2 className="mb-3 text-xl font-semibold">Education</h2>
        <article className="avoid-break">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold">B.Sc. Computer Science &amp; Statistics — BINUS University</h3>
            <span className="text-sm text-muted">2022 – Present</span>
          </div>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Focus: Econometrics, Time-series, Web Development, Statistical Analysis.</li>
          </ul>
        </article>
      </section>

      {/* CONTACT */}
      <section id="contact" className="card">
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
            <a className="underline" href="tel:+6285694890848">+6285694890848</a>
            <a
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs shadow-sm hover:bg-slate-50 transition"
              href="https://wa.me/6285694890848?text=Hi%2C%20I%27d%20like%20to%20get%20in%20touch%20regarding%20an%20opportunity."
              target="_blank"
              rel="noreferrer"
              aria-label="Chat via WhatsApp"
              title="Chat via WhatsApp"
            >
              <SiWhatsapp className="h-4 w-4 text-green-600" aria-hidden />
              WhatsApp
            </a>
          </p>
        </div>
      </section>

      <footer className="my-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} Raja Adi Pranata.
      </footer>
    </main>
  );
}

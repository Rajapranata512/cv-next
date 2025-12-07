// src/app/page.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
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
  // Spotlight vars for the hero (no extra components needed)
  const heroRef = useRef<HTMLDivElement>(null);
  const onHeroMove = (e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12 print:py-0 page-bg">
      {/* Edge glow so it never looks like plain paper */}
      <div aria-hidden className="edge-left" />
      <div aria-hidden className="edge-right" />

      {/* ===== HERO ======================================================== */}
      <section className="no-print">
        <div
          ref={heroRef}
          onMouseMove={onHeroMove}
          className="panel panel-gradient spotlight"
        >
          <div className="flex flex-wrap items-center gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Profile photo"
                width={124}
                height={124}
                className="h-[124px] w-[124px] rounded-2xl object-cover ring-1 ring-white/25"
                priority
              />
            </div>

            {/* Identity */}
            <div className="min-w-[18rem]">
              <h1 className="text-4xl font-extrabold tracking-tight leading-none">
                Raja Adi Pranata
              </h1>
              <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300">
                Computer Science &amp; Statistics Student
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                <a className="link" href="mailto:raja.pranata@binus.ac.id">
                  raja.pranata@binus.ac.id
                </a>
                <a
                  className="link"
                  href="https://github.com/Rajapranata512"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="link"
                  href="https://www.linkedin.com/in/raja-adi-pranata-507704251/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="ms-auto flex flex-wrap gap-3">
              <a className="btn btn-luxe" href="/cv">
                View CV
              </a>
              <a className="btn btn-luxe" href="#contact">
                Contact
              </a>
              <button className="btn btn-luxe" onClick={() => window.print()}>
                Save / Print PDF
              </button>
            </div>
          </div>

          {/* HUD */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Hud label="Level" value="Senior Student" pct={72} />
            <Hud label="Focus" value="Analytics · Web Dev" pct={84} />
            <Hud label="Availability" value="Internship-ready" pct={100} />
          </div>
        </div>
      </section>

      {/* ===== GRID CONTENT =============================================== */}
      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-3">
          <Section title="Summary">
            <p className="leading-relaxed">
              Final-year Computer Science &amp; Statistics student focused on
              data analytics and elegant, performant web apps. I design tidy
              data workflows in Python/R, visualize with Tableau, and ship
              polished Next.js UIs. I value readable code, measurable outcomes,
              and dependable delivery.
            </p>
          </Section>

          <Section title="Skills">
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
                <span key={label} className="badge flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </Section>

          {/* Projects (oldest → newest) */}
          <Section title="College Projects">
            <Timeline>
              <Project
                year="2023"
                title="Paper"
                bullets={[
                  "Analisis Python Penggunaan Musik Sebagai Pengobatan Gangguan Mental.",
                ]}
                link={{
                  href: "https://journalcenter.org/index.php/jupti/article/view/1721",
                  label: "journalcenter.org/jupti/article/view/1721",
                }}
              />

              <Project
                year="2024"
                title="Palorant – Valorant-style Web Project"
                bullets={[
                  "Multi-page HCI site: Agents, Maps, News, Bug Report.",
                  "Stack: semantic HTML, modern CSS, vanilla JS, GitHub Pages.",
                ]}
                extra={
                  <div className="text-sm">
                    Figma:{" "}
                    <a
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.figma.com/proto/smMeAYuwtlEs73TzAep2DR/project_lab?t=MMX8z7CteRkoMcMN-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&show-proto-sidebar=1"
                    >
                      View Prototype
                    </a>{" "}
                    · Live:{" "}
                    <a
                      className="link"
                      target="_blank"
                      rel="noreferrer"
                      href="https://rajapranata512.github.io/palorant-website/"
                    >
                      rajapranata512.github.io/palorant-website
                    </a>
                  </div>
                }
              />

              <Project
                year="2025"
                title="The Effect of Campus Physical Environment on Students’ Psychological Health"
                bullets={[
                  "CCA linking environment features to psychological health.",
                  "Scope: BINUS University (Jakarta/Kemanggisan).",
                  "Workflow: CR/AVE & CFA, Wilks’ Lambda, CCA in R.",
                ]}
                extra={
                  <div className="text-sm">
                    Resources:{" "}
                    <a
                      className="link"
                      href="/docs/cca-campus-psych-health.pdf"
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      PDF (download)
                    </a>
                    <span className="px-1">·</span>
                    <a
                      className="link"
                      href="/docs/task-allocation.docx"
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      Roles (DOCX): Task Allocation
                    </a>
                    <span className="px-1">·</span>
                    <a
                      className="link"
                      href="/docs/output_code.txt"
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      Output (TXT): output_code.txt
                    </a>
                  </div>
                }
              />

              <Project
                year="2025"
                title="Kripuk.com"
                bullets={[
                  "Media-commerce for Indonesian snacks with culture-driven storytelling.",
                  "Stack: Next.js, Tailwind, Vercel.",
                ]}
                link={{
                  href: "https://kripuk-website-binus.vercel.app/",
                  label: "kripuk-website-binus.vercel.app",
                }}
              />

              <Project
                year="2025"
                title="Business Analytics Dashboards (Tableau Public)"
                bullets={[
                  "Interactive dashboards for sales KPIs, segmentation, and executive overview.",
                ]}
                link={{
                  href: "https://public.tableau.com/app/profile/raja.adi.pranata/vizzes",
                  label: "tableau.com/profile/raja.adi.pranata/vizzes",
                }}
              />
            </Timeline>
          </Section>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 lg:col-span-2">
          <Section title="Community">
            <div className="rounded-2xl border border-white/15 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-white/10">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">
                  HIMSTAT (Statistics Student Association)
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  2022 – 2023
                </span>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Event Lead for Community Service (P2M) in 2022.</li>
                <li>Committee member for SPSS workshop in 2023.</li>
              </ul>
            </div>
          </Section>

          <Section id="contact" title="Education & Contact">
            <div className="rounded-2xl border border-white/15 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-white/10">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">
                  B.Sc. Computer Science &amp; Statistics — BINUS University
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  2022 – Present
                </span>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>
                  Focus: Econometrics, Time-series, Web Development, Statistical
                  Analysis.
                </li>
              </ul>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                Email:{" "}
                <a className="link" href="mailto:raja.pranata@binus.ac.id">
                  raja.pranata@binus.ac.id
                </a>
              </p>
              <p className="flex flex-wrap items-center gap-2">
                Phone / WhatsApp:{" "}
                <a className="link" href="tel:+6285694890848">
                  +6285694890848
                </a>
                <a
                  className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-white/75 px-2 py-1 text-xs shadow-sm transition hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20"
                  href="https://wa.me/6285694890848?text=Hi%2C%20I%27d%20like%20to%20get%20in%20touch%20regarding%20an%20opportunity."
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiWhatsapp className="h-4 w-4 text-green-600" aria-hidden />
                  WhatsApp
                </a>
              </p>
              <p>
                Portfolio:{" "}
                <a
                  className="link"
                  href="https://cv-next-pied.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  cv-next-pied.vercel.app
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}

/* =================== Reusable bits =================== */
function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="panel panel-gradient">
      <h2 className="section-title">
        <span className="dot" /> {title}
      </h2>
      {children}
    </section>
  );
}

function Hud({
  label,
  value,
  pct,
}: {
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-md dark:bg-white/10">
      <div className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-[15px] font-semibold">{value}</div>
      <div className="mt-3 progress-rail">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
    </div>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute left-[10px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-cyan-400/60 via-fuchsia-400/40 to-transparent sm:block" />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Project({
  year,
  title,
  bullets,
  link,
  extra,
}: {
  year: string;
  title: string;
  bullets: string[];
  link?: { href: string; label: string };
  extra?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/60 p-4 shadow-sm backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-white/80 dark:bg-white/10">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {year}
        </span>
      </div>
      <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
        {link && (
          <li>
            Live / Link:{" "}
            <a className="link" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        )}
      </ul>
      {extra && <div className="mt-1">{extra}</div>}
    </article>
  );
}

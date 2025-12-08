// src/app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  SiTypescript, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiLaravel,
  SiR, SiPython, SiMysql, SiTableau, SiFigma, SiWhatsapp,
} from "react-icons/si";

/* ================= Design tokens (soft, readable, professional) ================= */
const PANEL =
  "rounded-3xl p-6 shadow-lg ring-1 ring-slate-200/80 " +
  "bg-white/96 backdrop-blur-sm supports-[backdrop-filter]:bg-white/96 " +
  "dark:bg-slate-900/78 dark:ring-white/10";

const CHROME =
  "bg-gradient-to-br from-slate-50/95 via-white/98 to-slate-50/95 " +
  "dark:from-slate-900/78 dark:via-slate-900/78 dark:to-slate-900/78";

const BADGE =
  "rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-sm " +
  "text-slate-800 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 " +
  "dark:bg-slate-800 dark:text-slate-50 dark:border-white/10";

const LINK =
  "text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-sky-400 " +
  "dark:text-slate-50";

const BAR_RAIL = "h-2 overflow-hidden rounded-full bg-slate-200/90 dark:bg-white/10";
const BAR_FILL =
  "h-full rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-indigo-400 " +
  "dark:from-sky-400/85 dark:via-fuchsia-400/85 dark:to-indigo-400/85";

/* ================= Subtle reveal on scroll ================= */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShow(true)),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, show } as const;
}

/* ================= Tiny toast (for copy feedback) ================= */
function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 1800);
    return () => clearTimeout(t);
  }, [msg]);
  return { msg, show: (m: string) => setMsg(m) } as const;
}

/* ================= Scroll-to-top FAB ================= */
function useShowTopBtn(offset = 320) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return show;
}

export default function Home() {
  // Soft spotlight in HERO (disabled for reduced-motion)
  const heroRef = useRef<HTMLDivElement>(null);
  const onHeroMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const toast = useToast();
  const showTopBtn = useShowTopBtn();

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.show(`${label} copied`);
    } catch {
      toast.show(`Could not copy ${label}`);
    }
  };

  return (
    <main className="relative mx-auto max-w-7xl px-6 py-12 print:py-0 page-bg">
      <div aria-hidden className="edge-left" />
      <div aria-hidden className="edge-right" />

      {/* ================= HERO ================= */}
      <section className="no-print">
        <div
          ref={heroRef}
          onMouseMove={onHeroMove}
          className={`${PANEL} ${CHROME} spotlight text-slate-900 dark:text-slate-50`}
        >
          <div className="flex flex-wrap items-center gap-8">
            <div
              className="relative shrink-0 motion-safe:[transform-style:preserve-3d] motion-safe:transition-transform"
              style={{ perspective: 900 }}
            >
              <Image
                src="/avatar.jpg"
                alt="Profile photo"
                width={120}
                height={120}
                className="h-[120px] w-[120px] rounded-2xl object-cover ring-1 ring-slate-200/80 motion-safe:duration-300 motion-safe:hover:rotate-[1.25deg] motion-safe:hover:scale-[1.01]"
                priority
              />
            </div>

            <div className="min-w-[18rem]">
              <h1 className="text-4xl font-extrabold tracking-tight leading-none">Raja Adi Pranata</h1>
              <p className="mt-2 text-[15px] text-slate-700 dark:text-slate-300">
                Computer Science &amp; Statistics Student
              </p>

              <nav className="mt-3 flex flex-wrap items-center gap-4 text-sm" aria-label="Profile links">
                <a className={LINK} href="mailto:raja.pranata@binus.ac.id">raja.pranata@binus.ac.id</a>
                <a className={LINK} href="https://github.com/Rajapranata512" target="_blank" rel="noreferrer">GitHub</a>
                <a className={LINK} href="https://www.linkedin.com/in/raja-adi-pranata-507704251/" target="_blank" rel="noreferrer">LinkedIn</a>
              </nav>
            </div>

            <div className="ms-auto flex flex-wrap gap-3">
              <a className="btn-luxe" href="/cv">View CV</a>
              <a className="btn-luxe" href="#contact">Contact</a>
              <button className="btn-luxe" onClick={() => window.print()}>Save / Print PDF</button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Hud label="Level" value="Senior Student" pct={70} />
            <Hud label="Focus" value="Analytics · Web Dev" pct={82} />
            <Hud label="Availability" value="Internship-ready" pct={100} />
          </div>
        </div>
      </section>

      {/* ================= CONTENT GRID ================= */}
      <div className="mt-10 grid gap-6 lg:grid-cols-5">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-3">
          <Section title="Summary">
            <p className="leading-relaxed text-slate-900 dark:text-slate-50">
              Final-year Computer Science &amp; Statistics student focused on data analytics and elegant, performant web
              apps. I design tidy data workflows in Python/R, visualize with Tableau, and ship polished Next.js UIs. I
              value readable code, measurable outcomes, and dependable delivery.
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
                <span key={label} className={`${BADGE} flex items-center gap-2`}>
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </Section>

          <Section title="College Projects">
            <Timeline>
              <Project
                year="2023"
                title="Paper"
                bullets={["Analisis Python Penggunaan Musik Sebagai Pengobatan Gangguan Mental."]}
                link={{ href: "https://journalcenter.org/index.php/jupti/article/view/1721", label: "journalcenter.org/jupti/article/view/1721" }}
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
                    <a className={LINK} target="_blank" rel="noreferrer"
                       href="https://www.figma.com/proto/smMeAYuwtlEs73TzAep2DR/project_lab?t=MMX8z7CteRkoMcMN-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&show-proto-sidebar=1">
                      View Prototype
                    </a>{" "}
                    · Live:{" "}
                    <a className={LINK} target="_blank" rel="noreferrer" href="https://rajapranata512.github.io/palorant-website/">
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
                    <a className={LINK} href="/docs/cca-campus-psych-health.pdf" target="_blank" rel="noreferrer" download>PDF (download)</a>
                    <span className="px-1">·</span>
                    <a className={LINK} href="/docs/task-allocation.docx" target="_blank" rel="noreferrer" download>Roles (DOCX): Task Allocation</a>
                    <span className="px-1">·</span>
                    <a className={LINK} href="/docs/output_code.txt" target="_blank" rel="noreferrer" download>Output (TXT): output_code.txt</a>
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
                link={{ href: "https://kripuk-website-binus.vercel.app/", label: "kripuk-website-binus.vercel.app" }}
              />

              <Project
                year="2025"
                title="Business Analytics Dashboards (Tableau Public)"
                bullets={["Interactive dashboards for sales KPIs, segmentation, and executive overview."]}
                link={{ href: "https://public.tableau.com/app/profile/raja.adi.pranata/vizzes", label: "tableau.com/profile/raja.adi.pranata/vizzes" }}
              />
            </Timeline>
          </Section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 lg:col-span-2">
          <Section title="Community">
            <Card className="text-slate-900 dark:text-slate-50">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">HIMSTAT (Statistics Student Association)</h3>
                <span className="text-xs text-slate-600 dark:text-slate-300">2022 – 2023</span>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Event Lead for Community Service (P2M) in 2022.</li>
                <li>Committee member for SPSS workshop in 2023.</li>
              </ul>
            </Card>
          </Section>

          <Section id="contact" title="Education & Contact">
            <Card className="text-slate-900 dark:text-slate-50">
              <div className="flex items-baseline justify-between">
                <h3 className="font-semibold">B.Sc. Computer Science &amp; Statistics — BINUS University</h3>
                <span className="text-xs text-slate-600 dark:text-slate-300">2022 – Present</span>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                <li>Focus: Econometrics, Time-series, Web Development, Statistical Analysis.</li>
              </ul>
            </Card>

            {/* Interactive contacts */}
            <div className="mt-4 space-y-2 text-sm text-slate-900 dark:text-slate-50">
              <p className="flex items-center gap-2">
                Email:{" "}
                <a className={LINK} href="mailto:raja.pranata@binus.ac.id">raja.pranata@binus.ac.id</a>
                <button
                  className="rounded-md px-2 py-1 text-xs ring-1 ring-slate-300 hover:bg-slate-50 dark:ring-white/20 dark:hover:bg-slate-800"
                  onClick={() => copy("raja.pranata@binus.ac.id", "Email")}
                  aria-label="Copy email"
                >
                  Copy
                </button>
              </p>
              <p className="flex flex-wrap items-center gap-2">
                Phone / WhatsApp:{" "}
                <a className={LINK} href="tel:+6285694890848">+6285694890848</a>
                <button
                  className="rounded-md px-2 py-1 text-xs ring-1 ring-slate-300 hover:bg-slate-50 dark:ring-white/20 dark:hover:bg-slate-800"
                  onClick={() => copy("+6285694890848", "Phone")}
                  aria-label="Copy phone number"
                >
                  Copy
                </button>
                <a
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700"
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
                <a className={LINK} href="https://cv-next-pied.vercel.app/" target="_blank" rel="noreferrer">
                  cv-next-pied.vercel.app
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>

      {/* ===== Tiny Toast ===== */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center transition ${
          toast.msg ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full bg-slate-900/90 px-4 py-2 text-xs text-white shadow-lg dark:bg-white/90 dark:text-slate-900">
          {toast.msg}
        </div>
      </div>

      {/* ===== Back to Top FAB ===== */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold shadow-lg ring-1 ring-slate-200 hover:bg-white dark:bg-slate-800/90 dark:text-slate-50 dark:ring-white/15"
          aria-label="Back to top"
        >
          ↑ Top
        </button>
      )}
    </main>
  );
}

/* =================== Reusable components =================== */

function Section({
  title, id, children,
}: { title: string; id?: string; children: React.ReactNode }) {
  const { ref, show } = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`${PANEL} ${CHROME} transition duration-600 motion-safe:will-change-transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-50">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{
            background: "linear-gradient(120deg,#22d3ee,#f472b6,#6366f1)",
            boxShadow: "0 0 8px rgba(34,211,238,.45)",
          }}
        />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Card({
  children, className = "",
}: { children: React.ReactNode; className?: string }) {
  const { ref, show } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${PANEL} transition duration-600 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

function Hud({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className={`${PANEL}`}>
      <div className="text-[11px] uppercase tracking-widest text-slate-700 dark:text-slate-300">{label}</div>
      <div className="mt-1 text-[15px] font-semibold text-slate-900 dark:text-slate-50">{value}</div>
      <div className={`mt-3 ${BAR_RAIL}`} aria-hidden>
        <div className={BAR_FILL} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
      </div>
    </div>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute left-[10px] top-0 bottom-0 hidden w-px bg-gradient-to-b from-sky-300/40 via-fuchsia-300/30 to-transparent sm:block" />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Project({
  year, title, bullets, link, extra,
}: {
  year: string; title: string; bullets: string[];
  link?: { href: string; label: string }; extra?: React.ReactNode;
}) {
  const { ref, show } = useReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      className={`${PANEL} transition duration-600 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } hover:ring-slate-300/70 hover:shadow-xl`}
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold tracking-tight text-slate-900 dark:text-slate-50">{title}</h3>
        <span className="text-sm text-slate-700 dark:text-slate-300">{year}</span>
      </div>
      <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-900 dark:text-slate-50">
        {bullets.map((b) => <li key={b}>{b}</li>)}
        {link && (
          <li>
            Live / Link: <a className={LINK} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          </li>
        )}
      </ul>
      {extra && <div className="mt-1 text-slate-900 dark:text-slate-50">{extra}</div>}
    </article>
  );
}

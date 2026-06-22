// src/app/cv/ats/page.tsx
// Harvard ATS-Friendly CV — single-page, with profile photo
// Optimized with highly impactful action verbs for Applicant Tracking Systems

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Raja Adi Pranata — CV (ATS Format)",
  description:
    "Harvard ATS-optimized CV for Raja Adi Pranata, Computer Science & Statistics student.",
  robots: "noindex, nofollow",
};

export default function ATSPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4;
              margin: 6mm 12mm 6mm 12mm;
            }
            *, *::before, *::after {
              margin: 0; padding: 0; box-sizing: border-box;
            }
            body {
              font-family: 'Times New Roman', Times, Georgia, serif;
              font-size: 8.8pt;
              line-height: 1.15;
              color: #000;
              background: #fff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            /* ── PAGE WRAPPER ── */
            .ats-page {
              max-width: 680px;
              margin: 0 auto;
              padding: 4px 0 0;
            }

            /* ── HEADER ── */
            .ats-header {
              display: flex;
              align-items: flex-start;
              gap: 14px;
              padding-bottom: 6px;
              border-bottom: 1.8px solid #000;
              margin-bottom: 4px;
            }
            .ats-avatar {
              width: 64px;
              height: 64px;
              border-radius: 6px;
              object-fit: cover;
              flex-shrink: 0;
            }
            .ats-header-text {
              flex: 1;
              min-width: 0;
            }
            .ats-name {
              font-size: 15pt;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              line-height: 1.15;
            }
            .ats-title-line {
              font-size: 9pt;
              font-style: italic;
              margin-top: 1px;
              color: #333;
            }
            .ats-contact {
              font-size: 8.6pt;
              line-height: 1.45;
              margin-top: 2px;
            }
            .ats-sep { margin: 0 4px; }

            /* ── SECTIONS ── */
            .ats-section { margin-top: 4px; }
            .ats-section-title {
              font-size: 9.2pt;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.045em;
              border-bottom: 0.8px solid #000;
              padding-bottom: 1px;
              margin-bottom: 3px;
            }

            /* ── ENTRIES ── */
            .ats-entry { margin-bottom: 2px; }
            .ats-entry-header {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
            }
            .ats-entry-title { font-weight: bold; font-size: 9.2pt; }
            .ats-entry-date {
              font-style: italic; font-size: 8.5pt; white-space: nowrap;
            }
            .ats-entry-sub {
              font-style: italic; font-size: 8.5pt; color: #222;
            }
            .ats-entry-sub-row {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
            }

            /* ── LISTS ── */
            .ats-list {
              list-style-type: disc;
              padding-left: 16px;
              margin-top: 1px;
            }
            .ats-list li {
              margin-bottom: 0px;
              font-size: 9pt;
              line-height: 1.2;
            }

            /* ── SKILLS ── */
            .ats-skills-row { margin-bottom: 0px; font-size: 9pt; }
            .ats-skills-label { font-weight: bold; }

            /* ── INLINE ENTRY (compact) ── */
            .ats-inline {
              font-size: 9.4pt;
              margin-bottom: 1px;
            }
            .ats-inline b { font-weight: bold; }

            /* ── SCREEN-ONLY HELPER ── */
            @media screen {
              .ats-page { padding: 24px 12px; }
            }
            @media print {
              .ats-page { padding: 0; }
            }
          `,
        }}
      />

      <div className="ats-page">
        {/* ══════════ HEADER ══════════ */}
        <header className="ats-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cv-avatar.jpg"
            alt="Raja Adi Pranata"
            className="ats-avatar"
            width={64}
            height={64}
          />
          <div className="ats-header-text">
            <h1 className="ats-name">Raja Adi Pranata</h1>
            <div className="ats-title-line">
              Computer Science &amp; Statistics Professional
            </div>
            <div className="ats-contact">
              Jakarta, Indonesia
              <span className="ats-sep">|</span>
              +62 856-9489-0848
              <span className="ats-sep">|</span>
              raja.pranata@binus.ac.id
            </div>
            <div className="ats-contact">
              linkedin.com/in/raja-adi-pranata-507704251
              <span className="ats-sep">|</span>
              github.com/Rajapranata512
              <span className="ats-sep">|</span>
              cv-next-pied.vercel.app
            </div>
          </div>
        </header>

        {/* ══════════ SUMMARY ══════════ */}
        <section className="ats-section">
          <h2 className="ats-section-title">Professional Summary</h2>
          <p style={{ fontSize: "9.4pt" }}>
            Results-driven Computer Science &amp; Statistics professional with expertise in architecting robust full-stack web applications and engineering data-driven solutions. Proven track record in developing high-performance platforms using Laravel, Next.js, and TypeScript, alongside deploying scalable CI/CD pipelines via GitHub Actions and Vercel. Adept at translating complex datasets into actionable business intelligence through advanced SQL, Python, R, and Tableau dashboards.
          </p>
        </section>

        {/* ══════════ EDUCATION ══════════ */}
        <section className="ats-section">
          <h2 className="ats-section-title">Education</h2>
          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">BINUS University</span>
              <span className="ats-entry-date">2022 — Present</span>
            </div>
            <div className="ats-entry-sub-row">
              <span className="ats-entry-sub">
                Bachelor of Computer Science &amp; Statistics (Dual Degree)
              </span>
              <span className="ats-entry-sub">Jakarta, Indonesia</span>
            </div>
            <ul className="ats-list">
              <li>
                <strong>Key Coursework:</strong> Software Engineering, Data Structures, Multivariate Analysis, Statistical Computing, Web Programming, Database Systems.
              </li>
            </ul>
          </div>
        </section>

        {/* ══════════ TECHNICAL SKILLS ══════════ */}
        <section className="ats-section">
          <h2 className="ats-section-title">Core Competencies &amp; Technical Skills</h2>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Programming Languages: </span>
            TypeScript, JavaScript, PHP, Python, R, SQL, HTML5, CSS3
          </div>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Frameworks &amp; Libraries: </span>
            Next.js, React.js, Laravel, Livewire, Filament, Tailwind CSS, Framer Motion
          </div>
          <div className="ats-skills-row">
            <span className="ats-skills-label">Data Engineering &amp; Analytics: </span>
            Tableau, MySQL, SQLite, Statistical Modeling, Data Visualization, Predictive Analytics
          </div>
          <div className="ats-skills-row">
            <span className="ats-skills-label">DevOps &amp; Tools: </span>
            Git, GitHub Actions (CI/CD), Vercel, cPanel, Figma, VS Code
          </div>
        </section>

        {/* ══════════ PROFESSIONAL EXPERIENCE / PROJECTS ══════════ */}
        <section className="ats-section">
          <h2 className="ats-section-title">Professional Experience &amp; Technical Projects</h2>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Doctor Research Management Association, BINUS University
              </span>
              <span className="ats-entry-date">Feb 2026 — Aug 2026</span>
            </div>
            <div className="ats-entry-sub">
              Web Developer Intern | 6 Months
            </div>
            <ul className="ats-list">
              <li>
                <strong>Developed</strong> the official web platform (asosiasidrm.id) to streamline administrative workflows and enhance communication for doctoral students and alumni.
              </li>
              <li>
                <strong>Collaborated</strong> closely with researchers and management to translate complex business logic into a scalable application architecture using modern web technologies.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Karyora — Multi-Tenant SaaS Portfolio Platform
              </span>
              <span className="ats-entry-date">2026</span>
            </div>
            <div className="ats-entry-sub">
              Next.js 16, React 19, Supabase, Tailwind CSS, TypeScript | karyora-kappa.vercel.app
            </div>
            <ul className="ats-list">
              <li>
                <strong>Architected</strong> a scalable, no-code portfolio builder enabling users to generate over 400,000 visual combinations using a dynamic JSONB-based design engine.
              </li>
              <li>
                <strong>Engineered</strong> a secure multi-tenant backend on Supabase PostgreSQL, implementing strict Row Level Security (RLS) to guarantee complete data isolation between user accounts.
              </li>
              <li>
                <strong>Spearheaded</strong> a granular administrative access system mapping complex Master and Assistant roles directly to Supabase Auth metadata for scalable authorization.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Asosiasi Alumni DRM BINUS — Full-Stack Web App
              </span>
              <span className="ats-entry-date">2026</span>
            </div>
            <div className="ats-entry-sub">
              Laravel 12, Filament, Livewire, Tailwind CSS | asosiasidrm.id
            </div>
            <ul className="ats-list">
              <li>
                <strong>Engineered</strong> a highly scalable production alumni platform facilitating secure authentication, event management, and online donations for thousands of users.
              </li>
              <li>
                <strong>Architected</strong> robust administrative workflows utilizing Filament, enabling seamless content management, data analytics, and user engagement tracking.
              </li>
              <li>
                <strong>Spearheaded</strong> deployment infrastructure on cPanel, integrating automated CI/CD pipelines via GitHub Actions, cron job optimization, and advanced queue scheduling.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                IDX Trading Lab — Market Analysis Web App
              </span>
              <span className="ats-entry-date">2026</span>
            </div>
            <div className="ats-entry-sub">
              Next.js, TypeScript, Tailwind CSS | idx-trading-lab.vercel.app
            </div>
            <ul className="ats-list">
              <li>
                <strong>Developed</strong> a comprehensive trading research laboratory enabling users to explore and analyze Indonesian stock market data efficiently.
              </li>
              <li>
                <strong>Optimized</strong> the user interface for rapid data scanning and deployed the serverless architecture on Vercel to ensure 99.9% uptime.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Foodies — Full-Stack Recipe Application
              </span>
              <span className="ats-entry-date">2026</span>
            </div>
            <div className="ats-entry-sub">
              Laravel 11, Blade, Tailwind CSS, MySQL | foodies.infinityfreeapp.com
            </div>
            <ul className="ats-list">
              <li>
                <strong>Designed and implemented</strong> an end-to-end recipe management platform featuring secure user authentication, complex CRUD operations, and responsive web design.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Palorant — Interactive Front-End Web Experience
              </span>
              <span className="ats-entry-date">2024</span>
            </div>
            <div className="ats-entry-sub">
              HTML5, CSS3, Vanilla JavaScript, Figma | rajapranata512.github.io/palorant-website
            </div>
            <ul className="ats-list">
              <li>
                <strong>Translated</strong> high-fidelity Figma prototypes into a production-ready, multi-page application demonstrating advanced DOM manipulation and interactive CSS styling.
              </li>
            </ul>
          </div>
        </section>

        {/* ══════════ RESEARCH & PUBLICATIONS ══════════ */}
        <section className="ats-section">
          <h2 className="ats-section-title">Research, Analytics &amp; Publications</h2>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                From Words to Wages — Text Mining on Job Descriptions
              </span>
              <span className="ats-entry-date">2026</span>
            </div>
            <ul className="ats-list">
              <li>
                <strong>Architected</strong> a machine learning pipeline applying TF-IDF extraction and regularized regression (Ridge, Lasso) on bilingual job descriptions to predict salary determinants.
              </li>
              <li>
                <strong>Spearheaded</strong> empirical analysis confirming that higher salaries strongly correlate with senior cues, English proficiency, and Jakarta-based locations, achieving a Test R² ≈ 0.21.
              </li>
              <li>
                <strong>Published</strong> findings as an accepted paper for presentation at ICAKMPET-2026.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Music &amp; Mental Health — Quantitative Research Paper
              </span>
              <span className="ats-entry-date">2023</span>
            </div>
            <ul className="ats-list">
              <li>
                <strong>Conducted</strong> rigorous statistical analysis using Python to evaluate the efficacy of music as a mental health treatment factor.
              </li>
              <li>
                <strong>Published</strong> findings in the peer-reviewed JUPTI academic journal, showcasing ability to derive actionable insights from complex datasets.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Canonical Correlation Analysis — Psychological Health Study
              </span>
              <span className="ats-entry-date">2025</span>
            </div>
            <ul className="ats-list">
              <li>
                <strong>Executed</strong> advanced Canonical Correlation Analysis (CCA) in R to quantify the relationship between campus environment metrics and student psychological health.
              </li>
            </ul>
          </div>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                Executive Business Analytics Dashboards
              </span>
              <span className="ats-entry-date">2025</span>
            </div>
            <ul className="ats-list">
              <li>
                <strong>Designed</strong> high-impact Tableau dashboards to monitor sales KPIs, customer segmentation, and strategic business metrics for executive stakeholders.
              </li>
            </ul>
          </div>
        </section>

        {/* ══════════ LEADERSHIP & CERTIFICATIONS ══════════ */}
        <section className="ats-section">
          <h2 className="ats-section-title">
            Leadership &amp; Certifications
          </h2>

          <div className="ats-entry">
            <div className="ats-entry-header">
              <span className="ats-entry-title">
                HIMSTAT (Statistics Student Association) — BINUS University
              </span>
              <span className="ats-entry-date">2022 — 2023</span>
            </div>
            <ul className="ats-list">
              <li>
                <strong>Directed</strong> cross-functional teams as Event Lead for the 2022 Community Service (P2M) initiative, ensuring project delivery within strict timelines.
              </li>
            </ul>
          </div>

          <div className="ats-inline">
            <b>Beelingua English Language Proficiency Certificate</b> — Validated professional working proficiency in English communication and documentation.
          </div>
        </section>
      </div>
    </>
  );
}

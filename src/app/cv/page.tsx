// src/app/cv/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function CVPage() {
  // Ganti nama file PDF jika perlu
  const pdfPath = "/Raja-Adi-Pranata-CV.pdf";
  const [hasPdf, setHasPdf] = useState<boolean | null>(null);

  // Cek apakah file PDF tersedia di /public
  useEffect(() => {
    fetch(pdfPath, { method: "HEAD" })
      .then((r) => setHasPdf(r.ok))
      .catch(() => setHasPdf(false));
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 print:py-0">
      {/* HEADER */}
      <header className="mb-6 card">
        <div className="flex items-start gap-4">
          <img
            src="/avatar.jpg"
            alt="Photo"
            width={88}
            height={88}
            className="rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold leading-tight">Raja Adi Pranata</h1>
            <p className="text-sm text-muted">
              Computer Science &amp; Statistics — Jakarta, Indonesia
            </p>
            <div className="mt-2 text-sm flex flex-wrap gap-4">
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
                href="https://linkedin.com/in/raja-adi-pranata-507704251"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/raja-adi-pranata-507704251
              </a>
            </div>
          </div>

          {/* ACTIONS (hidden saat print) */}
          <div className="no-print flex flex-col gap-2">
            {hasPdf ? (
              <a className="btn" href={pdfPath} download>
                Download PDF
              </a>
            ) : (
              <button
                className="btn opacity-70 cursor-not-allowed"
                title="PDF belum tersedia di /public. Gunakan Print to PDF dulu."
                disabled
              >
                Download PDF (not found)
              </button>
            )}
            <button className="btn" onClick={() => window.print()}>
              Print to PDF
            </button>
          </div>
        </div>
      </header>

      {/* BODY: 2 kolom */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <aside className="md:col-span-1 space-y-6">
          <div className="card avoid-break">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <ul className="text-sm list-disc list-inside space-y-1">
              <li>R, Python, SQL</li>
              <li>Next.js, TypeScript, Tailwind</li>
              <li>Tableau, Git</li>
            </ul>
          </div>

          <div className="card avoid-break">
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            <p className="text-sm">
              <b>BINUS University</b>
              <br />
              B.Sc. Computer Science &amp; Statistics
              <br />
              <span className="text-muted">2022 – Present</span>
            </p>
          </div>
        </aside>

        {/* RIGHT */}
        <div className="md:col-span-2 space-y-6">
          <div className="card avoid-break">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <p className="text-sm">
              Final-year CS &amp; Statistics student focusing on analytics, web development, and
              applied research. Comfortable with R, Python, and Next.js to turn data into
              clear insights and practical features.
            </p>
          </div>

          <div className="card avoid-break">
            <h2 className="text-lg font-semibold mb-2">Experience</h2>
            <div>
              <div className="flex items-baseline justify-between">
                <b>Data Analyst Intern</b>
                <span className="text-xs text-muted">Jun 2024 – Sep 2024 · ABC Company</span>
              </div>
              <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                <li>Built KPI dashboards and automated reporting in R.</li>
                <li>Worked with product team for A/B testing and analysis.</li>
              </ul>
            </div>
          </div>

          <div className="card avoid-break">
            <h2 className="text-lg font-semibold mb-2">Selected Projects</h2>

            <div className="mb-3">
              <div className="flex items-baseline justify-between">
                <b>RFF Ridge Forecasting</b>
                <span className="text-xs text-muted">2025</span>
              </div>
              <ul className="mt-1 text-sm list-disc list-inside space-y-1">
                <li>Random Fourier Features + Ridge for time-series.</li>
                <li>Rolling CV with RMSE/MAE/sMAPE.</li>
              </ul>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <b>Kripuk.com</b>
                <span className="text-xs text-muted">2025</span>
              </div>
              <ul className="mt-1 text-sm list-disc list-inside space-y-1">
                <li>Content + catalog site on Next.js + Tailwind (Vercel).</li>
                <li>Culture-focused storytelling with simple CMS structure.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <p className="no-print text-center text-xs text-muted my-8">
        Tip: If the download button doesn’t work, use “Print to PDF”, lalu simpan ke
        <code className="mx-1 rounded bg-slate-100 px-1 py-0.5">/public/Raja-Adi-Pranata-CV.pdf</code>.
      </p>
    </main>
  );
}
    
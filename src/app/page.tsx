"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Code2,
  Database,
  ExternalLink,
  Film,
  Mail,
  SkipForward,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAdaptiveQuality, type QualityLevel } from "@/components/ui/AdaptiveQualityProvider";

type Chapter = { year: string; title: string; text: string };
type ProjectMood = {
  tone: "gourmet" | "sonic" | "executive" | "arcade";
  aura: [string, string];
  sheen: string;
  overlay: [string, string];
  accent: string;
  icon: string;
  chipBg: string;
  chipBorder: string;
  auraSpeed: number;
  hover: { y: number; rotateX: number; rotateY: number; scale: number };
};
type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  icon: LucideIcon;
  mood: ProjectMood;
};
type SceneTone = "amber" | "rose" | "cyan";
type SceneId = "intro" | "journey" | "skills" | "projects" | "contact";
type StorySection = { id: SceneId; label: string; cue: string; code: string };

const chapters: Chapter[] = [
  { year: "2022", title: "The First Frame", text: "Started as a CS & Statistics student, learning to turn data into stories." },
  { year: "2023", title: "Data Becomes Story", text: "Built analytics works where output had to become real decisions." },
  { year: "2024", title: "Interfaces with Personality", text: "Crafted immersive web interfaces with strong usability." },
  { year: "2025-2026", title: "End-to-End Builder", text: "Building full-stack products from model design to deployment." },
];

const projects: Project[] = [
  {
    title: "Foodies",
    description: "Laravel recipe platform with auth flow, CRUD recipes, and responsive detail pages.",
    link: "https://foodies.infinityfreeapp.com/",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    tags: ["Laravel", "Blade", "Tailwind", "SQLite/MySQL"],
    icon: Code2,
    mood: {
      tone: "gourmet",
      aura: ["rgba(251, 191, 36, 0.34)", "rgba(249, 115, 22, 0.3)"],
      sheen: "rgba(255, 233, 163, 0.55)",
      overlay: ["rgba(0, 0, 0, 0.03)", "rgba(35, 12, 4, 0.82)"],
      accent: "#f59e0b",
      icon: "#fcd34d",
      chipBg: "rgba(251, 146, 60, 0.14)",
      chipBorder: "rgba(251, 191, 36, 0.38)",
      auraSpeed: 7.2,
      hover: { y: -9, rotateX: 3.2, rotateY: -2.4, scale: 1.015 },
    },
  },
  {
    title: "Music & Mental Health",
    description: "Research paper using Python analytics to evaluate music as a treatment factor.",
    link: "https://journalcenter.org/index.php/jupti/article/view/1721",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    tags: ["Python", "Research", "Statistics"],
    icon: Database,
    mood: {
      tone: "sonic",
      aura: ["rgba(56, 189, 248, 0.3)", "rgba(167, 139, 250, 0.28)"],
      sheen: "rgba(165, 180, 252, 0.5)",
      overlay: ["rgba(0, 0, 0, 0.03)", "rgba(8, 12, 38, 0.83)"],
      accent: "#38bdf8",
      icon: "#7dd3fc",
      chipBg: "rgba(59, 130, 246, 0.14)",
      chipBorder: "rgba(99, 102, 241, 0.34)",
      auraSpeed: 8.8,
      hover: { y: -10, rotateX: 3.4, rotateY: -3.1, scale: 1.016 },
    },
  },
  {
    title: "Business Dashboards",
    description: "Executive-ready Tableau dashboards for KPI monitoring and behavior segmentation.",
    link: "https://public.tableau.com/app/profile/raja.adi.pranata/vizzes",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    tags: ["Tableau", "SQL", "Visualization"],
    icon: ChartNoAxesCombined,
    mood: {
      tone: "executive",
      aura: ["rgba(45, 212, 191, 0.28)", "rgba(56, 189, 248, 0.24)"],
      sheen: "rgba(186, 230, 253, 0.45)",
      overlay: ["rgba(0, 0, 0, 0.05)", "rgba(5, 27, 34, 0.8)"],
      accent: "#2dd4bf",
      icon: "#5eead4",
      chipBg: "rgba(45, 212, 191, 0.14)",
      chipBorder: "rgba(45, 212, 191, 0.34)",
      auraSpeed: 9.4,
      hover: { y: -8, rotateX: 2.4, rotateY: -2.2, scale: 1.013 },
    },
  },
  {
    title: "Palorant",
    description: "Valorant-inspired web experience with immersive interaction and multi-page architecture.",
    link: "https://rajapranata512.github.io/palorant-website/",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Figma"],
    icon: Film,
    mood: {
      tone: "arcade",
      aura: ["rgba(251, 113, 133, 0.32)", "rgba(244, 63, 94, 0.28)"],
      sheen: "rgba(253, 164, 175, 0.48)",
      overlay: ["rgba(0, 0, 0, 0.04)", "rgba(38, 6, 16, 0.82)"],
      accent: "#fb7185",
      icon: "#fda4af",
      chipBg: "rgba(251, 113, 133, 0.13)",
      chipBorder: "rgba(251, 113, 133, 0.34)",
      auraSpeed: 6.7,
      hover: { y: -11, rotateX: 4.2, rotateY: -3.4, scale: 1.018 },
    },
  },
];

const reelSkills = ["TypeScript", "Next.js", "Laravel", "Python", "R", "SQL", "Tableau", "Figma", "Tailwind CSS"];
const stats = [
  { label: "Projects Built", value: "12+" },
  { label: "Research Works", value: "3" },
  { label: "Dashboard Cases", value: "20+" },
];
const storySections: StorySection[] = [
  { id: "intro", label: "Opening", cue: "Set the tone", code: "SCN-01" },
  { id: "journey", label: "Journey", cue: "Story arc", code: "SCN-02" },
  { id: "skills", label: "Skill Reel", cue: "Core stack", code: "SCN-03" },
  { id: "projects", label: "Project Reels", cue: "Featured work", code: "SCN-04" },
  { id: "contact", label: "Final Scene", cue: "Call to action", code: "SCN-05" },
];

function WordReveal({
  text,
  className = "",
  delayStep = 0.05,
  initialDelay = 0,
}: {
  text: string;
  className?: string;
  delayStep?: number;
  initialDelay?: number;
}) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <span className={className}>{text}</span>;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block pr-[0.35em]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: initialDelay + index * delayStep }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function SceneDivider({ tone = "amber" }: { tone?: SceneTone }) {
  const reducedMotion = useReducedMotion();
  const toneClass = tone === "rose" ? "scene-divider-rose" : tone === "cyan" ? "scene-divider-cyan" : "scene-divider-amber";
  return (
    <motion.div
      className={`scene-divider ${toneClass}`}
      initial={reducedMotion ? undefined : { opacity: 0, scaleX: 0.94 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.8 }}
      aria-hidden
    >
      <span className="scene-divider-tag">Scene Cut</span>
      <div className="scene-divider-line" />
      <div className="scene-divider-beam" />
      <div className="scene-divider-haze" />
    </motion.div>
  );
}

function SceneAtmosphere({ scene }: { scene: SceneId }) {
  void scene;
  return null;
}

function SceneCutFlash({ cutToken }: { cutToken: number }) {
  void cutToken;
  return null;
}

function StoryHud({ activeScene, scrollYProgress }: { activeScene: SceneId; scrollYProgress: MotionValue<number> }) {
  void activeScene;
  void scrollYProgress;
  return null;
}

function CinematicPreloader({ onFinish, quality }: { onFinish: () => void; quality: QualityLevel }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    let completeTimer: ReturnType<typeof setTimeout> | undefined;
    const duration = reducedMotion ? 950 : quality === "high" ? 2600 : 1900;
    const started = performance.now();
    const tick = (now: number) => {
      const next = Math.min(100, ((now - started) / duration) * 100);
      setProgress(next);
      if (next < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }
      completeTimer = setTimeout(onFinish, 450);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [onFinish, quality, reducedMotion]);

  return (
    <motion.div
      className="cinema-preloader fixed inset-0 z-[240] flex items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="cinema-preloader-shell relative w-full max-w-2xl rounded-[2rem] border border-white/15 bg-black/45 p-7 md:p-10"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cinema-preloader-beam" aria-hidden />
        <p className="text-xs uppercase tracking-[0.28em] text-[#fbbf24]">Initializing Story Engine</p>
        <h1 className="font-cinema-display mt-3 text-4xl text-[#fff4df] md:text-5xl">Entering Cinematic Mode</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#f8eddc]/76">
          Composing atmosphere, sequencing transitions, and loading reactive layers.
        </p>
        <div className="mt-8">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#f59e0b,#fb7185,#38bdf8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#f8eddc]/75">
            <span>Loading Visual Sequence</span>
            <span>{Math.round(progress).toString().padStart(2, "0")}%</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onFinish}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#fff4df] transition hover:bg-white/10"
        >
          <SkipForward className="h-3.5 w-3.5" />
          Skip Intro
        </button>
      </motion.div>
    </motion.div>
  );
}
function ScrollReactiveLayer({ scrollYProgress, quality }: { scrollYProgress: MotionValue<number>; quality: QualityLevel }) {
  void scrollYProgress;
  void quality;
  return null;
}
export default function Home() {
  const { scrollYProgress } = useScroll();
  const quality = useAdaptiveQuality();
  const reducedMotion = useReducedMotion();
  const activeSceneRef = useRef<SceneId>("intro");

  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.38]);

  const [preloading, setPreloading] = useState(true);
  const [activeScene, setActiveScene] = useState<SceneId>("intro");
  const [cutToken, setCutToken] = useState(0);
  const finishPreloader = useCallback(() => setPreloading((p) => (p ? false : p)), []);

  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  useEffect(() => {
    if (preloading) return undefined;
    const nodes = storySections
      .map((s) => {
        const node = document.querySelector<HTMLElement>(`[data-scene-id="${s.id}"]`);
        return node ? { id: s.id, node } : null;
      })
      .filter((x): x is { id: SceneId; node: HTMLElement } => x !== null);
    if (!nodes.length) return undefined;

    const visibility = new Map<SceneId, number>(storySections.map((s) => [s.id, 0]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.sceneId as SceneId | undefined;
          if (!id) return;
          visibility.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let next = activeSceneRef.current;
        let max = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > max) {
            max = ratio;
            next = id;
          }
        });

        if (max > 0) {
          setActiveScene((prev) => {
            if (prev === next) return prev;
            setCutToken((value) => value + 1);
            return next;
          });
        }
      },
      { threshold: [0.2, 0.35, 0.5, 0.7, 0.9], rootMargin: "-20% 0px -35% 0px" },
    );

    nodes.forEach(({ node }) => observer.observe(node));
    return () => observer.disconnect();
  }, [preloading]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (preloading) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [preloading]);

  return (
    <>
      <AnimatePresence>{preloading && <CinematicPreloader onFinish={finishPreloader} quality={quality} />}</AnimatePresence>
      <main className={`cinema-root quality-${quality} relative min-h-screen overflow-x-clip text-[#f9f3e7]`}>
        <SceneAtmosphere scene={activeScene} />
        {!preloading && <SceneCutFlash cutToken={cutToken} />}
        <StoryHud activeScene={activeScene} scrollYProgress={scrollYProgress} />
        {!preloading && <ScrollReactiveLayer scrollYProgress={scrollYProgress} quality={quality} />}

        <motion.div
          className="fixed left-0 right-0 top-0 z-[122] h-[3px] origin-left bg-[linear-gradient(90deg,#f59e0b,#fb7185,#38bdf8)]"
          style={{ scaleX }}
        />

        <header className="fixed left-0 right-0 top-0 z-[112] px-6 pt-5 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-black/35 px-5 py-3">
            <p className="font-cinema-display text-sm tracking-[0.28em] text-[#facc15]">RAP</p>
            <nav className="hidden items-center gap-6 text-[0.8rem] uppercase tracking-[0.18em] text-[#f8ede0]/80 sm:flex">
              <a href="#journey" className="transition hover:text-white">Journey</a>
              <a href="#skills" className="transition hover:text-white">Skills</a>
              <a href="#projects" className="transition hover:text-white">Projects</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
              <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[0.6rem] tracking-[0.14em] text-[#f8eddc]/70">
                HIGH-END MODE
              </span>
            </nav>
          </div>
        </header>

        <section id="intro" data-scene-id="intro" className="relative isolate min-h-[100svh] px-6 pb-16 pt-28 md:px-10 md:pt-36 lg:px-16">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto max-w-6xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-300/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              Cinematic Portfolio Experience
            </p>
            <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h1 className="font-cinema-display text-5xl leading-[0.94] text-[#fff6e8] md:text-7xl lg:text-8xl">
                  <WordReveal text="Building stories" />
                  <span className="block text-[#fbbf24]"><WordReveal text="through code," initialDelay={0.1} /></span>
                  <WordReveal text="data, and motion." initialDelay={0.2} />
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#f8ede0]/82 md:text-lg">
                  <WordReveal
                    text="I am Raja Adi Pranata, a CS & Statistics student crafting immersive portfolio experiences."
                    delayStep={0.022}
                    initialDelay={0.25}
                  />
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-[#fbbf24] px-6 py-3 text-sm font-semibold text-[#1a1207] transition hover:scale-[1.03]">
                    Explore Projects <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="/cv" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-[#fff5e7] transition hover:bg-white/10">
                    Open CV
                  </a>
                </div>
              </div>
              <motion.div
                className="cinema-panel relative overflow-hidden rounded-3xl border border-white/15 p-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image src="/avatar.jpg" alt="Raja Adi Pranata portrait" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,.78)_100%)]" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/15 bg-black/25 px-2 py-3">
                      <p className="font-cinema-display text-xl text-[#ffe7b0]">{item.value}</p>
                      <p className="text-[0.66rem] uppercase tracking-[0.14em] text-[#f9e9d3]/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            className="cinema-subtitle absolute inset-x-0 bottom-9 z-20 text-center text-[0.62rem] uppercase tracking-[0.25em] text-[#f8eddc]/60"
            animate={reducedMotion ? undefined : { opacity: [0.35, 0.9, 0.35], y: [0, 2, 0] }}
            transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
          >
            Scroll to advance through each scene
          </motion.p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(8,10,16,.92))]" />
        </section>

        <SceneDivider tone="amber" />

        <section id="journey" data-scene-id="journey" className="relative z-10 px-6 py-24 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#fbbf24]">Story Arc</p>
                <h2 className="font-cinema-display mt-2 text-4xl text-[#fff4df] md:text-6xl"><WordReveal text="From Curiosity To Craft" /></h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm leading-relaxed text-[#f8eddc]/72 md:block">
                A timeline of how I evolved from exploration to building complete products.
              </p>
            </div>
            <div className="relative space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-[linear-gradient(180deg,rgba(251,191,36,.75),rgba(56,189,248,.2),transparent)] md:before:left-1/2">
              {chapters.map((chapter, idx) => (
                <motion.article
                  key={chapter.year + chapter.title}
                  className={["relative md:w-[48%]", idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"].join(" ")}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                >
                  <div className="absolute left-0 top-7 h-3 w-3 -translate-x-[1px] rounded-full bg-[#fbbf24] shadow-[0_0_18px_rgba(251,191,36,.85)] md:right-[-4.6%] md:left-auto" />
                  <div className="ml-7 rounded-2xl border border-white/15 bg-black/28 p-5 md:ml-0">
                    <p className="font-cinema-display text-lg text-[#fbbf24]">{chapter.year}</p>
                    <h3 className="mt-1 text-xl font-semibold text-[#fff8ee]">{chapter.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#f8eddc]/76">{chapter.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SceneDivider tone="rose" />
        <section id="skills" data-scene-id="skills" className="relative z-10 overflow-hidden py-10">
          <div className="cinema-marquee">
            <div className="cinema-marquee-track">
              {[...reelSkills, ...reelSkills].map((skill, idx) => <span key={`${skill}-${idx}`} className="cinema-chip">{skill}</span>)}
            </div>
          </div>
        </section>

        <section id="projects" data-scene-id="projects" className="relative z-10 px-6 pb-24 pt-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#fb7185]">Project Reels</p>
                <h2 className="font-cinema-display mt-2 text-4xl text-[#fff4df] md:text-6xl"><WordReveal text="Scenes Worth Watching" /></h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm leading-relaxed text-[#f8eddc]/72 md:block">
                Projects blending engineering depth with visual and narrative quality.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {projects.map((project, idx) => {
                const Icon = project.icon;
                const cardStyle = {
                  "--project-aura-1": project.mood.aura[0],
                  "--project-aura-2": project.mood.aura[1],
                  "--project-sheen": project.mood.sheen,
                  "--project-overlay-top": project.mood.overlay[0],
                  "--project-overlay-bottom": project.mood.overlay[1],
                  "--project-accent": project.mood.accent,
                  "--project-icon": project.mood.icon,
                  "--project-chip-bg": project.mood.chipBg,
                  "--project-chip-border": project.mood.chipBorder,
                  "--project-aura-speed": `${project.mood.auraSpeed}s`,
                } as CSSProperties;
                return (
                  <motion.article
                    key={project.title}
                    className={`project-card project-tone-${project.mood.tone} group cinema-panel relative overflow-hidden rounded-3xl border border-white/15`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: idx * 0.06 }}
                    whileHover={reducedMotion ? undefined : project.mood.hover}
                    style={{ ...cardStyle, transformPerspective: 1100, transformStyle: "preserve-3d" }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover transition duration-700 group-hover:scale-110" />
                      <div className="project-card-overlay absolute inset-0" />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35">
                        <Icon className="h-5 w-5" style={{ color: "var(--project-icon)" }} />
                      </div>
                    </div>
                    <div className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-cinema-display text-2xl text-[#fff5e6]">{project.title}</h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="project-card-visit inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-[#f8ead4] transition"
                          aria-label={`Visit ${project.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-sm leading-relaxed text-[#f8eddc]/80">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-chip rounded-full px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-[#f8eddc]/78">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <SceneDivider tone="cyan" />
        <section id="contact" data-scene-id="contact" className="relative z-10 px-6 pb-24 md:px-10 lg:px-16">
          <motion.div
            className="mx-auto max-w-6xl rounded-[2rem] border border-white/15 bg-black/35 px-6 py-10 md:px-10 md:py-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[#38bdf8]">Final Scene</p>
            <h2 className="font-cinema-display mt-3 text-4xl leading-tight text-[#fff4df] md:text-6xl">
              <WordReveal text="Let us craft a portfolio experience people remember." />
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#f8eddc]/78 md:text-base">
              Open for internship and collaboration in analytics, product engineering, and creative web development.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:raja.pranata@binus.ac.id"
                className="inline-flex items-center gap-2 rounded-full bg-[#38bdf8] px-6 py-3 text-sm font-semibold text-[#091520] transition hover:scale-[1.03]"
              >
                <Mail className="h-4 w-4" />
                raja.pranata@binus.ac.id
              </a>
              <a
                href="https://wa.me/6285694890848"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-[#fff4df] transition hover:bg-white/10"
              >
                WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

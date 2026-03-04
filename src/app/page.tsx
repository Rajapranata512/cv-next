"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent as ReactFocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
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
  Volume2,
  VolumeX,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAdaptiveQuality, type QualityLevel } from "@/components/ui/AdaptiveQualityProvider";

const Scene3D = dynamic(() => import("@/components/ui/Scene3D").then((m) => m.Scene3D), { ssr: false });

type Chapter = { year: string; title: string; text: string };
type AudioPreset = "soft" | "epic";
type LiveIntensityMode = "calm" | "drive" | "peak";
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
type ProjectCueTheme = {
  name: string;
  motif: number[];
  waveform: OscillatorType;
  pan: [number, number];
  glide: number;
  q: number;
};
type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  icon: LucideIcon;
  mood: ProjectMood;
  cue: ProjectCueTheme;
};
type SceneTone = "amber" | "rose" | "cyan";
type SceneId = "intro" | "journey" | "skills" | "projects" | "contact";
type StorySection = { id: SceneId; label: string; cue: string; code: string };
type ScenePalette = {
  primary: string;
  secondary: string;
  accent: string;
  cue: string;
};
type AudioEngine = {
  context: AudioContext;
  analyser: AnalyserNode;
  gain: GainNode;
  filter: BiquadFilterNode;
  oscA: OscillatorNode;
  oscB: OscillatorNode;
  data: Uint8Array;
};

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
    cue: {
      name: "Savor Rise",
      motif: [196, 247, 294, 370],
      waveform: "triangle",
      pan: [-0.28, 0.06],
      glide: 1.07,
      q: 1.1,
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
    cue: {
      name: "Therapy Bloom",
      motif: [220, 277, 330, 415],
      waveform: "sine",
      pan: [0.08, 0.34],
      glide: 1.04,
      q: 0.94,
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
    cue: {
      name: "Boardroom Pulse",
      motif: [174, 220, 293, 349],
      waveform: "square",
      pan: [-0.06, 0.18],
      glide: 1.06,
      q: 1.24,
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
    cue: {
      name: "Arcade Surge",
      motif: [311, 392, 466, 587],
      waveform: "sawtooth",
      pan: [-0.22, 0.26],
      glide: 1.09,
      q: 1.34,
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
const scenePalettes: Record<SceneId, ScenePalette> = {
  intro: { primary: "#f59e0b", secondary: "#38bdf8", accent: "#fbbf24", cue: "Opening Frame" },
  journey: { primary: "#fb923c", secondary: "#f97316", accent: "#f59e0b", cue: "Character Arc" },
  skills: { primary: "#38bdf8", secondary: "#22d3ee", accent: "#7dd3fc", cue: "Technique Reel" },
  projects: { primary: "#fb7185", secondary: "#38bdf8", accent: "#f472b6", cue: "Showcase Sequence" },
  contact: { primary: "#22d3ee", secondary: "#fbbf24", accent: "#38bdf8", cue: "Closing Credits" },
};
const sceneCueMap: Record<SceneId, { frequency: number; pan: number }> = {
  intro: { frequency: 196, pan: -0.38 },
  journey: { frequency: 233, pan: -0.18 },
  skills: { frequency: 277, pan: 0.08 },
  projects: { frequency: 329, pan: 0.24 },
  contact: { frequency: 392, pan: 0.36 },
};

function colorWithAlpha(color: string, alpha: number): string {
  const safeAlpha = Math.min(1, Math.max(0, alpha));
  const value = color.trim();

  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    if (hex.length === 6) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
    }
  }

  const rgb = value.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const [r = "255", g = "255", b = "255"] = rgb[1].split(",").map((item) => item.trim());
    return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
  }

  return color;
}

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

function SceneAtmosphere({ scene, enabled = true }: { scene: SceneId; enabled?: boolean }) {
  if (!enabled) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        className={`scene-atmosphere scene-atmosphere-${scene} pointer-events-none fixed inset-0 z-[0]`}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </AnimatePresence>
  );
}

function SceneFusionLayer({
  scene,
  projectMood,
  enabled = true,
}: {
  scene: SceneId;
  projectMood: ProjectMood | null;
  enabled?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  if (!enabled) return null;

  const palette = scenePalettes[scene];
  const fusionPrimary = projectMood?.aura[0] ?? colorWithAlpha(palette.primary, 0.32);
  const fusionSecondary = projectMood?.aura[1] ?? colorWithAlpha(palette.secondary, 0.28);
  const fusionAccent = colorWithAlpha(projectMood?.accent ?? palette.accent, 0.27);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${scene}-${projectMood?.tone ?? "scene"}`}
        className="scene-fusion pointer-events-none fixed inset-0 z-[4]"
        style={
          {
            "--fusion-primary": fusionPrimary,
            "--fusion-secondary": fusionSecondary,
            "--fusion-accent": fusionAccent,
          } as CSSProperties
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <motion.div
          className="scene-fusion-core absolute inset-0"
          animate={reducedMotion ? undefined : { scale: [1, 1.04, 1], rotate: [0, 1.2, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="scene-fusion-sweep absolute inset-0"
          animate={reducedMotion ? undefined : { x: ["-8%", "8%", "-8%"], opacity: [0.44, 0.62, 0.44] }}
          transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function SceneCutFlash({ cutToken, enabled = true }: { cutToken: number; enabled?: boolean }) {
  const reducedMotion = useReducedMotion();
  if (!enabled || reducedMotion) return null;
  return (
    <AnimatePresence>
      {cutToken > 0 && (
        <motion.div
          key={cutToken}
          className="scene-cut-flash pointer-events-none fixed inset-0 z-[170]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.52, ease: "easeOut" }}
          aria-hidden
        >
          <motion.div
            className="scene-cut-flash-streak"
            initial={{ x: "-55%", opacity: 0 }}
            animate={{ x: "55%", opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StoryHud({
  activeScene,
  scrollYProgress,
  enabled = true,
}: {
  activeScene: SceneId;
  scrollYProgress: MotionValue<number>;
  enabled?: boolean;
}) {
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  if (!enabled) return null;

  return (
    <aside className="cinema-hud pointer-events-none fixed right-8 top-1/2 z-[136] hidden -translate-y-1/2 xl:block">
      <motion.div style={{ y: driftY }} className="cinema-hud-shell">
        <p className="cinema-hud-kicker">Story Chapters</p>
        <div className="cinema-hud-track-wrap">
          <div className="cinema-hud-track">
            <motion.span className="cinema-hud-track-fill" style={{ scaleY: progress }} />
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {storySections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`cinema-hud-link pointer-events-auto ${section.id === activeScene ? "is-active" : ""}`}
              >
                <span className="cinema-hud-code">{section.code}</span>
                <span className="cinema-hud-label">{section.label}</span>
                <span className="cinema-hud-cue">{section.cue}</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </aside>
  );
}

function ProjectDirectorCue({
  scene,
  project,
  enabled = true,
}: {
  scene: SceneId;
  project: Project | null;
  enabled?: boolean;
}) {
  if (!enabled) return null;

  const sceneMeta = storySections.find((section) => section.id === scene);
  const cueAccent = project?.mood.accent ?? scenePalettes[scene].accent;
  const CueIcon = project?.icon ?? Film;

  return (
    <aside className="pointer-events-none fixed bottom-4 right-4 z-[205] hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={project ? `project-${project.title}` : `scene-${scene}`}
          className="project-director-cue"
          style={
            {
              "--cue-accent": cueAccent,
              "--cue-accent-soft": colorWithAlpha(cueAccent, 0.23),
            } as CSSProperties
          }
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.985 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-director-icon">
            <CueIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="project-director-code">{project ? "PROJECT MOOD LIVE" : (sceneMeta?.code ?? "SCN-00")}</p>
            <p className="project-director-title">{project ? project.title : scenePalettes[scene].cue}</p>
            <p className="project-director-text">
              {project ? `Motif cue: ${project.cue.name}. Tone sinkron ke atmosfer global.` : (sceneMeta?.cue ?? "Story transition active.")}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

function SceneCaption({
  scene,
  project,
  enabled = true,
}: {
  scene: SceneId;
  project: Project | null;
  enabled?: boolean;
}) {
  if (!enabled) return null;

  const sceneMeta = storySections.find((section) => section.id === scene);
  const palette = scenePalettes[scene];
  const accent = project?.mood.accent ?? palette.accent;
  const subtitle = project ? `Highlighting ${project.title}` : (sceneMeta?.cue ?? "Story cue");

  return (
    <aside className="pointer-events-none fixed left-4 top-24 z-[134] hidden lg:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={project ? `caption-${scene}-${project.title}` : `caption-${scene}`}
          className="scene-caption-shell"
          style={
            {
              "--caption-accent": accent,
              "--caption-accent-soft": colorWithAlpha(accent, 0.22),
            } as CSSProperties
          }
          initial={{ opacity: 0, x: -18, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -12, y: -6 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="scene-caption-line" aria-hidden />
          <p className="scene-caption-code">{sceneMeta?.code ?? "SCN-00"}</p>
          <p className="scene-caption-title">{sceneMeta?.label ?? "Scene"}</p>
          <p className="scene-caption-cue">{subtitle}</p>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

function ProjectReelCard({
  project,
  idx,
  immersiveMode,
  reducedMotion,
  isActive,
  onActivate,
  onDeactivate,
}: {
  project: Project;
  idx: number;
  immersiveMode: boolean;
  reducedMotion: boolean;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const Icon = project.icon;
  const tiltX = useSpring(0, { stiffness: 180, damping: 22, mass: 0.34 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 22, mass: 0.34 });
  const spotlightX = useSpring(50, { stiffness: 210, damping: 24, mass: 0.28 });
  const spotlightY = useSpring(40, { stiffness: 210, damping: 24, mass: 0.28 });
  const hoverLift = useSpring(0, { stiffness: 200, damping: 24, mass: 0.32 });
  const spotlightOpacity = useTransform(hoverLift, [0, 1], [0.04, 0.95]);
  const spotlightGradient = useMotionTemplate`radial-gradient(260px circle at ${spotlightX}% ${spotlightY}%, ${colorWithAlpha(project.mood.accent, 0.42)} 0%, transparent 74%)`;

  const resetKinetics = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    hoverLift.set(0);
    spotlightX.set(50);
    spotlightY.set(40);
  }, [hoverLift, spotlightX, spotlightY, tiltX, tiltY]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reducedMotion || !immersiveMode) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const ratioX = (event.clientX - rect.left) / rect.width;
      const ratioY = (event.clientY - rect.top) / rect.height;
      const maxX = project.mood.hover.rotateX + 2.1;
      const maxY = Math.abs(project.mood.hover.rotateY) + 2.8;

      spotlightX.set(ratioX * 100);
      spotlightY.set(ratioY * 100);
      tiltX.set((0.5 - ratioY) * maxX * 2);
      tiltY.set((ratioX - 0.5) * maxY * 2);
    },
    [immersiveMode, project.mood.hover.rotateX, project.mood.hover.rotateY, reducedMotion, spotlightX, spotlightY, tiltX, tiltY],
  );

  const handleActivate = useCallback(() => {
    onActivate();
    if (reducedMotion || !immersiveMode) return;
    hoverLift.set(1);
  }, [hoverLift, immersiveMode, onActivate, reducedMotion]);

  const handleDeactivate = useCallback(() => {
    onDeactivate();
    resetKinetics();
  }, [onDeactivate, resetKinetics]);

  const handleBlurCapture = useCallback(
    (event: ReactFocusEvent<HTMLElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node && event.currentTarget.contains(next)) return;
      handleDeactivate();
    },
    [handleDeactivate],
  );

  const cardStyle = {
    "--project-aura-1": project.mood.aura[0],
    "--project-aura-2": project.mood.aura[1],
    "--project-sheen": project.mood.sheen,
    "--project-overlay-top": project.mood.overlay[0],
    "--project-overlay-bottom": project.mood.overlay[1],
    "--project-accent": project.mood.accent,
    "--project-accent-soft": colorWithAlpha(project.mood.accent, 0.38),
    "--project-icon": project.mood.icon,
    "--project-chip-bg": project.mood.chipBg,
    "--project-chip-border": project.mood.chipBorder,
    "--project-aura-speed": `${project.mood.auraSpeed}s`,
  } as CSSProperties;

  return (
    <motion.article
      className={[
        `project-card project-tone-${project.mood.tone} project-card-kinetic group cinema-panel relative overflow-hidden rounded-3xl border border-white/15`,
        isActive ? "is-active-project" : "",
      ].join(" ")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: idx * 0.06 }}
      onPointerEnter={handleActivate}
      onPointerLeave={handleDeactivate}
      onPointerMove={handlePointerMove}
      onFocusCapture={handleActivate}
      onBlurCapture={handleBlurCapture}
      onPointerDown={handleActivate}
      whileHover={
        reducedMotion
          ? undefined
          : immersiveMode
            ? { y: project.mood.hover.y, scale: project.mood.hover.scale }
            : { y: -4, scale: 1.008 }
      }
      style={{
        ...cardStyle,
        transformPerspective: immersiveMode ? 1200 : 900,
        transformStyle: "preserve-3d",
        rotateX: immersiveMode ? tiltX : 0,
        rotateY: immersiveMode ? tiltY : 0,
      }}
    >
      {immersiveMode && <div className="project-card-aura" aria-hidden />}
      {immersiveMode && <div className="project-card-sheen" aria-hidden />}
      {immersiveMode && <motion.div className="project-card-spotlight" style={{ opacity: spotlightOpacity, backgroundImage: spotlightGradient }} aria-hidden />}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover transition duration-700 group-hover:scale-110" />
        <div className="project-card-overlay absolute inset-0" />
        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35">
          <Icon className="h-5 w-5" style={{ color: "var(--project-icon)" }} />
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-cinema-display text-2xl text-[#fff5e6]">{project.title}</h3>
            <p className="project-tone-label mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-[#f8eddc]/62">
              Mood: {project.mood.tone}
            </p>
          </div>
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
}

function InteractiveHalo({ enabled = true }: { enabled?: boolean }) {
  const reducedMotion = useReducedMotion();
  const haloX = useSpring(0, { stiffness: 120, damping: 24, mass: 0.3 });
  const haloY = useSpring(0, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    if (!enabled || reducedMotion) return undefined;

    const setCenter = () => {
      haloX.set(window.innerWidth * 0.5);
      haloY.set(window.innerHeight * 0.36);
    };

    let raf = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        haloX.set(event.clientX);
        haloY.set(event.clientY);
      });
    };

    const handleLeave = () => setCenter();
    setCenter();

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [enabled, reducedMotion, haloX, haloY]);

  if (!enabled || reducedMotion) return null;

  return (
    <motion.div
      className="cinema-interactive-halo pointer-events-none fixed left-[-16rem] top-[-16rem] z-[3] h-[32rem] w-[32rem] rounded-full"
      style={{ x: haloX, y: haloY }}
      aria-hidden
    />
  );
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
function ScrollReactiveLayer({
  scrollYProgress,
  quality,
  scene,
  projectMood,
  projectCue,
  projectCueKey,
  projectTitle,
}: {
  scrollYProgress: MotionValue<number>;
  quality: QualityLevel;
  scene: SceneId;
  projectMood: ProjectMood | null;
  projectCue: ProjectCueTheme | null;
  projectCueKey: string | null;
  projectTitle: string | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollLevelRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const intensityRef = useRef(0);
  const lastSampleRef = useRef<{ t: number; y: number }>({ t: 0, y: 0 });
  const modeGateRef = useRef(0);
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const lastSceneCueRef = useRef<SceneId>(scene);
  const lastProjectCueRef = useRef<string | null>(projectCueKey);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPreset, setAudioPreset] = useState<AudioPreset>("epic");
  const [sectionCuesEnabled, setSectionCuesEnabled] = useState(true);
  const [liveMode, setLiveMode] = useState<LiveIntensityMode>("calm");
  const [liveVelocity, setLiveVelocity] = useState(0);
  const reducedMotion = useReducedMotion();
  const scenePalette = scenePalettes[scene];
  const moodPrimary = projectMood?.icon ?? scenePalette.primary;
  const moodSecondary = projectMood?.accent ?? scenePalette.accent;
  const moodTertiary = projectMood?.tone === "arcade" ? "#fda4af" : (projectMood?.icon ?? scenePalette.secondary);
  const activeMotifLabel = projectCue && projectTitle ? `${projectTitle} - ${projectCue.name}` : "Scene cue only";
  const visibleLiveMode: LiveIntensityMode = reducedMotion ? "calm" : liveMode;
  const visibleLiveVelocity = reducedMotion ? 0 : liveVelocity;

  const getPresetConfig = useCallback((preset: AudioPreset) => {
    if (preset === "epic") {
      return {
        oscAType: "sawtooth" as OscillatorType,
        oscBType: "triangle" as OscillatorType,
        oscABase: 86,
        oscARange: 248,
        harmonic: 1.66,
        filterBase: 420,
        filterRange: 1980,
        gainOn: 0.021,
        gainBase: 0.0115,
        gainRange: 0.012,
        smooth: 0.9,
        q: 1.05,
        synthBlend: 0.88,
        barBoost: 1.22,
        waveBoost: 1.25,
        palette: ["rgba(56, 189, 248, 0.98)", "rgba(251, 191, 36, 0.84)", "rgba(251, 113, 133, 0.9)"] as const,
      };
    }

    return {
      oscAType: "triangle" as OscillatorType,
      oscBType: "sine" as OscillatorType,
      oscABase: 74,
      oscARange: 176,
      harmonic: 1.46,
      filterBase: 320,
      filterRange: 1180,
      gainOn: 0.013,
      gainBase: 0.0076,
      gainRange: 0.0078,
      smooth: 0.82,
      q: 0.78,
      synthBlend: 0.62,
      barBoost: 0.82,
      waveBoost: 0.86,
      palette: ["rgba(125, 211, 252, 0.92)", "rgba(186, 230, 253, 0.75)", "rgba(244, 244, 245, 0.68)"] as const,
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollLevelRef.current = latest;
    const now = performance.now();
    const previous = lastSampleRef.current;
    if (previous.t === 0) {
      lastSampleRef.current = { t: now, y: latest };
      return;
    }

    const deltaTime = Math.max(16, now - previous.t);
    const progressPerSecond = Math.abs(latest - previous.y) / (deltaTime / 1000);
    const smoothedVelocity = scrollVelocityRef.current * 0.72 + progressPerSecond * 0.28;
    const intensity = reducedMotion ? 0 : Math.min(1, smoothedVelocity / 1.85);

    scrollVelocityRef.current = smoothedVelocity;
    intensityRef.current = intensity;

    if (now - modeGateRef.current > 120) {
      const nextMode: LiveIntensityMode = intensity > 0.67 ? "peak" : intensity > 0.3 ? "drive" : "calm";
      const visibleVelocity = Math.min(3.99, smoothedVelocity);
      setLiveMode((current) => (current === nextMode ? current : nextMode));
      setLiveVelocity((current) => (Math.abs(current - visibleVelocity) < 0.03 ? current : visibleVelocity));
      modeGateRef.current = now;
    }

    lastSampleRef.current = { t: now, y: latest };
  });

  const createAudioEngine = useCallback((): AudioEngine | null => {
    if (typeof window === "undefined") return null;

    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    const cfg = getPresetConfig(audioPreset);

    const context = new AudioContextClass();
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = cfg.smooth;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = cfg.filterBase;
    filter.Q.value = cfg.q;

    const gain = context.createGain();
    gain.gain.value = 0.00001;

    const oscA = context.createOscillator();
    oscA.type = cfg.oscAType;
    oscA.frequency.value = cfg.oscABase;

    const oscB = context.createOscillator();
    oscB.type = cfg.oscBType;
    oscB.frequency.value = cfg.oscABase * cfg.harmonic;

    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(gain);
    gain.connect(analyser);
    analyser.connect(context.destination);

    oscA.start();
    oscB.start();

    const data = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;
    return { context, analyser, gain, filter, oscA, oscB, data };
  }, [audioPreset, getPresetConfig]);

  const disposeAudio = useCallback(async () => {
    const engine = audioEngineRef.current;
    if (!engine) return;

    const { context, gain, oscA, oscB } = engine;
    const now = context.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(0.00001, now, 0.12);

    try {
      oscA.stop(now + 0.2);
      oscB.stop(now + 0.2);
    } catch {
      // no-op
    }

    setTimeout(() => {
      void context.close();
    }, 260);

    audioEngineRef.current = null;
  }, []);

  const playInteractionCue = useCallback(
    (frequency: number, pan: number, cueType: "scene" | "project") => {
      const engine = audioEngineRef.current;
      if (!engine) return;

      const context = engine.context;
      const now = context.currentTime + 0.01;
      const isEpic = audioPreset === "epic";
      const intensity = intensityRef.current;
      const durationBase = cueType === "scene" ? (isEpic ? 0.52 : 0.38) : (isEpic ? 0.34 : 0.24);
      const duration = Math.max(0.12, durationBase * (1 - intensity * 0.24));
      const peakBase = cueType === "scene" ? (isEpic ? 0.05 : 0.03) : (isEpic ? 0.034 : 0.02);
      const peakGain = Math.min(0.09, peakBase * (1 + intensity * 0.68));
      const pitchLift = 1 + intensity * (cueType === "scene" ? 0.08 : 0.11);

      const oscA = context.createOscillator();
      const oscB = context.createOscillator();
      const filter = context.createBiquadFilter();
      const cueGain = context.createGain();
      let panner: StereoPannerNode | null = null;

      oscA.type = isEpic ? "triangle" : "sine";
      oscB.type = isEpic ? "sawtooth" : "triangle";
      oscA.frequency.setValueAtTime(frequency * pitchLift, now);
      oscB.frequency.setValueAtTime(frequency * (cueType === "scene" ? 1.5 : 1.35) * pitchLift, now);
      oscA.frequency.exponentialRampToValueAtTime(frequency * (cueType === "scene" ? 1.22 : 1.12) * pitchLift, now + duration * 0.76);
      oscB.frequency.exponentialRampToValueAtTime(frequency * (cueType === "scene" ? 2.02 : 1.82) * pitchLift, now + duration * 0.72);

      filter.type = isEpic ? "bandpass" : "lowpass";
      filter.frequency.setValueAtTime((isEpic ? 1380 : 940) + intensity * 280, now);
      filter.Q.value = (isEpic ? 1.35 : 0.82) + intensity * 0.35;

      cueGain.gain.setValueAtTime(0.0001, now);
      cueGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.018);
      cueGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      try {
        panner = context.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-0.85, Math.min(0.85, pan)), now);
      } catch {
        panner = null;
      }

      oscA.connect(filter);
      oscB.connect(filter);
      filter.connect(cueGain);
      if (panner) {
        cueGain.connect(panner);
        panner.connect(context.destination);
      } else {
        cueGain.connect(context.destination);
      }

      oscA.start(now);
      oscB.start(now + (cueType === "scene" ? 0.014 : 0));

      const stopAt = now + duration + 0.06;
      oscA.stop(stopAt);
      oscB.stop(stopAt);

      const cleanup = () => {
        oscA.disconnect();
        oscB.disconnect();
        filter.disconnect();
        cueGain.disconnect();
        if (panner) panner.disconnect();
      };
      oscB.onended = cleanup;
    },
    [audioPreset],
  );

  const playProjectMotif = useCallback(
    (cue: ProjectCueTheme) => {
      const engine = audioEngineRef.current;
      if (!engine || !cue.motif.length) return;

      const context = engine.context;
      const now = context.currentTime + 0.015;
      const isEpic = audioPreset === "epic";
      const intensity = intensityRef.current;
      const stepGap = Math.max(0.035, (isEpic ? 0.084 : 0.064) * (1 - intensity * 0.26));
      const noteDuration = Math.max(0.08, (isEpic ? 0.22 : 0.17) * (1 - intensity * 0.22));
      const peakGain = Math.min(0.08, (isEpic ? 0.037 : 0.024) * (1 + intensity * 0.75));
      const [startPan, endPan] = cue.pan;
      const motifLift = 1 + intensity * 0.12;

      cue.motif.forEach((baseFrequency, index) => {
        const noteTime = now + index * stepGap;
        const progress = cue.motif.length <= 1 ? 0.5 : index / (cue.motif.length - 1);
        const notePan = startPan + (endPan - startPan) * progress;

        const osc = context.createOscillator();
        const filter = context.createBiquadFilter();
        const gain = context.createGain();
        const shimmerOsc = intensity > 0.62 && index % 2 === 1 ? context.createOscillator() : null;
        const shimmerGain = shimmerOsc ? context.createGain() : null;
        let panner: StereoPannerNode | null = null;

        osc.type = cue.waveform;
        const safeFrequency = Math.max(80, Math.min(1200, baseFrequency));
        const shapedFrequency = safeFrequency * motifLift * (1 + progress * intensity * 0.05);
        osc.frequency.setValueAtTime(shapedFrequency, noteTime);
        osc.frequency.exponentialRampToValueAtTime(
          shapedFrequency * cue.glide * (1 + intensity * 0.05),
          noteTime + noteDuration * 0.8,
        );

        filter.type = "bandpass";
        filter.frequency.setValueAtTime((isEpic ? 1240 : 920) + intensity * 300 + progress * 120, noteTime);
        filter.Q.value = cue.q + intensity * 0.32;

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.exponentialRampToValueAtTime(peakGain, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + noteDuration);

        try {
          panner = context.createStereoPanner();
          panner.pan.setValueAtTime(Math.max(-0.85, Math.min(0.85, notePan)), noteTime);
        } catch {
          panner = null;
        }

        osc.connect(filter);
        if (shimmerOsc && shimmerGain) {
          shimmerOsc.type = "sine";
          shimmerOsc.frequency.setValueAtTime(Math.min(1500, shapedFrequency * 2), noteTime);
          shimmerOsc.frequency.exponentialRampToValueAtTime(Math.min(1800, shapedFrequency * 2.12), noteTime + noteDuration * 0.8);
          shimmerGain.gain.setValueAtTime(0.09 + intensity * 0.07, noteTime);
          shimmerGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + noteDuration);
          shimmerOsc.connect(shimmerGain);
          shimmerGain.connect(filter);
        }
        filter.connect(gain);
        if (panner) {
          gain.connect(panner);
          panner.connect(context.destination);
        } else {
          gain.connect(context.destination);
        }

        osc.start(noteTime);
        if (shimmerOsc) shimmerOsc.start(noteTime + 0.01);
        osc.stop(noteTime + noteDuration + 0.04);
        if (shimmerOsc) shimmerOsc.stop(noteTime + noteDuration + 0.045);
        osc.onended = () => {
          osc.disconnect();
          if (shimmerOsc) shimmerOsc.disconnect();
          if (shimmerGain) shimmerGain.disconnect();
          filter.disconnect();
          gain.disconnect();
          if (panner) panner.disconnect();
        };
      });
    },
    [audioPreset],
  );

  const handleToggleAudio = useCallback(async () => {
    if (audioEnabled) {
      setAudioEnabled(false);
      lastSceneCueRef.current = scene;
      lastProjectCueRef.current = projectCueKey;
      await disposeAudio();
      return;
    }

    let engine = audioEngineRef.current;
    if (!engine) {
      engine = createAudioEngine();
      if (!engine) return;
      audioEngineRef.current = engine;
    }

    await engine.context.resume();
    const now = engine.context.currentTime;
    const cfg = getPresetConfig(audioPreset);
    engine.gain.gain.cancelScheduledValues(now);
    engine.gain.gain.linearRampToValueAtTime(cfg.gainOn, now + 0.38);
    if (sectionCuesEnabled) {
      const cue = sceneCueMap[scene];
      playInteractionCue(cue.frequency, cue.pan, "scene");
      lastSceneCueRef.current = scene;
      if (projectCue && projectCueKey) {
        playProjectMotif(projectCue);
      }
      lastProjectCueRef.current = projectCueKey;
    }
    setAudioEnabled(true);
  }, [
    audioEnabled,
    audioPreset,
    createAudioEngine,
    disposeAudio,
    getPresetConfig,
    playInteractionCue,
    playProjectMotif,
    projectCue,
    projectCueKey,
    scene,
    sectionCuesEnabled,
  ]);

  useEffect(() => {
    const engine = audioEngineRef.current;
    if (!engine) return;
    const cfg = getPresetConfig(audioPreset);
    const now = engine.context.currentTime;

    engine.oscA.type = cfg.oscAType;
    engine.oscB.type = cfg.oscBType;
    engine.filter.Q.value = cfg.q;
    engine.analyser.smoothingTimeConstant = cfg.smooth;
    const kinetic = intensityRef.current;
    const filterTarget = cfg.filterBase + scrollLevelRef.current * cfg.filterRange + kinetic * (audioPreset === "epic" ? 860 : 540);
    const gainTarget = cfg.gainBase + scrollLevelRef.current * cfg.gainRange + kinetic * (audioPreset === "epic" ? 0.0044 : 0.0032);
    engine.filter.frequency.setTargetAtTime(filterTarget, now, 0.16);
    engine.gain.gain.setTargetAtTime(audioEnabled ? gainTarget : 0.00001, now, 0.2);
  }, [audioEnabled, audioPreset, getPresetConfig]);

  useEffect(() => {
    if (!audioEnabled) return undefined;

    const cfg = getPresetConfig(audioPreset);
    let raf = 0;
    const modulate = () => {
      const engine = audioEngineRef.current;
      if (engine) {
        const level = scrollLevelRef.current;
        const kinetic = intensityRef.current;
        const now = engine.context.currentTime;
        const base = (cfg.oscABase + level * cfg.oscARange) * (1 + kinetic * 0.12);
        const filterTarget = cfg.filterBase + level * cfg.filterRange + kinetic * (audioPreset === "epic" ? 860 : 540);
        const gainTarget = cfg.gainBase + level * cfg.gainRange + kinetic * (audioPreset === "epic" ? 0.0044 : 0.0032);

        engine.oscA.frequency.setTargetAtTime(base, now, 0.12);
        engine.oscB.frequency.setTargetAtTime(base * cfg.harmonic * (1 + kinetic * 0.05), now, 0.12);
        engine.filter.frequency.setTargetAtTime(filterTarget, now, 0.18);
        engine.gain.gain.setTargetAtTime(gainTarget, now, 0.2);
      }

      raf = requestAnimationFrame(modulate);
    };

    raf = requestAnimationFrame(modulate);
    return () => cancelAnimationFrame(raf);
  }, [audioEnabled, audioPreset, getPresetConfig]);

  useEffect(() => {
    if (!audioEnabled || !sectionCuesEnabled) {
      lastSceneCueRef.current = scene;
      lastProjectCueRef.current = projectCueKey;
      return;
    }

    if (lastSceneCueRef.current !== scene) {
      const cue = sceneCueMap[scene];
      playInteractionCue(cue.frequency, cue.pan, "scene");
      lastSceneCueRef.current = scene;
    }
  }, [audioEnabled, playInteractionCue, projectCueKey, scene, sectionCuesEnabled]);

  useEffect(() => {
    const activeCueKey = projectCueKey;
    if (!audioEnabled || !sectionCuesEnabled) {
      lastProjectCueRef.current = activeCueKey;
      return;
    }

    if (projectCue && activeCueKey && lastProjectCueRef.current !== activeCueKey) {
      playProjectMotif(projectCue);
    }
    lastProjectCueRef.current = activeCueKey;
  }, [audioEnabled, playProjectMotif, projectCue, projectCueKey, sectionCuesEnabled]);

  useEffect(() => {
    return () => {
      void disposeAudio();
    };
  }, [disposeAudio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const cfg = getPresetConfig(audioPreset);
    let raf = 0;
    const resize = () => {
      const dprCap = quality === "high" ? 2 : 1.5;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      const width = window.innerWidth;
      const height = Math.max(120, Math.round(window.innerHeight * 0.28));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || Math.round(window.innerHeight * 0.28);
      const level = scrollLevelRef.current;
      const kinetic = intensityRef.current;
      const time = performance.now() * 0.0014;
      const horizon = Math.min(220, height * 0.9);
      const midY = horizon * 0.56;

      ctx.clearRect(0, 0, width, height);

      const wash = ctx.createLinearGradient(0, 0, 0, horizon);
      wash.addColorStop(0, colorWithAlpha(moodSecondary, 0.08 + level * (audioPreset === "epic" ? 0.22 : 0.16) + kinetic * 0.11));
      wash.addColorStop(0.56, colorWithAlpha(moodPrimary, 0.06 + level * 0.11 + kinetic * 0.08));
      wash.addColorStop(1, "rgba(12, 18, 28, 0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, horizon);

      const engine = audioEngineRef.current;
      const freqData = engine && audioEnabled ? engine.data : null;
      if (freqData && engine) engine.analyser.getByteFrequencyData(freqData as Uint8Array<ArrayBuffer>);

      const barCount = Math.max(18, Math.floor(width / 32));
      const step = width / barCount;
      const barWidth = Math.max(2.5, step * 0.5);

      for (let index = 0; index < barCount; index += 1) {
        const freqIndex = freqData ? Math.floor((index / barCount) * freqData.length) : 0;
        const freqValue = freqData ? freqData[freqIndex] / 255 : 0;
        const synthetic = (Math.sin(time * (2.8 + kinetic * 0.9) + index * 0.36 + level * 8.5 + kinetic * 11.2) + 1) / 2;
        const blend = reducedMotion ? 0.35 : cfg.synthBlend + kinetic * 0.22;
        const amplitude = Math.max(freqValue, synthetic * blend);
        const barHeight = 7 + amplitude * (24 + level * (reducedMotion ? 42 : 110 * cfg.barBoost) + kinetic * 86);

        const x = index * step + (step - barWidth) * 0.5;
        const y = midY - barHeight * 0.5;

        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, audioEnabled ? cfg.palette[0] : colorWithAlpha(moodPrimary, 0.9));
        gradient.addColorStop(0.5, colorWithAlpha(moodSecondary, 0.85));
        gradient.addColorStop(1, audioEnabled ? cfg.palette[2] : colorWithAlpha(moodTertiary, 0.8));

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const ratio = x / width;
        const freqIndex = freqData ? Math.floor(ratio * (freqData.length - 1)) : 0;
        const freqValue = freqData ? freqData[freqIndex] / 255 : 0;
        const synthetic = (Math.sin(time * (3.1 + kinetic * 0.8) + x * 0.023 + level * 7 + kinetic * 9.4) + 1) / 2;
        const amplitude = Math.max(freqValue, synthetic * (cfg.synthBlend + kinetic * 0.2));
        const waveY = midY + Math.sin(x * 0.02 + time * (4.6 + kinetic * 1.2)) * (4 + amplitude * (15 + level * 32 * cfg.waveBoost + kinetic * 18));

        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.shadowBlur = reducedMotion ? 0 : 14 + level * 20 + kinetic * 22;
      ctx.shadowColor = colorWithAlpha(moodPrimary, 0.62 + kinetic * 0.2);
      ctx.strokeStyle = colorWithAlpha(
        moodSecondary,
        audioPreset === "epic"
          ? 0.24 + level * 0.43 + kinetic * 0.2
          : 0.17 + level * 0.36 + kinetic * 0.16,
      );
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [audioEnabled, audioPreset, getPresetConfig, moodPrimary, moodSecondary, moodTertiary, quality, reducedMotion]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed left-0 right-0 top-0 z-[90] opacity-80" />
      <div className="pointer-events-auto fixed bottom-4 left-4 z-[200] md:bottom-6 md:left-6">
        <button
          type="button"
          onClick={handleToggleAudio}
          className="audio-pulse-toggle inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#f8eddc] backdrop-blur-xl transition hover:bg-white/10"
          style={{
            borderColor: colorWithAlpha(moodSecondary, 0.42),
            boxShadow: `0 8px 26px ${colorWithAlpha(moodSecondary, 0.2)}`,
          }}
        >
          {audioEnabled ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
          {audioEnabled ? "Disable Pulse Audio" : "Enable Pulse Audio"}
        </button>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-xl">
          {(["soft", "epic"] as const).map((preset) => {
            const active = audioPreset === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => setAudioPreset(preset)}
                className={[
                  "rounded-full px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] transition",
                  active ? "bg-white/18 text-[#fff5e5]" : "text-[#f8eddc]/72 hover:bg-white/10 hover:text-[#fff5e5]",
                ].join(" ")}
                aria-pressed={active}
              >
                {preset}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setSectionCuesEnabled((value) => !value)}
          className={[
            "audio-cue-toggle mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.15em] transition",
            sectionCuesEnabled
              ? "border-emerald-200/40 bg-emerald-300/10 text-emerald-100"
              : "border-white/25 bg-white/5 text-[#f8eddc]/65 hover:bg-white/10",
          ].join(" ")}
          aria-pressed={sectionCuesEnabled}
        >
          <Film className="h-3.5 w-3.5" />
          {sectionCuesEnabled ? "Section Cues ON" : "Section Cues OFF"}
        </button>
        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#f8eddc]/60">
          Audio Preset: {audioPreset === "epic" ? "Epic" : "Soft"}
        </p>
        <p className="mt-1 text-[0.55rem] uppercase tracking-[0.14em] text-[#f8eddc]/58">
          Cues react on scene transition + project focus
        </p>
        <p className="mt-1 text-[0.53rem] uppercase tracking-[0.12em] text-[#f8eddc]/52">
          Active Motif: {activeMotifLabel}
        </p>
        <p
          className={[
            "mt-1 text-[0.53rem] uppercase tracking-[0.12em]",
            visibleLiveMode === "peak"
              ? "text-rose-200/86"
              : visibleLiveMode === "drive"
                ? "text-amber-100/82"
                : "text-[#f8eddc]/55",
          ].join(" ")}
        >
          Live Performance: {visibleLiveMode} ({visibleLiveVelocity.toFixed(2)}x speed)
        </p>
        <p className="mt-2 text-[0.6rem] uppercase tracking-[0.14em] text-[#f8eddc]/62">No autoplay. Manual trigger only.</p>
      </div>
    </>
  );
}
export default function Home() {
  const { scrollYProgress } = useScroll();
  const quality = useAdaptiveQuality();
  const reducedMotion = useReducedMotion();
  const activeSceneRef = useRef<SceneId>("intro");

  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.38]);
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.24], [1, 0.966]), { stiffness: 100, damping: 24, mass: 0.48 });
  const heroTilt = useSpring(useTransform(scrollYProgress, [0, 0.22], [0, -2.4]), { stiffness: 98, damping: 22, mass: 0.45 });
  const cameraSpring = { stiffness: 92, damping: 24, mass: 0.54, restDelta: 0.001 };
  const introCamY = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.35], [0, -62, -128]), cameraSpring);
  const introCamScale = useSpring(useTransform(scrollYProgress, [0, 0.34], [1, 0.975]), cameraSpring);
  const introCamTilt = useSpring(useTransform(scrollYProgress, [0, 0.32], [0, -2.6]), cameraSpring);
  const journeyCamY = useSpring(useTransform(scrollYProgress, [0.08, 0.28, 0.46], [116, 0, -82]), cameraSpring);
  const journeyCamScale = useSpring(useTransform(scrollYProgress, [0.08, 0.28, 0.46], [0.955, 1, 0.985]), cameraSpring);
  const journeyCamTilt = useSpring(useTransform(scrollYProgress, [0.08, 0.28, 0.46], [2.8, 0, -2]), cameraSpring);
  const skillsCamY = useSpring(useTransform(scrollYProgress, [0.3, 0.5, 0.68], [96, 0, -72]), cameraSpring);
  const skillsCamScale = useSpring(useTransform(scrollYProgress, [0.3, 0.5, 0.68], [0.96, 1, 0.986]), cameraSpring);
  const skillsCamTilt = useSpring(useTransform(scrollYProgress, [0.3, 0.5, 0.68], [2.4, 0, -1.7]), cameraSpring);
  const projectsCamY = useSpring(useTransform(scrollYProgress, [0.52, 0.72, 0.9], [106, 0, -94]), cameraSpring);
  const projectsCamScale = useSpring(useTransform(scrollYProgress, [0.52, 0.72, 0.9], [0.953, 1, 0.982]), cameraSpring);
  const projectsCamTilt = useSpring(useTransform(scrollYProgress, [0.52, 0.72, 0.9], [2.8, 0, -2.3]), cameraSpring);
  const contactCamY = useSpring(useTransform(scrollYProgress, [0.78, 0.94, 1], [88, 0, -30]), cameraSpring);
  const contactCamScale = useSpring(useTransform(scrollYProgress, [0.78, 0.94], [0.965, 1]), cameraSpring);
  const contactCamTilt = useSpring(useTransform(scrollYProgress, [0.78, 0.96], [1.8, 0]), cameraSpring);

  const [preloading, setPreloading] = useState(true);
  const [activeScene, setActiveScene] = useState<SceneId>("intro");
  const [cutToken, setCutToken] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [immersiveMode, setImmersiveMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.localStorage.getItem("cinema-immersive") !== "off";
    } catch {
      return true;
    }
  });
  const finishPreloader = useCallback(() => setPreloading((p) => (p ? false : p)), []);
  const activeProject = immersiveMode && activeProjectIndex !== null ? (projects[activeProjectIndex] ?? null) : null;
  const activePalette = scenePalettes[activeScene];
  const accentColor = activeProject?.mood.accent ?? activePalette.accent;
  const secondaryColor = activeProject?.mood.icon ?? activePalette.secondary;
  const progressGradient = `linear-gradient(90deg, ${colorWithAlpha(activePalette.primary, 0.95)}, ${colorWithAlpha(accentColor, 0.95)}, ${colorWithAlpha(secondaryColor, 0.95)})`;
  const cameraEnabled = immersiveMode && quality === "high" && !reducedMotion;
  const rootStyle = {
    "--scene-accent": accentColor,
    "--scene-accent-soft": colorWithAlpha(accentColor, 0.24),
    "--scene-secondary": secondaryColor,
  } as CSSProperties;
  const heroShellStyle = immersiveMode && !reducedMotion
    ? { y: heroY, opacity: heroOpacity, scale: heroScale, rotateX: heroTilt }
    : { y: heroY, opacity: heroOpacity };
  const introCameraStyle = cameraEnabled ? { y: introCamY, scale: introCamScale, rotateX: introCamTilt } : undefined;
  const journeyCameraStyle = cameraEnabled ? { y: journeyCamY, scale: journeyCamScale, rotateX: journeyCamTilt } : undefined;
  const skillsCameraStyle = cameraEnabled ? { y: skillsCamY, scale: skillsCamScale, rotateX: skillsCamTilt } : undefined;
  const projectsCameraStyle = cameraEnabled ? { y: projectsCamY, scale: projectsCamScale, rotateX: projectsCamTilt } : undefined;
  const contactCameraStyle = cameraEnabled ? { y: contactCamY, scale: contactCamScale, rotateX: contactCamTilt } : undefined;

  useEffect(() => {
    try {
      window.localStorage.setItem("cinema-immersive", immersiveMode ? "on" : "off");
    } catch {
      // no-op
    }
  }, [immersiveMode]);

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
            if (immersiveMode) setCutToken((value) => value + 1);
            return next;
          });
        }
      },
      { threshold: [0.2, 0.35, 0.5, 0.7, 0.9], rootMargin: "-20% 0px -35% 0px" },
    );

    nodes.forEach(({ node }) => observer.observe(node));
    return () => observer.disconnect();
  }, [immersiveMode, preloading]);

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
      <main
        className={[
          `cinema-root quality-${quality} relative min-h-screen overflow-x-clip text-[#f9f3e7]`,
          immersiveMode ? "immersive-on" : "immersive-off",
        ].join(" ")}
        style={rootStyle}
      >
        <SceneAtmosphere scene={activeScene} enabled={immersiveMode} />
        <SceneFusionLayer scene={activeScene} projectMood={activeProject?.mood ?? null} enabled={immersiveMode} />
        {!preloading && <SceneCutFlash cutToken={cutToken} enabled={immersiveMode} />}
        {!preloading && <SceneCaption scene={activeScene} project={activeProject} enabled={immersiveMode} />}
        <StoryHud activeScene={activeScene} scrollYProgress={scrollYProgress} enabled={immersiveMode} />
        {!preloading && immersiveMode && (
          <ScrollReactiveLayer
            scrollYProgress={scrollYProgress}
            quality={quality}
            scene={activeScene}
            projectMood={activeProject?.mood ?? null}
            projectCue={activeProject?.cue ?? null}
            projectCueKey={activeProject?.title ?? null}
            projectTitle={activeProject?.title ?? null}
          />
        )}
        <ProjectDirectorCue scene={activeScene} project={activeProject} enabled={immersiveMode} />
        <InteractiveHalo enabled={immersiveMode} />
        {immersiveMode && <div className="cinema-letterbox cinema-letterbox-top pointer-events-none fixed inset-x-0 top-0 z-[100]" />}
        {immersiveMode && <div className="cinema-letterbox cinema-letterbox-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[100]" />}
        {immersiveMode && <div className="cinema-vignette pointer-events-none fixed inset-0 z-[1]" />}
        {immersiveMode && <div className="cinema-grain pointer-events-none fixed inset-0 z-[2]" />}

        <motion.div
          className="fixed left-0 right-0 top-0 z-[122] h-[3px] origin-left"
          style={{ scaleX, background: progressGradient }}
        />

        <header className="fixed left-0 right-0 top-0 z-[112] px-6 pt-5 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-black/35 px-5 py-3 backdrop-blur-xl">
            <p className="font-cinema-display text-sm tracking-[0.28em]" style={{ color: "var(--scene-accent)" }}>RAP</p>
            <nav className="hidden items-center gap-6 text-[0.8rem] uppercase tracking-[0.18em] text-[#f8ede0]/80 sm:flex">
              <a href="#journey" className="transition hover:text-white">Journey</a>
              <a href="#skills" className="transition hover:text-white">Skills</a>
              <a href="#projects" className="transition hover:text-white">Projects</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
              <button
                type="button"
                onClick={() => setImmersiveMode((prev) => !prev)}
                className={[
                  "rounded-full border px-2.5 py-1 text-[0.6rem] tracking-[0.14em] transition",
                  immersiveMode
                    ? "border-amber-200/35 bg-amber-300/10 text-amber-100"
                    : "border-white/20 bg-white/5 text-[#f8eddc]/70 hover:bg-white/10",
                ].join(" ")}
              >
                {immersiveMode ? "IMMERSIVE FX ON" : "IMMERSIVE FX OFF"}
              </button>
            </nav>
            <button
              type="button"
              onClick={() => setImmersiveMode((prev) => !prev)}
              className={[
                "rounded-full border px-2 py-1 text-[0.55rem] tracking-[0.12em] sm:hidden",
                immersiveMode
                  ? "border-amber-200/35 bg-amber-300/10 text-amber-100"
                  : "border-white/20 bg-white/5 text-[#f8eddc]/70",
              ].join(" ")}
            >
              {immersiveMode ? "FX ON" : "FX OFF"}
            </button>
          </div>
        </header>

        <motion.section
          id="intro"
          data-scene-id="intro"
          className="scene-camera-stage scene-depth-intro relative isolate min-h-[100svh] px-6 pb-16 pt-28 md:px-10 md:pt-36 lg:px-16"
          style={introCameraStyle}
        >
          {immersiveMode && (
            <div className="pointer-events-none absolute inset-x-0 top-[-7rem] hidden h-[40rem] lg:block">
              <Scene3D />
            </div>
          )}
          {immersiveMode && (
            <motion.div
              className="cinema-light-orb cinema-light-orb-left"
              animate={reducedMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {immersiveMode && (
            <motion.div
              className="cinema-light-orb cinema-light-orb-right"
              animate={reducedMotion ? undefined : { x: [0, -20, 0], y: [0, 16, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {immersiveMode && (
            <div className="studio-firstfold-overlay pointer-events-none absolute inset-x-4 top-[8rem] z-[6] hidden h-[calc(100%-8.5rem)] rounded-[2rem] lg:block">
              <div className="studio-firstfold-frame absolute inset-0 rounded-[2rem]" aria-hidden />
              <div className="studio-firstfold-sweep absolute inset-0 rounded-[2rem]" aria-hidden />
            </div>
          )}

          <motion.div style={heroShellStyle} className="studio-hero-shell relative z-10 mx-auto max-w-6xl">
            <div className="studio-intro-meta mb-4 flex flex-wrap items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-[#f8eddc]/70">
              <span className="studio-meta-chip">Studio Intro Sequence</span>
              <span className="studio-meta-dot" aria-hidden />
              <span className="studio-meta-chip">High-End Cinematic Build</span>
            </div>
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
                <div className="studio-intro-strip mt-6 flex flex-wrap gap-2">
                  <span className="studio-intro-pill">Scene-driven storytelling</span>
                  <span className="studio-intro-pill">Interaction-first motion</span>
                  <span className="studio-intro-pill">Manual cinematic audio cues</span>
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
                  {immersiveMode && <div className="studio-portrait-ring absolute inset-0 rounded-2xl" aria-hidden />}
                  {immersiveMode && <div className="studio-portrait-scan absolute inset-0 rounded-2xl" aria-hidden />}
                  <div className="studio-portrait-badge absolute right-3 top-3 rounded-full border border-white/25 bg-black/38 px-3 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-[#fff1d3]">
                    Studio Capture
                  </div>
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

          {immersiveMode && (
            <motion.p
              className="cinema-subtitle absolute inset-x-0 bottom-9 z-20 text-center text-[0.62rem] uppercase tracking-[0.25em] text-[#f8eddc]/60"
              animate={reducedMotion ? undefined : { opacity: [0.35, 0.9, 0.35], y: [0, 2, 0] }}
              transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
            >
              Scroll to advance through each scene
            </motion.p>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(8,10,16,.92))]" />
        </motion.section>

        <SceneDivider tone="amber" />

        <motion.section
          id="journey"
          data-scene-id="journey"
          className="scene-camera-stage scene-depth-journey relative z-10 px-6 py-24 md:px-10 lg:px-16"
          style={journeyCameraStyle}
        >
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
        </motion.section>

        <SceneDivider tone="rose" />
        <motion.section
          id="skills"
          data-scene-id="skills"
          className="scene-camera-stage scene-depth-skills relative z-10 overflow-hidden py-10"
          style={skillsCameraStyle}
        >
          <div className="cinema-marquee">
            <div className="cinema-marquee-track">
              {[...reelSkills, ...reelSkills].map((skill, idx) => <span key={`${skill}-${idx}`} className="cinema-chip">{skill}</span>)}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          data-scene-id="projects"
          className="scene-camera-stage scene-depth-projects relative z-10 px-6 pb-24 pt-16 md:px-10 lg:px-16"
          style={projectsCameraStyle}
        >
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
              {projects.map((project, idx) => (
                <ProjectReelCard
                  key={project.title}
                  project={project}
                  idx={idx}
                  immersiveMode={immersiveMode}
                  reducedMotion={Boolean(reducedMotion)}
                  isActive={activeProjectIndex === idx}
                  onActivate={() => setActiveProjectIndex(idx)}
                  onDeactivate={() => setActiveProjectIndex((current) => (current === idx ? null : current))}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <SceneDivider tone="cyan" />
        <motion.section
          id="contact"
          data-scene-id="contact"
          className="scene-camera-stage scene-depth-contact relative z-10 px-6 pb-24 md:px-10 lg:px-16"
          style={contactCameraStyle}
        >
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
        </motion.section>
      </main>
    </>
  );
}

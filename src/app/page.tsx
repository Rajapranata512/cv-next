"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
      <motion.div
        className="scene-divider-beam"
        animate={reducedMotion ? undefined : { x: ["-55%", "55%", "-55%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="scene-divider-haze" />
    </motion.div>
  );
}

function SceneAtmosphere({ scene }: { scene: SceneId }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        className={`scene-atmosphere scene-atmosphere-${scene} pointer-events-none fixed inset-0 z-[0]`}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
    </AnimatePresence>
  );
}

function SceneCutFlash({ cutToken }: { cutToken: number }) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;
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

function StoryHud({ activeScene, scrollYProgress }: { activeScene: SceneId; scrollYProgress: MotionValue<number> }) {
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -24]);
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
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="cinema-preloader-shell relative w-full max-w-2xl rounded-[2rem] border border-white/15 bg-black/45 p-7 backdrop-blur-xl md:p-10"
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollLevelRef = useRef(0);
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioPreset, setAudioPreset] = useState<AudioPreset>("epic");
  const reducedMotion = useReducedMotion();

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

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollLevelRef.current = v;
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
    const oscB = context.createOscillator();
    oscA.type = cfg.oscAType;
    oscB.type = cfg.oscBType;
    oscA.frequency.value = cfg.oscABase;
    oscB.frequency.value = cfg.oscABase * cfg.harmonic;
    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(gain);
    gain.connect(analyser);
    analyser.connect(context.destination);
    oscA.start();
    oscB.start();
    return {
      context,
      analyser,
      gain,
      filter,
      oscA,
      oscB,
      data: new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>,
    };
  }, [audioPreset, getPresetConfig]);

  const disposeAudio = useCallback(async () => {
    const engine = audioEngineRef.current;
    if (!engine) return;
    const now = engine.context.currentTime;
    engine.gain.gain.cancelScheduledValues(now);
    engine.gain.gain.setTargetAtTime(0.00001, now, 0.12);
    try {
      engine.oscA.stop(now + 0.2);
      engine.oscB.stop(now + 0.2);
    } catch {
      // no-op
    }
    setTimeout(() => void engine.context.close(), 260);
    audioEngineRef.current = null;
  }, []);

  const handleToggleAudio = useCallback(async () => {
    if (audioEnabled) {
      setAudioEnabled(false);
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
    setAudioEnabled(true);
  }, [audioEnabled, audioPreset, createAudioEngine, disposeAudio, getPresetConfig]);

  useEffect(() => {
    const engine = audioEngineRef.current;
    if (!engine) return;
    const cfg = getPresetConfig(audioPreset);
    const now = engine.context.currentTime;

    engine.oscA.type = cfg.oscAType;
    engine.oscB.type = cfg.oscBType;
    engine.filter.Q.value = cfg.q;
    engine.analyser.smoothingTimeConstant = cfg.smooth;
    engine.filter.frequency.setTargetAtTime(cfg.filterBase + scrollLevelRef.current * cfg.filterRange, now, 0.16);
    engine.gain.gain.setTargetAtTime(audioEnabled ? cfg.gainBase + scrollLevelRef.current * cfg.gainRange : 0.00001, now, 0.2);
  }, [audioEnabled, audioPreset, getPresetConfig]);

  useEffect(() => {
    if (!audioEnabled) return undefined;
    const cfg = getPresetConfig(audioPreset);
    let raf = 0;
    const modulate = () => {
      const e = audioEngineRef.current;
      if (e) {
        const level = scrollLevelRef.current;
        const now = e.context.currentTime;
        const base = cfg.oscABase + level * cfg.oscARange;
        e.oscA.frequency.setTargetAtTime(base, now, 0.12);
        e.oscB.frequency.setTargetAtTime(base * cfg.harmonic, now, 0.12);
        e.filter.frequency.setTargetAtTime(cfg.filterBase + level * cfg.filterRange, now, 0.18);
        e.gain.gain.setTargetAtTime(cfg.gainBase + level * cfg.gainRange, now, 0.2);
      }
      raf = requestAnimationFrame(modulate);
    };
    raf = requestAnimationFrame(modulate);
    return () => cancelAnimationFrame(raf);
  }, [audioEnabled, audioPreset, getPresetConfig]);

  useEffect(() => () => void disposeAudio(), [disposeAudio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const cfg = getPresetConfig(audioPreset);
    let raf = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
      const time = performance.now() * 0.0014;
      const horizon = Math.min(220, height * 0.9);
      const midY = horizon * 0.56;
      ctx.clearRect(0, 0, width, height);

      const wash = ctx.createLinearGradient(0, 0, 0, horizon);
      wash.addColorStop(0, `rgba(12, 18, 28, ${0.1 + level * (audioPreset === "epic" ? 0.29 : 0.2)})`);
      wash.addColorStop(1, "rgba(12, 18, 28, 0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, horizon);

      const engine = audioEngineRef.current;
      const freqData = engine && audioEnabled ? engine.data : null;
      if (freqData && engine) engine.analyser.getByteFrequencyData(freqData as Uint8Array<ArrayBuffer>);

      const barCount = Math.max(18, Math.floor(width / 32));
      const step = width / barCount;
      const barWidth = Math.max(2.5, step * 0.5);
      for (let i = 0; i < barCount; i += 1) {
        const fIndex = freqData ? Math.floor((i / barCount) * freqData.length) : 0;
        const fValue = freqData ? freqData[fIndex] / 255 : 0;
        const synthetic = (Math.sin(time * 2.8 + i * 0.36 + level * 8.5) + 1) / 2;
        const amp = Math.max(fValue, synthetic * (reducedMotion ? 0.35 : cfg.synthBlend));
        const barHeight = 7 + amp * (24 + level * (reducedMotion ? 42 : 110 * cfg.barBoost));
        const x = i * step + (step - barWidth) * 0.5;
        const y = midY - barHeight * 0.5;
        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, cfg.palette[0]);
        grad.addColorStop(0.5, cfg.palette[1]);
        grad.addColorStop(1, cfg.palette[2]);
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const ratio = x / width;
        const fIndex = freqData ? Math.floor(ratio * (freqData.length - 1)) : 0;
        const fValue = freqData ? freqData[fIndex] / 255 : 0;
        const synthetic = (Math.sin(time * 3.1 + x * 0.023 + level * 7) + 1) / 2;
        const amp = Math.max(fValue, synthetic * cfg.synthBlend);
        const waveY = midY + Math.sin(x * 0.02 + time * 4.6) * (4 + amp * (15 + level * 32 * cfg.waveBoost));
        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.strokeStyle = audioPreset === "epic" ? `rgba(254, 226, 226, ${0.24 + level * 0.43})` : `rgba(229, 240, 255, ${0.16 + level * 0.38})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [audioEnabled, audioPreset, getPresetConfig, quality, reducedMotion]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed left-0 right-0 top-0 z-[90] opacity-80" />
      <div className="pointer-events-auto fixed bottom-4 left-4 z-[200] md:bottom-6 md:left-6">
        <button
          type="button"
          onClick={handleToggleAudio}
          className="audio-pulse-toggle inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/45 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#f8eddc] backdrop-blur-xl transition hover:bg-white/10"
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
        <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-[#f8eddc]/60">
          Pulse Preset: {audioPreset === "epic" ? "Epic" : "Soft"}
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
        <div className="cinema-letterbox cinema-letterbox-top pointer-events-none fixed inset-x-0 top-0 z-[100]" />
        <div className="cinema-letterbox cinema-letterbox-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[100]" />
        <div className="cinema-vignette pointer-events-none fixed inset-0 z-[1]" />
        <div className="cinema-grain pointer-events-none fixed inset-0 z-[2]" />

        <motion.div
          className="fixed left-0 right-0 top-0 z-[122] h-[3px] origin-left bg-[linear-gradient(90deg,#f59e0b,#fb7185,#38bdf8)]"
          style={{ scaleX }}
        />

        <header className="fixed left-0 right-0 top-0 z-[112] px-6 pt-5 md:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-black/35 px-5 py-3 backdrop-blur-xl">
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
          <div className="pointer-events-none absolute inset-x-0 top-[-7rem] hidden h-[40rem] lg:block"><Scene3D /></div>
          <motion.div
            className="cinema-light-orb cinema-light-orb-left"
            animate={reducedMotion ? undefined : { x: [0, 18, 0], y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="cinema-light-orb cinema-light-orb-right"
            animate={reducedMotion ? undefined : { x: [0, -20, 0], y: [0, 16, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

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
                  <div className="ml-7 rounded-2xl border border-white/15 bg-black/28 p-5 backdrop-blur-sm md:ml-0">
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
                    <div className="project-card-aura" aria-hidden />
                    <div className="project-card-sheen" aria-hidden />
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={project.image} alt={`${project.title} preview`} fill className="object-cover transition duration-700 group-hover:scale-110" />
                      <div className="project-card-overlay absolute inset-0" />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-sm">
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
            className="mx-auto max-w-6xl rounded-[2rem] border border-white/15 bg-black/35 px-6 py-10 backdrop-blur-xl md:px-10 md:py-14"
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

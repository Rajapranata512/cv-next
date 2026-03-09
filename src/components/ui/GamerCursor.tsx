"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorMeta = {
  interactive: boolean;
  label: string | null;
  textMode: boolean;
};

function getCursorMeta(target: EventTarget | null): CursorMeta {
  if (!(target instanceof Element)) {
    return { interactive: false, label: null, textMode: false };
  }

  const interactive = target.closest<HTMLElement>(
    "[data-cursor], a, button, input, textarea, select, summary, [role='button'], [role='link']",
  );

  if (!interactive) {
    return { interactive: false, label: null, textMode: false };
  }

  const textMode = Boolean(interactive.closest("input, textarea, select, [contenteditable='true']"));
  const dataLabel = interactive.dataset.cursor?.trim();
  const ariaLabel = interactive.getAttribute("aria-label")?.trim();
  const rawLabel = dataLabel || ariaLabel || (textMode ? "Type" : "Open");
  const label = rawLabel.length > 14 ? `${rawLabel.slice(0, 13)}...` : rawLabel;

  return {
    interactive: true,
    label,
    textMode,
  };
}

export const GamerCursor = () => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [meta, setMeta] = useState<CursorMeta>({ interactive: false, label: null, textMode: false });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const shellX = useSpring(mouseX, { damping: 26, stiffness: 520, mass: 0.42 });
  const shellY = useSpring(mouseY, { damping: 26, stiffness: 520, mass: 0.42 });
  const glowX = useSpring(mouseX, { damping: 34, stiffness: 220, mass: 0.9 });
  const glowY = useSpring(mouseY, { damping: 34, stiffness: 220, mass: 0.9 });

  useEffect(() => {
    if (reducedMotion) return undefined;

    const media = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(media.matches);
    updateEnabled();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", updateEnabled);
      return () => media.removeEventListener("change", updateEnabled);
    }

    media.addListener(updateEnabled);
    return () => media.removeListener(updateEnabled);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setMeta((current) => {
        const next = getCursorMeta(event.target);
        if (
          current.interactive === next.interactive &&
          current.label === next.label &&
          current.textMode === next.textMode
        ) {
          return current;
        }
        return next;
      });
    };

    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);
    const handlePointerLeave = () => {
      setMeta({ interactive: false, label: null, textMode: false });
      setPressed(false);
    };

    const handleFocusIn = (event: FocusEvent) => {
      setMeta(getCursorMeta(event.target));
    };

    const handleFocusOut = () => {
      setMeta({ interactive: false, label: null, textMode: false });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9996] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,.2),rgba(56,189,248,.04)_55%,transparent_72%)] blur-2xl"
        style={{
          translateX: glowX,
          translateY: glowY,
          x: "-50%",
          y: "-50%",
          opacity: meta.textMode ? 0 : meta.interactive ? 0.85 : 0.45,
          scale: pressed ? 0.72 : meta.interactive ? 1.2 : 1,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] overflow-hidden border border-white/45 bg-black/25 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md"
        style={{
          translateX: shellX,
          translateY: shellY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: meta.textMode ? 0 : meta.interactive ? 78 : 28,
          height: meta.textMode ? 0 : meta.interactive ? 78 : 28,
          borderRadius: meta.interactive ? 999 : 10,
          opacity: meta.textMode ? 0 : 1,
          scale: pressed ? 0.84 : 1,
          backgroundColor: meta.interactive ? "rgba(11, 17, 28, 0.56)" : "rgba(10, 10, 10, 0.16)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.42 }}
      >
        <motion.div
          className="absolute inset-[1px] rounded-[inherit] border border-white/12"
          animate={{ opacity: meta.interactive ? 1 : 0.35 }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,.32),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(56,189,248,.24),transparent_55%)]"
          animate={{ opacity: meta.interactive ? 0.9 : 0.25 }}
        />
        <motion.span
          className="absolute inset-0 flex items-center justify-center px-2 text-center"
          initial={false}
          animate={{
            opacity: meta.interactive ? 1 : 0,
            scale: meta.interactive ? 1 : 0.6,
          }}
          transition={{ duration: 0.18 }}
        >
          {meta.label ?? ""}
        </motion.span>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          translateX: mouseX,
          translateY: mouseY,
          x: "-50%",
          y: "-50%",
          opacity: meta.textMode ? 0 : 1,
          scale: pressed ? 0.7 : meta.interactive ? 0.3 : 1,
        }}
      />
    </>
  );
};

"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const routeLabel = pathname === "/cv" ? "Curriculum Vitae" : "Portfolio Experience";
  const routeCode = pathname === "/cv" ? "SCN-CV" : "SCN-00";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-scene-wrapper"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.56, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="route-shutter-overlay"
          initial={reducedMotion ? undefined : { opacity: 0.62, scaleY: 1 }}
          animate={reducedMotion ? undefined : { opacity: 0, scaleY: 0.14 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
        <motion.div
          className="route-flare-overlay"
          initial={reducedMotion ? undefined : { opacity: 0.48, x: "-30%" }}
          animate={reducedMotion ? undefined : { opacity: 0, x: "36%" }}
          transition={{ duration: 0.86, ease: "easeOut" }}
          aria-hidden
        />
        <motion.div
          className="route-title-overlay"
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: [0, 1, 0], y: [14, 0, -12] }}
          transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <p className="route-title-code">{routeCode}</p>
          <p className="route-title-text">{routeLabel}</p>
        </motion.div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

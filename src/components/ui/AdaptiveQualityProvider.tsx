"use client";

import React, { createContext, useContext, useEffect } from "react";

export type QualityLevel = "low" | "medium" | "high";

const AdaptiveQualityContext = createContext<QualityLevel>("high");

const LOCKED_QUALITY: QualityLevel = "high";

export function AdaptiveQualityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-quality", LOCKED_QUALITY);
    return () => {
      document.documentElement.removeAttribute("data-quality");
    };
  }, []);

  return <AdaptiveQualityContext.Provider value={LOCKED_QUALITY}>{children}</AdaptiveQualityContext.Provider>;
}

export const useAdaptiveQuality = () => useContext(AdaptiveQualityContext);

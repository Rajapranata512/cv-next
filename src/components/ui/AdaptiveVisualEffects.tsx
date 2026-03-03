"use client";

import React from "react";
import { InteractiveParticles } from "./InteractiveParticles";
import { Scanlines } from "./Scanlines";
import { GamerCursor } from "./GamerCursor";
import { useAdaptiveQuality } from "./AdaptiveQualityProvider";

export function AdaptiveVisualEffects() {
  const quality = useAdaptiveQuality();

  return (
    <>
      {quality !== "low" && <InteractiveParticles quality={quality} />}
      {quality === "high" && <Scanlines />}
      {quality === "high" && <GamerCursor />}
    </>
  );
}

"use client";
import React from "react";

export const Scanlines = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Scanline pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />

            {/* Subtle flicker */}
            <div className="absolute inset-0 animate-pulse bg-white/5 opacity-0 active:opacity-100" />
            <style jsx>{`
        div {
          opacity: 0.15;
          mix-blend-mode: overlay;
        }
      `}</style>
        </div>
    );
};

"use client";
import React, { useState, useEffect } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText = ({ text, className }: GlitchTextProps) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 150);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            {isGlitching && (
                <>
                    <span className="absolute top-0 left-0 -translate-x-1 translate-y-1 text-red-500/50 mix-blend-screen animate-pulse z-0">
                        {text}
                    </span>
                    <span className="absolute top-0 left-0 translate-x-1 -translate-y-1 text-cyan-500/50 mix-blend-screen animate-pulse z-0">
                        {text}
                    </span>
                </>
            )}
        </div>
    );
};

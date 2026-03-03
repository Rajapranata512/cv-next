"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

import { Scene3D } from "./Scene3D";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = ((clientX - left) / width) * 100;
            const y = ((clientY - top) / height) * 100;
            container.style.setProperty("--x", `${x}%`);
            container.style.setProperty("--y", `${y}%`);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 hero-spotlight overflow-hidden dot-pattern"
        >
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(var(--primary-rgb), 0.1) 1px, transparent 1px)`,
                        backgroundSize: '4rem 4rem',
                        maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
            </div>

            <Scene3D />

            {/* Background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-10"
                >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                        <Image
                            src="/avatar.jpg"
                            alt="Raja Adi Pranata"
                            fill
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
                </motion.div>

                <span className="inline-block px-4 py-1.5 rounded-full border bg-secondary/50 text-secondary-foreground text-sm font-medium mb-6">
                    Available for Internships 2026
                </span>

                <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6">
                    Raja Adi <span className="text-gradient">Pranata</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
                    Computer Science & Statistics Student at BINUS. Crafting aesthetic web experiences and Tidying data with passion.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Magnetic>
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold flex items-center gap-2 group shadow-2xl"
                        >
                            Selected Work
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </Magnetic>

                    <Magnetic>
                        <motion.a
                            href="/cv"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 rounded-full glass font-bold flex items-center gap-2"
                        >
                            Download CV
                            <Download className="h-4 w-4" />
                        </motion.a>
                    </Magnetic>
                </div>
            </motion.div>

            {/* Visual flourishes */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full" />
        </section>
    );
};

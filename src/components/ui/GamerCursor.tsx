"use client";
import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const GamerCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] border border-primary/50 mix-blend-difference"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: "-50%",
                    y: "-50%",
                    borderRadius: "2px",
                }}
            >
                <div className="absolute top-0 left-0 w-1 h-1 bg-primary" />
                <div className="absolute top-0 right-0 w-1 h-1 bg-primary" />
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-primary" />
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-primary" />
            </motion.div>
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[10000] mix-blend-difference"
                style={{
                    translateX: mouseX,
                    translateY: mouseY,
                    x: "-50%",
                    y: "-50%",
                }}
            />
        </>
    );
};

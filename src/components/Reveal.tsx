"use client";
import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export default function Reveal({ children, width = "fit-content", delay = 0.25 }: RevealProps) {
  return (
    <div style={{ position: "relative", width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          delay: delay,
          duration: 0.8
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

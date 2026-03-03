"use client";

import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const ProjectCard = ({ title, description, tags, link, github, image }: ProjectCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  const glowOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.28, 0.12, 0.28]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group/card relative h-96 w-full rounded-2xl border bg-card"
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-slate-900">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover/card:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 opacity-50">
            <div className="select-none text-9xl font-bold uppercase tracking-tighter text-slate-700 opacity-20">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 z-10 flex flex-col justify-between p-8"
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,.24),transparent_56%)]"
          style={{ opacity: glowOpacity }}
        />

        <div>
          <h3 className="text-2xl font-bold text-white transition-colors group-hover/card:text-primary">{title}</h3>
          <p className="mt-4 line-clamp-3 text-slate-300">{description}</p>
        </div>

        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs text-slate-100 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <div className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-primary" />
        <div className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-primary" />

        <motion.div
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"
        />
      </div>

      <div className="absolute bottom-4 right-4 z-20 opacity-0 transition-opacity group-hover/card:opacity-50">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white">
          ID: PRJ_0x{title.length}
          {title.charCodeAt(0) % 10}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] opacity-20 transition-opacity group-hover/card:opacity-40">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-muted-foreground blur-[80px]" />
      </div>
    </motion.div>
  );
};

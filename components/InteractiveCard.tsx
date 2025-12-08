// components/InteractiveCard.tsx
"use client";
import { useRef } from "react";
import clsx from "clsx";

export default function InteractiveCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rx = (py - 0.5) * -7; // tilt X
    const ry = (px - 0.5) * 10; // tilt Y

    el.style.setProperty("transform", `rotateX(${rx}deg) rotateY(${ry}deg)`);
    // update spotlight vars bila parent punya .spotlight
    const parent = el.closest<HTMLElement>(".spotlight");
    if (parent) {
      parent.style.setProperty("--mx", `${px * 100}%`);
      parent.style.setProperty("--my", `${py * 100}%`);
    }
  }
  function onLeave() {
    const el = ref.current!;
    el.style.setProperty("transform", `rotateX(0deg) rotateY(0deg)`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx("icard icard--hover", className)}
    >
      {children}
    </div>
  );
}

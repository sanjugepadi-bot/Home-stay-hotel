"use client";

import { useRef } from "react";

/** Pointer-driven 3D tilt + light glare (CSS vars, no React re-renders). Mouse only; respects reduced motion. */
export function Tilt3D({
  className,
  children,
  strength = 1,
}: {
  className?: string;
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.dataset.tilting = "true";
    el.style.setProperty("--ry", `${((x - 0.5) * 10 * strength).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${((0.5 - y) * 8 * strength).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.dataset.tilting = "false";
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`room-card-3d ${className ?? ""}`}>
      {children}
    </div>
  );
}

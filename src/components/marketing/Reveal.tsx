"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Reveal — subtle fade-up on scroll, once, via IntersectionObserver.
 * Pure CSS transition; respects prefers-reduced-motion (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion is handled in CSS (globals.css forces .reveal visible).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Small gold eyebrow label used across sections. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C20] border border-white/10">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
      <span className="text-[10px] tracking-[0.24em] uppercase text-[#C6A15B]">{children}</span>
    </div>
  );
}

"use client";

import React from "react";

interface RingsBackdropProps {
  className?: string;
}

export function RingsBackdrop({ className = "" }: RingsBackdropProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[600px] sm:w-[900px] lg:w-[1100px] h-auto opacity-35"
      >
        <defs>
          <clipPath id="backdrop-lens-clip">
            <circle cx="450" cy="300" r="280" />
          </clipPath>
          <radialGradient
            id="lens-gold-radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(450 400) rotate(90) scale(180)"
          >
            <stop stopColor="#C6A15B" stopOpacity="0.4" />
            <stop offset="0.6" stopColor="#C6A15B" stopOpacity="0.15" />
            <stop offset="1" stopColor="#C6A15B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient gold glow over the lens intersection */}
        <circle
          cx="450"
          cy="500"
          r="280"
          fill="url(#lens-gold-radial)"
          clipPath="url(#backdrop-lens-clip)"
        />

        {/* Ring 1 - Upper / Capital Ring */}
        <circle
          cx="450"
          cy="300"
          r="280"
          stroke="#F4F1EA"
          strokeWidth="1.2"
          strokeOpacity="0.14"
        />

        {/* Ring 2 - Lower / Vision Ring */}
        <circle
          cx="450"
          cy="500"
          r="280"
          stroke="#F4F1EA"
          strokeWidth="1.2"
          strokeOpacity="0.14"
        />

        {/* Overlap gold lens subtle outline */}
        <circle
          cx="450"
          cy="500"
          r="280"
          stroke="#C6A15B"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          clipPath="url(#backdrop-lens-clip)"
        />
      </svg>
    </div>
  );
}


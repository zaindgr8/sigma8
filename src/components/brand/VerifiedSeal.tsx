"use client";

import React, { useId } from "react";
import { LogoMark } from "./LogoMark";

interface VerifiedSealProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function VerifiedSeal({
  size = 96,
  className = "",
  glow = false,
}: VerifiedSealProps) {
  const id = useId();
  const pathId = `seal-text-path-${id.replace(/:/g, "")}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <path
            id={pathId}
            d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>

        {/* Outer subtle gold ring */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="#C6A15B"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="3 3"
        />

        {/* Inner solid champagne ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#C6A15B"
          strokeWidth="1.2"
        />

        {/* Center backdrop disc */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="#141417"
          stroke="#C6A15B"
          strokeWidth="0.75"
          strokeOpacity="0.5"
        />

        {/* Rotating/Curved Text on Path */}
        <text
          fill="#C6A15B"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="0.22em"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          className="uppercase select-none"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            SIGMA 8 · VERIFIED MEMBER · INVESTORS × FOUNDERS ·
          </textPath>
        </text>
      </svg>

      {/* Center mark */}
      <div className="relative z-10 scale-75">
        <LogoMark size={Math.round(size * 0.28)} lensGlow={glow} />
      </div>
    </div>
  );
}


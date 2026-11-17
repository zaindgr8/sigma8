"use client";

import React, { useId } from "react";

interface LogoMarkProps {
  className?: string;
  size?: number;
  variant?: "dark" | "light" | "champagne";
  lensGlow?: boolean;
}

export function LogoMark({
  className = "w-8 h-auto",
  size = 40,
  variant = "dark",
  lensGlow = false,
}: LogoMarkProps) {
  const id = useId();
  const clipId = `lens-clip-${id.replace(/:/g, "")}`;
  const glowId = `lens-glow-${id.replace(/:/g, "")}`;

  // Ring stroke color based on variant
  const strokeColor =
    variant === "light"
      ? "#0B0B0D"
      : variant === "champagne"
      ? "#0B0B0D"
      : "#F4F1EA";

  // Lens color: on champagne background it turns obsidian, otherwise champagne gold
  const lensColor = variant === "champagne" ? "#0B0B0D" : "#C6A15B";

  return (
    <svg
      width={size}
      height={(size * 160) / 100}
      viewBox="0 0 100 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sigma 8 Logo Mark"
    >
      <defs>
        {/* Clip path for the exact intersection lens */}
        <clipPath id={clipId}>
          <circle cx="50" cy="55" r="38" />
        </clipPath>

        {lensGlow && (
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Gold Lens (Intersection of upper and lower rings) */}
      <circle
        cx="50"
        cy="105"
        r="38"
        fill={lensColor}
        clipPath={`url(#${clipId})`}
        filter={lensGlow ? `url(#${glowId})` : undefined}
      />

      {/* Upper Ring: Capital (radius 38, stroke 2.5) */}
      <circle
        cx="50"
        cy="55"
        r="38"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Lower Ring: Vision (radius 38, stroke 2.5) */}
      <circle
        cx="50"
        cy="105"
        r="38"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

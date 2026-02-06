"use client";

interface BettyLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * The Aerobatic B — Betty's logo
 *
 * A single continuous line traces an aerobatic loop and resolves into a lowercase "b".
 * Inspired by Betty Skelton's signature aerobatic maneuvers.
 * The loop represents knowledge circulating continuously — never lost, always flowing.
 */
export function BettyLogo({
  className = "",
  size = 64,
  color = "currentColor"
}: BettyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Betty logo"
    >
      {/*
        Aerobatic B — single continuous stroke
        The path flows: stem up → loop at top → back to stem → bowl below
        Smooth bezier curves for that fluid aerobatic feel
      */}
      <path
        d="M16 56
           L16 12
           Q16 4 28 4
           Q42 4 42 14
           Q42 24 28 26
           L16 26
           L16 42
           Q16 32 32 32
           Q48 32 48 44
           Q48 56 32 56
           Q16 56 16 44"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Compact icon for nav — single continuous aerobatic loop
 */
export function BettyIcon({
  className = "",
  size = 24,
  color = "currentColor"
}: BettyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Betty"
    >
      <path
        d="M6 21
           L6 4.5
           Q6 1.5 10.5 1.5
           Q15.5 1.5 15.5 5.5
           Q15.5 9.5 10.5 10
           L6 10
           L6 16
           Q6 12 12 12
           Q18 12 18 16.5
           Q18 21 12 21
           Q6 21 6 16.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Minimal mark for favicon (16px)
 */
export function BettyMark({
  className = "",
  size = 16,
  color = "currentColor"
}: BettyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Betty"
    >
      <path
        d="M4 14
           L4 3
           Q4 1 7 1
           Q10.5 1 10.5 3.5
           Q10.5 6 7 6.5
           L4 6.5
           L4 10.5
           Q4 8 8 8
           Q12 8 12 11
           Q12 14 8 14
           Q4 14 4 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export default BettyLogo;

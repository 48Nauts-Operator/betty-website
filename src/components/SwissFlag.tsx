interface SwissFlagProps {
  className?: string;
  size?: number;
}

export function SwissFlag({ className, size = 14 }: SwissFlagProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="Swiss flag"
      role="img"
    >
      <rect width="32" height="32" rx="4" fill="#D52B1E" />
      <rect x="13" y="6" width="6" height="20" rx="1" fill="white" />
      <rect x="6" y="13" width="20" height="6" rx="1" fill="white" />
    </svg>
  );
}

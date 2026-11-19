export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="tsg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1f4ad6" />
            <stop offset="1" stopColor="#0a1c45" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#tsg)" />
        <path
          d="M20 8.5 30 12v7.2c0 6.3-4.2 10.4-10 12.3-5.8-1.9-10-6-10-12.3V12z"
          fill="none"
          stroke="#fff"
          strokeOpacity=".9"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M15 16.5h10M20 16.5v10" stroke="#2ed3c6" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span
        className={`font-display text-[1.35rem] font-extrabold tracking-tight ${
          light ? "text-white" : "text-ink-950"
        }`}
      >
        Tech<span className={light ? "text-signal-400" : "text-brand-600"}>solv</span>
      </span>
    </span>
  );
}

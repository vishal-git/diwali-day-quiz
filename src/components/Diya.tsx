/** A lit diya, flame flickers via CSS. */
export function Diya({ size = 220 }: { size?: number }) {
  return (
    <svg className="diya" width={size} height={size * 0.8} viewBox="0 0 200 160" aria-hidden="true">
      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#fff6c8" />
          <stop offset="45%" stopColor="#ffd166" />
          <stop offset="80%" stopColor="#ff7a1a" />
          <stop offset="100%" stopColor="rgba(255,122,26,0)" />
        </radialGradient>
        <linearGradient id="bowlGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f4a300" />
          <stop offset="100%" stopColor="#8a4b00" />
        </linearGradient>
      </defs>
      <g className="flame">
        <ellipse cx="100" cy="70" rx="28" ry="46" fill="url(#flameGrad)" opacity="0.55" />
        <path d="M100 22 C 86 50, 82 66, 100 92 C 118 66, 114 50, 100 22 Z" fill="#ffd166" />
        <path d="M100 42 C 93 58, 92 68, 100 82 C 108 68, 107 58, 100 42 Z" fill="#fff6c8" />
      </g>
      <path d="M38 96 Q100 86 162 96 L150 128 Q100 140 50 128 Z" fill="url(#bowlGrad)" />
      <ellipse cx="100" cy="96" rx="62" ry="10" fill="#ffb84d" />
      <rect x="96" y="80" width="8" height="14" rx="2" fill="#4a2a0a" />
      <path d="M60 128 Q100 150 140 128 L132 142 Q100 152 68 142 Z" fill="#6b3600" />
    </svg>
  );
}

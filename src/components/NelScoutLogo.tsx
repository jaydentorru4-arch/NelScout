import React from 'react';

interface NelScoutLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const NelScoutLogo: React.FC<NelScoutLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base' },
    md: { icon: 38, text: 'text-xl' },
    lg: { icon: 54, text: 'text-2xl' },
    xl: { icon: 72, text: 'text-3xl' },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon recreated faithfully from the uploaded Hacker/Scout Logo */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="nsBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0b1b86" />
          </linearGradient>
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow Circle */}
        <circle cx="60" cy="60" r="56" fill="#09122c" stroke="#1d4ed8" strokeWidth="2" opacity="0.6" />

        {/* Scout Hood / Head */}
        {/* Hood Outer */}
        <path
          d="M60 16C44 16 34 30 34 46C34 54 38 61 41 65C44 57 51 51 60 51C69 51 76 57 79 65C82 61 86 54 86 46C86 30 76 16 60 16Z"
          fill="url(#nsBlueGrad)"
        />
        {/* Dark Face Mask Cutout */}
        <path
          d="M60 25C50 25 43 34 43 45C43 48 44 51 46 54C49 48 54 44 60 44C66 44 71 48 74 54C76 51 77 48 77 45C77 34 70 25 60 25Z"
          fill="#060913"
        />

        {/* Shoulders & Cloak */}
        <path
          d="M26 82C22 75 24 67 29 60C35 66 42 70 50 71C43 75 32 78 26 82Z"
          fill="url(#nsBlueGrad)"
        />
        <path
          d="M94 82C98 75 96 67 91 60C85 66 78 70 70 71C77 75 88 78 94 82Z"
          fill="url(#nsBlueGrad)"
        />

        {/* Laptop Base & Body Base */}
        <path
          d="M32 94C32 91 34 89 37 89H83C86 89 88 91 88 94C88 97 86 99 83 99H37C34 99 32 97 32 94Z"
          fill="#3b82f6"
        />

        {/* Laptop Screen (Front facing viewer with NS) */}
        <path
          d="M36 67C35 63 38 60 42 60H78C82 60 85 63 84 67L81 87H39L36 67Z"
          fill="url(#nsBlueGrad)"
          stroke="#60a5fa"
          strokeWidth="1.5"
        />

        {/* "NS" on Laptop Lid */}
        <text
          x="60"
          y="78"
          fill="#ffffff"
          fontSize="14"
          fontWeight="900"
          fontFamily="'Outfit', sans-serif"
          textAnchor="middle"
          letterSpacing="1"
        >
          NS
        </text>
      </svg>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-black tracking-tight text-white font-heading ${textSize}`}>
              NEL
            </span>
            <span className={`font-black tracking-tight text-[#3b82f6] font-heading ${textSize}`}>
              SCOUT
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono font-medium mt-0.5">
            Discover · Preview · Play
          </span>
        </div>
      )}
    </div>
  );
};

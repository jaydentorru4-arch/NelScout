import React from 'react';
import hackerLogo from '../assets/Hacker.png';

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
    sm: { imgSize: 32, textSize: 'text-sm' },
    md: { imgSize: 42, textSize: 'text-lg sm:text-xl' },
    lg: { imgSize: 56, textSize: 'text-2xl' },
    xl: { imgSize: 76, textSize: 'text-3xl' },
  };

  const { imgSize, textSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Hacker.png logo directly - badge/frame entirely removed */}
      <img
        src={hackerLogo}
        alt="NEL SCOUT"
        width={imgSize}
        height={imgSize}
        className="object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: imgSize, height: imgSize }}
      />

      {/* Brand Wordmark Text */}
      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white font-heading ${textSize}`}>
            NEL
          </span>
          <span className={`font-black tracking-tight text-blue-400 font-heading ${textSize}`}>
            SCOUT
          </span>
        </div>
      )}
    </div>
  );
};

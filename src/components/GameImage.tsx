import React, { useState } from 'react';
import { Gamepad2, Skull, Crosshair, Car, Sparkles, Compass, Shield, Users, Wrench } from 'lucide-react';
import { GenreType } from '../types/game';

interface GameImageProps {
  src?: string;
  alt: string;
  className?: string;
  genre?: GenreType | string;
  gameName?: string;
  aspect?: string;
}

export const GameImage: React.FC<GameImageProps> = ({
  src,
  alt,
  className = '',
  genre = 'Action',
  gameName,
  aspect = 'aspect-[16/10]',
}) => {
  const [hasError, setHasError] = useState(!src);

  // Genre-based gradient and icon for resilient fallback
  const getGenreTheme = (g: string) => {
    switch (g.toLowerCase()) {
      case 'horror':
        return {
          gradient: 'from-rose-950 via-slate-900 to-black',
          border: 'border-rose-900/40',
          textColor: 'text-rose-400',
          icon: Skull,
        };
      case 'shooter':
        return {
          gradient: 'from-amber-950/80 via-slate-900 to-black',
          border: 'border-amber-900/40',
          textColor: 'text-amber-400',
          icon: Crosshair,
        };
      case 'racing':
        return {
          gradient: 'from-orange-950/80 via-slate-900 to-black',
          border: 'border-orange-900/40',
          textColor: 'text-orange-400',
          icon: Car,
        };
      case 'rpg':
        return {
          gradient: 'from-blue-950 via-indigo-950 to-black',
          border: 'border-blue-900/40',
          textColor: 'text-blue-400',
          icon: Sparkles,
        };
      case 'simulation':
      case 'roleplay':
        return {
          gradient: 'from-emerald-950/80 via-slate-900 to-black',
          border: 'border-emerald-900/40',
          textColor: 'text-emerald-400',
          icon: Users,
        };
      case 'sandbox':
      case 'building':
        return {
          gradient: 'from-cyan-950/80 via-slate-900 to-black',
          border: 'border-cyan-900/40',
          textColor: 'text-cyan-400',
          icon: Wrench,
        };
      default:
        return {
          gradient: 'from-blue-950/80 via-slate-900 to-[#0a1122]',
          border: 'border-blue-900/40',
          textColor: 'text-blue-400',
          icon: Gamepad2,
        };
    }
  };

  const theme = getGenreTheme(genre);
  const IconComponent = theme.icon;

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${theme.gradient} border ${theme.border} overflow-hidden select-none ${className}`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:14px_14px]" />
        
        {/* Genre Glow Orb */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-blue-600/10 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`p-3 rounded-2xl bg-black/40 border border-white/10 ${theme.textColor} mb-2 shadow-lg`}>
            <IconComponent className="w-6 h-6" />
          </div>
          {gameName && (
            <div className="text-xs sm:text-sm font-black text-white font-heading tracking-tight line-clamp-1 max-w-[90%]">
              {gameName}
            </div>
          )}
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
            {genre}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

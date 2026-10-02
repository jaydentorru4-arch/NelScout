import React, { useState, useEffect } from 'react';
import { Gamepad2, Skull, Crosshair, Car, Compass, Users, Wrench } from 'lucide-react';
import { GenreType } from '../types/game';

interface GameImageProps {
  src?: string;
  alt: string;
  className?: string;
  genre?: GenreType | string;
  gameName?: string;
  aspect?: string;
}

const GENRE_FALLBACK_IMAGES: Record<string, string> = {
  shooter: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
  rpg: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  action: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  sandbox: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80',
  building: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80',
  horror: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
  racing: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  simulation: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
  roleplay: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  party: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
  adventure: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&w=800&q=80',
  mmo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
};

const DEFAULT_GAMING_IMAGE = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';

export const GameImage: React.FC<GameImageProps> = ({
  src,
  alt,
  className = '',
  genre = 'Action',
  gameName,
}) => {
  const [activeSrc, setActiveSrc] = useState<string | undefined>(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setActiveSrc(src);
    setTriedFallback(false);
    setHasError(!src);
  }, [src]);

  const handleError = () => {
    if (!triedFallback) {
      const g = (genre || '').toLowerCase();
      const fallbackUrl = GENRE_FALLBACK_IMAGES[g] || DEFAULT_GAMING_IMAGE;
      setTriedFallback(true);
      if (fallbackUrl !== activeSrc) {
        setActiveSrc(fallbackUrl);
        return;
      }
    }
    setHasError(true);
  };

  // Genre-based gradient and icon for extreme edge-case fallback
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
          icon: Compass,
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

  if (hasError || !activeSrc) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${theme.gradient} border ${theme.border} overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:14px_14px]" />
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
      src={activeSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
    />
  );
};

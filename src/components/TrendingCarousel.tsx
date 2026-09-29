import React, { useRef } from 'react';
import { Game } from '../types/game';
import { GameCard } from './GameCard';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

interface TrendingCarouselProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  games: Game[];
  onPreview: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  title,
  subtitle,
  icon,
  games,
  onPreview,
  onToggleFavorite,
  isFavorite,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!games.length) return null;

  return (
    <div className="py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            {icon || <Flame className="w-5 h-5 text-amber-500" />}
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-xl bg-[#0e1627] hover:bg-[#1a2944] border border-[#1d2b48] text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-xl bg-[#0e1627] hover:bg-[#1a2944] border border-[#1d2b48] text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {games.map((game) => (
          <div key={game.id} className="w-[280px] sm:w-[320px] shrink-0">
            <GameCard
              game={game}
              onPreview={onPreview}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(game.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

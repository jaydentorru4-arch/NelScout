import React, { useState } from 'react';
import { Game } from '../types/game';
import { ROBLOX_MAPPINGS } from '../data/robloxMappings';
import { GameCard } from './GameCard';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import bannerImg from '../assets/images/roblox_alternatives_banner_1790702533814.jpg';

interface RobloxAlternativesProps {
  allGames: Game[];
  onPreview: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  initialSelectedRoblox?: string;
}

export const RobloxAlternatives: React.FC<RobloxAlternativesProps> = ({
  allGames,
  onPreview,
  onToggleFavorite,
  isFavorite,
  initialSelectedRoblox,
}) => {
  const [selectedRoblox, setSelectedRoblox] = useState<string>(
    initialSelectedRoblox || ROBLOX_MAPPINGS[0].robloxName
  );

  const activeMapping =
    ROBLOX_MAPPINGS.find((m) => m.robloxName === selectedRoblox) || ROBLOX_MAPPINGS[0];

  // Recommended games
  const recommendedGames = allGames.filter((game) =>
    activeMapping.recommendedGameIds.includes(game.id)
  );

  return (
    <section className="py-12 sm:py-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-10 border border-[#1b2b4c] bg-[#0c1322]">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImg}
            alt="Roblox Alternatives Banner"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-[#060913]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-3">
            ROBLOX ALTERNATIVES
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Looking for something similar to your favorite Roblox experience? We’ve mapped out top-tier standalone and cross-platform games that share the exact game loops, roleplay worlds, and adrenaline rushes of Roblox’s biggest hits.
          </p>
        </div>
      </div>

      {/* Interactive Roblox Game Selector Carousel / Pills */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
          <span>Choose Your Favorite Roblox Game:</span>
          <span className="text-blue-400">{ROBLOX_MAPPINGS.length} Mapped Experiences</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {ROBLOX_MAPPINGS.map((mapping) => {
            const isSelected = mapping.robloxName === activeMapping.robloxName;
            return (
              <button
                key={mapping.robloxName}
                onClick={() => setSelectedRoblox(mapping.robloxName)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400 scale-102'
                    : 'bg-[#0e1627] hover:bg-[#162238] text-slate-300 border border-[#1b2742]'
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-blue-300" />
                <span>{mapping.robloxName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Mapping Spotlight Box */}
      <div className="p-6 rounded-2xl bg-[#0a101d] border border-[#1d2d4f] mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold mb-1">
              <span>MAPPED ROBLOX EXPERIENCE:</span>
              <span className="text-white">{activeMapping.robloxName}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{activeMapping.robloxGenre}</span>
            </div>
            <p className="text-slate-300 text-sm">{activeMapping.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {activeMapping.robloxUrl && (
              <a
                href={activeMapping.robloxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                <span>Play on Roblox</span>
                <span className="text-slate-400">↗</span>
              </a>
            )}
            <span className="px-2.5 py-1.5 rounded-xl bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono font-bold">
              {recommendedGames.length} Alternatives
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Alternative Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onPreview={onPreview}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(game.id)}
            showRobloxMatch={true}
          />
        ))}
      </div>
    </section>
  );
};

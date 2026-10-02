import React, { useState } from 'react';
import { Game } from '../types/game';
import { EXPERIENCE_MAPPINGS } from '../data/robloxMappings';
import { GameCard } from './GameCard';
import { Gamepad2, Layers } from 'lucide-react';
import bannerImg from '../assets/images/roblox_alternatives_banner_1790702533814.jpg';

interface GameAlternativesProps {
  allGames: Game[];
  onPreview: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  initialSelectedRoblox?: string;
  initialSelectedExperience?: string;
}

export const RobloxAlternatives: React.FC<GameAlternativesProps> = ({
  allGames,
  onPreview,
  onToggleFavorite,
  isFavorite,
  initialSelectedRoblox,
  initialSelectedExperience,
}) => {
  const [selectedExperience, setSelectedExperience] = useState<string>(
    initialSelectedExperience || initialSelectedRoblox || EXPERIENCE_MAPPINGS[0].experienceName
  );

  const activeMapping =
    EXPERIENCE_MAPPINGS.find(
      (m) =>
        m.experienceName === selectedExperience ||
        m.robloxName === selectedExperience
    ) || EXPERIENCE_MAPPINGS[0];

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
            alt="Game Alternatives Banner"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-[#060913]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-3">
            GAME ALTERNATIVES & PLAYSTYLES
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Looking for standalone games that match specific gameplay loops? Select a playstyle below to scout verified PC, console, and cross-platform titles featuring high-fidelity graphics, rich progression, and dedicated servers.
          </p>
        </div>
      </div>

      {/* Interactive Experience Selector Carousel / Pills */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Select a Target Gameplay Style:</span>
          </span>
          <span className="text-blue-400">{EXPERIENCE_MAPPINGS.length} Scouted Categories</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {EXPERIENCE_MAPPINGS.map((mapping) => {
            const isSelected = mapping.experienceName === activeMapping.experienceName;
            return (
              <button
                key={mapping.experienceName}
                onClick={() => setSelectedExperience(mapping.experienceName)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400 scale-102'
                    : 'bg-[#0e1627] hover:bg-[#162238] text-slate-300 border border-[#1b2742]'
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-blue-300" />
                <span>{mapping.experienceName}</span>
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
              <span>TARGET GAMEPLAY STYLE:</span>
              <span className="text-white">{activeMapping.experienceName}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">{activeMapping.genre}</span>
            </div>
            <p className="text-slate-300 text-sm">{activeMapping.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 text-xs font-mono font-medium">
              {recommendedGames.length} Scouted Matches
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
          />
        ))}
      </div>
    </section>
  );
};

export const GameAlternatives = RobloxAlternatives;

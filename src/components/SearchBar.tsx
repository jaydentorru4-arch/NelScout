import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Layers, Gamepad2, ArrowRight } from 'lucide-react';
import { Game } from '../types/game';
import { GameImage } from './GameImage';
import { EXPERIENCE_MAPPINGS } from '../data/robloxMappings';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSelectGame: (game: Game) => void;
  onSelectRoblox?: (name: string) => void;
  onSelectExperience?: (name: string) => void;
  allGames: Game[];
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSelectGame,
  onSelectRoblox,
  onSelectExperience,
  allGames,
  autoFocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectExperience = onSelectExperience || onSelectRoblox || (() => {});

  // Clean quick search pills
  const quickPills = [
    { label: 'Co-op Horror', type: 'genre' },
    { label: 'Tactical Shooter', type: 'genre' },
    { label: 'Anime RPG', type: 'genre' },
    { label: 'Survival Crafting', type: 'genre' },
    { label: 'Free to Play', type: 'tag' },
    { label: 'Open World', type: 'genre' },
    { label: 'Life Sim & Avatar', type: 'genre' },
  ];

  // Filter games based on search query
  const trimmed = value.trim().toLowerCase();
  
  const matchedGames = trimmed
    ? allGames.filter((g) => {
        return (
          g.name.toLowerCase().includes(trimmed) ||
          g.genres.some((gen) => gen.toLowerCase().includes(trimmed)) ||
          g.tags.some((tag) => tag.toLowerCase().includes(trimmed)) ||
          g.platforms.some((p) => p.toLowerCase().includes(trimmed))
        );
      }).slice(0, 6)
    : [];

  const matchedExperiences = trimmed
    ? EXPERIENCE_MAPPINGS.filter((m) =>
        m.experienceName.toLowerCase().includes(trimmed) ||
        m.genre.toLowerCase().includes(trimmed) ||
        m.tags.some((t) => t.toLowerCase().includes(trimmed))
      ).slice(0, 3)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-blue-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search 100+ games, genres, platforms, or playstyles..."
          autoFocus={autoFocus}
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-[#0d1527] border border-[#1d2d50] focus:border-blue-500 rounded-2xl text-white placeholder-slate-400 text-sm sm:text-base outline-none shadow-lg focus:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all"
        />

        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Quick Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 px-1 pb-1">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
          Suggestions:
        </span>
        {quickPills.map((pill) => (
          <button
            key={pill.label}
            onClick={() => {
              onChange(pill.label);
              setIsOpen(true);
            }}
            className="px-2.5 py-1 text-xs rounded-lg bg-[#0e172a] hover:bg-blue-900/30 text-slate-300 hover:text-blue-300 border border-[#1e293b] hover:border-blue-700/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Autocomplete Results Dropdown */}
      {isOpen && (trimmed.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-[#0c1324] border border-[#1e2e50] shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-[480px] overflow-y-auto">
          {/* Experience Mappings Match */}
          {matchedExperiences.length > 0 && (
            <div className="p-3 border-b border-[#182642] bg-blue-950/20">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold px-2 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Matching Playstyles Found</span>
              </div>
              <div className="space-y-1.5">
                {matchedExperiences.map((exp) => (
                  <button
                    key={exp.experienceName}
                    onClick={() => {
                      handleSelectExperience(exp.experienceName);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-900/30 transition-colors text-left group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-300">
                        Games matching: {exp.experienceName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {exp.genre} · {exp.recommendedGameIds.length} Scouted Matches
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Games List */}
          {matchedGames.length > 0 ? (
            <div className="p-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2 mb-2 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Matched Games ({matchedGames.length})</span>
              </div>
              <div className="space-y-1">
                {matchedGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      onSelectGame(game);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 transition-colors text-left group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700/50">
                      <GameImage
                        src={game.coverImage}
                        alt={game.name}
                        genre={game.genres[0]}
                        gameName={game.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-blue-400 truncate">
                          {game.name}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                          {game.priceType === 'free' ? 'FREE' : 'PAID'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {game.genres.join(' · ')}
                      </p>
                      {game.tags.length > 0 && (
                        <p className="text-[11px] text-blue-400/90 truncate font-mono">
                          {game.tags.slice(0, 3).join(' · ')}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            matchedExperiences.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No games found matching "{value}". Try searching for genres like "RPG" or "Horror".
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

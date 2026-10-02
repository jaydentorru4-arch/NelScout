import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';
import { Game } from '../types/game';
import { GameImage } from './GameImage';
import { ROBLOX_MAPPINGS } from '../data/robloxMappings';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSelectGame: (game: Game) => void;
  onSelectRoblox: (robloxName: string) => void;
  allGames: Game[];
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSelectGame,
  onSelectRoblox,
  allGames,
  autoFocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick prompt pills requested in prompt:
  const quickPills = [
    { label: 'Blox Fruits', type: 'roblox' },
    { label: 'Brookhaven', type: 'roblox' },
    { label: 'DOORS', type: 'roblox' },
    { label: 'Horror', type: 'genre' },
    { label: 'Free Multiplayer', type: 'tag' },
    { label: 'Tower of Hell', type: 'roblox' },
    { label: 'Dress to Impress', type: 'roblox' },
  ];

  // Filter games based on search query
  const trimmed = value.trim().toLowerCase();
  
  const matchedGames = trimmed
    ? allGames.filter((g) => {
        return (
          g.name.toLowerCase().includes(trimmed) ||
          g.genres.some((gen) => gen.toLowerCase().includes(trimmed)) ||
          g.tags.some((tag) => tag.toLowerCase().includes(trimmed)) ||
          g.platforms.some((p) => p.toLowerCase().includes(trimmed)) ||
          g.similarRobloxGames.some((r) => r.toLowerCase().includes(trimmed))
        );
      }).slice(0, 6)
    : [];

  const matchedRoblox = trimmed
    ? ROBLOX_MAPPINGS.filter((m) =>
        m.robloxName.toLowerCase().includes(trimmed) ||
        m.robloxGenre.toLowerCase().includes(trimmed) ||
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
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      {/* Input wrapper */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-blue-400">
          <Search className="w-5 h-5" />
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
          autoFocus={autoFocus}
          placeholder="Search games, genres, or Roblox experiences (e.g. Blox Fruits, Brookhaven)..."
          className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl bg-[#0c1427] border border-[#1e2d4e] text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xl transition-all"
        />

        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Search Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2.5 px-1 mt-1">
        <span className="text-xs text-slate-500 font-mono shrink-0 mr-1">Popular:</span>
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
          {/* Roblox Mappings Match */}
          {matchedRoblox.length > 0 && (
            <div className="p-3 border-b border-[#182642] bg-blue-950/20">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold px-2 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Roblox Alternatives Found</span>
              </div>
              <div className="space-y-1.5">
                {matchedRoblox.map((roblox) => (
                  <button
                    key={roblox.robloxName}
                    onClick={() => {
                      onSelectRoblox(roblox.robloxName);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-900/30 transition-colors text-left group cursor-pointer"
                  >
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-300">
                        Games similar to {roblox.robloxName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {roblox.robloxGenre} · {roblox.recommendedGameIds.length} Scouted Matches
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
                      {game.similarRobloxGames.length > 0 && (
                        <p className="text-[11px] text-blue-400/90 truncate font-mono">
                          Similar to: {game.similarRobloxGames[0]}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            matchedRoblox.length === 0 && (
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

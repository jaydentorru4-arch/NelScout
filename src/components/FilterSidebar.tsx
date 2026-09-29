import React from 'react';
import { FilterState, GenreType, PlatformType, PriceType, MultiplayerType } from '../types/game';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  onReset: () => void;
  totalFilteredCount: number;
}

const GENRES: GenreType[] = [
  'Action',
  'Shooter',
  'Horror',
  'Racing',
  'RPG',
  'Simulation',
  'Roleplay',
  'Sandbox',
  'Fighting',
  'Puzzle',
  'Building',
  'Party',
  'Adventure',
  'Strategy',
  'Open World',
];

const PLATFORMS: PlatformType[] = [
  'PC',
  'Browser',
  'Xbox',
  'PlayStation',
  'Nintendo Switch',
  'Android',
  'iOS',
];

const MULTIPLAYER_OPTIONS: { id: 'all' | MultiplayerType; label: string }[] = [
  { id: 'all', label: 'All Modes' },
  { id: 'online_multiplayer', label: 'Online Multiplayer' },
  { id: 'co_op', label: 'Co-op' },
  { id: 'mmo', label: 'Massive MMO' },
  { id: 'singleplayer', label: 'Single Player' },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onReset,
  totalFilteredCount,
}) => {
  const toggleGenre = (genre: GenreType) => {
    const exists = filters.selectedGenres.includes(genre);
    const updated = exists
      ? filters.selectedGenres.filter((g) => g !== genre)
      : [...filters.selectedGenres, genre];
    onChangeFilters({ ...filters, selectedGenres: updated });
  };

  const togglePlatform = (platform: PlatformType) => {
    const exists = filters.selectedPlatforms.includes(platform);
    const updated = exists
      ? filters.selectedPlatforms.filter((p) => p !== platform)
      : [...filters.selectedPlatforms, platform];
    onChangeFilters({ ...filters, selectedPlatforms: updated });
  };

  const setPrice = (priceType: 'all' | 'free_only' | 'paid_only') => {
    onChangeFilters({ ...filters, priceType });
  };

  const setMultiplayer = (multiplayer: 'all' | MultiplayerType) => {
    onChangeFilters({ ...filters, multiplayer });
  };

  const setSortBy = (sortBy: FilterState['sortBy']) => {
    onChangeFilters({ ...filters, sortBy });
  };

  const hasActiveFilters =
    filters.selectedGenres.length > 0 ||
    filters.selectedPlatforms.length > 0 ||
    filters.priceType !== 'all' ||
    filters.multiplayer !== 'all' ||
    Boolean(filters.robloxFilter);

  return (
    <div className="w-full rounded-2xl bg-[#0c1322] border border-[#18233c] p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#18233c]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-bold text-white font-heading">FILTERS</span>
          <span className="text-xs font-mono text-slate-400">({totalFilteredCount})</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
          Sort Order
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
          className="w-full py-2 px-3 rounded-xl bg-[#080d17] border border-[#1d2b48] text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="trending">🔥 Trending & Popular</option>
          <option value="rating">⭐ Highest Rated</option>
          <option value="newest">🕒 Release Date (Newest)</option>
          <option value="name_asc">🔤 Name (A - Z)</option>
        </select>
      </div>

      {/* Price Type */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
          Price
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#080d17] rounded-xl border border-[#1d2b48]">
          <button
            onClick={() => setPrice('all')}
            className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filters.priceType === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setPrice('free_only')}
            className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filters.priceType === 'free_only'
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setPrice('paid_only')}
            className={`py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              filters.priceType === 'paid_only'
                ? 'bg-amber-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Paid
          </button>
        </div>
      </div>

      {/* Multiplayer Type */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
          Multiplayer Mode
        </label>
        <div className="space-y-1">
          {MULTIPLAYER_OPTIONS.map((opt) => {
            const isSelected = filters.multiplayer === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setMultiplayer(opt.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-300 hover:bg-[#121c32]'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platforms */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
          Platforms
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PLATFORMS.map((platform) => {
            const isSelected = filters.selectedPlatforms.includes(platform);
            return (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-[#080d17] hover:bg-[#142038] text-slate-400 border border-[#1b2846]'
                }`}
              >
                {platform}
              </button>
            );
          })}
        </div>
      </div>

      {/* Genres */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
          Genres ({filters.selectedGenres.length > 0 ? filters.selectedGenres.length : 'All'})
        </label>
        <div className="flex flex-wrap gap-1.5">
          {GENRES.map((genre) => {
            const isSelected = filters.selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-[#080d17] hover:bg-[#142038] text-slate-400 border border-[#1b2846]'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Game } from '../types/game';
import {
  X,
  Play,
  Heart,
  Globe,
  Users,
  Monitor,
  Gamepad2,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface GamePreviewModalProps {
  game: Game | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  onSelectGame: (game: Game) => void;
  allGames: Game[];
  onOpenDetailPage?: (slug: string) => void;
}

export const GamePreviewModal: React.FC<GamePreviewModalProps> = ({
  game,
  onClose,
  onToggleFavorite,
  isFavorite,
  onSelectGame,
  allGames,
  onOpenDetailPage,
}) => {
  if (!game) return null;

  const [activeMediaTab, setActiveMediaTab] = useState<'trailer' | 'screenshots'>(
    game.trailer ? 'trailer' : 'screenshots'
  );
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0);

  // Find actual similar games objects
  const similarGameObjects = allGames.filter(
    (g) => game.similarGames.includes(g.id) || game.similarGames.includes(g.slug)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a101d] border border-[#1d2d4f] shadow-2xl no-scrollbar animate-in zoom-in-95 duration-200">
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0a101d]/90 backdrop-blur-md border-b border-[#18233d]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-blue-950 text-blue-400 border border-blue-800/60">
              GAME PREVIEW
            </span>
            <span className="text-sm text-slate-400 font-mono hidden sm:inline">
              ID: {game.slug}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            aria-label="Close preview modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Player / Trailer & Screenshots Area */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
          {activeMediaTab === 'trailer' && game.trailer ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${game.trailer}?autoplay=1&mute=1&loop=1&playlist=${game.trailer}&modestbranding=1&rel=0`}
              title={`${game.name} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={game.screenshots[selectedScreenshotIndex] || game.bannerImage}
              alt={`${game.name} screenshot`}
              className="w-full h-full object-cover"
            />
          )}

          {/* Media Switcher Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              {game.trailer && (
                <button
                  onClick={() => setActiveMediaTab('trailer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeMediaTab === 'trailer'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-black/70 text-slate-300 hover:bg-black/90 backdrop-blur-md'
                  }`}
                >
                  Trailer
                </button>
              )}
              <button
                onClick={() => setActiveMediaTab('screenshots')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeMediaTab === 'screenshots'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-black/70 text-slate-300 hover:bg-black/90 backdrop-blur-md'
                }`}
              >
                Screenshots ({game.screenshots.length})
              </button>
            </div>
          </div>
        </div>

        {/* Screenshots Thumbnail Bar */}
        {game.screenshots.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-[#080d17] border-b border-[#18233d] overflow-x-auto no-scrollbar">
            {game.screenshots.map((shot, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveMediaTab('screenshots');
                  setSelectedScreenshotIndex(idx);
                }}
                className={`relative w-24 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeMediaTab === 'screenshots' && selectedScreenshotIndex === idx
                    ? 'border-blue-500 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={shot} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header Title & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18233d]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {game.priceLabel || (game.priceType === 'free' ? 'FREE TO PLAY' : 'PAID')}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">{game.genres.join(', ')}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-400 font-mono">Released {game.releaseDate}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
                {game.name}
              </h2>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onToggleFavorite(game.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-950/60 border-rose-600 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'bg-[#121c32] hover:bg-[#192745] border-[#1e2e50] text-slate-200'
                }`}
              >
                <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                <span>{isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}</span>
              </button>

              <a
                href={game.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>PLAY OFFICIAL GAME</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>

              {onOpenDetailPage && (
                <button
                  onClick={() => onOpenDetailPage(game.slug)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Full Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Description & Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Description & Tags */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  About The Game
                </h3>
                <p className="text-slate-300 leading-relaxed text-base font-normal">
                  {game.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                  Tags & Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-[#111a2f] border border-[#1d2b4a] text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Similar Roblox Games Highlight Box */}
              {game.similarRobloxGames.length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40">
                  <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-1">
                    Roblox Players Experience Match
                  </div>
                  <p className="text-sm text-slate-300 leading-normal">
                    If you love playing{' '}
                    <span className="font-bold text-white">
                      {game.similarRobloxGames.join(', ')}
                    </span>{' '}
                    on Roblox, {game.name} delivers a deeper, standalone gaming experience with comparable core loops and higher graphical fidelity.
                  </p>
                </div>
              )}
            </div>

            {/* Right 1 Col: Quick Game Specs */}
            <div className="space-y-4 rounded-2xl bg-[#0e1627] border border-[#182642] p-5 text-xs">
              <h3 className="font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Scouted Game Specs
              </h3>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Developer</span>
                <span className="font-semibold text-white">{game.developer || 'Official Studio'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Multiplayer Type</span>
                <span className="font-semibold text-white capitalize">
                  {game.multiplayerLabel || game.multiplayer.replace('_', ' ')}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Player Base</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  {game.playerCount}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Platforms</span>
                <span className="font-semibold text-white text-right">
                  {game.platforms.join(', ')}
                </span>
              </div>

              {game.creationTools && (
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-400">Creation Tools</span>
                  <span className="font-semibold text-indigo-300 text-right">
                    {game.creationTools}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-2">
                <span className="text-slate-400">Official Link</span>
                <a
                  href={game.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-mono"
                >
                  Visit Official Portal
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Similar Recommended Games Row */}
          {similarGameObjects.length > 0 && (
            <div className="pt-6 border-t border-[#18233d]">
              <h3 className="text-base font-bold text-white mb-4 font-heading">
                Similar Scouted Games You Might Enjoy
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarGameObjects.slice(0, 3).map((simGame) => (
                  <div
                    key={simGame.id}
                    onClick={() => onSelectGame(simGame)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#0e1627] hover:bg-[#18253e] border border-[#1b2742] transition-colors cursor-pointer group"
                  >
                    <img
                      src={simGame.coverImage}
                      alt={simGame.name}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-blue-400 truncate">
                        {simGame.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {simGame.genres.slice(0, 2).join(' / ')}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono">
                        {simGame.priceType === 'free' ? 'FREE' : 'PAID'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

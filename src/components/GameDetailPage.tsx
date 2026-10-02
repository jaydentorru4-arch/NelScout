import React, { useState } from 'react';
import { Game } from '../types/game';
import { GameCard } from './GameCard';
import { GameImage } from './GameImage';
import {
  ArrowLeft,
  Play,
  Heart,
  Globe,
  Users,
  Monitor,
  Gamepad,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface GameDetailPageProps {
  game: Game;
  onBack: () => void;
  onPreview: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  allGames: Game[];
  onSelectGame: (game: Game) => void;
}

export const GameDetailPage: React.FC<GameDetailPageProps> = ({
  game,
  onBack,
  onPreview,
  onToggleFavorite,
  isFavorite,
  allGames,
  onSelectGame,
}) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string>(
    game.screenshots[0] || game.coverImage
  );

  const similarGameObjects = allGames.filter(
    (g) => game.similarGames.includes(g.id) || game.similarGames.includes(g.slug)
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1627] hover:bg-[#18253e] border border-[#1b2742] text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>
      </div>

      {/* Hero Artwork Banner */}
      <div className="relative h-[380px] sm:h-[480px] w-full overflow-hidden bg-slate-950">
        <GameImage
          src={game.bannerImage || game.coverImage}
          alt={game.name}
          genre={game.genres[0]}
          gameName={game.name}
          className="w-full h-full object-cover object-center opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-transparent to-transparent" />

        {/* Floating Hero Content */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              {game.priceLabel || (game.priceType === 'free' ? 'FREE TO PLAY' : 'PAID')}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300 text-xs font-semibold">{game.genres.join(' / ')}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400 text-xs font-mono">Released {game.releaseDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight mb-4">
            {game.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={game.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.65)] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>PLAY OFFICIAL GAME</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>

            <button
              onClick={() => onToggleFavorite(game.id)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-950/60 border-rose-600 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-[#0f172a] hover:bg-[#1a2944] border-slate-700/80 text-slate-200'
              }`}
            >
              <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
              <span>{isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-xl font-black text-white font-heading tracking-tight mb-3">
                Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-base font-normal">
                {game.description}
              </p>
            </div>

            {/* Screenshots Showcase */}
            {game.screenshots.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-white font-heading tracking-tight mb-4">
                  Screenshots & Media
                </h2>

                {/* Main Selected Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-[#1b2742] mb-3 shadow-xl">
                  <GameImage
                    src={selectedScreenshot}
                    alt={`${game.name} preview`}
                    genre={game.genres[0]}
                    gameName={game.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                  {game.screenshots.map((shot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedScreenshot(shot)}
                      className={`relative w-28 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedScreenshot === shot
                          ? 'border-blue-500 scale-102'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <GameImage
                        src={shot}
                        alt="thumbnail"
                        genre={game.genres[0]}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer Area */}
            {game.trailer && (
              <div>
                <h2 className="text-xl font-black text-white font-heading tracking-tight mb-4">
                  Official Gameplay Trailer
                </h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-[#1b2742] shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${game.trailer}?autoplay=0&modestbranding=1&rel=0`}
                    title={`${game.name} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Similar Roblox Experiences */}
            {game.similarRobloxGames.length > 0 && (
              <div className="p-6 rounded-3xl bg-blue-950/20 border border-blue-900/50">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Roblox Player Cross-Over Guide</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Similar to {game.similarRobloxGames.join(', ')}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Players coming from Roblox’s top titles will appreciate {game.name}’s comparable progression mechanics, social communities, and dedicated servers. It offers the same core thrill with dedicated optimization and deep mechanics.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Specifications Card */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#0c1322] border border-[#18233c] p-6 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold pb-2 border-b border-slate-800">
                Game Information
              </h3>

              <div className="flex justify-between py-2 border-b border-slate-800/80 text-sm">
                <span className="text-slate-400">Developer</span>
                <span className="font-semibold text-white">{game.developer || 'Official Studio'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80 text-sm">
                <span className="text-slate-400">Publisher</span>
                <span className="font-semibold text-white">{game.publisher || game.developer || 'Official'}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80 text-sm">
                <span className="text-slate-400">Multiplayer</span>
                <span className="font-semibold text-white capitalize">
                  {game.multiplayerLabel || game.multiplayer.replace('_', ' ')}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80 text-sm">
                <span className="text-slate-400">Player Base</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  {game.playerCount}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/80 text-sm">
                <span className="text-slate-400">Rating</span>
                <span className="font-semibold text-amber-400 font-mono">
                  ⭐ {game.rating || 4.7} / 5.0
                </span>
              </div>

              <div className="py-2 border-b border-slate-800/80 text-sm">
                <span className="text-slate-400 block mb-1">Supported Platforms</span>
                <div className="flex flex-wrap gap-1.5">
                  {game.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-md bg-[#080d17] border border-[#1b2846] text-xs font-medium text-slate-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {game.gameModes && (
                <div className="py-2 border-b border-slate-800/80 text-sm">
                  <span className="text-slate-400 block mb-1">Game Modes</span>
                  <p className="text-xs text-slate-300">{game.gameModes.join(', ')}</p>
                </div>
              )}

              {game.creationTools && (
                <div className="py-2 border-b border-slate-800/80 text-sm">
                  <span className="text-slate-400 block mb-1">Creation & Modding</span>
                  <p className="text-xs text-indigo-300 font-medium">{game.creationTools}</p>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={game.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY OFFICIAL GAME</span>
                </a>
              </div>
            </div>

            {/* Tags Box */}
            <div className="rounded-3xl bg-[#0c1322] border border-[#18233c] p-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Genres & Keywords
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {game.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#080d17] border border-[#18253e] text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Games Section */}
        {similarGameObjects.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#18233c]">
            <h2 className="text-2xl font-black text-white font-heading tracking-tight mb-6">
              More Games Similar to {game.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarGameObjects.map((simGame) => (
                <GameCard
                  key={simGame.id}
                  game={simGame}
                  onPreview={onPreview}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={isFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

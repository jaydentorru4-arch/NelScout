import React from 'react';
import { Game } from '../types/game';
import { GameImage } from './GameImage';
import { Heart, Play, Eye, Monitor, Smartphone, Gamepad, Globe, Users } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPreview: (game: Game) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onPreview,
  onToggleFavorite,
  isFavorite,
}) => {
  // Helper to render platform icons cleanly
  const renderPlatformIcons = () => {
    const hasPC = game.platforms.includes('PC') || game.platforms.includes('Browser');
    const hasConsole = game.platforms.includes('Xbox') || game.platforms.includes('PlayStation') || game.platforms.includes('Nintendo Switch');
    const hasMobile = game.platforms.includes('Android') || game.platforms.includes('iOS');

    return (
      <div className="flex items-center gap-1.5 text-slate-400" title={game.platforms.join(', ')}>
        {hasPC && <Monitor className="w-3.5 h-3.5" />}
        {hasConsole && <Gamepad className="w-3.5 h-3.5" />}
        {hasMobile && <Smartphone className="w-3.5 h-3.5" />}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#0c1322] border border-[#18233c] hover:border-blue-600/60 overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgba(29,78,216,0.22)] transition-all duration-300 transform hover:-translate-y-1">
      {/* Artwork Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onPreview(game)}>
        <GameImage
          src={game.coverImage}
          alt={game.name}
          genre={game.genres[0]}
          gameName={game.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-[#0c1322]/20 to-black/30" />

        {/* Top Badges Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Price Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold tracking-wide">
            {game.priceType === 'free' ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FREE
              </span>
            ) : game.priceType === 'free_with_purchases' ? (
              <span className="text-sky-300">FREE-TO-PLAY</span>
            ) : (
              <span className="text-amber-400">PAID</span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                : 'bg-black/60 border-white/10 text-slate-300 hover:text-white hover:bg-black/80'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Quick Preview Hover Overlay */}
        <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(game);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Preview Game
          </button>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Genres & Platforms */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <div className="flex items-center gap-1.5 truncate pr-2 font-medium">
              <span>{game.genres.slice(0, 2).join(' / ')}</span>
            </div>
            {renderPlatformIcons()}
          </div>

          {/* Title */}
          <h3
            onClick={() => onPreview(game)}
            className="text-base sm:text-lg font-bold text-white hover:text-blue-400 font-heading tracking-tight transition-colors line-clamp-1 cursor-pointer"
          >
            {game.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {game.shortDescription}
          </p>

          {/* Multiplayer & Online status */}
          <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-300 font-mono">
            <span className="flex items-center gap-1 text-slate-300">
              <Globe className="w-3 h-3 text-blue-400" />
              ONLINE
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Users className="w-3 h-3 text-indigo-400" />
              {game.multiplayer === 'singleplayer' ? 'SOLO' : 'MULTIPLAYER'}
            </span>
          </div>

          {/* Similar to Roblox game badge */}
          {game.similarRobloxGames.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-[#18233c] text-xs">
              <span className="text-slate-400">Similar to: </span>
              <span className="font-semibold text-blue-300 hover:underline cursor-pointer" onClick={() => onPreview(game)}>
                {game.similarRobloxGames[0]}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#18233c] flex items-center gap-2">
          <button
            onClick={() => onPreview(game)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-200 bg-[#121c32] hover:bg-[#1c2c4e] border border-[#1e2e50] rounded-xl transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>Preview</span>
          </button>

          <a
            href={game.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Official</span>
          </a>
        </div>
      </div>
    </div>
  );
};

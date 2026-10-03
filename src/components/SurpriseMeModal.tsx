import React, { useState, useEffect } from 'react';
import { Game } from '../types/game';
import { GameImage } from './GameImage';
import { Dices, Play, Eye, RotateCw, X, Trophy } from 'lucide-react';
import surpriseBackdrop from '../assets/images/surprise_me_backdrop_1790702544718.jpg';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  allGames: Game[];
  onPreview: (game: Game) => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  allGames,
  onPreview,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const rollGame = () => {
    if (!allGames.length) return;
    setIsRolling(true);

    let counter = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * allGames.length);
      setSelectedGame(allGames[randomIdx]);
      counter++;
      if (counter > 12) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 90);
  };

  useEffect(() => {
    if (isOpen) {
      rollGame();
    }
  }, [isOpen]);

  if (!isOpen || !selectedGame) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-[#090f1c] border border-blue-600/40 shadow-[0_0_50px_rgba(37,99,235,0.35)] animate-in zoom-in-95 duration-200">
        {/* Holographic Header Art */}
        <div className="relative h-44 overflow-hidden bg-slate-950">
          <img
            src={surpriseBackdrop}
            alt="Scout lottery core"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090f1c] via-[#090f1c]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-600/80 text-white shadow-lg">
              <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
            </span>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                NEL SCOUT RANDOMIZER
              </span>
              <h2 className="text-xl font-black text-white font-heading tracking-tight">
                YOUR SCOUTED GAME
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex gap-4 items-start">
            <div
              className={`w-28 h-28 rounded-2xl overflow-hidden border border-[#1e2d4d] shadow-lg shrink-0 transition-transform ${
                isRolling ? 'scale-95 opacity-70 blur-[1px]' : 'scale-100 opacity-100'
              }`}
            >
              <GameImage
                src={selectedGame.coverImage}
                alt={selectedGame.name}
                genre={selectedGame.genres[0]}
                gameName={selectedGame.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {selectedGame.priceType === 'free' ? 'FREE TO PLAY' : 'PAID'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 capitalize">
                  {selectedGame.multiplayer === 'singleplayer' ? 'Solo' : 'Multiplayer'}
                </span>
              </div>

              <h3 className="text-xl font-black text-white font-heading truncate">
                {selectedGame.name}
              </h3>

              <p className="text-xs text-blue-300 font-medium mt-0.5 truncate">
                {selectedGame.genres.join(' · ')}
              </p>

              <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                {selectedGame.shortDescription}
              </p>
            </div>
          </div>

          {selectedGame.tags.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-slate-300">
              <span className="text-blue-400 font-mono font-bold">Key Tags: </span>
              <span className="font-semibold text-white">{selectedGame.tags.join(', ')}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 pt-5 border-t border-[#18233d] flex flex-wrap gap-2.5">
            <button
              onClick={rollGame}
              disabled={isRolling}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1a2944] border border-[#1e2d4d] text-slate-200 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin' : ''}`} />
              <span>Re-roll Scout</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onPreview(selectedGame);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#131d33] hover:bg-[#1c2c4d] border border-[#203258] text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Preview</span>
            </button>

            <a
              href={selectedGame.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY GAME</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

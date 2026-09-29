import React, { useState } from 'react';
import { Game } from '../types/game';
import { Layers, ArrowLeftRight, Check, Play, ExternalLink } from 'lucide-react';

interface GameComparisonProps {
  allGames: Game[];
  onPreview: (game: Game) => void;
}

export const GameComparison: React.FC<GameComparisonProps> = ({
  allGames,
  onPreview,
}) => {
  const [gameAId, setGameAId] = useState<string>(allGames[0]?.id || 'fortnite');
  const [gameBId, setGameBId] = useState<string>(allGames[1]?.id || 'roblox');

  const gameA = allGames.find((g) => g.id === gameAId) || allGames[0];
  const gameB = allGames.find((g) => g.id === gameBId) || allGames[1];

  const swapGames = () => {
    setGameAId(gameB.id);
    setGameBId(gameA.id);
  };

  const comparisonRows = [
    {
      label: 'Main Genres',
      valA: gameA.genres.join(', '),
      valB: gameB.genres.join(', '),
    },
    {
      label: 'Price & Monetization',
      valA: gameA.priceLabel || (gameA.priceType === 'free' ? 'Free to Play' : 'Paid'),
      valB: gameB.priceLabel || (gameB.priceType === 'free' ? 'Free to Play' : 'Paid'),
    },
    {
      label: 'Supported Platforms',
      valA: gameA.platforms.join(', '),
      valB: gameB.platforms.join(', '),
    },
    {
      label: 'Multiplayer Structure',
      valA: gameA.multiplayerLabel || gameA.multiplayer.replace('_', ' '),
      valB: gameB.multiplayerLabel || gameB.multiplayer.replace('_', ' '),
    },
    {
      label: 'Player Base',
      valA: gameA.playerCount,
      valB: gameB.playerCount,
    },
    {
      label: 'Creation Tools & Modding',
      valA: gameA.creationTools || 'Standard Gameplay (No Builder)',
      valB: gameB.creationTools || 'Standard Gameplay (No Builder)',
    },
    {
      label: 'Game Modes',
      valA: gameA.gameModes ? gameA.gameModes.join(', ') : 'Standard Campaign & Matches',
      valB: gameB.gameModes ? gameB.gameModes.join(', ') : 'Standard Campaign & Matches',
    },
    {
      label: 'Roblox Parallels',
      valA: gameA.similarRobloxGames.length > 0 ? gameA.similarRobloxGames.join(', ') : 'None',
      valB: gameB.similarRobloxGames.length > 0 ? gameB.similarRobloxGames.join(', ') : 'None',
    },
  ];

  return (
    <div className="py-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-400 text-xs font-mono font-bold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>SIDE-BY-SIDE SCOUT ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-2">
          GAME COMPARISON
        </h2>
        <p className="text-slate-400 text-sm">
          Select any two scouted games to explore and compare their specifications, engine capabilities, platform availability, and community scale side-by-side.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c1322] border border-[#192742] mb-8">
        {/* Game A Selector */}
        <div className="w-full sm:flex-1">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5 block">
            Select Game 1
          </label>
          <select
            value={gameAId}
            onChange={(e) => setGameAId(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#080d17] border border-[#1d2b48] text-sm font-bold text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {allGames.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={swapGames}
          className="p-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 transition-colors cursor-pointer shrink-0"
          title="Swap games"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>

        {/* Game B Selector */}
        <div className="w-full sm:flex-1">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5 block">
            Select Game 2
          </label>
          <select
            value={gameBId}
            onChange={(e) => setGameBId(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-[#080d17] border border-[#1d2b48] text-sm font-bold text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {allGames.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Cards Header */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Card Game A */}
        <div className="p-5 rounded-2xl bg-[#0a101d] border border-blue-900/40 text-center flex flex-col items-center">
          <img
            src={gameA.coverImage}
            alt={gameA.name}
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-700/60 shadow-lg mb-3"
          />
          <h3 className="text-lg sm:text-xl font-black text-white font-heading">{gameA.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => onPreview(gameA)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              Preview
            </button>
            <a
              href={gameA.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Official Site</span>
            </a>
          </div>
        </div>

        {/* Card Game B */}
        <div className="p-5 rounded-2xl bg-[#0a101d] border border-indigo-900/40 text-center flex flex-col items-center">
          <img
            src={gameB.coverImage}
            alt={gameB.name}
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-700/60 shadow-lg mb-3"
          />
          <h3 className="text-lg sm:text-xl font-black text-white font-heading">{gameB.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => onPreview(gameB)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              Preview
            </button>
            <a
              href={gameB.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Official Site</span>
            </a>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-2xl bg-[#0c1322] border border-[#192742] overflow-hidden shadow-xl">
        <div className="divide-y divide-[#192742]">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="p-4 sm:p-5 hover:bg-[#0f192b]/50 transition-colors">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
                {row.label}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="text-slate-200 font-medium border-r border-[#192742] pr-4">
                  {row.valA}
                </div>
                <div className="text-slate-200 font-medium pl-2">
                  {row.valB}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Compass, Dices, ShieldCheck, Layers } from 'lucide-react';
import heroArtwork from '../assets/images/hero_gaming_scout_1790702521465.jpg';

interface HeroProps {
  onExplore: () => void;
  onSurprise: () => void;
  onSelectRobloxSection?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplore,
  onSurprise,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-[#18233d] bg-[#060913]">
      {/* Background Artwork with Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroArtwork}
          alt="Gaming multiverse scout realm"
          className="h-full w-full object-cover object-center opacity-45 transform scale-105 transition-transform duration-1000"
          loading="eager"
        />
        {/* Layered cinematic scrims for 100% readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-[#060913]/70 to-[#060913]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-heading leading-tight mb-6">
            SCOUT YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]">
              NEXT GAME.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
            Discover free online games, explore new genres, and scout the best standalone and cross-platform titles curated for you.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onExplore}
              className="flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Games</span>
            </button>

            <button
              onClick={onSurprise}
              className="flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-slate-200 bg-[#0e172a]/90 hover:bg-[#1e293b] border border-blue-900/50 hover:border-blue-700/60 rounded-xl shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Dices className="w-5 h-5 text-indigo-400" />
              <span>Surprise Me</span>
            </button>
          </div>

          {/* Quick Metrics & Trust Signals */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-black text-white font-mono tabular-nums">100+</div>
              <div className="text-xs text-slate-400">Scouted Standalone Titles</div>
            </div>
            <div>
              <div className="text-2xl font-black text-blue-400 font-mono tabular-nums">15+</div>
              <div className="text-xs text-slate-400">Unique Genres</div>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Verified Official Game URLs Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

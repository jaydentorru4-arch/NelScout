import React, { useState } from 'react';
import { NelScoutLogo } from './NelScoutLogo';
import { ShieldCheck, Heart, ExternalLink, X } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const openLegalModal = (title: string) => {
    setLegalModalTitle(title);
  };

  const closeLegalModal = () => {
    setLegalModalTitle(null);
  };

  return (
    <footer className="border-t border-[#18233d] bg-[#050811] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <NelScoutLogo size="lg" />
            <p className="text-sm text-slate-300 max-w-md leading-relaxed mt-2">
              <strong className="text-white">Scout your next game.</strong> Discover 100+ free online games, explore new standalone titles, and find games matching your favorite genres and playstyles.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Direct Official Play Portals · No Piracy Guarantee</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('discover')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Discover
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('games')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  All Scouted Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('matcher')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Game Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('free-games')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Free Games Only
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('categories')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('trending')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Trending Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('compare')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Game Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('favorites')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Saved Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Information & Safety
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => openLegalModal('Privacy Policy')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('Terms of Service')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('Contact Scout Team')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => openLegalModal('Report an Outdated Game Link')}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Report a Game
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#141e33] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} <strong>NEL SCOUT</strong>. All trademarks, registered trademarks and game images belong to their respective owners.
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Discover. Preview. Play.
          </div>
        </div>
      </div>

      {/* Simple Information / Legal Modal */}
      {legalModalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0c1322] border border-[#1b2b4b] p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-heading">{legalModalTitle}</h3>
              <button
                onClick={closeLegalModal}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 text-xs text-slate-300 leading-relaxed space-y-2">
              <p>
                <strong>NEL SCOUT</strong> is a public gaming discovery and cataloguing platform. Our mission is to connect gamers with legitimate, safe, and officially published free online games and standalone experiences.
              </p>
              <p>
                All "PLAY OFFICIAL GAME" buttons strictly redirect users to official developer websites or approved platforms (Steam, Epic Games Store, official game launchers, Google Play, Apple App Store). We never distribute, re-host, or promote pirated media or unapproved third-party files.
              </p>
              <p>
                To suggest a game for inclusion, request data corrections, or report an outdated link, contact our scout team at{' '}
                <span className="text-blue-400 font-mono">scout@nelscout.gg</span>.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={closeLegalModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

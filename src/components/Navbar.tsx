import React, { useState } from 'react';
import { NelScoutLogo } from './NelScoutLogo';
import { Search, Heart, Sparkles, Menu, X, Dices, Layers } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenSurprise: () => void;
  favoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenSurprise,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'discover', label: 'Discover' },
    { id: 'games', label: 'Games' },
    { id: 'roblox-alternatives', label: 'Roblox Alternatives' },
    { id: 'categories', label: 'Categories' },
    { id: 'trending', label: 'Trending' },
    { id: 'free-games', label: 'Free Games' },
    { id: 'compare', label: 'Compare' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#18233d] bg-[#060913]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Zone */}
        <div
          onClick={() => handleNavClick('discover')}
          className="cursor-pointer transition-opacity hover:opacity-95"
        >
          <NelScoutLogo size="md" />
        </div>

        {/* Middle: Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-1.5 text-sm font-semibold tracking-wide transition-all whitespace-nowrap rounded-md ${
                  isActive
                    ? 'text-white bg-[#1e293b]/70 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 bg-[#0e172a] hover:bg-[#1e293b] border border-[#1e293b] rounded-lg transition-colors group cursor-pointer"
            title="Search games, genres, Roblox experiences..."
          >
            <Search className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
            <span className="hidden sm:inline font-medium">Search...</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Surprise Me / Scout Dice */}
          <button
            onClick={onOpenSurprise}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.35)] transition-all cursor-pointer whitespace-nowrap"
            title="Scout a random game"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Surprise Me</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => handleNavClick('favorites')}
            className={`relative p-2 rounded-lg border transition-colors cursor-pointer ${
              currentTab === 'favorites'
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-400'
                : 'bg-[#0e172a] border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1e293b]'
            }`}
            title="View saved favorites"
            aria-label="Favorites"
          >
            <Heart className="w-4 h-4" fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white bg-[#0e172a] border border-[#1e293b] rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#18233d] bg-[#090e1d] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#18233d] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSurprise();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md"
            >
              <Dices className="w-4 h-4" />
              Surprise Me
            </button>
            <button
              onClick={() => handleNavClick('favorites')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              Favorites ({favoritesCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

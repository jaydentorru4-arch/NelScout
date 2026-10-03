import React, { useState, useRef, useEffect } from 'react';
import { NelScoutLogo } from './NelScoutLogo';
import {
  Search,
  Heart,
  Dices,
  Menu,
  X,
  ChevronDown,
  Layers,
  Compass,
  Gamepad2,
  Flame,
  Award,
  Grid,
} from 'lucide-react';

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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Top 5 primary desktop links (prevents bar clutter)
  const primaryLinks = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'matcher', label: 'Game Matcher', icon: Layers },
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'free-games', label: 'Free Games', icon: Award },
  ];

  // Secondary items in "More" dropdown
  const secondaryLinks = [
    { id: 'categories', label: 'Categories', icon: Grid, desc: 'Browse all 15 gaming genres' },
    { id: 'compare', label: 'Compare', icon: Layers, desc: 'Side-by-side game comparison' },
  ];

  // All links for mobile menu
  const allNavLinks = [
    ...primaryLinks,
    ...secondaryLinks,
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isSecondaryActive = secondaryLinks.some((l) => l.id === currentTab);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#18233d] bg-[#060913]/95 backdrop-blur-lg">
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left: Brand Zone */}
        <div
          onClick={() => handleNavClick('discover')}
          className="cursor-pointer group py-1"
        >
          <NelScoutLogo size="md" />
        </div>

        {/* Middle: Clean, Uncluttered Navigation (Desktop lg+) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {primaryLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-semibold tracking-wide transition-all whitespace-nowrap rounded-lg cursor-pointer ${
                  isActive
                    ? 'text-white bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(37,99,235,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* "More" Dropdown Menu for Categories & Compare */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                isSecondaryActive
                  ? 'text-white bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>Explore More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl bg-[#0c1427] border border-[#1e2d4e] shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                {secondaryLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isActive ? 'bg-blue-600/20 text-blue-300' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-2 text-xs text-slate-300 bg-[#0e1627] hover:bg-[#18243c] border border-[#1b2742] hover:border-blue-500/40 rounded-xl transition-all cursor-pointer group shadow-sm"
            title="Search 100+ games, genres, tags..."
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
            <span className="hidden md:inline font-medium">Search</span>
            <kbd className="hidden xl:inline text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Surprise Me / Dice Button (Compact on tablet/desktop) */}
          <button
            onClick={onOpenSurprise}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.35)] transition-all cursor-pointer whitespace-nowrap"
            title="Scout a random game"
          >
            <Dices className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Surprise Me</span>
          </button>

          {/* Favorites Button */}
          <button
            onClick={() => handleNavClick('favorites')}
            className={`relative p-2 sm:px-3 sm:py-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'favorites'
                ? 'bg-rose-950/50 border-rose-800 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-[#0e1627] border-[#1b2742] text-slate-300 hover:text-white hover:bg-[#18243c]'
            }`}
            title="View saved favorites"
            aria-label="Favorites"
          >
            <Heart className="w-4 h-4 text-rose-400" fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
            <span className="hidden md:inline text-xs font-semibold">{favoritesCount}</span>
            {favoritesCount > 0 && (
              <span className="md:hidden absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-[#0e1627] border border-[#1b2742] rounded-xl transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Optimised Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#18233d] bg-[#070c18] px-4 pt-3 pb-6 animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Quick Search Tap inside Drawer */}
          <div className="mb-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0c1427] border border-[#1e2d4e] text-xs text-slate-400 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400" />
                <span>Search 100+ games, genres, tags...</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Tap to search</span>
            </button>
          </div>

          {/* Clean Categorized Navigation Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {allNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/25 text-blue-300 border border-blue-500/40 shadow-sm'
                      : 'bg-[#0c1424] hover:bg-[#121c32] text-slate-300 border border-[#16223a]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Row for Mobile Drawer */}
          <div className="pt-2 border-t border-[#18233d] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSurprise();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              <Dices className="w-4 h-4" />
              <span>Surprise Me</span>
            </button>

            <button
              onClick={() => handleNavClick('favorites')}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0e1627] hover:bg-[#18243c] border border-[#1b2742] text-slate-200 text-xs font-semibold cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
              <span>Favorites ({favoritesCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

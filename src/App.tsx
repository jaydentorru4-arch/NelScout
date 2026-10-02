import React, { useState, useEffect, useMemo } from 'react';
import { ALL_GAMES } from './data/allGames';
import { Game, FilterState, GenreType } from './types/game';
import { useFavorites } from './hooks/useFavorites';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { GameCard } from './components/GameCard';
import { GameImage } from './components/GameImage';
import { GamePreviewModal } from './components/GamePreviewModal';
import { GameDetailPage } from './components/GameDetailPage';
import { RobloxAlternatives } from './components/RobloxAlternatives';
import { TrendingCarousel } from './components/TrendingCarousel';
import { FilterSidebar } from './components/FilterSidebar';
import { GameComparison } from './components/GameComparison';
import { SurpriseMeModal } from './components/SurpriseMeModal';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  Flame,
  Sparkles,
  Gamepad2,
  Clock,
  Heart,
  Grid,
  Search,
  Filter,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';

const CATEGORIES_LIST: { name: GenreType; icon: string; description: string }[] = [
  { name: 'Action', icon: '🎮', description: 'Fast reflexes, intense combat and agility' },
  { name: 'Shooter', icon: '🔫', description: 'Tactical gunplay, arena FPS and hero battles' },
  { name: 'Horror', icon: '👻', description: 'Spine-chilling jumpscares, entities and survival' },
  { name: 'Racing', icon: '🏎️', description: 'High-speed circuits, nitro boosts and stunts' },
  { name: 'RPG', icon: '🧙', description: 'Rich character progression, skill trees and lore' },
  { name: 'Simulation', icon: '🌱', description: 'Cozy life sims, crafting, towns and pets' },
  { name: 'Roleplay', icon: '🏠', description: 'Avatar dress up, town exploration and socializing' },
  { name: 'Sandbox', icon: '🧱', description: 'Limitless creative building and physics fun' },
  { name: 'Fighting', icon: '🥊', description: 'Brawlers, combos and competitive 1v1 arenas' },
  { name: 'Puzzle', icon: '🧩', description: 'Brain teasers, deduction and escape challenges' },
  { name: 'Building', icon: '🏗️', description: 'Architectural freedom and engineering' },
  { name: 'Party', icon: '🎉', description: 'Wacky multiplayer minigames and laughter' },
  { name: 'Adventure', icon: '⚔️', description: 'Quests, mystery solving and world exploration' },
  { name: 'Strategy', icon: '🧠', description: 'Tactical planning, resource economy and chess-like depth' },
  { name: 'Open World', icon: '🌎', description: 'Expansive horizons with total free roaming' },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('discover');
  const [activeGameSlug, setActiveGameSlug] = useState<string | null>(null);
  const [previewGame, setPreviewGame] = useState<Game | null>(null);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  const { recentIds, addRecentlyViewed } = useRecentlyViewed();

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedGenres: [],
    selectedPlatforms: [],
    priceType: 'all',
    multiplayer: 'all',
    sortBy: 'trending',
    robloxFilter: undefined,
  });

  // Hash-based routing synchronization so back button and direct links work
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('game/')) {
        const slug = hash.replace('game/', '');
        setActiveGameSlug(slug);
        setCurrentTab('game-detail');
      } else if (hash) {
        setCurrentTab(hash);
        setActiveGameSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToTab = (tab: string) => {
    setCurrentTab(tab);
    setActiveGameSlug(null);
    window.location.hash = tab === 'discover' ? '' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGame = (slug: string) => {
    setActiveGameSlug(slug);
    setCurrentTab('game-detail');
    window.location.hash = `game/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPreview = (game: Game) => {
    setPreviewGame(game);
    addRecentlyViewed(game.id);
  };

  // Filtered and Sorted Games
  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter((game) => {
      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesName = game.name.toLowerCase().includes(q);
        const matchesDesc = game.shortDescription.toLowerCase().includes(q);
        const matchesGenre = game.genres.some((g) => g.toLowerCase().includes(q));
        const matchesTag = game.tags.some((t) => t.toLowerCase().includes(q));
        const matchesRoblox = game.similarRobloxGames.some((r) => r.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesGenre && !matchesTag && !matchesRoblox) {
          return false;
        }
      }

      // Roblox filter
      if (filters.robloxFilter) {
        const matchesRoblox = game.similarRobloxGames.some(
          (r) => r.toLowerCase() === filters.robloxFilter?.toLowerCase()
        );
        if (!matchesRoblox) return false;
      }

      // Free Games Only Tab or price filter
      if (currentTab === 'free-games' || filters.priceType === 'free_only') {
        if (game.priceType !== 'free' && game.priceType !== 'free_with_purchases') {
          return false;
        }
      } else if (filters.priceType === 'paid_only') {
        if (game.priceType !== 'paid') return false;
      }

      // Genres
      if (filters.selectedGenres.length > 0) {
        const hasGenre = filters.selectedGenres.some((g) => game.genres.includes(g));
        if (!hasGenre) return false;
      }

      // Platforms
      if (filters.selectedPlatforms.length > 0) {
        const hasPlatform = filters.selectedPlatforms.some((p) => game.platforms.includes(p));
        if (!hasPlatform) return false;
      }

      // Multiplayer
      if (filters.multiplayer !== 'all') {
        if (game.multiplayer !== filters.multiplayer) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') {
        return (b.rating || 4.5) - (a.rating || 4.5);
      }
      if (filters.sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      if (filters.sortBy === 'newest') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      }
      // default: trending
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      return 0;
    });
  }, [filters, currentTab]);

  // Derived sets for Carousels
  const trendingGames = useMemo(() => ALL_GAMES.filter((g) => g.trending), []);
  const risingGames = useMemo(() => ALL_GAMES.filter((g) => g.rising || g.featured), []);
  const hiddenGems = useMemo(() => ALL_GAMES.filter((g) => g.hiddenGem), []);
  const freeGamesList = useMemo(
    () => ALL_GAMES.filter((g) => g.priceType === 'free' || g.priceType === 'free_with_purchases'),
    []
  );
  const favoriteGamesList = useMemo(
    () => ALL_GAMES.filter((g) => favorites.includes(g.id)),
    [favorites]
  );
  const recentlyViewedGames = useMemo(
    () => ALL_GAMES.filter((g) => recentIds.includes(g.id)),
    [recentIds]
  );

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedGenres: [],
      selectedPlatforms: [],
      priceType: 'all',
      multiplayer: 'all',
      sortBy: 'trending',
      robloxFilter: undefined,
    });
  };

  const handleSelectRobloxFromSearch = (robloxName: string) => {
    setFilters((prev) => ({ ...prev, robloxFilter: robloxName, searchQuery: '' }));
    navigateToTab('roblox-alternatives');
  };

  const handleSelectCategory = (genre: GenreType) => {
    setFilters((prev) => ({
      ...prev,
      selectedGenres: [genre],
      searchQuery: '',
    }));
    navigateToTab('games');
  };

  const activeGame = activeGameSlug
    ? ALL_GAMES.find((g) => g.slug === activeGameSlug) || ALL_GAMES[0]
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#060913] text-[#e2e8f0]">
      {/* Sticky Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={navigateToTab}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
        favoritesCount={favoritesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-0">
        {/* GAME DETAIL PAGE */}
        {currentTab === 'game-detail' && activeGame ? (
          <GameDetailPage
            game={activeGame}
            onBack={() => navigateToTab('discover')}
            onPreview={handleOpenPreview}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(activeGame.id)}
            allGames={ALL_GAMES}
            onSelectGame={handleOpenPreview}
          />
        ) : currentTab === 'discover' ? (
          /* DISCOVER TAB (HOMEPAGE) */
          <div>
            {/* Hero Section */}
            <Hero
              onExplore={() => {
                const el = document.getElementById('explore-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSurprise={() => setIsSurpriseOpen(true)}
              onSelectRobloxSection={() => navigateToTab('roblox-alternatives')}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="explore-section">
              {/* Search Bar prominently positioned */}
              <div className="mb-12">
                <SearchBar
                  value={filters.searchQuery}
                  onChange={(val) => setFilters((prev) => ({ ...prev, searchQuery: val }))}
                  onSelectGame={handleOpenPreview}
                  onSelectRoblox={handleSelectRobloxFromSearch}
                  allGames={ALL_GAMES}
                />
              </div>

              {/* Recently Viewed Row */}
              {recentlyViewedGames.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Jump Back In · Recently Viewed</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {recentlyViewedGames.slice(0, 8).map((game) => (
                      <div
                        key={game.id}
                        onClick={() => handleOpenPreview(game)}
                        className="w-44 shrink-0 rounded-xl bg-[#0c1322] border border-[#18233c] hover:border-blue-500/50 p-2.5 transition-colors cursor-pointer group"
                      >
                        <div className="w-full h-24 rounded-lg overflow-hidden mb-2">
                          <GameImage
                            src={game.coverImage}
                            alt={game.name}
                            genre={game.genres[0]}
                            gameName={game.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-400 truncate">
                          {game.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {game.genres[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Now Horizontal Carousel */}
              <TrendingCarousel
                title="🔥 TRENDING NOW"
                subtitle="The most scouted games and breakout multiplayer hits this week"
                games={trendingGames}
                onPreview={handleOpenPreview}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />

              {/* Popular Free Games Horizontal Carousel */}
              <TrendingCarousel
                title="🟢 POPULAR FREE GAMES"
                subtitle="100% Free-to-play with zero upfront cost"
                icon={<Award className="w-5 h-5 text-emerald-400" />}
                games={freeGamesList}
                onPreview={handleOpenPreview}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />

              {/* Hidden Gems Carousel */}
              <TrendingCarousel
                title="💎 HIDDEN GEMS"
                subtitle="Underrated community favorites and creative masterpieces"
                icon={<Sparkles className="w-5 h-5 text-indigo-400" />}
                games={hiddenGems}
                onPreview={handleOpenPreview}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />

              {/* All Scouted Games Grid with Filter Sidebar */}
              <div className="mt-16 pt-10 border-t border-[#18233d]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
                      ALL SCOUTED GAMES
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">
                      Showing {filteredGames.length} of {ALL_GAMES.length} curated titles
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left Column: Filter Sidebar */}
                  <div className="lg:col-span-1">
                    <FilterSidebar
                      filters={filters}
                      onChangeFilters={setFilters}
                      onReset={resetFilters}
                      totalFilteredCount={filteredGames.length}
                    />
                  </div>

                  {/* Right Column: Game Grid */}
                  <div className="lg:col-span-3">
                    {filteredGames.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredGames.map((game) => (
                          <GameCard
                            key={game.id}
                            game={game}
                            onPreview={handleOpenPreview}
                            onToggleFavorite={toggleFavorite}
                            isFavorite={isFavorite(game.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center rounded-2xl bg-[#0c1322] border border-[#18233c]">
                        <p className="text-slate-300 font-semibold mb-2">No games match your current filters.</p>
                        <p className="text-slate-500 text-xs mb-4">Try clearing active tags or adjusting your search term.</p>
                        <button
                          onClick={resetFilters}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentTab === 'games' ? (
          /* ALL GAMES TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-2">
                EXPLORE ALL GAMES
              </h1>
              <p className="text-slate-400 text-sm">
                Browse our complete database of {ALL_GAMES.length} curated online multiplayer and sandbox titles.
              </p>
            </div>

            <div className="mb-8">
              <SearchBar
                value={filters.searchQuery}
                onChange={(val) => setFilters((prev) => ({ ...prev, searchQuery: val }))}
                onSelectGame={handleOpenPreview}
                onSelectRoblox={handleSelectRobloxFromSearch}
                allGames={ALL_GAMES}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <FilterSidebar
                  filters={filters}
                  onChangeFilters={setFilters}
                  onReset={resetFilters}
                  totalFilteredCount={filteredGames.length}
                />
              </div>

              <div className="lg:col-span-3">
                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        onPreview={handleOpenPreview}
                        onToggleFavorite={toggleFavorite}
                        isFavorite={isFavorite(game.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-2xl bg-[#0c1322] border border-[#18233c]">
                    <p className="text-slate-300 font-semibold mb-2">No games found.</p>
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : currentTab === 'roblox-alternatives' ? (
          /* ROBLOX ALTERNATIVES TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RobloxAlternatives
              allGames={ALL_GAMES}
              onPreview={handleOpenPreview}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              initialSelectedRoblox={filters.robloxFilter}
            />
          </div>
        ) : currentTab === 'categories' ? (
          /* CATEGORIES TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-2">
                BROWSE BY CATEGORY
              </h1>
              <p className="text-slate-400 text-sm">
                Explore tailored gaming categories from fast-paced action shooters to cozy life simulators.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {CATEGORIES_LIST.map((cat) => {
                const count = ALL_GAMES.filter((g) => g.genres.includes(cat.name)).length;
                return (
                  <div
                    key={cat.name}
                    onClick={() => handleSelectCategory(cat.name)}
                    className="p-5 rounded-2xl bg-[#0c1322] hover:bg-[#121c32] border border-[#18233c] hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{cat.icon}</div>
                      <h3 className="text-base font-bold text-white group-hover:text-blue-400 font-heading">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#18233c] flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>{count} Games</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : currentTab === 'trending' ? (
          /* TRENDING TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-2">
                🔥 TRENDING & RISING
              </h1>
              <p className="text-slate-400 text-sm">
                Real-time popular games dominating the online community right now.
              </p>
            </div>

            <TrendingCarousel
              title="🔥 Trending Now"
              subtitle="The most actively played online titles"
              games={trendingGames}
              onPreview={handleOpenPreview}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />

            <TrendingCarousel
              title="⚡ Rising Games"
              subtitle="Fast-growing titles gaining massive momentum"
              games={risingGames}
              onPreview={handleOpenPreview}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />

            <TrendingCarousel
              title="💎 Hidden Gems"
              subtitle="Critically acclaimed games you might have missed"
              games={hiddenGems}
              onPreview={handleOpenPreview}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </div>
        ) : currentTab === 'free-games' ? (
          /* FREE GAMES TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-400 text-xs font-mono font-bold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% FREE-TO-PLAY CATALOG</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-2">
                FREE GAMES
              </h1>
              <p className="text-slate-400 text-sm">
                Zero upfront cost. Only verified free-to-play games and accessible online experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <FilterSidebar
                  filters={{ ...filters, priceType: 'free_only' }}
                  onChangeFilters={setFilters}
                  onReset={resetFilters}
                  totalFilteredCount={freeGamesList.length}
                />
              </div>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {freeGamesList.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPreview={handleOpenPreview}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite(game.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : currentTab === 'compare' ? (
          /* COMPARE TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GameComparison allGames={ALL_GAMES} onPreview={handleOpenPreview} />
          </div>
        ) : currentTab === 'favorites' ? (
          /* FAVORITES TAB */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mb-2">
                  YOUR FAVORITES
                </h1>
                <p className="text-slate-400 text-sm">
                  {favoritesCount} {favoritesCount === 1 ? 'game' : 'games'} saved to your local library.
                </p>
              </div>
            </div>

            {favoriteGamesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteGamesList.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onPreview={handleOpenPreview}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <div className="p-16 text-center rounded-3xl bg-[#0c1322] border border-[#18233c] max-w-lg mx-auto my-12">
                <Heart className="w-12 h-12 text-slate-600 mx-auto mb-4 stroke-1" />
                <h3 className="text-lg font-bold text-white mb-2">No favorites saved yet</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Click the heart icon on any game card to bookmark it for quick access anytime.
                </p>
                <button
                  onClick={() => navigateToTab('discover')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Start Scouting Games
                </button>
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <Footer onSelectTab={navigateToTab} />

      {/* Game Preview Modal */}
      <GamePreviewModal
        game={previewGame}
        onClose={() => setPreviewGame(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={previewGame ? isFavorite(previewGame.id) : false}
        onSelectGame={handleOpenPreview}
        allGames={ALL_GAMES}
        onOpenDetailPage={(slug) => {
          setPreviewGame(null);
          navigateToGame(slug);
        }}
      />

      {/* Surprise Me Scout Randomizer Modal */}
      <SurpriseMeModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        allGames={ALL_GAMES}
        onPreview={handleOpenPreview}
      />

      {/* Global Quick Search Modal (triggered by search icon in navbar) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="absolute inset-0" onClick={() => setSearchModalOpen(false)} />
          <div className="relative z-10 w-full max-w-2xl">
            <SearchBar
              value={filters.searchQuery}
              onChange={(val) => setFilters((prev) => ({ ...prev, searchQuery: val }))}
              onSelectGame={(game) => {
                setSearchModalOpen(false);
                handleOpenPreview(game);
              }}
              onSelectRoblox={(roblox) => {
                setSearchModalOpen(false);
                handleSelectRobloxFromSearch(roblox);
              }}
              allGames={ALL_GAMES}
              autoFocus
            />
          </div>
        </div>
      )}
      {/* Mobile Bottom Thumb Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={navigateToTab}
        onOpenSearch={() => setSearchModalOpen(true)}
        favoritesCount={favoritesCount}
      />
    </div>
  );
}

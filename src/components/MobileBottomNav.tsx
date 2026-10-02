import React from 'react';
import { Compass, Gamepad2, Layers, Search, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  favoritesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  favoritesCount,
}) => {
  const items = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'matcher', label: 'Matcher', icon: Layers },
    { id: 'search', label: 'Search', icon: Search, isAction: true },
    { id: 'favorites', label: 'Favorites', icon: Heart, count: favoritesCount },
  ];

  const handleClick = (item: (typeof items)[0]) => {
    if (item.isAction) {
      onOpenSearch();
    } else {
      onSelectTab(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060a15]/95 backdrop-blur-xl border-t border-[#18233d] px-2 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-blue-400' : ''}`}
                  fill={item.id === 'favorites' && favoritesCount > 0 ? 'currentColor' : 'none'}
                />
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white shadow-sm">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 leading-none">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

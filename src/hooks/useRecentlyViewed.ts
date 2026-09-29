import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nelscout_recently_viewed';
const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
    } catch (e) {
      console.error('Failed to save recently viewed to localStorage', e);
    }
  }, [recentIds]);

  const addRecentlyViewed = (gameId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== gameId);
      return [gameId, ...filtered].slice(0, MAX_RECENT);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentIds([]);
  };

  return {
    recentIds,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
}

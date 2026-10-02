export type PriceType = 'free' | 'free_with_purchases' | 'paid';

export type MultiplayerType = 'singleplayer' | 'online_multiplayer' | 'co_op' | 'mmo';

export type PlatformType = 'PC' | 'Browser' | 'Xbox' | 'PlayStation' | 'Nintendo Switch' | 'Android' | 'iOS';

export type GenreType = 
  | 'Action'
  | 'Shooter'
  | 'Horror'
  | 'Racing'
  | 'RPG'
  | 'Simulation'
  | 'Roleplay'
  | 'Sandbox'
  | 'Fighting'
  | 'Puzzle'
  | 'Building'
  | 'Party'
  | 'Adventure'
  | 'Strategy'
  | 'Open World';

export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  trailer?: string; // YouTube embed ID or video URL
  genres: GenreType[];
  tags: string[];
  priceType: PriceType;
  priceLabel?: string;
  platforms: PlatformType[];
  multiplayer: MultiplayerType;
  multiplayerLabel?: string;
  playerCount: string;
  similarRobloxGames: string[];
  similarGames: string[]; // game IDs or names
  officialUrl: string;
  releaseDate: string;
  featured?: boolean;
  trending?: boolean;
  hiddenGem?: boolean;
  rising?: boolean;
  developer?: string;
  publisher?: string;
  creationTools?: string;
  gameModes?: string[];
  rating?: number; // e.g. 4.8 / 5
}

export interface RobloxMapping {
  robloxName: string;
  robloxGenre: string;
  description: string;
  robloxUrl?: string;
  recommendedGameIds: string[];
  tags: string[];
}

export interface FilterState {
  searchQuery: string;
  selectedGenres: GenreType[];
  selectedPlatforms: PlatformType[];
  priceType: 'all' | 'free_only' | 'paid_only';
  multiplayer: 'all' | MultiplayerType;
  sortBy: 'trending' | 'rating' | 'newest' | 'name_asc';
  robloxFilter?: string;
}

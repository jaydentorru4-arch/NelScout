import { Game } from '../types/game';
import { GAMES } from './games';
import { MORE_GAMES } from './moreGames';
import { EXTRA_GAMES as ADDITIONAL_GAMES } from './extraGames';

const EXTRA_GAMES: Game[] = [
  {
    id: 'enlisted',
    name: 'Enlisted',
    slug: 'enlisted',
    description: 'A squad-based first-person MMO shooter covering key battles from World War II. Players lead an infantry squad, tank crew, or aircraft pilot simultaneously.',
    shortDescription: 'World War II squad-based FPS where you command AI soldiers alongside other real players.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2051620/header.jpg',
    bannerImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2051620/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2051620/header.jpg',
    ],
    genres: ['Shooter', 'Action', 'Strategy'],
    tags: ['WWII', 'Squad Command', 'Combined Arms', 'Realistic Combat'],
    priceType: 'free',
    priceLabel: 'Free to Play',
    platforms: ['PC', 'Xbox', 'PlayStation'],
    multiplayer: 'online_multiplayer',
    multiplayerLabel: 'Massive Squad-Based Multi-team Battles',
    playerCount: 'Active Military Community',
    similarRobloxGames: ['Rolling Thunder', 'D-Day', 'Frontlines'],
    similarGames: ['world-of-tanks', 'counter-strike-2'],
    officialUrl: 'https://enlisted.net/',
    releaseDate: 'April 8, 2021',
    developer: 'Darkflow Software',
    rating: 4.5,
  },
  {
    id: 'shatterline',
    name: 'Shatterline',
    slug: 'shatterline',
    description: 'A fierce free-to-play arena FPS with both rogue-like cooperative Expedition modes and frantic competitive PvP combat against crystalline crystalline invaders.',
    shortDescription: 'Fast-paced free FPS featuring rogue-like co-op expeditions and competitive arena modes.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2087030/header.jpg',
    bannerImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2087030/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2087030/header.jpg',
    ],
    genres: ['Shooter', 'Action'],
    tags: ['Co-op Roguelike', 'Arena FPS', 'Hero Skills', 'Fast Movement'],
    priceType: 'free',
    priceLabel: 'Free to Play',
    platforms: ['PC'],
    multiplayer: 'online_multiplayer',
    multiplayerLabel: 'Co-op Expedition & PvP',
    playerCount: 'Active FPS Community',
    similarRobloxGames: ['Arsenal', 'Bad Business'],
    similarGames: ['valorant', 'the-finals'],
    officialUrl: 'https://shatterline.gg/',
    releaseDate: 'September 8, 2022',
    hiddenGem: true,
    developer: 'Frag Lab LLC',
    rating: 4.4,
  },
  {
    id: 'neverwinter',
    name: 'Neverwinter',
    slug: 'neverwinter',
    description: 'Explore and defend one of the most beloved cities from the Dungeons & Dragons Forgotten Realms setting as it rises from the ashes of destruction.',
    shortDescription: 'Free-to-play action MMORPG based on Dungeons & Dragons with active combat and rich quests.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/109600/header.jpg',
    bannerImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/109600/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/109600/header.jpg',
    ],
    genres: ['RPG', 'Action', 'Adventure'],
    tags: ['D&D Lore', 'Action Combat', 'Dungeons', 'Co-op Quests'],
    priceType: 'free',
    priceLabel: 'Free to Play',
    platforms: ['PC', 'Xbox', 'PlayStation'],
    multiplayer: 'mmo',
    multiplayerLabel: 'Massively Multiplayer Online',
    playerCount: '20,000,000+ Adventurers',
    similarRobloxGames: ['Dungeon Quest', 'World // Zero', 'Vesteria'],
    similarGames: ['guild-wars-2', 'runescape'],
    officialUrl: 'https://www.playneverwinter.com/',
    releaseDate: 'June 20, 2013',
    developer: 'Cryptic Studios',
    rating: 4.6,
  }
];

// Deduplicate games by id so each game has exactly one verified entry
const ALL_RAW_GAMES: Game[] = [...GAMES, ...MORE_GAMES, ...EXTRA_GAMES, ...ADDITIONAL_GAMES];
const seenIds = new Set<string>();
export const ALL_GAMES: Game[] = ALL_RAW_GAMES.filter(g => {
  if (seenIds.has(g.id)) return false;
  seenIds.add(g.id);
  return true;
});

export const TOTAL_GAMES_COUNT = ALL_GAMES.length;

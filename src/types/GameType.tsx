interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}
interface AddedStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}
interface Store extends Platform {}

interface ESRBRating {
  id: number;
  name: string;
  slug: string;
  name_en: string;
  name_ru: string;
}

interface ShortScreenshot {
  id: number;
  image: string;
}
interface Genre extends Platform {}

export interface GameType {
  slug: string;
  name: string;
  playtime: number;
  platforms: { platform: Platform }[];
  stores: { store: Store }[];
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedStatus;
  metacritic: number | null;
  suggestions_count: number;
  updated: string;
  id: number;
  score: number | null;
  clip: string | null;
  tags: Tag[];
  esrb_rating: ESRBRating;
  user_game: null | string;
  reivews_count: number;
  saturated_color: string;
  dominant_color: string;
  short_screenshots: ShortScreenshot[];
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
}

interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
interface Publisher extends Developer {}
export interface SingleGameResponse {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: any[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string | null;
  website: string;
  rating: number;
  rating_top: number;
  ratings: any[];
  reactions: number[];
  added: number;
  added_by_status: {};
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: 101;
  youtube_count: number;
  reviews_text_count: number;
  rating_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: { platform: Platform }[];
  platforms: any[];
  stores: any[];
  devlopers: Developer[];
  genres: Genre[];
  tags: Tag[];
  publishers: Publisher[];
  esrb_rating: { id: number; name: string; slug: string };
  clip: null;
  description_raw: string;
}

export interface Screenshot {
  id: string;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}
export interface ScreenshotResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Screenshot[];
}

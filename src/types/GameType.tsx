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
  metacritic: number;
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

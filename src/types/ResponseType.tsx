import { GenreType } from "../reducers/GenreReducer";
import { GameType } from "./GameType";

interface GenreResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GenreType[];
  description: string;
  seo_title: string;
  seo_description: string;
  seo_h1: string;
}

interface GameResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameType[];
  user_platforms: boolean;
}

export type AllResponse = GenreResponse | GameResponse;

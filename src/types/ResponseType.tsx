import { GenreType } from "../reducers/GenreReducer";
import { GameType, ScreenshotResponse, SingleGameResponse } from "./GameType";

export interface GenreResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GenreType[];
  description: string;
  seo_title: string;
  seo_description: string;
  seo_h1: string;
}

export default interface GenreDescResponse {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description: string;
}
export interface GameResponse {
  count: number;
  next: string;
  previous: string | null;
  results: GameType[];
  user_platforms: boolean;
}
export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: { 480: string; max: string };
}
export interface TrailerResponse {
  results: Trailer[];
}

export interface InvalidResponse {
  detail: string;
}

export type ResponseType =
  | GenreResponse
  | GameResponse
  | InvalidResponse
  | SingleGameResponse
  | GenreDescResponse
  | ScreenshotResponse
  | TrailerResponse;

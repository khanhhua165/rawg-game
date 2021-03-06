import axios from "axios";
import { API_KEY, API_URL } from "../constants/api";
import { GameResponse, GenreResponse } from "../types/ResponseType";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

instance.interceptors.request.use(
  (config) => Promise.resolve(config),
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

type EndPoint = "/games" | "/genres";

export const fetchApi = async (endpoint: EndPoint, params: object = {}) => {
  if (endpoint === "/games") {
    return instance.get<GameResponse>(endpoint, {
      params: { key: API_KEY, ...params },
    });
  }
  if (endpoint === "/genres") {
    return instance.get<GenreResponse>(endpoint, {
      params: { key: API_KEY, ...params },
    });
  }
};

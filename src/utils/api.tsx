import axios from "axios";
import { API_KEY, API_URL } from "../constants/api";
import { ResponseType } from "../types/ResponseType";

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

export const fetchApi = (endpoint: string, params: object = {}) => {
  return instance.get<ResponseType>(endpoint, {
    params: { key: API_KEY, ...params },
  });
};

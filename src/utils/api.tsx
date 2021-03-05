import axios from "axios";
import { API_KEY, API_URL } from "../constants/api";
import { AllResponse } from "../types/ResponseType";

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

export const fetchApi = async (endpoint: string, params: object = {}) => {
  return instance.get<AllResponse>(endpoint, {
    params: { key: API_KEY, ...params },
  });
};

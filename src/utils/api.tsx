import axios from "axios";
import { API_KEY, API_URL } from "../constants/api";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

instance.interceptors.request.use(
  (config) => Promise.resolve(config),
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const fetchApi = async (endpoint: string, params: object = {}) => {
  return instance({
    method: "GET",
    url: endpoint,
    params: { key: API_KEY, ...params },
  });
};

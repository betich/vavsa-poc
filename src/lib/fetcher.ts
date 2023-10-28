// new axios client

import axios from "axios";
import { API_BASE_URL } from "./constants";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

export const fetcher = async (url: string) => {
  const res = await axios(url);
  const data = await res.data;
  return data;
};

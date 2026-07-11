import axios from "axios";

const BASE_URL = import.meta.env?.VITE_API_BASE_URL
  || process.env?.REACT_APP_API_BASE_URL
  || process.env?.NEXT_PUBLIC_API_BASE_URL
  || "http://localhost:3000/";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
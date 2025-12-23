import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
    }
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.status);
    return Promise.reject(err);
  }
);

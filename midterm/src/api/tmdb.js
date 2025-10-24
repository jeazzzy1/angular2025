const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = "https://api.themoviedb.org/3";
const DEFAULT_PARAMS = new URLSearchParams({
  api_key: API_KEY,
  language: "en-US",
  region: "US"
});

async function request(path, params = {}) {
  const search = new URLSearchParams(DEFAULT_PARAMS);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") search.set(k, v);
  }
  const url = `${BASE}${path}?${search.toString()}`;

  // маленький кэш, чтобы не долбить API при возвратах назад
  const cached = sessionStorage.getItem(url);
  if (cached) return JSON.parse(cached);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const data = await res.json();
  sessionStorage.setItem(url, JSON.stringify(data));
  return data;
}

export const tmdb = {
  trending: (page = 1) => request("/trending/movie/week", { page }),
  searchMovies: (query, page = 1) => request("/search/movie", { query, page, include_adult: false }),
  movieDetails: (id) => request(`/movie/${id}`),
  movieCredits: (id) => request(`/movie/${id}/credits`)
};

// src/api/omdb.js

// Лучше вынести ключ в env: VITE_OMDB_KEY
const API_KEY = import.meta.env?.VITE_OMDB_KEY || '22fd57fc';
const BASE = 'https://www.omdbapi.com/';

async function request(params = {}) {
  const search = new URLSearchParams({ apikey: API_KEY });
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== '') search.set(k, String(v));
  }

  const url = `${BASE}?${search.toString()}`;

  // Простой кэш на время сессии
  const cached = sessionStorage.getItem(url);
  if (cached) return JSON.parse(cached);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`OMDb HTTP ${res.status}`);

  const data = await res.json();
  if (data.Response === 'False') {
    // Пример: { Response: "False", Error: "Movie not found!" }
    throw new Error(`OMDb: ${data.Error || 'Unknown error'}`);
  }

  sessionStorage.setItem(url, JSON.stringify(data));
  return data;
}

export const omdb = {
  /**
   * Поиск (пагинация поддерживается: page=1..)
   * type: 'movie' | 'series' | 'episode' (опционально)
   * y: год (опционально)
   */
  searchMovies: (query, page = 1, type, y) =>
    request({ s: query, page, type, y }),

  /** Подробно по IMDb ID */
  getById: (imdbID) => request({ i: imdbID, plot: 'full' }),

  /** Подробно по названию (и, при желании, году) */
  getByTitle: (title, y) => request({ t: title, y, plot: 'full' }),
};

const BASE = "https://image.tmdb.org/t/p/";
export function posterUrl(path, size = "w342") {
  if (!path) return "/placeholder-poster.svg";
  return `${BASE}${size}${path}`;
}
export function backdropUrl(path, size = "w780") {
  if (!path) return "";
  return `${BASE}${size}${path}`;
}

import { useEffect, useMemo, useState } from "react";
import { tmdb } from "./api/tmdb";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import SkeletonCard from "./components/SkeletonCard";

export default function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSearching = query.trim().length > 0;

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const data = isSearching
          ? await tmdb.searchMovies(query)
          : await tmdb.trending();
        if (!cancelled) setItems(data.results ?? []);
      } catch (e) {
        if (!cancelled) setItems([]);
        // опционально: console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [query, isSearching]);

  const list = useMemo(() => items ?? [], [items]);

  return (
    <main className="container">
      <header className="topbar">
        <h1 className="brand">CineMix</h1>
        <SearchBar onSearch={setQuery} />
      </header>

      {loading ? (
        <section className="grid">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </section>
      ) : (
        <section className="grid">
          {list.map((m) => (
            <MovieCard
              key={`${m.id}-${m.release_date || ""}`}
              movie={m}
              onClick={() => window.alert(m.title)}
            />
          ))}
        </section>
      )}
    </main>
  );
}

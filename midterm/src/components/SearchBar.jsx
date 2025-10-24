import { useState } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";

export default function SearchBar({ onSearch, placeholder = "Search movies..." }) {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 450);

  // вызывать поиск только по дебаунс-значению
  // и не спамить пустыми запросами
  // (onSearch должен быть стабилен у родителя)
  if (debounced.trim() !== q.trim()) {
    // no-op: ждём стабилизации
  }

  return (
    <div className="searchbar">
      <input
        value={q}
        onChange={(e) => {
          const v = e.target.value;
          setQ(v);
          if (v.trim() === "") onSearch(""); // очищаем список
          else onSearch(v);
        }}
        placeholder={placeholder}
        aria-label="Search movies"
      />
      {q && <button className="clear" onClick={() => { setQ(""); onSearch(""); }} title="Clear">×</button>}
    </div>
  );
}

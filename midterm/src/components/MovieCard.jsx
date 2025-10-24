import { posterUrl } from "../utils/imageUrl";

export default function MovieCard({ movie, onClick }) {
  const { title, poster_path, vote_average, release_date } = movie;
  const year = release_date ? new Date(release_date).getFullYear() : "—";
  return (
    <button className="movie-card" onClick={onClick} title={title}>
      <div className="poster-wrap">
        <img src={posterUrl(poster_path)} alt={`${title} poster`} loading="lazy" />
        {vote_average ? <span className="rating-badge">{vote_average.toFixed(1)}</span> : null}
      </div>
      <div className="meta">
        <div className="title">{title}</div>
        <div className="sub">{year}</div>
      </div>
    </button>
  );
}

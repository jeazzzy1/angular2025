export default function SkeletonCard() {
  return (
    <div className="movie-card skeleton">
      <div className="poster-wrap shimmer" />
      <div className="meta">
        <div className="line w80 shimmer" />
        <div className="line w40 shimmer" />
      </div>
    </div>
  );
}


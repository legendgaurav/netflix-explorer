import { useNavigate } from "react-router-dom";
import "../styles/movieCard.css"
import { memo, useCallback } from "react";

export default memo(function MovieCard({
  movie,
  onWatchlist,
  onRemove,
  isWatchlist,
}) {
  const navigate = useNavigate();

  // const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // const inWatchlist = isInWatchlist(movie.id);

  const handleClick = useCallback(() => {
    navigate(`/movie/${movie.id}`);
  }, [navigate, movie.id]);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    isWatchlist ? onRemove(movie.id) : onWatchlist(movie);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <button
        className={`watchlist-btn ${isWatchlist ? "active" : ""}`}
        onClick={handleWatchlist}
        aria-label="Add to watchlist"
      >
        {isWatchlist ? "✓" : "+"}
      </button>
      <div className="movie-info">
        <h4>{movie.title}</h4>
        <p>⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
});
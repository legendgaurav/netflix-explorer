import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  console.log("watchlist-----", watchlist);
  

  if (watchlist.length === 0) {
    return <p>No movies in watchlist 🎬</p>;
  }

  return (
    <div className="home-container">
      <h1>My Watchlist</h1>

      <div className="movie-grid">
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onRemove={() => removeFromWatchlist(movie.id)}
            isWatchlist
          />
        ))}
      </div>
    </div>
  );
}

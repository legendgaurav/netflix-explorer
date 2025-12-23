import { useEffect, useMemo, useState } from "react";
import { api } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import "../styles/global.css";
import MovieSkeleton from "../components/MovieSkeleton";
import { useWatchlist } from "../context/WatchlistContext";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showTopRated, setShowTopRated] = useState(false);
    const [error, setError] = useState(null);
    const { addToWatchlist } = useWatchlist();
    const { isInWatchlist } = useWatchlist();
    const { removeFromWatchlist } = useWatchlist();
    const skeletonCount = window.innerWidth < 768 ? 6 : 14;

    const displayedMovies = useMemo(() => {
      if (!showTopRated) return movies;
      return movies.filter((movie) => movie.vote_average >= 7);
    }, [movies, showTopRated]);

    useEffect(() => {
      setLoading(true);
      setError(null);

      api
        .get("/movie/popular")
        .then((res) => setMovies(res.data.results))
        .catch(() => setError("Failed to load movies"))
        .finally(() => setLoading(false));
    }, []);

    return (
      <>
        {error ? (
          <div className="error-state">
            <p>{error}</p>
            <button disabled={loading} onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="home-container">
            <div className="filter-toggle">
              <button
                className={`toggle-btn ${!showTopRated ? "active" : ""}`}
                onClick={() => setShowTopRated(false)}
              >
                All
              </button>

              <button
                className={`toggle-btn ${showTopRated ? "active" : ""}`}
                onClick={() => setShowTopRated(true)}
              >
                ⭐ Top Rated
              </button>

              <span
                className={`toggle-indicator ${
                  showTopRated ? "right" : "left"
                }`}
              />
            </div>
            <h1>Trending Movies</h1>

            <div className="movie-grid">
              {loading ? (
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <MovieSkeleton key={i} />
                ))
              ) : movies.length !== 0 ? (
                displayedMovies.map((movie) => (
                  <MovieCard
                    movie={movie}
                    key={movie.id}
                    onWatchlist={() => addToWatchlist(movie)}
                    onRemove={() => removeFromWatchlist(movie.id)}
                    isWatchlist={isInWatchlist(movie.id)}
                  />
                ))
              ) : (
                <>
                  <p>No movies found.</p>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
}
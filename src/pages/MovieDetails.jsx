import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/tmdb";
import MovieSkeleton from "../components/MovieSkeleton";
import "../styles/movieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    api
      .get(`/movie/${id}`)
      .then((res) => setMovie(res.data))
      .catch(() => setError("Failed to load movie"));
  }, [id]);

  if (!movie && !error) return <MovieSkeleton />;

  return (
    <>
      {error ? (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      ) : (
        <div className="details-page">
          <div className="details-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="details-content">
            <h1>{movie.title}</h1>
            <p className="overview">{movie.overview || "Overview not available."}</p>

            <div className="details-meta">
              <span>⭐ {movie.vote_average}</span>
              <span>📅 {movie.release_date}</span>
              <span>🎬 {movie.runtime} min</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

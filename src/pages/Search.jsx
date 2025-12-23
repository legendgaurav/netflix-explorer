import React, { useEffect, useState } from 'react'
import { api } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import MovieSkeleton from '../components/MovieSkeleton';
import useDebounce from '../hooks/useDebounce';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery) return;
    
    setLoading(true);
    setError(null);
    api
      .get(`/search/movie?query=${debouncedQuery}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch(() => setError("Failed to load movies"))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

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
        <div className="search-page">
          <input
            className="search-input"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="movie-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <MovieSkeleton key={i} />
                ))
              : movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
            {!loading && query && movies.length === 0 && (
              <p>No results found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Search

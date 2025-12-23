import { createContext, useContext, useEffect, useReducer } from "react";
import { watchlistReducer } from "../reducers/watchlistReducer";

const WatchlistContext = createContext();

export const WatchlistProvider = ({children}) => {
    const [watchlist, dispatch] = useReducer(watchlistReducer, []);

    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
      dispatch({ type: "INIT", payload: saved });
    }, []);

    useEffect(() => {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => dispatch({ type: "ADD", payload: movie });

    const removeFromWatchlist = (id) =>
      dispatch({ type: "REMOVE", payload: id });

    const isInWatchlist = (id) =>
      watchlist.some((movie) => movie.id === id);

    return (
      <WatchlistContext.Provider
        value={{
          watchlist,
          addToWatchlist,
          removeFromWatchlist,
          isInWatchlist,
        }}
      >
        {children}
      </WatchlistContext.Provider>
    );
}

export const useWatchlist = () => useContext(WatchlistContext);
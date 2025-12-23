import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { lazy, Suspense, useState } from "react";
import { WatchlistProvider } from "./context/WatchlistContext";

const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Search = lazy(() => import('./pages/Search'));

function App() {
  const [title, setTitle] = useState('MovieExplorer');
  const [links, setLinks] = useState([
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search' },
    { name: 'Watchlist', path: '/watchlist' }
  ]);
  return (
    <BrowserRouter>
      <WatchlistProvider>
        <Navbar title={title} links={links} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </Suspense>
      </WatchlistProvider>
    </BrowserRouter>
  );
}

export default App;

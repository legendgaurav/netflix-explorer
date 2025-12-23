import { render } from "@testing-library/react";
import { WatchlistProvider } from "../context/WatchlistContext";

export const renderWithProviders = (ui) =>
  render(<WatchlistProvider>{ui}</WatchlistProvider>);

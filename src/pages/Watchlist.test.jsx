import { screen, fireEvent } from "@testing-library/react";
import Watchlist from "./Watchlist";
import { renderWithProviders } from "../test/renderWithProviders";

test("shows empty state initially", () => {
  renderWithProviders(<Watchlist />);
  expect(screen.getByText(/no movies in watchlist/i)).toBeInTheDocument();
});

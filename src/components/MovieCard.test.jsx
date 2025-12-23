import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./MovieCard";

const movie = { id: 1, title: "Inception" };

test("renders movie title", () => {
  render(<MovieCard movie={movie} />);
  expect(screen.getByText("Inception")).toBeInTheDocument();
});

test("calls add to watchlist on click", () => {
  const onWatchlist = jest.fn();

  render(<MovieCard movie={movie} onWatchlist={onWatchlist} />);
  fireEvent.click(screen.getByText(/add to watchlist/i));

  expect(onWatchlist).toHaveBeenCalledTimes(1);
});

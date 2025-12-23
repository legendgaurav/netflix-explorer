import { watchlistReducer } from "./watchlistReducer";

describe("watchlistReducer", () => {
    const movie = { id: 1, title: "Inception" };

    test("adds movie to watchlist", () => {
        const state = [];
        const action = { type: "ADD", payload: movie };
        const result = watchlistReducer(state, action);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("Inception");
    });

    test("does not add duplicate movie to watchlist", () => {
        const state = [movie];
        const action = { type: "ADD", payload: movie };
        const result = watchlistReducer(state, action);
        expect(result).toHaveLength(1);
    });

    test("removes movie from watchlist", () => {
        const state = [movie];
        const action = { type: "REMOVE", payload: 1 };
        const result = watchlistReducer(state, action);
        expect(result).toHaveLength(0);
    });
});
export const watchlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return state.some(m => m.id === action.payload.id)
                ?
                state
                :
                [...state, action.payload];

        case "REMOVE":
            return state.filter(m => m.id !== action.payload);

        case "INIT":
            return action.payload;

        default:
            return state;
    }
}

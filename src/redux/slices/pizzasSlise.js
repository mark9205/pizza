import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pizzass: [],
};

export const pizzasSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.pizzass = action.payload;
		},
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	sort: {
		name: "по популярности",
		sortProperty: "rating",
	},
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCaregoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
		},
	},
});

export const { setCaregoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;

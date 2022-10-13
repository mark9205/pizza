import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: 1,
	categoryId: 0,
	sort: {
		name: "по популярности ↓",
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
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	},
});

export const { setCaregoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;

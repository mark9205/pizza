import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropEnum {
	RATING_DESC = "rating",
	RATING_ASC = "-rating",
	PRICE_DESC = "price",
	PRICE_ASC = "-price",
	TITLE_DESC = "title",
	TITLE_ASC = "-title",
}

export type SortType = {
	name: string;
	sortProperty: SortPropEnum;
};

export interface FilterSliceState {
	searchValue: string;
	currentPage: number;
	categoryId: number;
	sort: SortType;
}

const initialState: FilterSliceState = {
	searchValue: "",
	currentPage: 1,
	categoryId: 0,
	sort: {
		name: "по популярности ↑",
		sortProperty: SortPropEnum.RATING_ASC,
	},
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCaregoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
		},
	},
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
	setCaregoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;

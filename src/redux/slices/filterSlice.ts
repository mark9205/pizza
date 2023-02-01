import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortType = {
  name: string;
  sortProperty: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';
};

interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: SortType;
}

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'по популярности ↑',
    sortProperty: '-rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCaregoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
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

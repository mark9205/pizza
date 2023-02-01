import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkApi) => {
    const { baseurl, currentPage, category, title, sortBy, order } = params;
    const { data } = await axios.get(
      `${baseurl}?page=${currentPage}&limit=4&${category}&${title}&sortBy=${sortBy}&order=${order}`
    );

    if (!data.length) {
      return thunkApi.rejectWithValue('Пицц пока нет');
    }

    return thunkApi.fulfillWithValue(data);
  }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  sizes: number[];
  imageUrl: string;
  types: number[];
};

interface PizzasSliceState {
  pizzass: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzasSliceState = {
  pizzass: [],
  status: 'loading', //loading, success, error
};

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.pizzass = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      console.log('loading', action);
      state.status = 'loading';
      state.pizzass = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      console.log('fulfilled', action);
      state.pizzass = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log('rejected', action);
      state.status = 'error';
      state.pizzass = [];
    },
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

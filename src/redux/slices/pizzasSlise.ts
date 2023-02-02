import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

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
	status: "loading" | "success" | "error";
}

const initialState: PizzasSliceState = {
	pizzass: [],
	status: "loading", //loading, success, error
};

export type SearchPizzaParams = {
	baseurl: string;
	currentPage: number;
	category: string;
	title: string;
	sortBy: string;
	order: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
	"pizza/fetchPizzasStatus",
	async (params, thunkApi) => {
		const { baseurl, currentPage, category, title, sortBy, order } = params;
		const { data } = await axios.get<Pizza[]>(
			`${baseurl}?page=${currentPage}&limit=4&${category}&${title}&sortBy=${sortBy}&order=${order}`
		);

		// if (!data.length) {
		// 	return thunkApi.rejectWithValue("Пицц пока нет");
		// }

		// return thunkApi.fulfillWithValue(data);

		return data;
	}
);

export const pizzasSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.pizzass = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state, action) => {
			console.log("loading", action);
			state.status = "loading";
			state.pizzass = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			console.log("fulfilled", action);
			state.pizzass = action.payload;
			state.status = "success";
		});
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			console.log("rejected", action);
			state.status = "error";
			state.pizzass = [];
		});
	},
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

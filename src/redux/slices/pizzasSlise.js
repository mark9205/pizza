import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
	"pizza/fetchPizzasStatus",
	async (params) => {
		const { baseurl, currentPage, category, title, sortBy, order } = params;
		const { data } = await axios.get(
			`${baseurl}?page=${currentPage}&limit=4&${category}&${title}&sortBy=${sortBy}&order=${order}`
		);
		return data;
	}
);
//	const [isLoading, setIsLoading] = useState(true);
const initialState = {
	pizzass: [],
	status: "loading", //loading, success, error
};

export const pizzasSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.pizzass = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = "loading";
            state.pizzass = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.pizzass = action.payload;
			state.status = "success";
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = "error";
			state.pizzass = [];
		},
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

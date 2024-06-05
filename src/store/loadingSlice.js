import { createSlice } from '@reduxjs/toolkit';


const loadingSlice = createSlice({
	name: 'loading',
	initialState: {
		isLoading: false
	},
	reducers: {
		showLoading: (state, action) => {
			state.isLoading = true;
		},
		hideLoading: (state, action) => {
			state.isLoading = false;
		}
	}
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

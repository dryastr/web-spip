import { createSlice } from '@reduxjs/toolkit';

// ** Services
import penilaianService from 'src/services/penilaian-services'

export const getData  = (id) => (dispatch, getState) => {
	return penilaianService.show(id || getState().penilaianSlice.trans_penilaian_id).then(response => {
		dispatch(setData(response));
        return response;
	})
};

const penilaianSlice = createSlice({
	name: 'penilaianSlice',
	initialState: {
		data: {},
        trans_penilaian_id: null,
	},
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
            state.trans_penilaian_id = action.payload.id;
		},
	}
});

export const { setData } = penilaianSlice.actions;

export default penilaianSlice.reducer;

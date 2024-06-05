import { createSlice } from '@reduxjs/toolkit';
import referensiServices from 'src/services/referensi-services';

export const getData  = (id) => (dispatch, getState) => {
	return referensiServices.getListKlp(id).then(response => {
		dispatch(setData(response));
		return response;
	})
};
const listKlpSlice = createSlice({
	name: 'listKlp',
	initialState: {
		data:[]
	},
	reducers: {
		setData: (state, action) => {
			state.data = action.payload
		}
	}
})

export const {setData} = listKlpSlice.actions

export default listKlpSlice.reducer
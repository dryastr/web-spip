import { createSlice } from '@reduxjs/toolkit';

// ** Services
import visiMisiService from 'src/services/visimisi-services'

export const getData  = (id) => (dispatch, getState) => {
	return visiMisiService.get(id || getState().penilaianSlice.trans_penilaian_id).then(response => {
		if (response) {
			dispatch(setData({
				visi: response.visi || '',
				misi: response.misi || '',
			}));
		} else {
			dispatch(setData({
				visi: '',
				misi: ''
			}));
		}
		return response;
	})
};

const visiMisiSlice = createSlice({
	name: 'visiMisi',
	initialState: {
		visi: '',
    	misi: ''
	},
	reducers: {
		setData: (state, action) => {
			state.visi = action.payload.visi;
      state.misi = action.payload.misi;
		},
	}
});

export const { setData } = visiMisiSlice.actions;

export default visiMisiSlice.reducer;

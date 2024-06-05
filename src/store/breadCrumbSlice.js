import { createSlice } from '@reduxjs/toolkit';

const breadCrumbSlice = createSlice({
  name: 'breadCrumb',
  initialState: {
    breadcrumb: []
  },
  reducers: {
    setBreadCrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },
  },
});

export const { setBreadCrumb } = breadCrumbSlice.actions;

export default breadCrumbSlice.reducer;

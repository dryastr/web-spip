import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dataOpiniService from 'src/services/data-opini-service'

export const getData = createAsyncThunk('dataOpini/getData', async params => {
  const response = await dataOpiniService.getPagination(params)

  return response
})

const dataOpiniSlice = createSlice({
  name: 'dataOpini',
  initialState: {
    data: [],
    status: 'idle',
    total: 0,
    per_page: 10,
    page: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getData.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload.data
      state.per_page = action.payload.per_page
      state.page = action.payload.current_page
      state.total = action.payload.total
    })
    builder.addCase(getData.rejected, (state, action) => {
      state.status = 'failed'
    })
  }
})

export default dataOpiniSlice.reducer

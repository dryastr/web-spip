import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import penilaianTemuanService from 'src/services/penilaian-temuan-service'

export const getData = createAsyncThunk('penilaianTemuan/getData', async params => {
  const response = await penilaianTemuanService.getPagination(params)

  return response
})

const penilaianTemuanSlice = createSlice({
  name: 'penilaianTemuan',
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

export default penilaianTemuanSlice.reducer

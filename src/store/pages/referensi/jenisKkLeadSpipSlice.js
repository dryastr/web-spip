import { createSlice } from '@reduxjs/toolkit'
import jenisKkLead from 'src/services/jenis-kk-lead'
import jenisleadspipService from 'src/services/jenisleadapip-service'

// import jenisleadspip from 'src/services/jenisleadapip-service';
// import referensiServices from 'src/services/referensi-services';

export const getData = id => (dispatch, getState) => {
  return jenisleadspipService.getJenis(id).then(response => {
    dispatch(setData(response))

    return response
  })
}

export const getListData = () => (dispatch, getState) => {
  return jenisKkLead.list().then(response => {
    dispatch(setDataList(response))
  })
}

const jenisKkLeadSpip = createSlice({
  name: 'jenisKk',
  initialState: {
    data: [],
    list: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    setDataList: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { setData, setDataList } = jenisKkLeadSpip.actions

export default jenisKkLeadSpip.reducer

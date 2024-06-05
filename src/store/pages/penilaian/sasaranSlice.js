import { createSlice } from '@reduxjs/toolkit'

// ** Services
import sasaranService from 'src/services/sasaran-service'

export const getData = id => (dispatch, getState) => {
  sasaranService
    .get({
      trans_penilaian_id: id || getState().penilaianSlice.trans_penilaian_id
    })
    .then(response => {
      dispatch(setData(response))

      return response
    })
}

export const updateChecklist =
  (id, data, setLoading, parentId = null) =>
  (dispatch, getState) => {
    setLoading(true)
    sasaranService.updateCheckList(id, data).then(response => {
      const array = getState().sasaranSlice.data
      let newArray = JSON.parse(JSON.stringify(array))
      let idIndex = parentId ? parentId : id
      const index = array.findIndex(item => item.id === idIndex)
      if (index !== -1) {
        if (parentId) {
          let dataChild = newArray[index].childrens
          const indexChild = dataChild.findIndex(item => item.id === id)
          if (indexChild !== -1) {
            let newData = {
              ...newArray[index].childrens[indexChild],
              ...data
            }
            newArray[index].childrens[indexChild] = newData
            dispatch(setData(newArray))
          }
        } else {
          let newData = { ...newArray[index], ...data }
          newArray[index] = newData
          dispatch(setData(newArray))
        }
      }

      setLoading(false)

      return response
    })
  }

const sasaranSlice = createSlice({
  name: 'sasaranSlice',
  initialState: {
    data: []
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setData } = sasaranSlice.actions

export default sasaranSlice.reducer

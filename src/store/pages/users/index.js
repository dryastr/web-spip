// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../../services/config'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appUser/fetchEvents', async calendars => {
  const response = await axios.get('/apps/calendar/events', {
    params: {
      calendars
    }
  })

  return response.data
})

// ** Add Event
export const addEvent = createAsyncThunk('appUser/addEvent', async (event, { dispatch }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data.event
})

// ** Update Event
export const updateEvent = createAsyncThunk('appUser/updateEvent', async (event, { dispatch }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data.event
})

// ** Delete Event
export const deleteEvent = createAsyncThunk('appUser/deleteEvent', async (id, { dispatch }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data
})

export const appUserSlice = createSlice({
  name: 'appUser',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedDatas: []
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleAllUsers: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedDatas = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
      } else {
        state.selectedDatas = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})

export const { handleSelectEvent, handleAllUsers } = appUserSlice.actions

export default appUserSlice.reducer

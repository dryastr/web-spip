// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import breadCrumbSlice from 'src/store/breadCrumbSlice'
import loadingSlice from 'src/store/loadingSlice'
import messageSlice from 'src/store/messageSlice'
import visiMisiSlice from 'src/store/pages/penilaian/visiMisiSlice'
import sasaranSlice from 'src/store/pages/penilaian/sasaranSlice'
import penilaianSlice from 'src/store/pages/penilaian/penilaianSlice'
import listKlpSlice from './pages/referensi/listKlpSlice'
import jenisKkLeadSpip from './pages/referensi/jenisKkLeadSpipSlice'
import dataOpiniSlice from './pages/penilaian/dataOpiniSlice'
import penilaianTemuanSlice from './pages/penilaian/penilaianTemuanSlice'

export const store = configureStore({
  reducer: {
    breadCrumbSlice,
    loadingSlice,
    messageSlice,
    visiMisiSlice,
    sasaranSlice,
    penilaianSlice,
    listKlpSlice,
    jenisKkLeadSpip,
    dataOpiniSlice,
    penilaianTemuanSlice
  }
})

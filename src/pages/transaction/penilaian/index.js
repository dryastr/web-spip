// ** React Imports
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

import { getData } from 'src/store/pages/penilaian/penilaianSlice'

import { getInitials } from 'src/@core/utils/get-initials'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Table from 'src/views/transaction/penilaian/Table'

const Penilaian = () => {
  // ** Redux
  const dispatch = useDispatch();

  // ** Hooks
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    dispatch(setBreadCrumb({
      parent: [
        {
          link: "/",
          label: "Home",
        },
      ],
      title: "Penilaian Mandiri",
    }));
  }, [dispatch])

  const [rows, setRows] = useState({})

  useEffect(() => {
    dispatch(getData(id)).then(response => {
      console.log(response);
      setRows(response)
    })
  }, [])


  return (
    <>
      <PageHeader
        title={<Typography variant='h5'>Penilaian Mandiri</Typography>}
        subtitle={<Typography variant='body2'>Daftar penilaian mandiri {rows?.klp?.nama ? getInitials(rows.klp.nama) : 'loading...'} dari seluruh tahun</Typography>}
      />
      <br />

      <Table />
    </>
  )
}

export default Penilaian

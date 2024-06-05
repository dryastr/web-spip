// ** React Imports
import { useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Table from 'src/views/referensi/kategori-risiko/Table'

// ** Config
import checkPermissions from 'src/configs/permissions'
import { redirectPage404 } from 'src/configs/redirect'

const KkLead = () => {
  // ** Redux
  const dispatch = useDispatch()

  useEffect(() => {
    if (!checkPermissions('referensi.kategori_risiko.view')) {
      redirectPage404()
    }

    dispatch(
      setBreadCrumb({
        parent: [
          {
            link: '/',
            label: 'Home'
          }
        ],
        title: 'Referensi Risiko'
      })
    )
  }, [dispatch])

  return (
    <>
      <PageHeader
        title={<Typography variant='h5'>Kategori Risiko</Typography>}
        subtitle={<Typography variant='body2'>Daftar Kategori Risiko</Typography>}
      />
      <br />

      <Table />
    </>
  )
}

export default KkLead

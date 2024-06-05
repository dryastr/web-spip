// ** React Imports
import { useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Table from 'src/views/referensi/jenis-kk-lead-spip/Table'

// ** Config
import checkPermissions from 'src/configs/permissions'
import { redirectPage404 } from 'src/configs/redirect'

const JenisKkLead = () => {
  // ** Redux
  const dispatch = useDispatch()

  useEffect(() => {
    if (!checkPermissions('referensi.jenis_kk_lead_spip.view')) {
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
        title: 'Referensi Jenis KK Lead SPIP'
      })
    )
  }, [dispatch])

  return (
    <>
      <PageHeader
        title={<Typography variant='h5'>Referensi Jenis KK Lead SPIP</Typography>}
        subtitle={<Typography variant='body2'>Jenis KK Lead SPIP</Typography>}
      />
      <br />

      <Table />
    </>
  )
}

export default JenisKkLead

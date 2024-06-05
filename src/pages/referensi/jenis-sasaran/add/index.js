// ** React Imports
import { useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import FormInput from 'src/views/referensi/jenis-sasaran/components/FormInput'

// ** Config
import checkPermissions from 'src/configs/permissions'
import { redirectPage404 } from 'src/configs/redirect'

const PenilaianAdd = () => {
  // ** Redux
  const dispatch = useDispatch()

  useEffect(() => {
    if (!checkPermissions('referensi.jenis_sasaran.create')) {
      redirectPage404()
    }

    dispatch(
      setBreadCrumb({
        parent: [
          {
            link: '/',
            label: 'Home'
          },
          {
            link: '/referensi/jenis-sasaran',
            label: 'Referensi Jenis Sasaran'
          }
        ],
        title: 'Tambah'
      })
    )
  }, [dispatch])

  // ** State
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Referensi Jenis Sasaran</Typography>}
            subtitle={<Typography variant='body2'>Tambah Jenis Sasaran</Typography>}
          />
        </Grid>
      </Grid>
      <br />

      <FormInput title={'Silahkan isi form berikut'} />
    </>
  )
}

export default PenilaianAdd

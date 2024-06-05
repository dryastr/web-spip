// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import FormInput from 'src/views/transaction/penilaian/components/FormInput'

const PenilaianEdit = () => {
  const router = useRouter()
  const { id } = router.query

  // ** Redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setBreadCrumb({
        parent: [
          {
            link: '/',
            label: 'Home'
          },
          {
            link: '/transaction/penilaian',
            label: 'Transaksi Penilaian'
          }
        ]
      })
    )
  }, [dispatch])

  return (
    <>
      {/* <p>hhh</p> */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Transaksi Penilaian</Typography>}
            subtitle={<Typography variant='body2'>Ubah Penilaian</Typography>}
          />
        </Grid>
      </Grid>
      <br />

      <FormInput title={'Silahkan isi form berikut'} action='edit' id={id} />
    </>
  )
}

export default PenilaianEdit

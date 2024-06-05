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
import FormInput from 'src/views/transaction/penilaian/components/FormInput'

const PenilaianAdd = () => {
  // ** Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadCrumb({
      parent: [
        {
          link : "/",
          label : "Home",
        },
        {
          link: "/transaction/penilaian",
          label: "Penilaian Mandiri",
        },
      ],
      title: "Tambah",
    }));
  }, [dispatch])

  // ** State
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Transaksi Penilaian</Typography>}
            subtitle={<Typography variant='body2'>Tambah Penilaian</Typography>}
          />
        </Grid>
      </Grid>
      <br />

      <FormInput title={'Silahkan isi form '}/>
    </>
  )
}

export default PenilaianAdd

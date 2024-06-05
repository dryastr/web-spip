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
import FormInput from 'src/views/referensi/klp/components/FormInput'

// ** Config
import checkPermissions from 'src/configs/permissions'
import { redirectPage404 } from 'src/configs/redirect'

const KlpAdd = () => {
  // ** Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkPermissions('referensi.klp.create')) {
      redirectPage404();
    }

    dispatch(setBreadCrumb({
      parent: [
        {
          link : "/",
          label : "Home",
        },
        {
          link: "/referensi/klp",
          label: "Referensi Kementrian Lembaga / Pemda",
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
            title={<Typography variant='h5'>Referensi Kementrian Lembaga / Pemda</Typography>}
            subtitle={<Typography variant='body2'>Tambah Kementrian Lembaga / Pemda</Typography>}
          />
        </Grid>
      </Grid>
      <br />

      <FormInput title={'Silahkan isi form berikut'}/>
    </>
  )
}

export default KlpAdd

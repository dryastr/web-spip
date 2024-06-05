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
import FormInput from 'src/views/referensi/klp/components/FormInput'

// ** Config
import checkPermissions from 'src/configs/permissions'
import { redirectPage404 } from 'src/configs/redirect'

const KlpEdit = () => {
  const router = useRouter()
  const {id} = router.query

  // ** Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkPermissions('referensi.klp.edit')) {
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
      title: "Ubah",
    }));
  }, [dispatch])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Referensi Kementrian Lembaga / Pemda</Typography>}
            subtitle={<Typography variant='body2'>Ubah Kementrian Lembaga / Pemda</Typography>}
          />
        </Grid>
      </Grid>
      <br />

      <FormInput title={'Silahkan isi form berikut'} action="edit" id={id} />
    </>
  )
}

export default KlpEdit

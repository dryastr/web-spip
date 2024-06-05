// ** React Imports
import { useEffect } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import Table from 'src/views/referensi/klp/Table'
import PageHeader from 'src/@core/components/page-header'

// ** Config
import checkPermissions from 'src/configs/permissions'
import { redirectPage404 } from 'src/configs/redirect'

const KlpTable = () => {
  // ** Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkPermissions('referensi.klp.view')) {
      redirectPage404();
    }

    dispatch(setBreadCrumb({
      parent: [
        {
          link : "/",
          label : "Home",
        },
      ],
      title: "Referensi Kementrian Lembaga / Pemda",
    }));
  }, [dispatch])

  return (
    <>
      <PageHeader
        title={<Typography variant='h5'>Referensi Kementrian Lembaga / Pemda</Typography>}
        subtitle={<Typography variant='body2'></Typography>}
      />
      <br />

      <Table />
    </>
  )
}

export default KlpTable

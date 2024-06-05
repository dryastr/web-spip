
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import FormVisiMisi from './components/FormVisiMisi'
import FormProgress from './components/FormProgress'
import FormDaftarOpd from './components/FormDaftarOpd'
import FromDaftarMember from '../daftar-member/TableHeader'
import TableHeader from '../daftar-member/TableHeader'

const DataUmum = (props) => {

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <FormVisiMisi data={props.data} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormProgress />
          <FormDaftarOpd />
            <TableHeader/>
        </Grid>
      </Grid>
    </>
  )
}

export default DataUmum

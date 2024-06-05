// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableAllUser from 'src/views/users/all/allTable'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const DataGrid = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              Manajemen Pengguna
            </LinkStyled>
          </Typography>
        }
        subtitle={<Typography variant='body2'>Daftar pengguna keanggotaan dalam sistem SPIP</Typography>}
      />
      <Grid item xs={12}>
        <TableAllUser />
      </Grid>
    </Grid>
  )
}

export default DataGrid

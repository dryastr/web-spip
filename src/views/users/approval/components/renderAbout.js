import moment from 'moment'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const RenderList = props => {
  const { title, value } = props

  return (
    <Box
      sx={{
        display: 'flex',
        '&:not(:last-of-type)': { mb: 3 },
        '& svg': { color: 'text.secondary' }
      }}
    >
      <Box sx={{ display: 'flex', mr: 2 }}>
        <Icon fontSize='1.25rem' icon={'mdi:arrow-circle-right'} />
      </Box>

      <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{`${title}:`}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{value}</Typography>
      </Box>
    </Box>
  )
}

const RenderAbout = props => {
  const { row } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.primary', textTransform: 'uppercase' }}>
                Mendaftar untuk K/L/P : {row.ref_klp_nama}
              </Typography>
              <RenderList title='Nama' value={row.user.fullname} />
              <RenderList title='Email' value={row.user.email} />
              <RenderList title='Alamat' value={row.user.email} />
              <RenderList title='Telp' value={row?.no_telp ?? '-'} />
              <RenderList title='Fax' value={row?.fax ?? '-'} />
              <RenderList title='Web' value={row?.website ?? '-'} />
              <RenderList title='Daftar' value={row?.created_at ? moment(row?.created_at).format('DD-MM-YYYY') : '-'} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RenderAbout

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// const data = {
//   id: 1,
//   role: 'admin',
//   status: 'active',
//   username: 'gslixby0',
//   avatarColor: 'primary',
//   country: 'El Salvador',
//   company: 'Yotz PVT LTD',
//   billing: 'Manual - Cash',
//   contact: '(479) 232-9151',
//   currentPlan: 'enterprise',
//   fullName: 'Daisy Patterson',
//   email: 'gslixby0@abc.net.au',
//   avatar: '/images/avatars/14.png'
// }

// const roleColors = {
//   admin: 'error',
//   editor: 'info',
//   author: 'warning',
//   maintainer: 'success',
//   subscriber: 'primary'
// }

const statusColors = {
  1: 'success',
  0: 'warning',
  2: 'warning'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  alignSelf: 'flex-end',
  color: theme.palette.text.disabled,
  fontSize: theme.typography.body1.fontSize
}))

const KlpViewLeft = props => {
  const { data } = props

  // console.log(data)

  // ** States

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.logo ? (
                <CustomAvatar
                  src={data.logo}
                  variant='rounded'
                  alt={data.nama}
                  sx={{ width: 150, height: 150, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 150, height: 150, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(data?.nama)}
                </CustomAvatar>
              )}
              <Typography variant='h5' sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
                {data.nama}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CustomChip
                  rounded
                  skin='light'
                  label={`Kode: ${data.kode}`}
                  color={'warning'}
                  sx={{ textTransform: 'capitalize', mr: 3 }}
                />
                <CustomChip
                  rounded
                  skin='light'
                  label={data.nama_pendek}
                  color={'error'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            </CardContent>

            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                      {data.jenis === 'KL' ? 'Kementerian Lembaga' : 'Pemerintah Daerah'}
                    </Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                    <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                  </CustomAvatar>
                  <div>
                    <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Level</Typography>
                    <Typography variant='body2'>{data.level === 'P' ? 'Pusat' : 'Non-Pusat'}</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Pimpinan
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nama:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.pimpinan ?? '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Jabatan:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.jabatan_pimpinan ?? '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                  <CustomChip
                    rounded
                    skin='light'
                    size='small'
                    label={data.is_active === 1 ? 'Aktif' : 'Tidak Aktif'}
                    color={statusColors[data.is_active]}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pb: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Alamat
              </Typography>
            </CardContent>

            <CardContent>
              <Box sx={{ mt: 2.5, mb: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ color: 'text.secondary' }}>{data.alamat ?? '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Telp:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.no_telp ?? '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Fax:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.fax ?? '-'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Web:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.website ?? '-'}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Lokasi:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{data.lokasi ?? '-'}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default KlpViewLeft

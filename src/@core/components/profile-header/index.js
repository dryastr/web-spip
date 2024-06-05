// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled, useTheme } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import UpdateAnggaranService from 'src/services/updateanggaran-services'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from 'src/store/loadingSlice'
import toast from 'react-hot-toast'
import penilaianService from 'src/services/penilaian-services'

const ProfileHeader = props => {
  const { data, setData } = props

  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()

  const theme = useTheme()

  const styleToast = {
    style: {
      padding: '16px',
      color: theme.palette.primary.main,
      border: '1px solid ' + theme.palette.primary.main
    },
    iconTheme: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.primary.contrastText
    }
  }

  const styleToastError = {
    style: {
      padding: '16px',
      color: theme.palette.primary.error,
      border: '1px solid ' + theme.palette.primary.error
    },
    iconTheme: {
      primary: theme.palette.primary.error,
      secondary: theme.palette.primary.contrastText
    }
  }

  const formattedAnggaran = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(data.anggaran)

  // ** State
  const [openEditNominal, setOpenEditNominal] = useState(false)

  const [updateAnggaran, setUpdateAnggaran] = useState({
    ref_klp_id: id,
    anggaran: ''
  })

  const loadData = () => {
    penilaianService.show(id).then(response => {
      if (response) {
        setData(response || {})
      }
    })
  }

  const handleOpenEditNominal = () => {
    setOpenEditNominal(true)
    let newData = {
      ...updateAnggaran,
      anggaran: parseInt(data.anggaran)
    }
    setUpdateAnggaran(newData)
  }
  const handleCancelEditNominal = () => setOpenEditNominal(false)

  const handleInputChangeAnggaran = event => {
    setUpdateAnggaran({
      ...updateAnggaran,
      anggaran: event.target.value
    })
  }

  const handleSubmit = async () => {
    let sendData = {
      ...updateAnggaran,
      // anggaran: '',
      ref_klp_id: id
    }
    console.log(updateAnggaran, data)

    dispatch(showLoading())
    UpdateAnggaranService.update(data.id, sendData).then(response => {
      dispatch(hideLoading())
      if (response?.status === 200) {
        toast.success('Anggaran berhasil diupdate', styleToast)
        setUpdateAnggaran({
          ref_klp_id: id,
          anggaran: ''
        })
        setOpenEditNominal(false)

        loadData()
      } else {
        toast.error('Anggaran gagal diupdate', styleToastError)
      }
    })
  }

  // useEffect(() => {
  //   if (id) {
  //     loadData();
  //   }
  // }, [id]);

  return data !== null ? (
    <Card>
      {/* <CardMedia
        component='img'
        image={'/images/pages/profile-banner-2.png'}
        alt='profile-header'
        sx={{
          height: { xs: 60, md: 100 }
        }}
      /> */}
      <CardContent
        sx={{
          pt: 0,
          // mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'center' }
        }}
      >
        {data?.klp?.logo_url !== '/storage/' ? (
          <CustomAvatar
            src={data.klp?.logo_url}
            variant='rounded'
            alt={data.nama}
            sx={{
              width: 108,
              height: 108,
              borderRadius: 1,
              border: `4px solid #FFF`,
              // mb: 4
            }}
          />
        ) : (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={'primary'}
            sx={{
              width: 108,
              height: 108,
              borderRadius: 1,
              border: `4px solid #FFF`,
              // mb: 4,
              // fontSize: '2rem'
            }}
          >
            {getInitials(data?.klp?.nama)}
          </CustomAvatar>
        )}

        {/* <ProfilePicture src={data.profileImg} alt='profile-picture' /> */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h6' sx={{ mb: 2.5 }}>
              {data?.klp?.nama}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <Icon fontSize='1.25rem' icon='tabler:arrow-right-circle' sx={{ color: 'text.success' }} />
                <CustomChip
                  rounded
                  skin='light'
                  label={data.klp?.nama_pendek || '-'}
                  color={'secondary'}
                  sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                />
              </Box>

              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                <Icon fontSize='1.25rem' icon='tabler:map-pin' />
                <Typography sx={{ color: 'text.secondary' }}>Tahun:</Typography>
                <CustomChip
                  rounded
                  skin='light'
                  label={`${data.tahun}`}
                  color={'secondary'}
                  sx={{ textTransform: 'capitalize', fontWeight: 'bold', ml: 3 }}
                />
              </Box>

              <CustomChip
                rounded
                skin='light'
                label={`Status: ${data.status_description}`}
                color={'error'}
                sx={{ textTransform: 'capitalize', mr: 3 }}
              />
            </Box>
          </Box>
          <Button
            variant='contained'
            sx={{ '& svg': { mr: 2 }, display: 'flex', justifyContent: 'space-between' }}
            color='error'
          >
            <Icon icon='tabler:coin' fontSize='1.125rem' />
            {formattedAnggaran}
            <Tooltip title='Update Anggaran'>
              <IconButton aria-label='edit' sx={{ color: 'white', position: 'relative' }}>
                <Icon
                  icon='mdi:square-edit-outline'
                  fontSize='1.25rem'
                  sx={{ position: 'absolute', right: 0 }}
                  onClick={handleOpenEditNominal}
                />
              </IconButton>
            </Tooltip>

            <Dialog
              open={openEditNominal}
              onClose={handleCancelEditNominal}
              aria-labelledby='user-view-security-edit-mobile-number'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
              aria-describedby='user-view-security-edit-mobile-number-description'
            >
              <DialogTitle
                id='user-view-security-edit-mobile-number'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              ></DialogTitle>

              <DialogContent
                sx={{
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Typography variant='h6'>Update Anggaran</Typography>
                <Typography variant='body2' sx={{ mt: 2, mb: 5 }}>
                  Update anggaran sesuai dengan kebutuhan
                </Typography>
                <form onSubmit={e => e.preventDefault()}>
                  <TextField
                    autoFocus
                    fullWidth
                    label='Anggaran'
                    value={updateAnggaran.anggaran}
                    onChange={handleInputChangeAnggaran}
                  />
                  <Box sx={{ mt: 6.5, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='reset' color='secondary' variant='outlined' onClick={handleCancelEditNominal}>
                      Cancel
                    </Button>
                    <Button type='submit' sx={{ ml: 3 }} variant='contained' onClick={handleSubmit}>
                      Send
                    </Button>
                  </Box>
                </form>
              </DialogContent>
            </Dialog>
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : null
}

export default ProfileHeader

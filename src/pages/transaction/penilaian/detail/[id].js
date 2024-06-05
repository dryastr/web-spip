// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'
import { getData } from 'src/store/pages/penilaian/penilaianSlice'

// ** MUI Components
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TabContext from '@mui/lab/TabContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import TabList from '@mui/lab/TabList'
import { Typography, Grid, Chip, Avatar, Button } from '@mui/material'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component
import DataUmum from 'src/views/transaction/penilaian/detail/data-umum/DataUmum'
import Sasaran from 'src/views/transaction/penilaian/detail/sasaran/Sasaran'
import Program from 'src/views/transaction/penilaian/detail/program/Program'
import DataOpini from 'src/views/transaction/penilaian/detail/DataOpini'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const PenilaianDetail = ({ data }) => {
  // ** Redux
  const dispatch = useDispatch()
  const penilaianSlice = useSelector(({ penilaianSlice }) => penilaianSlice)

  // ** Hooks
  const router = useRouter()
  const { id } = router.query

  // ** State
  const [activeTab, setActiveTab] = useState(1)
  const [rows, setRows] = useState({})

  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  useEffect(() => {
    dispatch(getData(id)).then(response => {
      console.log(response);
      setRows(response)
    })
  }, [])

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
            label: 'Penilaian Mandiri'
          }
        ],
        title: 'Detail'
      })
    )
  }, [dispatch])

  const tabs = [
    {
      value: 1,
      label: 'Data Umum',
      icon: 'mdi:television-guide'
    },
    {
      value: 2,
      label: 'Sastra Pemda & Sasaran OPD',
      icon: 'mdi:account-group'
    },
    {
      value: 3,
      label: 'Program',
      icon: 'mdi:format-list-text'
    },
    {
      value: 4,
      label: 'Data Opini',
      icon: 'fluent:people-chat-16-filled'
    }
  ]

  const formattedAnggaran = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(rows?.anggaran)

  return (
    <>
      {/* <ProfileHeader data={rows} /> */}
      <Card>
        <CardContent>
          <Box className='keen-slider__slide'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {rows?.klp?.logo_url !== '/storage/' ? (
                <Box component='img' src={''} alt={'Test'} sx={{ mr: 5, width: 84, borderRadius: 1 }} />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={'primary'}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 1,
                    border: `4px solid #FFF`

                    // mb: 4,
                    // fontSize: '2rem'
                  }}
                >
                  {/* {getInitials(rows?.klp?.nama)} */}
                  <Typography sx={{ fontSize: '15px'}}>{getInitials(rows?.klp?.nama)}</Typography>
                </CustomAvatar>
              )}
              <Box sx={{ width: '100%', paddingLeft: 5, alignItems: 'center' }}>
                <Typography sx={{ mb: 2.5, fontWeight: 600 }}>{rows?.klp?.nama}</Typography>
                <Grid container spacing={2.5}>
                  <Grid item sx={{display: 'flex'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                      <Chip
                        label={rows?.klp?.nama_pendek || '-'}
                        avatar={
                          <Avatar>
                            <Icon icon='mdi:note-text-outline' fontSize={20} />
                          </Avatar>
                        }
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 3}}>
                      <Chip
                        label={'Tahun : ' + rows?.tahun}
                        avatar={
                          <Avatar>
                            <Icon icon='mdi:crosshairs-gps' fontSize={20} />
                          </Avatar>
                        }
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 3}}>
                      <Chip
                        label={'Anggaran : ' + formattedAnggaran}
                        avatar={
                          <Avatar>
                            <Icon icon='mdi:currency-usd' fontSize={20} />
                          </Avatar>
                        }
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 3 }}>
                      <Chip
                        label={'Status : ' + rows?.status_description}
                        color='error'
                        avatar={
                          <Avatar>
                            <Icon icon='pajamas:status-active' fontSize={20} />
                          </Avatar>
                        }
                      />
                    </Box>
                  </Grid>

                  {/* <Grid item xs={10}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={'Anggaran : ' + formattedAnggaran}
                        avatar={
                          <Avatar>
                            <Icon icon='mdi:currency-usd' fontSize={20} />
                          </Avatar>
                        }
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={'Status : ' + rows?.status_description}
                        color='error'
                        avatar={
                          <Avatar>
                            <Icon icon='pajamas:status-active' fontSize={20} />
                          </Avatar>
                        }
                      />
                    </Box>
                  </Grid> */}
                </Grid>
              </Box>
              <Box>
                <Button size='large' color='success' variant='contained' sx={{ width: '100%' }}>
                  Siap Penilaian
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <br />
      <Card>
        <TabContext value={activeTab}>
          <TabList
            variant='fullWidth'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='customized tabs example'
          >
            {tabs.map((item, i) => {
              return (
                <Tab
                  key={i}
                  value={item.value}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon fontSize='1.125rem' icon={item.icon} />
                      {!hideText && item.label}
                    </Box>
                  }
                />
              )
            })}
            {/* <Button>+ Sasaran Pemda</Button> */}
          </TabList>
          {/* <button style={button} onClick={togglesasaran}>+ Sasaran Pemda</button> */}
        </TabContext>
      </Card>
      <br />

      {activeTab === 1 && (
        <>
          <DataUmum data={rows} />
        </>
      )}

      {activeTab === 2 && (
        <>
          <Sasaran data={rows} />
        </>
      )}

      {activeTab === 3 && (
        <>
          <Program />
        </>
      )}

      {activeTab === 4 && (
        <>
          <DataOpini />
        </>
      )}
    </>
  )
}

export default PenilaianDetail

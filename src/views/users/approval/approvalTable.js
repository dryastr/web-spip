// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'
import { showLoading, hideLoading } from 'src/store/loadingSlice'
import toast from 'react-hot-toast'
import { getInitials } from 'src/@core/utils/get-initials'

// import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { DataGrid } from '@mui/x-data-grid'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomTextField from 'src/@core/components/mui/text-field'
import QuickSearchToolbar from 'src/@core/components/data-grid/quick-search-toolbar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Data Import
import userService from 'src/services/user-services'
import OptionAction from './components/optionAction'
import renderClient from './components/renderClient'
import RenderAbout from './components/renderAbout'

const statusObj = {
  'dalam-antrian': { title: 'Dalam Antrian', color: 'warning' },
  disetujui: { title: 'Disetujui', color: 'success' },
  ditolak: { title: 'Ditolak', color: 'error' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const renderKlp = params => {
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  return (
    <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
      {getInitials(params.ref_klp_nama ? params.ref_klp_nama : 'No Name')}
    </CustomAvatar>
  )
}

const TableColumns = () => {
  // ** States
  const [rows, setRows] = useState([])
  const [rowsTotal, setRowsTotal] = useState(0)
  const [rowsCount, setRowsCount] = useState({})

  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 10,
    sort: 'id',
    sort_type: 'asc'
  })

  // finishExec = useSelector(state => state)

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // Open dialog
  const [editValue, setEditValue] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  // Konfirmasi
  const [editKonfirmasiValue, setEditKonfirmasiValue] = useState('')
  const [title, setTitle] = useState('')
  const [colorAlert, setColorAlert] = useState('primary')
  const [colorButton, setColorButton] = useState('primary')
  const [rowsSelected, setRowsSelected] = useState({})
  const [editKonfirmasiDialogOpen, setEditKonfirmasiDialogOpen] = useState(false)
  const handleKonfirmasiDialogToggle = () => setEditKonfirmasiDialogOpen(!editKonfirmasiDialogOpen)

  useEffect(() => {
    dispatch(
      setBreadCrumb({
        parent: [
          {
            link: '/',
            label: 'Home'
          },
          {
            link: '/management-pengguna',
            label: 'Management Pengguna'
          }
        ],
        title: 'Persetujuan'
      })
    )
    loadData(params)
  }, [dispatch])

  function loadData(paramsChanges) {
    setIsLoading(true)
    userService.getListUserApproval(paramsChanges).then(response => {
      if (response.data) {
        console.log(response)
        setRows(response.data || [])
        setRowsTotal(response?.total)
      }

      // setIsLoading(false)
    })

    userService.getCountApproval(paramsChanges).then(response => {
      if (response) {
        console.log(response)
        setRowsCount(response || {})
      }

      setIsLoading(false)
    })
  }

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = rows.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleEditPermission = name => {
    setEditValue(name)
    setEditDialogOpen(true)
  }

  const handleApprove = async (id, nama, row) => {
    try {
      if (nama.toString().toLowerCase() === 'lainnya') {
        setEditDialogOpen(true)
      } else {
        setEditKonfirmasiValue('approve')
        setTitle('Persetujuan')
        setColorAlert('success')
        setColorButton('primary')
        setRowsSelected(row)
        setEditKonfirmasiDialogOpen(true)
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      toast.error('Gagal disetujui')
    }
  }

  const handleReject = async (id, row) => {
    try {
      setEditKonfirmasiValue('reject')
      setTitle('Penolakan')
      setColorAlert('error')
      setColorButton('error')
      setRowsSelected(row)
      setEditKonfirmasiDialogOpen(true)
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      toast.error('Gagal ditolak')
    }
  }

  const handleApproveReject = async (id, action) => {
    var message = action === 'approve' ? 'disetujui' : 'ditolak'

    try {
      const response = await userService.approveReject(action, id)

      if (response?.status === 200) {
        toast.success('Data berhasil ' + message)
        loadData(params)

        // navigate('/users/approval/')
        setEditKonfirmasiDialogOpen(false)
      } else {
        toast.error('Gagal ' + message)
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
      toast.error('Gagal disetujui')
    }
  }

  const columns = [
    {
      flex: 0.275,
      minWidth: 200,
      headerName: 'K/L/P',
      field: 'ref_klp_nama',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderKlp(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.ref_klp_nama}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.255,
      minWidth: 200,
      field: 'user',
      headerName: 'Name',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.user.fullname}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.user.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.28,
      minWidth: 120,
      headerName: 'Alamat',
      field: 'alamat',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row?.alamat}
        </Typography>
      )
    },
    {
      flex: 0.28,
      minWidth: 120,
      headerName: 'Telp/Fax',
      field: 'no_telp',
      renderCell: params => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap variant='caption'>
            Tel: {params.row?.no_telp ?? '-'} <br />
            Fax: {params.row?.fax ?? '-'} <br />
          </Typography>
          <Typography noWrap variant='caption'>
            Web: <Link href={params.row?.website ?? '-'}>{params.row?.website ?? '-'}</Link>
          </Typography>
        </Box>
      )
    },

    {
      flex: 0.2,
      type: 'date',
      minWidth: 120,
      headerName: 'Tanggal Daftar',
      field: 'created_at',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row?.created_at ? moment(params.row?.created_at).format('DD-MM-YYYY') : '-'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'status_approval',
      headerName: 'Status',
      renderCell: params => {
        const status = statusObj[params.row.status_approval]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <OptionAction
          id={row.id}
          nama={row.ref_klp_nama}
          row={row}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      )
    }
  ]

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {rowsCount && (
          <Grid container spacing={6}>
            <Grid item xs={12} md={4} sm={6}>
              <CardStatsHorizontalWithDetails
                stats={rowsCount['dalam-antrian']}
                title={'Menunggu Persetujuan'}
                avatarColor='warning'
                icon='tabler:user-check'
                trendDiff='+'
                trend='positive'

                // subtitle='Menunggu persetujuan admin'
              />
            </Grid>

            <Grid item xs={12} md={4} sm={6}>
              <CardStatsHorizontalWithDetails
                stats={rowsCount?.ditolak}
                title={'Ditolak'}
                avatarColor='error'
                icon='tabler:user-check'
                trendDiff='-'
                trend='negative'

                // subtitle='Menunggu persetujuan admin'
              />
            </Grid>

            <Grid item xs={12} md={4} sm={6}>
              <CardStatsHorizontalWithDetails
                stats={rowsCount?.disetujui}
                title={'Disetujui'}
                avatarColor='success'
                icon='tabler:user-exclamation'
                trendDiff='+'
                trend='positive'

                // subtitle='Menunggu persetujuan admin'
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filter Pengguna' />
          <Divider sx={{ m: '0 !important' }} />
          <DataGrid
            autoHeight
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            slots={{ toolbar: QuickSearchToolbar }}
            onPaginationModelChange={setPaginationModel}
            rows={filteredData.length ? filteredData : rows}
            slotProps={{
              baseButton: {
                variant: 'outlined'
              },
              toolbar: {
                value: searchText,
                clearSearch: () => handleSearch(''),
                onChange: event => handleSearch(event.target.value)
              }
            }}
          />
        </Card>
      </Grid>

      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Persetujuan Keanggotaan
          </Typography>
          <Typography variant='body2'>Informasi penambahan KLP.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Alert severity='error' sx={{ maxWidth: '500px' }}>
            <AlertTitle>K/L/P Tidak Terdaftar!</AlertTitle>
            Silakan lengkapi data K/L/P dengan mengklik tombol berikut
            <Button href='/referensi/klp' component={Link} sx={{ mt: 2 }} variant='contained' color='primary'>
              <Typography variant='body2' color={'white'}>
                Tambah K/L/P
              </Typography>
            </Button>
          </Alert>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'flex-end'
          }}
        >
          <Button variant='tonal' color='secondary' onClick={handleDialogToggle}>
            Batal
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth='md' scroll='body' onClose={handleKonfirmasiDialogToggle} open={editKonfirmasiDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Konfirmasi {title}
          </Typography>
          <Typography variant='body2'>Informasi pendaftar keanggotaan SPIP.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Alert severity={colorAlert} sx={{ maxWidth: '500px', mb: 5 }}>
            Anda akan melakukan {title.toLowerCase()} keanggotaan aplikasi SPIP, silakan verifikasi data dibawah ini
          </Alert>
          <RenderAbout row={rowsSelected} />
          {/* onSubmit={onSubmit} */}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'flex-end',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button
            variant='contained'
            color={colorButton}
            sx={{ mr: 1 }}
            onClick={() => handleApproveReject(rowsSelected?.id, editKonfirmasiValue)}
          >
            {editKonfirmasiValue === 'approve' ? 'Setujui' : 'Tolak'}
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleKonfirmasiDialogToggle}>
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default TableColumns

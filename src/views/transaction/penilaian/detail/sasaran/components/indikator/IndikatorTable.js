// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import DialogDelete from 'src/@core/components/dialog/delete'
import IndikatorTableOptions from './IndikatorTableOptions'
import IndikatorForm from './IndikatorForm'

// ** Third Party Imports
import moment from 'moment'

// ** Services
import sasaranIndikatorService from 'src/services/sasaran-indikator-service'

// ** Component
import toast from 'react-hot-toast'
import IndikatorBtnCheck from './IndikatorBtnCheck'

const IndikatorTable = props => {
  // ** Redux
  const dispatch = useDispatch()

  // ** Hooks
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

  // ** State
  const [item, setItem] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [form, setForm] = useState('add')

  const initialParams = {
    trans_sasaran_id: props.item?.id,
    search: '',
    sort: '',
    sort_type: '',
    page: 1,
    per_page: 10
  }
  const [params, setParams] = useState(initialParams)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    loadData(params)
  }, [dispatch])

  const [typingTimeout, setTypingTimeout] = useState(0)

  const handleChangeSearch = event => {
    const paramsChanges = { ...params, search: event.target.value }
    setParams(paramsChanges)
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(() => {
        loadData(paramsChanges)
      }, 500)
    )
  }

  const handleCloseDialogForm = () => {
    loadData(params)
    setFormDialogOpen(false)
  }

  const loadData = params => {
    setIsLoading(true)
    setParams(params)
    sasaranIndikatorService.getPagination(params).then(response => {
      setPagination(response)
      setIsLoading(false)
    })
  }

  const handleDeleteData = item => {
    setItem(item)
    setDeleteDialogOpen(true)
  }

  const handleEditData = item => {
    setItem(item)
    setForm('edit')
    setFormDialogOpen(true)
  }

  const handleDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen)

  const handleDialogDelete = () => {
    dispatch(showLoading())
    sasaranIndikatorService.delete(item.id).then(response => {
      loadData(params)
      dispatch(hideLoading())
      setDeleteDialogOpen(false)
      if (response?.status === 200) {
        toast.success('Data berhasil di hapus.', styleToast)
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  }

  const handleChangePage = (event, page) => {
    const paramsChanges = { ...params, page }
    setParams(paramsChanges)
    loadData(paramsChanges)
  }

  const handleChangeRowsPerPage = event => {
    const paramsChanges = { ...params, per_page: event.target.value }
    setParams(paramsChanges)
    loadData(paramsChanges)
  }

  const handleChangeData = data => {
    let array = pagination.data
    const index = array.findIndex(item => item.id === data.id)
    if (index !== -1) {
      let newData = { ...array[index], ...data }
      array[index] = newData
    }
    setPagination({
      ...pagination,
      data: array
    })
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div>
          <TextField
            size='small'
            // value={search}
            sx={{ mr: 4, mb: 2.5 }}
            placeholder='Pencarian'
            onChange={handleChangeSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='mdi:magnify' />
                </InputAdornment>
              )
            }}
          />
        </div>

        <Button
          sx={{ mb: 2.5 }}
          variant='contained'
          onClick={() => {
            setForm('add')
            setFormDialogOpen(true)
          }}
        >
          Tambah Data
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
              <TableCell sx={{ minWidth: 100 }}>Kode</TableCell>
              <TableCell sx={{ minWidth: 200 }}>Nama</TableCell>
              <TableCell>Target Kinerja</TableCell>
              <TableCell>Satuan</TableCell>
              <TableCell>Indikator Kinerja Tepat</TableCell>
              <TableCell>Target Kinerja Tepat</TableCell>
              <TableCell width={200}>Tanggal Diperbaharui</TableCell>
              <TableCell width={200}>Diperbaharui Oleh</TableCell>
              <TableCell align='right' sx={{ whiteSpace: 'nowrap' }} width={10}>
                Tindakan
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow
                  hover
                  sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(5)} !important` } }}
                >
                  <TableCell colSpan={9} align='center'>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {pagination.data?.length > 0 ? (
                  pagination.data.map((data, i) => {
                    return (
                      <TableRow
                        hover
                        sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(1)} !important` } }}
                        key={i}
                      >
                        <TableCell>
                          <Typography variant='body2'>{data.kode}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data.nama}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data.target_kinerja}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data.satuan}</Typography>
                        </TableCell>
                        <TableCell align='center' valign='center'>
                          <IndikatorBtnCheck
                            type='nsa_indikator_kinerja_tepat'
                            data={data}
                            changeData={handleChangeData}
                          />
                        </TableCell>
                        <TableCell align='center' valign='center'>
                          <IndikatorBtnCheck
                            type='nsa_target_kinerja_tepat'
                            data={data}
                            changeData={handleChangeData}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            {data?.updated_at ? moment(data.updated_at).format('DD-MM-YYYY HH:mm:ss') : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>{data.updated_by_name}</Typography>
                        </TableCell>
                        <TableCell>
                          <IndikatorTableOptions
                            deleteData={() => {
                              handleDeleteData(data)
                            }}
                            editData={() => {
                              handleEditData(data)
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <>
                    <TableRow
                      hover
                      sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(4)} !important` } }}
                    >
                      <TableCell colSpan={9} align='center'>
                        <Typography variant='body2'>Tidak ada data.</Typography>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <TablePagination
          sx={{
            '& .MuiTablePagination-spacer': {
              flex: 1
            }
          }}
          component='div'
          count={pagination.total || 0}
          rowsPerPage={params.per_page}
          page={params.page - 1}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
            <Pagination
              page={params.page}
              shape='rounded'
              component='div'
              count={Math.ceil((pagination.total || 0) / params.per_page)}
              defaultPage={1}
              boundaryCount={2}
              onChange={handleChangePage}
            />
          )}
        />
      </Box>

      <DialogDelete
        handleDialogToggle={handleDialogToggle}
        deleteDialogOpen={deleteDialogOpen}
        handleDialogDelete={handleDialogDelete}
      />

      <IndikatorForm
        form={form}
        transSasaranId={props.item.id}
        item={item}
        handleDialogToggle={handleCloseDialogForm}
        dialogOpen={formDialogOpen}
      />
    </>
  )
}

export default IndikatorTable

import React, { useEffect, useState } from 'react'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Import
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component
import OptionActions from './OptionActions'
import DialogDelete from 'src/@core/components/dialog/delete'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// ** Services
import programService from 'src/services/program-service'

// ** Component
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  kode: yup.string().required().label('Kode'),
  nama: yup.string().required().label('Nama'),
})

const defaultValues = {
  kode: '',
  nama: '',
}

const Program = () => {
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

  // ** Redux
  const dispatch = useDispatch()
  const penilaianSlice = useSelector(({penilaianSlice}) => penilaianSlice);

  // ** State
  const initialParams = {
    trans_penilaian_id: penilaianSlice.trans_penilaian_id,
    search: '',
    sort: '',
    sort_type: '',
    page: 1,
    per_page: 10,
  };
  const [params, setParams] = useState(initialParams);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({});
  const [item, setItem] = useState(null);
  const [form, setForm] = useState('add')

  useEffect(() => {
    loadData(params);
  }, [dispatch]);

  const handleCloseDialogAdd = () => {
    setAddDialogOpen(false);
  }

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    dispatch(showLoading())
    data.trans_penilaian_id = penilaianSlice.trans_penilaian_id;
    let action = null;
    if (form === 'add') {
      action = programService.store(data)
    } else {
      action = programService.update(item.id, data)
    }
    action.then(response => {
      dispatch(hideLoading())
      if (response?.status === 200) {
        reset()
        setAddDialogOpen(false);
        setItem(null);
        setForm('add');
        toast.success('Sasaran berhasil disimpan.', styleToast)
      } else {
        toast.error('Sasaran gagal disimpan.', styleToastError)
      }
      loadData(params);
    })
  }

  function handleChangePage(event, page) {
    const paramsChanges = { ...params, page };
    setParams(paramsChanges);
    loadData(paramsChanges);
  }

  function handleChangeRowsPerPage(event) {
    const paramsChanges = { ...params, per_page: event.target.value };
    setParams(paramsChanges);
    loadData(paramsChanges);
  }

  const loadData = (params) => {
    setIsLoading(true);
    programService.get(params).then(response => {
      setPagination(response)
      setIsLoading(false);
    })
  }

  const handleDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen)

  const handleDialogDelete = () => {
    dispatch(showLoading())
    programService.delete(item.id).then(response => {
      dispatch(hideLoading())
      setDeleteDialogOpen(false)
      if (response?.status === 200) {
        loadData(params);
        toast.success('Data berhasil di hapus.', styleToast)
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  }
  
  return (
    <>
      <Box sx={{ margin: 2 }}>
        <Avatar
          variant='rounded'
          sx={{
            width: '100%',
            height: 92,
            backgroundColor: 'transparent',
            border: theme =>
              `2px dashed ${theme.palette.divider}`,
            cursor: 'pointer',
            '&:hover': {
              border: theme =>
              `2px solid ${theme.palette.primary.main}`,
            }
          }}
          onClick={() => {
            reset(defaultValues)
            setForm('add');
            setAddDialogOpen(true);
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              display: 'flex',
              borderRadius: '8px',
              alignItems: 'center',
              color: 'action.active',
              justifyContent: 'center',
              backgroundColor: theme => hexToRGBA(theme.palette.secondary.main, 0.12)
            }}
          >
            <Icon icon='mdi:plus' />
          </Box>
        </Avatar>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
                <TableCell>Kode</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell width={200}>Tanggal Diperbaharui</TableCell>
                <TableCell width={200}>Diperbaharui Oleh</TableCell>
                <TableCell align='right' sx={{ whiteSpace: 'nowrap' }} width={10}>
                  Tindakan
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isLoading ? (
                <>
                  <TableRow
                    hover
                    sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(4)} !important` } }}
                  >
                    <TableCell colSpan={5} align='center'>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  {
                    pagination.data?.length > 0 ? 
                    pagination.data.map((data) => {
                      return (
                        <TableRow
                          hover
                          sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(1)} !important` } }}
                        >
                          <TableCell>
                              <Typography variant='body2'>{data.kode}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2'>{data.nama}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2'>{data?.updated_at ? moment(data.updated_at).format('DD-MM-YYYY HH:mm:ss') : '-'}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2'>{data.updated_by_name}</Typography>
                          </TableCell>
                          <TableCell>
                            <OptionActions
                              deleteData={() => {
                                setItem(data);
                                setDeleteDialogOpen(true);
                              }}
                              editData={() => {
                                reset(data);
                                setForm('edit')
                                setItem(data);
                                setAddDialogOpen(true);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    } ) : (
                      <>
                        <TableRow
                          hover
                          sx={{ '& .MuiTableCell-root': { border: 0, py: theme => `${theme.spacing(4)} !important` } }}
                        >
                          <TableCell colSpan={5} align='center'>
                            <Typography variant='body2'>Tidak ada data.</Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    )
                  }
                </>
              )
            }

          </TableBody>
        </Table>
      </TableContainer>

      <Box>
      <TablePagination
        sx={{
          "& .MuiTablePagination-spacer": {
            flex: 1,
          },
        }}
        component="div"
        count={pagination.total || 0}
        rowsPerPage={params.per_page}
        page={params.page - 1}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={() => (
          <Pagination
            page={params.page}
            shape="rounded"
            component="div"
            count={Math.ceil((pagination.total || 0) / params.per_page)}
            defaultPage={1}
            boundaryCount={2}
            onChange={handleChangePage}
          />
        )}
      />
      </Box>

      <Dialog maxWidth='sm' fullWidth onClose={handleCloseDialogAdd} open={addDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            {form === 'add' ? 'Tambah' : 'Ubah'} Program
          </Typography>
          <Typography variant='body2'>Silahkan isi data form berikut</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <br />
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='kode'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Kode'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.kode)}
                    placeholder='Kode'
                  />
                )}
              />
              {errors.kode && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.kode.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='nama'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Nama'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.nama)}
                    placeholder='Nama'
                  />
                )}
              />
              {errors.nama && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.nama.message}</FormHelperText>
              )}
            </FormControl>

            <br />
            <DialogActions className='dialog-actions-dense'>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleCloseDialogAdd}
              >
                Batal
              </Button>
              <Button
                type='submit'
                variant='contained'

                // onClick={handleSubmitVisiMisi}
              >
                Simpan
              </Button>
            </DialogActions>
          </form>

        </DialogContent>
        
      </Dialog>

      <DialogDelete
        handleDialogToggle={handleDialogToggle}
        deleteDialogOpen={deleteDialogOpen}
        handleDialogDelete={handleDialogDelete}
      />
    </>
  )
}

export default Program

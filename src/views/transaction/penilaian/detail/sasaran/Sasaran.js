import React, { useEffect, useState } from 'react'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { getData } from 'src/store/pages/penilaian/sasaranSlice'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Imports
import Card from '@mui/material/Card'
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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useTheme } from '@mui/material/styles'

// ** Custom Components
import Item from './components/Item'
import DialogDelete from 'src/@core/components/dialog/delete'
import Indikator from './components/indikator/Indikator'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Services
import referensiServices from 'src/services/referensi-services'
import sasaranService from 'src/services/sasaran-service'

// ** Component
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  ref_jenis_sasaran_id: yup.string().required().label('Jenis Sasaran'),
  kode: yup.string().required().label('Kode'),
  nama: yup.string().required().label('Nama'),
  nsa_orientasi_hasil: yup.bool().label('Orientasi Hasil'),
  nsa_relevan_mandat_sa: yup.bool().label('Relevan Mandat'),
  nsa_uji_kecukupan_indikator_sa: yup.bool().label('Uji Kecukupan Indikator'),
  catatan: yup.string().label('Catatan')
})

const defaultValues = {
  ref_jenis_sasaran_id: '',
  kode: '',
  nama: '',
  nsa_orientasi_hasil: false,
  nsa_relevan_mandat_sa: false,
  nsa_uji_kecukupan_indikator_sa: false,
  catatan: ''
}

const Sasaran = props => {
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
  const penilaianSlice = useSelector(({ penilaianSlice }) => penilaianSlice)
  const sasaranSlice = useSelector(({ sasaranSlice }) => sasaranSlice)
  const data = sasaranSlice.data

  // ** State
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [listJenisSasaran, setListJenisSasaran] = useState([])
  const [item, setItem] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [dialogOpenIndikator, setDialogOpenIndikator] = useState(false)
  const [form, setForm] = useState('add')

  useEffect(() => {
    loadData()
  }, [props.data.id])

  const loadData = () => {
    if (props.data.id) {
      loadDataJenisSasaran()
      dispatch(getData(props.data.id))
    }
  }

  const handleCloseDialogAdd = () => {
    setAddDialogOpen(false)
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
    data.trans_penilaian_id = penilaianSlice.trans_penilaian_id
    data.nsa_orientasi_hasil = data.nsa_orientasi_hasil ? 1 : 0
    data.nsa_relevan_mandat_sa = data.nsa_relevan_mandat_sa ? 1 : 0
    data.nsa_uji_kecukupan_indikator_sa = data.nsa_uji_kecukupan_indikator_sa ? 1 : 0
    if (item) {
      data.parent_id = item.id
    }
    let action = null
    if (form === 'add') {
      action = sasaranService.store(data)
    } else {
      action = sasaranService.update(item.id, data)
    }
    action.then(response => {
      dispatch(hideLoading())
      if (response?.status === 200) {
        reset()
        setAddDialogOpen(false)
        setItem(null)
        setForm('add')
        toast.success('Sasaran berhasil disimpan.', styleToast)
      } else {
        toast.error('Sasaran gagal disimpan.', styleToastError)
      }
      loadData()
    })
  }

  const loadDataJenisSasaran = () => {
    referensiServices.getListJenisSasaran().then(response => {
      setListJenisSasaran(response)
    })
  }

  const handleDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen)
  const handleCloseDialogIndikator = () => setDialogOpenIndikator(!dialogOpenIndikator)

  const handleDialogDelete = () => {
    dispatch(showLoading())
    sasaranService.delete(item.id).then(response => {
      dispatch(hideLoading())
      setDeleteDialogOpen(false)
      if (response?.status === 200) {
        loadData()
        toast.success('Data berhasil di hapus.', styleToast)
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  }

  return (
    <>
      <Card>
        <Box sx={{ margin: 2 }}>
          <Avatar
            variant='rounded'
            sx={{
              width: '100%',
              height: 92,
              backgroundColor: 'transparent',
              border: theme => `2px dashed ${theme.palette.divider}`,
              cursor: 'pointer',
              '&:hover': {
                border: theme => `2px solid ${theme.palette.primary.main}`
              }
            }}
            onClick={() => {
              setItem(null)
              setForm('add')
              setAddDialogOpen(true)
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
                <TableCell align='center'>Jenis</TableCell>
                <TableCell align='center' width={150}>
                  Orientasi Hasil
                </TableCell>
                <TableCell align='center' width={150}>
                  Relevan Mandat
                </TableCell>
                <TableCell align='center' width={150}>
                  Uji Kecukupan Indikator
                </TableCell>
                {/* <TableCell>Catatan</TableCell> */}
                <TableCell width={50}>Tindakan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item, k) => {
                  return (
                    <Item
                      key={k}
                      item={item}
                      handleAddSasaran={item => {
                        setItem(item)
                        setAddDialogOpen(true)
                      }}
                      handleDeleteSasaran={item => {
                        setItem(item)
                        setDeleteDialogOpen(true)
                      }}
                      handleEditSasaran={item => {
                        reset(item)
                        setItem(item)
                        setForm('edit')
                        setAddDialogOpen(true)
                      }}
                      handleIndikatorSasaran={item => {
                        setItem(item)
                        setDialogOpenIndikator(true)
                      }}
                    />
                  )
                })
              ) : (
                <TableRow
                  hover
                  sx={{
                    '& .MuiTableCell-root': {
                      border: 0,
                      py: theme => `${theme.spacing(5)} !important`
                    }
                  }}
                >
                  <TableCell align='center' colSpan={6}>
                    <Typography variant='body2'>Tidak ada data.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </CardContent> */}
      </Card>

      <Dialog maxWidth='sm' fullWidth onClose={handleCloseDialogAdd} open={addDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            {form === 'add' ? 'Tambah' : 'Ubah'} Sasaran {item && item.nama}
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
            <FormControl fullWidth sx={{ mb: 4 }} required>
              <InputLabel id='ref_jenis_sasaran_id'>Jenis Sasaran</InputLabel>
              <Select
                label='Jenis Sasaran'
                id='ref_jenis_sasaran_id'
                labelId='ref_jenis_sasaran_id'
                onChange={e => {
                  setValue('ref_jenis_sasaran_id', e.target.value, { shouldValidate: true })
                }}
                value={getValues('ref_jenis_sasaran_id')}
                error={Boolean(errors.ref_jenis_sasaran_id)}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {listJenisSasaran.map(item => {
                  return <MenuItem value={item.id}>{item.nama}</MenuItem>
                })}
              </Select>
              {errors.ref_jenis_sasaran_id && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_jenis_sasaran_id.message}</FormHelperText>
              )}
            </FormControl>

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
              {errors.kode && <FormHelperText sx={{ color: 'error.main' }}>{errors.kode.message}</FormHelperText>}
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
              {errors.nama && <FormHelperText sx={{ color: 'error.main' }}>{errors.nama.message}</FormHelperText>}
            </FormControl>

            <Box>
              <FormControl>
                <FormControlLabel
                  label='Orientasi Hasil'
                  control={
                    <Checkbox
                      onChange={e => {
                        setValue('nsa_orientasi_hasil', e.target.checked, { shouldValidate: true })
                      }}
                      checked={getValues('nsa_orientasi_hasil')}
                    />
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormControlLabel
                  label='Relevan Mandat'
                  control={
                    <Checkbox
                      onChange={e => {
                        setValue('nsa_relevan_mandat_sa', e.target.checked, { shouldValidate: true })
                      }}
                      checked={getValues('nsa_relevan_mandat_sa')}
                    />
                  }
                />
              </FormControl>
            </Box>

            <Box sx={{ mb: 4 }}>
              <FormControl>
                <FormControlLabel
                  label='Uji Kecukupan Indikator'
                  control={
                    <Checkbox
                      onChange={e => {
                        setValue('nsa_uji_kecukupan_indikator_sa', e.target.checked, { shouldValidate: true })
                      }}
                      checked={getValues('nsa_uji_kecukupan_indikator_sa')}
                    />
                  }
                />
              </FormControl>
            </Box>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='catatan'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Catatan'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.catatan)}
                    placeholder='Catatan'
                    rows={3}
                    multiline
                  />
                )}
              />
              {errors.catatan && <FormHelperText sx={{ color: 'error.main' }}>{errors.catatan.message}</FormHelperText>}
            </FormControl>

            <br />
            <DialogActions className='dialog-actions-dense'>
              <Button variant='contained' color='secondary' onClick={handleCloseDialogAdd}>
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

      <Indikator item={item} handleCloseDialog={handleCloseDialogIndikator} dialongOpen={dialogOpenIndikator} />
    </>
  )
}

export default Sasaran

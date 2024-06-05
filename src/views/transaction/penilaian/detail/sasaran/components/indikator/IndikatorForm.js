import React, { useEffect, useState } from 'react'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Services
import sasaranIndikatorService from 'src/services/sasaran-indikator-service'

// ** Component
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  kode: yup.string().required().label('Kode'),
  nama: yup.string().required().label('Nama'),
  target_kinerja: yup.number().required().label('Target Kinerja'),
  satuan: yup.string().required().label('Satuan'),
  nsa_indikator_kinerja_tepat: yup.bool().label('Indikator Kinerja Tepat'),
  nsa_target_kinerja_tepat: yup.bool().label('Target Kinerja Tepat')
})

const defaultValues = {
  kode: '',
  nama: '',
  target_kinerja: 0,
  satuan: '',
  nsa_indikator_kinerja_tepat: false,
  nsa_target_kinerja_tepat: false
}

const IndikatorForm = props => {
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

  useEffect(() => {
    if (props.form === 'edit') {
      reset(props.item)
    }
  }, [props.form])

  const onSubmit = async data => {
    dispatch(showLoading())
    data.trans_sasaran_id = props.transSasaranId
    data.nsa_indikator_kinerja_tepat = data.nsa_indikator_kinerja_tepat ? 1 : 0
    data.nsa_target_kinerja_tepat = data.nsa_target_kinerja_tepat ? 1 : 0
    let action = null
    if (props.form === 'add') {
      action = sasaranIndikatorService.store(data)
    } else {
      action = sasaranIndikatorService.update(props.item.id, data)
    }
    action.then(response => {
      dispatch(hideLoading())
      if (response?.status === 200) {
        reset()
        toast.success('Indikator berhasil disimpan.', styleToast)
        props.handleDialogToggle()
      } else {
        toast.error('Indikator gagal disimpan.', styleToastError)
      }
    })
  }

  return (
    <>
      <Dialog maxWidth='sm' fullWidth onClose={props.handleDialogToggle} open={props.dialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Manajemen Indikator
          </Typography>
          <Typography variant='body2'>Tambah Data Indikator</Typography>
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

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='target_kinerja'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Target Kinerja'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.target_kinerja)}
                    placeholder='Target Kinerja'
                  />
                )}
              />
              {errors.target_kinerja && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.target_kinerja.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='satuan'
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Satuan'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.satuan)}
                    placeholder='Satuan'
                  />
                )}
              />
              {errors.satuan && <FormHelperText sx={{ color: 'error.main' }}>{errors.satuan.message}</FormHelperText>}
            </FormControl>

            <Box>
              <FormControl>
                <FormControlLabel
                  label='Indikator Kinerja Tepat'
                  control={
                    <Checkbox
                      onChange={e => {
                        setValue('nsa_indikator_kinerja_tepat', e.target.checked, { shouldValidate: true })
                      }}
                      checked={getValues('nsa_indikator_kinerja_tepat')}
                    />
                  }
                />
              </FormControl>
            </Box>

            <Box>
              <FormControl>
                <FormControlLabel
                  label='Target Kinerja Tepat'
                  control={
                    <Checkbox
                      onChange={e => {
                        setValue('nsa_target_kinerja_tepat', e.target.checked, { shouldValidate: true })
                      }}
                      checked={getValues('nsa_target_kinerja_tepat')}
                    />
                  }
                />
              </FormControl>
            </Box>

            <br />
            <DialogActions className='dialog-actions-dense'>
              <Button variant='contained' color='secondary' onClick={props.handleDialogToggle}>
                Batal
              </Button>
              <Button type='submit' variant='contained'>
                Simpan
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default IndikatorForm

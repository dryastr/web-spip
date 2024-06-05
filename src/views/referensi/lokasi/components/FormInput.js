// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import Router from 'next/router'

// ** Redux
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import { useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import { makeStyles } from '@mui/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// ** Services
import lokasiService from 'src/services/lokasi-services'

// ** Component
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  kode: yup.string().required().label('Kode'),
  level: yup.string().required().label('Level'),
  nama: yup.string().required().label('Nama')
})

const useStyles = makeStyles(theme => ({
  number: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
}))

const FormInput = props => {
  // ** Redux
  const dispatch = useDispatch()

  // ** Component yup
  const defaultValues = {
    kode: '',
    level: '',
    nama: ''
  }

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
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (props.action && props.action === 'edit') {
      lokasiService.show(props.id).then(response => {
        reset(response)
      })
    }
  }, [])

  const onSubmit = async data => {
    dispatch(showLoading())
    if (props.action && props.action === 'edit') {
      lokasiService.update(props.id, data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Lokasi berhasil diubah.', styleToast)
          Router.push('/referensi/lokasi')
        } else {
          toast.error('Data Lokasi gagal diubah.', styleToastError)
        }
      })
    } else {
      lokasiService.store(data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Lokasi berhasil ditambahkan.', styleToast)
          Router.push('/referensi/lokasi')
        } else {
          toast.error('Data Lokasi gagal ditambahkan.', styleToastError)
        }
      })
    }
  }

  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider sx={{ m: '0 !important' }} />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='kode'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoCorrect='off'
                      autoComplete='off'
                      required
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
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='level'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoCorrect='off'
                      autoComplete='off'
                      required
                      label='Level'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.level)}
                      placeholder='Level'
                    />
                  )}
                />
                {errors.level && <FormHelperText sx={{ color: 'error.main' }}>{errors.level.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='nama'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoCorrect='off'
                      autoComplete='off'
                      required
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
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button
            sx={{ marginRight: 2 }}
            component={Link}
            href='/referensi/lokasi'
            type='button'
            size='large'
            color='error'
            variant='contained'
          >
            Kembali
          </Button>
          <Button size='large' type='submit' variant='contained'  style={{backgroundColor: 'rgb(35 44 255)'}}>
            Simpan
          </Button>
          <Button
            type='button'
            size='large'
            color='secondary'
            variant='outlined'
            onClick={() => {
              reset()
            }}
          >
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormInput

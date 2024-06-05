// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

// ** Redux
// import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'
import { useDispatch, useSelector } from 'react-redux'

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
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getData } from 'src/store/pages/referensi/listKlpSlice'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// ** Services
import lokasiService from 'src/services/lokasi-services'

// ** Component
import toast from 'react-hot-toast'
import kategoririsiko from 'src/services/kategoririsiko-service'

const schema = yup.object().shape({
  kode: yup.string().required().label('Kode'),
  ref_klp_id: yup.string().required().label('ref_klp_id'),
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

  const state = useSelector(state => {
    // console.log('kakaka',state)
    // console.log(state) ini untuk state
    return state
  })

  // ** Component yup
  const defaultValues = {
    kode: '',
    ref_klp_id: '',
    nama: ''
  }

  // ** Hooks
  const theme = useTheme()
  const [locationData, setLocationData] = React.useState(defaultValues)

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
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    dispatch(getData({ jenis: 'KL' }))

    if (props.action && props.action === 'edit') {
      kategoririsiko.show(props.id).then(response => {
        setLocationData(response) // Store response in state
        reset(response)
      })
    }
  }, [])

  const onSubmit = async data => {
    dispatch(showLoading())
    if (props.action && props.action === 'edit') {
      kategoririsiko.update(props.id, data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Kategori Risiko berhasil diubah.', styleToast)
          Router.push('/referensi/kategori-risiko')
        } else {
          toast.error('Data Kategori Risiko gagal diubah.', styleToastError)
        }
      })
    } else {
      kategoririsiko.store(data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Kategori Risiko berhasil ditambahkan.', styleToast)
          Router.push('/referensi/kategori-risiko')
        } else {
          toast.error('Data Kategori Risiko gagal ditambahkan.', styleToastError)
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
                <InputLabel id='ref_klp_id'>Pilih KLP</InputLabel>
                <Controller
                  name='ref_klp_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                      label='Jenis KK Lead SPIP'
                      id='ref_klp_id'
                      name='ref_klp_id'
                      labelId='ref_klp_id'
                      value={value}
                      onBlur={onBlur}
                      onChange={e => {
                        setValue('ref_klp_id', e.target.value, { shouldValidate: true })
                      }}
                      error={Boolean(errors.ref_klp_id)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {state.listKlpSlice.data.map((item, k) => (
                        <MenuItem key={k} value={item.id}>
                          {item.kode} | {item.nama}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.ref_klp_id && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_klp_id.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='kode'
                  value={locationData.kode}
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
                  name='nama'
                  value={locationData.nama}
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
            href='/referensi/kategori-risiko'
            type='button'
            size='large'
            color='error'
            variant='contained'
          >
            Kembali
          </Button>
          <Button size='large' type='submit' variant='contained' style={{ backgroundColor: 'rgb(42 51 255)' }}>
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

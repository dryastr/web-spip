// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import Router from 'next/router'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'
import Select from '@mui/material/Select'

// ** MUI Imports
import Card from '@mui/material/Card'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
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

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import MenuItem from '@mui/material/MenuItem'

// ** Services
import lokasiService from 'src/services/lokasi-services'

// ** Component
import toast from 'react-hot-toast'
import { getListData } from 'src/store/pages/referensi/jenisKkLeadSpipSlice'
import kkleadserviceService from 'src/services/kkleadspip-service'

const schema = yup.object().shape({
  ref_jenis_kk_lead_spip_id: yup.string().required().label('ref_jenis_kk_lead_spip_id'),
  kode: yup.string().required().label('Kode'),
  bobot: yup.number().required().label('Bobot'),
  nama: yup.string().required().label('Nama'),
  jenis_klp: yup.string().required().label('Jenis Klp')
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
    return state
  })

  // ** Component yup
  const defaultValues = {
    ref_jenis_kk_lead_spip_id: '',
    kode: '',
    nama: '',
    bobot: '',
    jenis_klp: ''
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
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    dispatch(getListData())

    if (props.action && props.action === 'edit') {
      kkleadserviceService.show(props.id).then(response => {
        reset(response)
      })
    }
  }, [])

  const jenisKkData = state.jenisKkLeadSpip.list || []

  const onSubmit = async data => {
    dispatch(showLoading())
    if (props.action && props.action === 'edit') {
      kkleadserviceService.update(props.id, data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Lead Spip berhasil diubah.', styleToast)
          Router.push('/referensi/kk-lead-spip')
        } else {
          toast.error('Data Lead Spip gagal diubah.', styleToastError)
        }
      })
    } else {
      kkleadserviceService.store({ ...data, jenis_klp: data.jenis_klp }).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Lead Spip berhasil ditambahkan.', styleToast)
          Router.push('/referensi/kk-lead-spip')
        } else {
          toast.error('Data Lead Spip gagal ditambahkan.', styleToastError)
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
              <FormControl fullWidth sx={{ mb: 4 }} required>
                <InputLabel id='ref_jenis_kk_lead_spip_id'>Jenis KK Lead SPIP</InputLabel>
                <Controller
                  name='ref_jenis_kk_lead_spip_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                      label='Jenis KK Lead SPIP'
                      // defaultValue=''
                      id='ref_jenis_kk_lead_spip_id'
                      name='ref_jenis_kk_lead_spip_id'
                      labelId='ref_jenis_kk_lead_spip_id'
                      // value={getValues('tahun')}
                      value={value}
                      onChange={e => {
                        setValue('ref_jenis_kk_lead_spip_id', e.target.value, { shouldValidate: true })
                      }}
                      error={Boolean(errors.jenis_kk_lead_spip)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {jenisKkData.map((item, i) => {
                        return (
                          <MenuItem value={item.id}>
                            {item.kode} | {item.nama}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )}
                />
                {errors.jenis_kk_lead_spip && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.jenis_kk_lead_spip.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
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

          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='bobot'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoCorrect='off'
                      autoComplete='off'
                      required
                      label='Bobot'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.nama)}
                      placeholder='BOot'
                    />
                  )}
                />
                {errors.nama && <FormHelperText sx={{ color: 'error.main' }}>{errors.nama.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl component='fieldset' fullWidth sx={{ mb: 4 }}>
                <InputLabel id='jenis_klp'></InputLabel>
                <Controller
                  name='jenis_klp'
                  control={control}
                  defaultValue='' // Set the default value if needed
                  render={({ field }) => (
                    <RadioGroup
                      aria-label='jenis_klp'
                      value={field.value}
                      onChange={e => setValue('jenis_klp', e.target.value, { shouldValidate: true })}
                    >
                      <FormControlLabel value='KL' control={<Radio color='primary' />} label='KL' />
                      <FormControlLabel value='PEMDA' control={<Radio color='primary' />} label='PEMDA' />
                    </RadioGroup>
                  )}
                />
                {errors.jenis_klp && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.jenis_klp.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button
            sx={{ marginRight: 2 }}
            component={Link}
            href='/referensi/kk-lead-spip'
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

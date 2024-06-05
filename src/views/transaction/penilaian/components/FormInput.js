// ** React Imports
import { useState, useEffect } from 'react'

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
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import { makeStyles } from '@mui/styles'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// ** Services
import referensiServices from 'src/services/referensi-services'
import penilaianService from 'src/services/penilaian-services'

// ** Component
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  // ref_klp_id: yup.number().required().label('Kementrian Lembaga / PEMDA'),
  tahun: yup.number().required().label('Tahun'),
  anggaran: yup.string().required().label('Anggaran')
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
    // ref_klp_id: '',
    tahun: '',
    anggaran: 0
  }

  // ** States
  const [listKlp, setListKlp] = useState([])
  const years = []

  for (let i = moment().year() + 1; i >= moment().year() - 5; i--) {
    years.push(i)
  }

  // ** Hooks
  const theme = useTheme()
  const classes = useStyles()

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

  const loadData = () => {
    referensiServices
      .getListKlp({
        jenis: 'all'
      })
      .then(response => {
        setListKlp(response)
      })
  }
  useEffect(() => {
    loadData()
    if (props.action && props.action === 'edit') {
      penilaianService.show(props.id).then(response => {
        reset(response)
      })
    }
  }, [])

  const onSubmit = async data => {
    dispatch(showLoading())
    if (props.action && props.action === 'edit') {
      penilaianService.update(props.id, data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Penilaian berhasil diubah.', styleToast)
          Router.push('/transaction/penilaian')
        } else {
          toast.error('Data Penilaian gagal diubah.', styleToastError)
        }
      })
    } else {
      penilaianService.store(data).then(response => {
        dispatch(hideLoading())
        if (response?.status === 200) {
          reset()
          toast.success('Data Penilaian berhasil ditambahkan.', styleToast)
          Router.push('/transaction/penilaian')
        } else {
          toast.error('Data Penilaian gagal ditambahkan.', styleToastError)
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
          <Grid style={{borderColor: 'red'}} container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl  fullWidth sx={{ mb: 4 }} required>
                <InputLabel id='tahun'>Tahun</InputLabel>
                <Select
                  label='Tahun'
                  defaultValue=''
                  id='tahun'
                  labelId='tahun'

                  // value={getValues('tahun')}
                  onChange={e => {
                    setValue('tahun', e.target.value, { shouldValidate: true })
                  }}
                  error={Boolean(errors.tahun)}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {years.map(item => {
                    return <MenuItem value={item}>{item}</MenuItem>
                  })}
                </Select>
                {errors.tahun && <FormHelperText sx={{ color: 'error.main' }}>{errors.tahun.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item md={4} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='anggaran'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      className={[classes.number]}
                      type='number'
                      autoCorrect='off'
                      autoComplete='off'
                      required
                      label='Anggaran'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.anggaran)}
                      placeholder='Anggaran'
                    />
                  )}
                />
                {errors.anggaran && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.anggaran.message}</FormHelperText>
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
            href='/transaction/penilaian'
            type='button'
            size='large'
            color='error'
            variant='contained'
          >
            Kembali
          </Button>
          <Button size='large' type='submit' variant='contained' style={{backgroundColor: 'rgb(35 44 255)'}}>
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

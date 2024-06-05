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

// ** Demo Components Imports
import CustomRadioBasic from 'src/@core/components/custom-radio/basic'
import LogoUpload2 from './LogoUpload2'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Services
import referensiServices from "src/services/referensi-services";

// ** Component
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  kode: yup.string().required().label('Kode'),
  nama: yup.string().required().label('Nama'),
  nama_pendek: yup.string().required().label('Nama Pendek'),
  pimpinan: yup.string().required().label('Pimpinan'),
  jabatan_pimpinan: yup.string().required().label('Jabatan Pimpinan'),
  jenis: yup.string().required().label('Jenis'),
  level: yup.string().required().label('Level'),
  no_telp: yup.string().label('Nomor Telpon'),
  fax: yup.string().label('Fax'),
  alamat: yup.string().required().label('Alamat'),
  ref_lokasi_id: yup.number().required().label('Lokasi'),
})

const dataJenis = [
  {
    title: 'Kementrian Lembaga',
    value: 'KL',
    isSelected: true,
  },
  {
    title: 'Pemerintah Daerah',
    value: 'PEMDA',
  }
]

const dataLevel = [
  {
    title: 'Pusat',
    value: 'PUSAT',
    isSelected: true,
  },
  {
    title: 'Non Pusat',
    value: 'NON-PUSAT',
  }
]

const FormInput = (props) => {
  // ** Redux
  const dispatch = useDispatch();

  // ** Component yup
  const defaultValues = {
    kode: '',
    nama: '',
    nama_pendek: '',
    pimpinan: '',
    jabatan_pimpinan: '',
    jenis: '',
    level: '',
    no_telp: '',
    website: '',
    fax: '',
    alamat: '',
    ref_lokasi_id: '',
  }
  
  // ** States
  const [listLokasi, setListLokasi] = useState([]);

  // ** Hooks
  const theme = useTheme()

  const styleToast = {
    style: {
      padding: '16px',
      color: theme.palette.primary.main,
      border: "1px solid " + theme.palette.primary.main
    },
    iconTheme: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.primary.contrastText
    }
  };

  const styleToastError = {
    style: {
      padding: '16px',
      color: theme.palette.primary.error,
      border: "1px solid " + theme.palette.primary.error
    },
    iconTheme: {
      primary: theme.palette.primary.error,
      secondary: theme.palette.primary.contrastText
    }
  };

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
    referensiServices.getListLokasi().then((response) => {
      setListLokasi(response);
    });
  }
  useEffect(() => {
    loadData();
    if (props.action && props.action === 'edit') {
      referensiServices.showKlp(props.id).then((response) => {
        delete response.logo
        reset(response);
      })
    }
  }, [])

  const onSubmit = async data => {
    dispatch(showLoading());
    const payloads = Object.keys(data);
            
    let formData = new FormData();
    await payloads.forEach((item, index) => {
      if (item === 'logo' && !data[item]) {
        return;
      }
      formData.append(item, data[item]);
    });

    if (props.action && props.action === 'edit') {
      referensiServices.updateKlp(props.id, formData).then((response) => {
        dispatch(hideLoading());
        if (response?.status === 200) {
          reset();
          toast.success('Data KLP berhasil diubah.', styleToast);
          Router.push('/referensi/klp')
        } else {
          toast.error('Data KLP gagal diubah.', styleToastError);
        }
      });
    } else {
      referensiServices.storeKlp(formData).then((response) => {
        dispatch(hideLoading());
        if (response?.status === 200) {
          reset();
          toast.success('Data KLP berhasil ditambahkan.', styleToast);
          Router.push('/referensi/klp')
        } else {
          toast.error('Data KLP gagal ditambahkan.', styleToastError);
        }
      });
    }
  }

  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider sx={{ m: '0 !important' }} />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Grid
                container
                spacing={1}
              >
                <Grid item md={12} xs={12}>
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
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='nama_pendek'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoCorrect='off'
                          autoComplete='off'
                          required
                          label='Nama Pendek'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.nama_pendek)}
                          placeholder='Nama Pendek'
                        />
                      )}
                    />
                    {errors.nama_pendek && <FormHelperText sx={{ color: 'error.main' }}>{errors.nama_pendek.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
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
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='pimpinan'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoCorrect='off'
                          autoComplete='off'
                          required
                          label='Pimpinan'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.pimpinan)}
                          placeholder='Pimpinan'
                        />
                      )}
                    />
                    {errors.pimpinan && <FormHelperText sx={{ color: 'error.main' }}>{errors.pimpinan.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='jabatan_pimpinan'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          autoCorrect='off'
                          autoComplete='off'
                          required
                          label='Jabatan Pimpinan'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.jabatan_pimpinan)}
                          placeholder='Jabatan Pimpinan'
                        />
                      )}
                    />
                    {errors.jabatan_pimpinan && <FormHelperText sx={{ color: 'error.main' }}>{errors.jabatan_pimpinan.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
              
              <Grid container spacing={1}>
                {dataJenis.map((item, index) => (
                  <Grid item md={6} xs={6}>
                    <CustomRadioBasic
                      key={index}
                      data={dataJenis[index]}
                      selected={getValues('jenis')}
                      name='jenis'
                      handleChange={(e) => {
                        setValue('jenis', e, { shouldValidate: true })
                      }}
                    />
                  </Grid>
                ))}
                <FormControl fullWidth sx={{ mb: 4 }}>
                  {errors.jenis && <FormHelperText sx={{ color: 'error.main' }}>{errors.jenis.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid container spacing={1}>
                {dataLevel.map((item, index) => (
                  <Grid item md={6} xs={6}>
                    <CustomRadioBasic
                      key={index}
                      data={dataLevel[index]}
                      selected={getValues('level')}
                      name='level'
                      handleChange={(e) => {
                        setValue('level', e, { shouldValidate: true })
                      }}
                    />
                  </Grid>
                ))}
                <FormControl fullWidth sx={{ mb: 4 }}>
                  {errors.level && <FormHelperText sx={{ color: 'error.main' }}>{errors.level.message}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }} required>
                    <InputLabel id='ref_lokasi_id'>Lokasi</InputLabel>
                    <Select
                      label='Lokasi'
                      defaultValue=''
                      id='ref_lokasi_id'
                      labelId='Lokasi'
                      value={getValues('ref_lokasi_id')}
                      onChange={(e) => {
                          setValue('ref_lokasi_id', e.target.value, { shouldValidate: true })
                      }}
                      error={Boolean(errors.ref_lokasi_id)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {
                        listLokasi.map((item) => {
                          return (<MenuItem value={item.id}>{item.kode} | {item.nama}</MenuItem>);
                        })
                      }
                    </Select>
                    {errors.ref_lokasi_id && <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_lokasi_id.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='website'
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label='Website'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.website)}
                          placeholder='Website'
                        />
                      )}
                    />
                    {errors.website && <FormHelperText sx={{ color: 'error.main' }}>{errors.website.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='alamat'
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          required
                          label='Alamat'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.fax)}
                          placeholder='Alamat'
                          multiline
                          rows={3}
                        />
                      )}
                    />
                    {errors.alamat && <FormHelperText sx={{ color: 'error.main' }}>{errors.alamat.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='no_telp'
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label='Nomor Telepon'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.no_telp)}
                          placeholder='Nomor Telepon'
                        />
                      )}
                    />
                    {errors.no_telp && <FormHelperText sx={{ color: 'error.main' }}>{errors.no_telp.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Controller
                      name='fax'
                      control={control}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          label='Fax'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.fax)}
                          placeholder='Fax'
                        />
                      )}
                    />
                    {errors.fax && <FormHelperText sx={{ color: 'error.main' }}>{errors.fax.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <LogoUpload2 setFile={(image) => {
                  setValue('logo', image, { shouldValidate: true })
                }}/>
                {errors.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors.logo.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button
            sx={{ marginRight: 1 }}
            component={Link}
            href='/referensi/klp'
            type='button'
            size='large'
            color='error'
            variant='contained'
          >
            Kembali
          </Button>
          <Button
            size='large'
            type='submit'
            variant='contained'
            style={{backgroundColor: 'rgb(42 51 255)'}}
          >
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

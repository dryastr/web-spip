// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Fab from '@mui/material/Fab'
import CardContent from '@mui/material/CardContent'
import MuiCard from '@mui/material/Card'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import Logo from 'src/layouts/components/Logo'

// ** Services
import referensiServices from 'src/services/referensi-services'
import userServices from 'src/services/user-services'

// ** Component
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '50rem' }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const schema = yup.object().shape({
  jenis: yup.string().required().label('Jenis'),
  ref_klp_nama: yup.string().label('KLP'),
  no_telp: yup.string().label('Nomor HP'),
  website: yup.string().label('Website'),
  provinsi: yup.string().label('Provinsi'),
  kabupaten: yup.string().label('Kabupaten'),
  namaDinas: yup.string().label('Nama Dinas'),
  kementrian_lembaga: yup.string().label('Kementrian Lembaga'),
  fax: yup.string().label('Fax'),
  alamat: yup.string().label('Alamat'),
  fullname: yup.string().required().label('Nama Lengkap'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(5).required().label('Password'),
  file_surat_permohonan: yup.mixed().required().label('File Surat Permohonan')
})

const defaultValues = {
  jenis: '',
  ref_klp_nama: '',
  no_telp: '',
  website: '',
  provinsi: '',
  kabupaten: '',
  namaDinas: '',
  kementrian_lembaga: '',
  fax: '',
  alamat: '',
  fullname: '',
  email: '',
  password: ''
}

const Register = () => {
  // ** States
  const [isKlpLainnya, setIsKlpLainnya] = useState(false)
  const [isJenisLainnya, setIsJenisLainnya] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [listKlp, setListKlp] = useState([])
  const [selectedJenis, setSelectedJenis] = useState('');


  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const dispatch = useDispatch()

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

  // const loadData = (jenis = null) => {
  //   referensiServices
  //     .getListKlp({
  //       jenis
  //     })
  //     .then(response => {
  //       setListKlp(response)
  //     })
  // }
  
  const loadData = (jenis = null) => {
    referensiServices
      .getListKlp({ jenis })
      .then(response => {
        console.log("API Response:", response);
        setListKlp(response);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    loadData()
    // console.log('oooo', listKlp)
  }, [dispatch])


  const onSubmit = async data => {
    setIsLoading(true)
    const payloads = Object.keys(data)

    let formData = new FormData()
    await payloads.forEach((item, index) => {
      formData.append(item, data[item])
    })

    userServices.registration(formData).then(response => {
      setIsLoading(false)
      if (response?.status === 200) {
        reset()
        toast.success('Registrasi anda berhasil ! silahkan tunggu proses verifikasi.', styleToast)
      } else {
        toast.error('Registrasi gagal ! silahkan coba beberapa saat lagi.', styleToastError)
      }
    })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 6.5)} !important` }}>
          <Box
            sx={{
              p: 7,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'background.paper'
            }}
          >
            <BoxWrapper>
              <Box sx={{ mb: 6 }}>
                <div style={{ textAlign: 'center' }}>
                  <Logo width={70} />
                  <TypographyStyled variant='h5'>{`Permintaan Akun ${themeConfig.templateName}!`}</TypographyStyled>
                  <Typography variant='body2'>Silakan isi data untuk registrasi akun</Typography>
                </div>
              </Box>
              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 5 }}>
                    <Icon icon='mdi:account-multiple-outline' />
                    &nbsp;&nbsp;
                    <Typography>Organisasi</Typography>
                  </div>
                  <Typography style={{ fontSize: 12, paddingBottom: 17, color: '#999999' }}>
                    Silahkan pilih jenis instansi dan pilih instansi anda, dan upload surat permohonan dan SK dari instansi
                    yang merujuk anda sebagai admin pengguna untuk instansi dengan surat resmi yang ditandatangani oleh
                    pimpinan instansi.
                  </Typography>
                </div>

                <FormControl fullWidth sx={{ mb: 4 }} required>
                  {/* <InputLabel id='jenis'>Jenis</InputLabel> */}
                  {/* <Select
                    label='Jenis'
                    defaultValue=''
                    id='jenis'
                    labelId='Jenis'
                    onChange={(e) => {
                      setSelectedJenis(e.target.value);
                      loadData(e.target.value);
                    }}
                    error={Boolean(errors.jenis)}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'KL'}>Kementrian Lembaga</MenuItem>
                    <MenuItem value={'PEMDA'}>Pemerintah Daerah</MenuItem>
                    <MenuItem value='add' sx={{ justifyContent: 'center' }}>
                      <Icon icon='mdi:plus' /> Tambah Lainnya
                    </MenuItem>
                  </Select> */}
                  {isKlpLainnya ? (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          marginBottom: 3,
                        }}
                      >
                        <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                          Pilih data Kementrian Lembaga / Pemda (KLP)?
                        </Typography>
                        <Typography
                          onClick={() => {
                            setIsKlpLainnya(false);
                          }}
                          sx={{ color: 'primary.main', textDecoration: 'none', cursor: 'pointer' }}
                        >
                          Klik disini
                        </Typography>
                      </Box>
                      <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                          name='ref_klp_nama'
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              label='Kementrian Lembaga / Pemda (KLP) Lainnya'
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              error={Boolean(errors.ref_klp_nama)}
                              placeholder='KLP Lainnya'
                            />
                          )}
                        />
                        {errors.ref_klp_nama && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_klp_nama.message}</FormHelperText>
                        )}
                      </FormControl>

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
                        {errors.website && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.website.message}</FormHelperText>
                        )}
                      </FormControl>

                      <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                          name='alamat'
                          control={control}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                              label='Alamat'
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              error={Boolean(errors.alamat)}
                              placeholder='Alamat'
                              multiline
                              rows={3}
                            />
                          )}
                        />
                        {errors.alamat && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.alamat.message}</FormHelperText>
                        )}
                      </FormControl>
                    </>
                  ) : (
                    <>
                      <FormControl fullWidth sx={{ mb: 4 }} required>
                        <InputLabel id='ref_klp_id'>Kementrian Lembaga / Pemda (KLP)</InputLabel>
                        <Select
                          label='Kementrian Lembaga / Pemda (KLP)'
                          defaultValue=''
                          id='ref_klp_id'
                          labelId='KLP'
                          onChange={(e) => {
                            if (e.target.value === 'add') {
                              setIsKlpLainnya(true);
                            } else {
                              setValue('ref_klp_id', e.target.value, { shouldValidate: true });
                            }
                          }}
                          error={Boolean(errors.ref_klp_id)}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
                          {listKlp.length === 0 ? (
                            <p>Tidak Ada Data</p>
                          ) : (
                            listKlp.map(item => (
                              <MenuItem value={kpl?.id} key={kpl?.id}>
                                {klp?.nama}
                              </MenuItem>
                            ))
                          )}
                          <MenuItem value='add' sx={{ justifyContent: 'center' }}>
                            <Icon icon='mdi:plus' /> Tambah Lainnya
                          </MenuItem>
                        </Select>
                        {errors.ref_klp_id && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_klp_id.message}</FormHelperText>
                        )}
                      </FormControl>
                    </>
                  )}
                  {errors.jenis && <FormHelperText sx={{ color: 'error.main' }}>{errors.jenis.message}</FormHelperText>}
                </FormControl>
                {/* {selectedJenis === 'PEMDA' && (
                  <>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel id='provinsi'>Provinsi</InputLabel>
                      <Select
                        label='Provinsi'
                        defaultValue=''
                        id='provinsi'
                        labelId='Provinsi'
                        onChange={(e) => {
                          if (e.target.value === 'add') {
                            setIsJenisLainnya(true);
                          } else {
                            setValue('provinsi', e.target.value, { shouldValidate: true });
                          }
                        }}
                        error={Boolean(errors.provinsi)}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Jawa Barat'}>Jawa Barat</MenuItem>
                      </Select>
                      {errors.provinsi && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.provinsi.message}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel id='kabupaten'>Kabupaten</InputLabel>
                      <Select
                        label='Kabupaten'
                        defaultValue=''
                        id='kabupaten'
                        labelId='Kabupaten'
                        onChange={(e) => {
                          if (e.target.value === 'add') {
                            setIsJenisLainnya(true);
                          } else {
                            setValue('kabupaten', e.target.value, { shouldValidate: true });
                          }
                        }}
                        error={Boolean(errors.kabupaten)}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Bogor'}>Bogor</MenuItem>
                      </Select>
                      {errors.kabupaten && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.kabupaten.message}</FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}
                {selectedJenis === 'OPD' && (
                  <>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel id='provinsi'>Provinsi</InputLabel>
                      <Select
                        label='Provinsi'
                        defaultValue=''
                        id='provinsi'
                        labelId='Provinsi'
                        onChange={(e) => {
                          if (e.target.value === 'add') {
                            setIsJenisLainnya(true);
                          } else {
                            setValue('provinsi', e.target.value, { shouldValidate: true });
                          }
                        }}
                        error={Boolean(errors.provinsi)}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Jawa barat'}>Jawa Barat</MenuItem>
                      </Select>
                      {errors.provinsi && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.provinsi.message}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <InputLabel id='kabupaten'>Kabupaten</InputLabel>
                      <Select
                        label='Kabupaten'
                        defaultValue=''
                        id='kabupaten'
                        labelId='Kabupaten'
                        onChange={(e) => {
                          if (e.target.value === 'add') {
                            setIsJenisLainnya(true);
                          } else {
                            setValue('kabupaten', e.target.value, { shouldValidate: true });
                          }
                        }}
                        error={Boolean(errors.kabupaten)}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Bogor'}>Bogor</MenuItem>
                      </Select>
                      {errors.kabupaten && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.kabupaten.message}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 4 }}>
                      <Controller
                        name='namaDinas'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <TextField
                            label='Nama Dinas'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.namaDinas)}
                            placeholder='Nama Dinas'
                          />
                        )}
                      />
                      {errors.namaDinas && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.namaDinas.message}</FormHelperText>
                      )}
                    </FormControl>
                  </>
                )}
                {selectedJenis == 'KL' && (
                  <FormControl fullWidth sx={{ mb: 4 }} required>
                    <InputLabel id='kementrian_lembaga'>Kementrian Lembaga</InputLabel>
                    <Select
                      label='Kementrian Lembaga'
                      defaultValue=''
                      id='kementrian_lembaga'
                      labelId='Kementrian Lembaga'
                      onChange={(e) => {
                        if (e.target.value === 'add') {
                          setIsJenisLainnya(true);
                        } else {
                          setValue('kementrian_lembaga', e.target.value, { shouldValidate: true });
                        }
                      }}
                      error={Boolean(errors.kementrian_lembaga)}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'a'}>A</MenuItem>
                    </Select>
                    {errors.kementrian_lembaga && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.kementrian_lembaga.message}</FormHelperText>
                    )}
                  </FormControl>
                )}

                {selectedJenis === 'KL' ? (
                  <>
                    {isKlpLainnya ? (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginBottom: 3,
                          }}
                        >
                          <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                            Pilih data Kementrian Lembaga / Pemda (KLP)?
                          </Typography>
                          <Typography
                            onClick={() => {
                              setIsKlpLainnya(false);
                            }}
                            sx={{ color: 'primary.main', textDecoration: 'none', cursor: 'pointer' }}
                          >
                            Klik disini
                          </Typography>
                        </Box>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                          <Controller
                            name='ref_klp_nama'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                              <TextField
                                label='Kementrian Lembaga / Pemda (KLP) Lainnya'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                error={Boolean(errors.ref_klp_nama)}
                                placeholder='KLP Lainnya'
                              />
                            )}
                          />
                          {errors.ref_klp_nama && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_klp_nama.message}</FormHelperText>
                          )}
                        </FormControl>

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
                          {errors.website && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.website.message}</FormHelperText>
                          )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 4 }}>
                          <Controller
                            name='alamat'
                            control={control}
                            render={({ field: { value, onChange, onBlur } }) => (
                              <TextField
                                label='Alamat'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                error={Boolean(errors.alamat)}
                                placeholder='Alamat'
                                multiline
                                rows={3}
                              />
                            )}
                          />
                          {errors.alamat && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.alamat.message}</FormHelperText>
                          )}
                        </FormControl>
                      </>
                    ) : (
                      <>
                        <FormControl fullWidth sx={{ mb: 4 }} required>
                          <InputLabel id='ref_klp_id'>Kementrian Lembaga / Pemda (KLP)</InputLabel>
                          <Select
                            label='Kementrian Lembaga / Pemda (KLP)'
                            defaultValue=''
                            id='ref_klp_id'
                            labelId='KLP'
                            onChange={(e) => {
                              if (e.target.value === 'add') {
                                setIsKlpLainnya(true);
                              } else {
                                setValue('ref_klp_id', e.target.value, { shouldValidate: true });
                              }
                            }}
                            error={Boolean(errors.ref_klp_id)}
                          >
                            <MenuItem value=''>
                              <em>None</em>
                            </MenuItem>
                            {/* {listKlp.map(item => (
                              <MenuItem value={item.id}>
                                {item.kode} | {item.nama}
                              </MenuItem>
                            ))} */}
                {/* <MenuItem value='add' sx={{ justifyContent: 'center' }}>
                              <Icon icon='mdi:plus' /> Tambah Lainnya
                            </MenuItem>
                          </Select>
                          {errors.ref_klp_id && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.ref_klp_id.message}</FormHelperText>
                          )}
                        </FormControl>
                      </>
                    )}
                  </>
                ) : null} */}

                <div style={{ display: 'flex' }}>
                  <FormControl sx={{ mb: 3 }}>
                    <div sx={{ mb: 4 }}>
                      <label className='button label' htmlFor={'file_surat_permohonan'}>
                        <input
                          style={{ display: 'none' }}
                          id={'file_surat_permohonan'}
                          name={'file_surat_permohonan'}
                          type='file'
                          onChange={event => {
                            setValue('file_surat_permohonan', event.currentTarget.files[0], { shouldValidate: true })
                          }}
                        />

                        <Fab size='small' variant='extended' sx={{ '& svg': { mr: 1 } }} fullWidth component='span'>
                          <Icon icon='mdi:plus' />
                          Upload surat permohonan *
                        </Fab>
                      </label>
                    </div>
                    {getValues('file_surat_permohonan') && (
                      <label style={{ fontSize: 12, marginTop: 5 }}>{getValues('file_surat_permohonan').name}</label>
                    )}
                    {errors.file_surat_permohonan && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.file_surat_permohonan.message}</FormHelperText>
                    )}
                    <Typography style={{ paddingTop: 10, paddingLeft: 17, fontSize: 12, color: 'red' }}> * Maksimal ukuran file 2MB</Typography>
                  </FormControl>

                  <FormControl sx={{ mb: 3, paddingLeft: 6 }}>
                    <div sx={{ mb: 4 }}>
                      <label className='button label' htmlFor={'file_surat_permohonan'}>
                        <input
                          style={{ display: 'none' }}
                          id={'file_surat_permohonan'}
                          name={'file_surat_permohonan'}
                          type='file'
                          onChange={event => {
                            setValue('file_surat_permohonan', event.currentTarget.files[0], { shouldValidate: true })
                          }}
                        />

                        <Fab size='small' variant='extended' sx={{ '& svg': { mr: 1 } }} fullWidth component='span'>
                          <Icon icon='mdi:plus' />
                          Upload SK Penunjukan Admin *
                        </Fab>
                      </label>
                    </div>
                    {getValues('file_surat_permohonan') && (
                      <label style={{ fontSize: 12, marginTop: 5 }}>{getValues('file_surat_permohonan').name}</label>
                    )}
                    {errors.file_surat_permohonan && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.file_surat_permohonan.message}</FormHelperText>
                    )}
                    <Typography style={{ paddingTop: 10, paddingLeft: 17, fontSize: 12, color: 'red' }}> * File yang di upload harus sudah ditandatangani oleh<br />pimpinan Instansi dengan stempel resmi</Typography>
                  </FormControl>
                </div>

                <div>
                  <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 5 }}>
                    <Icon icon='mdi:account' />
                    &nbsp;&nbsp;
                    <Typography>Informasi Admin</Typography>
                  </div>
                  <Typography style={{ fontSize: 12, paddingBottom: 17, color: '#999999' }}>Silahkan isi informasi data diri anda agar kami mudah untuk mengenali anda.</Typography>
                </div>


                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='nip'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        required
                        label='NIP'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.fullname)}
                        placeholder='NIP'
                      />
                    )}
                  />
                  {errors.fullname && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.fullname.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='fullname'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        required
                        label='Nama Lengkap'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.fullname)}
                        placeholder='Nama Lengkap'
                      />
                    )}
                  />
                  {errors.fullname && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.fullname.message}</FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='no_telp'
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        label='Nomor HP'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.no_telp)}
                        placeholder='Nomor HP'
                      />
                    )}
                  />
                  {errors.no_telp && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.no_telp.message}</FormHelperText>
                  )}
                </FormControl>

                {/* <FormControl fullWidth sx={{ mb: 4 }}>
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
                        placeholder='XXX'
                      />
                    )}
                  />
                  {errors.fax && <FormHelperText sx={{ color: 'error.main' }}>{errors.fax.message}</FormHelperText>}
                </FormControl> */}

                <div style={{ display: 'flex', paddingTop: 10, paddingBottom: 15 }}>
                  <Icon icon='mdi:account-key' />
                  &nbsp;&nbsp;
                  <Typography>Akses Akun</Typography>
                </div>

                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        required
                        label='Email'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.fax)}
                        placeholder='Email'
                      />
                    )}
                  />
                  {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                    Password
                  </InputLabel>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        required
                        value={value}
                        onBlur={onBlur}
                        label='Password'
                        onChange={onChange}
                        id='auth-login-v2-password'
                        error={Boolean(errors.password)}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }} id=''>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>

                {isLoading ? (
                  <Button
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{ mb: 7, marginTop: 5 }}
                    disabled
                  >
                    <CircularProgress size={25} />
                  </Button>
                ) : (
                  <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7, marginTop: 5 }}>
                    Registrasi
                  </Button>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography sx={{ mr: 2, color: 'text.secondary' }}>Sudah mempunyai akun SPIP?</Typography>
                  <Typography href='/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                    Login
                  </Typography>
                </Box>
              </form>
            </BoxWrapper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register

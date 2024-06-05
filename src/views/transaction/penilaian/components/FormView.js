// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import Router from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
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
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles } from '@mui/styles'

// ** Demo Components Imports
import CustomRadioBasic from 'src/@core/components/custom-radio/basic'
import LogoUpload from './LogoUpload'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Services
import referensiServices from "src/services/referensi-services";

// ** Component
import toast from 'react-hot-toast'
import { Grid } from '@mui/material'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  paddingXNone: {
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
  }
}));

const schema = yup.object().shape({
  kode: yup.string().required().label('Kode'),
  nama: yup.string().required().label('Nama'),
  nama_pendek: yup.string().required().label('Nama Pendek'),
  pimpinan: yup.string().required().label('Pimpinan'),
  jabatan_pimpinan: yup.string().required().label('Jabatan Pimpinan'),
  jenis: yup.string().required().label('Jenis'),
  level: yup.string().required().label('Level'),
  no_telp: yup.string().required().label('Nomor Telpon'),
  fax: yup.string().required().label('Fax'),
  alamat: yup.string().required().label('Alamat'),
  ref_lokasi_id: yup.number().required().label('Lokasi'),
  logo: yup.mixed().label('Logo'),
})

const dataJenis = [
  {
    title: 'Kementrian Lembaga',
    value: 'KL',
    isSelected: true,
  },
  {
    title: 'Kementrian PEMDA',
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

const FormView = (props) => {
  // ** Styles
  const classes = useStyles();

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
    logo: null,
  }
  
  // ** States
  const [response, setResponse] = useState({});

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
    referensiServices.showKlp(props.id).then((response) => {
      setResponse(response);
    })
  }, [])

  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider sx={{ m: '0 !important' }} />
      
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <List disablePadding>
            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Kode
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.kode || '-'}
                    </Typography>
                  }
              />
            </ListItem>

            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Nama Pendek
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.nama_pendek || '-'}
                    </Typography>
                  }
              />
            </ListItem>

            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Nama
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.nama || '-'}
                    </Typography>
                  }
              />
            </ListItem>

            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Pimpinan
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.pimpinan || '-'}
                    </Typography>
                  }
              />
            </ListItem>

            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Jabatan Pimpinan
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.jabatan_pimpinan || '-'}
                    </Typography>
                  }
              />
            </ListItem>

            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Jenis
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.jenis_description || '-'}
                    </Typography>
                  }
              />
            </ListItem>

            <ListItem className={classes.paddingXNone}>
              <ListItemText
                  primary={
                    <Typography variant='body2'>
                        Level
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                        {response?.level_description || '-'}
                    </Typography>
                  }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Card>
  )
}

export default FormView

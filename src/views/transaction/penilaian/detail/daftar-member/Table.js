import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Divider,
  Box,
  Pagination,
  TablePagination,
  Chip 
} from '@mui/material';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Icon from 'src/@core/components/icon';
import daftarMember from 'src/services/daftar-member-services';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { hideLoading } from 'src/store/loadingSlice';
import toast from 'react-hot-toast';
import { showLoading } from 'src/store/loadingSlice';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import DialogDelete from 'src/@core/components/dialog/delete';

const schema = yup.object().shape({
  no_surat: yup.string().required('No Surat is a required field').label('No Surat'),
  tgl_surat: yup.string().required('Tanggal Terbit Surat is a required field').label('Tanggal Terbit Surat'),
  tgl_mulai: yup.string().required('Tanggal Mulai is a required field').label('Tanggal Mulai'),
  tgl_selesai: yup.string().required('Tanggal Selesai is a required field').label('Tanggal Selesai'),
});

const defaultValues = {
  no_surat: '',
  user_id: [],
  surat_tugas: '',
  tgl_surat: '',
  tgl_mulai: '',
  tgl_selesai: '',
};

const TableMember = ({ open, handleClose }) => {
  // const { handleChangePage, handleChangeRowsPerPage } = props
  const state = useSelector((state) => state.penilaianTemuanSlice);
  const { total, per_page, page } = state;
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [members, setMembers] = useState([]);
  const [deleteMember, setDeleteMember] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [deleteMember, setDeleteMember] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('selectedItems')) || []
    setSelectedItems(storedItems)
  }, [])

  
  const handleSearch = event => {
    const term = event.target.value;
    setSearchTerm(term);
    setLoading(true);
  
    daftarMember
      .search({
        search: term,
        sort: '',
        sort_type: '',
        per_page: 10,
        page: 1
      })
      .then(response => {
        setSearchResults(response || []);
        setShowResults(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelect = item => {
    const updatedItems = [...selectedItems, item]
    setSelectedItems(updatedItems)
    setSearchTerm('')
    setShowResults(false)

    localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
  }

  const handleRemove = item => {
    const updatedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id)
    setSelectedItems(updatedItems)

    localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
  }

  const handleCloseDialog = () => {
    setSearchTerm('')
    handleClose()
  }


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

        const handleDeleteData = (member) => {
          setDeleteMember(member);
        };

        const handleCloseDialogDelete = () => {
          setDeleteMember(null);
        };

        const handleDialogToggle = () => setDeleteMember(null);
          
      useEffect(() => {
        loadData();
      }, [dispatch]);
      
        const onSubmit = data => {
          dispatch(showLoading());

          const formattedData = {
            ...data,
            users: selectedItems,
            surat_tugas: data.surat_tugas || '',
            trans_penilaian_id: data.trans_penilaian_id || id
          };

          daftarMember.store(formattedData).then(response => {
            dispatch(hideLoading());
            if (response.status === 200) {
              handleClose();
              toast.success('berhasil Menambahkan Member.', styleToast);
              reset({
                user_id: [],
                no_surat: '',
                surat_tugas: '',
                tgl_surat: '',
                tgl_mulai: '',
                tgl_selesai: ''
              });
              setSelectedItems([]);
              loadData();
            } else {
              toast.error('gagal Menambahkan Member.', styleToastError);
            }
          });
        };

  
  const handleDialogDelete = () => {
    daftarMember.delete(deleteMember.id).then(response => {
      dispatch(hideLoading())
      handleCloseDialogDelete();
      if (response?.status === 200) {
        toast.success('Data berhasil di hapus.', styleToast)
        loadData()
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  };


  const loadData = () => {
    daftarMember.show().then((response) => {
      console.log('response', response);
      setMembers(response.data || []);
    });
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  
  
  

  return (
    <>
    <CardContent style={{ marginTop: '-60px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Nip</TableCell>
              <TableCell align='left'>Nama</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.length > 0 ? (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell align='left'>
                    <Typography sx={{ fontSize: '0.875rem' }}>{member.user_detail.nip}</Typography>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography sx={{ fontSize: '0.875rem' }}>{member.user_detail.fullname}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button onClick={()=>daftarMember.download(member)} color='primary'>
                          <Icon icon={'mdi:download'} />
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button color='error' onClick={() => handleDeleteData(member)}>
                          <Icon icon={'mdi:trash'} />
                        </Button>
                      </Grid>
                     
                    </Grid>
                    <Typography sx={{ fontSize: '0.875rem' }}></Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  <Typography>Tidak ada data</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <TablePagination
          sx={{
            '& .MuiTablePagination-spacer': {
              flex: 1
            }
          }}
          component='div'
          count={total || 0}
          rowsPerPage={per_page}
          page={page - 1}

          // onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
            <Pagination
              page={page}
              shape='rounded'
              component='div'
              count={Math.ceil((total || 0) / per_page)}
              defaultPage={1}
              boundaryCount={2}

              // onChange={handleChangePage}
            />
          )}
        />
      </Box>

      {deleteMember && (
        <DialogDelete
          handleDialogToggle={handleDialogToggle}
          deleteDialogOpen={Boolean(deleteMember)}
          handleDialogDelete={handleDialogDelete}
        />
      )}
    </CardContent>

    <DialogContent>
      <Dialog open={open} onClose={handleCloseDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Tambah Member</DialogTitle>
        <DialogContent>
          <DialogContentText>Silahkan Tambahkan Member</DialogContentText>
          <br />
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id='users'
                  options={searchResults}
                  getOptionLabel={option => option.fullname} 
                  getOptionSelected={(option, value) => option.id === value.id}
                  value={selectedItems}
                  onChange={(_, newValue) => {
                    setSelectedItems(newValue)
                    setSearchTerm('')
                    setValue(
                      'user_id',
                      newValue.map(user_id => user_id.id),
                      { shouldValidate: true }
                    )
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      autoFocus
                      autoComplete='off'
                      label='Pilih Member'
                      variant='outlined'
                      fullWidth
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option.fullname}
                        {...getTagProps({ index })}
                        onDelete={() => handleRemove(option)}
                      />
                    ))
                  }
                />
              </Grid>
              <Grid item xs={12} sx={{ margin: '15px 0 0 10px' }}>
                <Divider>SURAT TUGAS</Divider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='no_surat'
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <div>
                        <TextField
                          label='No Surat'
                          onBlur={onBlur}
                          onChange={e => onChange(e.target.value)}
                          value={value}
                          fullWidth
                          error={Boolean(errors.no_surat)}
                          placeholder='No Surat'
                        />
                        {errors.no_surat && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.no_surat.message}</FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <div sx={{ mb: 4 }}>
                    <label className='button label' htmlFor={'surat_tugas'}>
                      <input
                        style={{ display: 'none' }}
                        id={'surat_tugas'}
                        name={'surat_tugas'}
                        type='file'
                        onChange={event => {
                          setValue('surat_tugas', event.currentTarget.files[0], { shouldValidate: true })
                        }}
                      />

                      <Fab size='small' variant='extended' sx={{ '& svg': { mr: 1 }, width: '100%' }} fullWidth component='span'>
                        <Icon icon='mdi:plus' />
                        Upload surat tugas *
                      </Fab>
                    </label>
                  </div>
                  {getValues('surat_tugas') && (
                    <label style={{ fontSize: 12, marginTop: 5 }}>{getValues('surat_tugas').name}</label>
                  )}
                  {errors.surat_tugas && (
                    <FormHelperText sx={{ color: 'error.main' }}>{errors.surat_tugas.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='tgl_surat'
                    control={control}
                    render={({ field: { onBlur, onChange, value } }) => (
                      <div>
                        <TextField
                          fullWidth
                          label='Tanggal Terbit Surat'
                          type='date'
                          onBlur={onBlur}
                          onChange={e => onChange(e.target.value)}
                          value={value}
                          error={Boolean(errors.tgl_surat)}

                      
                          InputLabelProps={{
                            shrink: true
                          }}
                          style={{ marginTop: '15px' }}
                        />
                        {errors.tgl_surat && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.tgl_surat.message}</FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid container spacing={2} style={{ marginLeft: 'auto', marginTop: '10px' }}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='tgl_mulai'
                      control={control}
                      render={({ field: { onBlur, onChange, value } }) => (
                        <div>
                          <TextField
                            fullWidth
                            label='Mulai'
                            type='date'
                            onBlur={onBlur}
                            onChange={e => onChange(e.target.value)}
                            value={value}
                            error={Boolean(errors.tgl_mulai)}

                          
                            InputLabelProps={{
                              shrink: true
                            }}
                            style={{ marginTop: '15px' }}
                          />
                          {errors.tgl_mulai && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.tgl_mulai.message}</FormHelperText>
                          )}
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Controller
                      name='tgl_selesai'
                      control={control}
                      render={({ field: { onBlur, onChange, value } }) => (
                        <div>
                          <TextField
                            fullWidth
                            label='Selesai'
                            type='date'
                            onBlur={onBlur}
                            onChange={e => onChange(e.target.value)}
                            value={value}
                            error={Boolean(errors.tgl_selesai)}

                        
                            InputLabelProps={{
                              shrink: true
                            }}
                            style={{ marginTop: '15px' }}
                          />
                          {errors.tgl_selesai && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.tgl_selesai.message}</FormHelperText>
                          )}
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 7,display: 'flex', justifyContent: 'space-between', marginLeft: 'auto' }}>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    color='error'
                    sx={{ marginTop: '15px', marginRight: '20px' }}
                    onClick={handleClose}
                  >
                    Batal
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' sx={{ marginTop: '15px' }}>
                    Simpan
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </DialogContent>
</>
  );
};

export default TableMember;
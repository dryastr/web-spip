// import React, { useEffect, useState } from 'react'
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   TextField,
//   Button,
//   FormControl,
//   FormHelperText,
//   Grid,
//   Divider,
//   Box
// } from '@mui/material'
// import Fab from '@mui/material/Fab'
// import Icon from 'src/@core/components/icon'
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import Autocomplete from '@mui/material/Autocomplete'
// import Chip from '@mui/material/Chip'
// import userServices from 'src/services/user-services'
// import { yupResolver } from '@hookform/resolvers/yup'
// import daftarMember from 'src/services/daftar-member-services'
// import toast from 'react-hot-toast'
// import { useTheme } from '@emotion/react'
// import { useRouter } from 'next/router';
// import { showLoading, hideLoading } from 'src/store/loadingSlice'
// import { useDispatch, useSelector } from 'react-redux'

// const schema = yup.object().shape({
//   no_surat: yup.string().required('No Surat is a required field').label('No Surat'),

//   // user_id: yup.string().required('No Surat is a required field').label('Pilih Member'),
//   tgl_surat: yup.string().required('Tanggal Terbit Surat is a required field').label('Tanggal Terbit Surat'),
//   tgl_mulai: yup.string().required('Tanggal Mulai is a required field').label('Tanggal Mulai'),
//   tgl_selesai: yup.string().required('Tanggal Selesai is a required field').label('Tanggal Selesai'),

//   // surat_permohonan: yup.string().required('Tanggal Selesai is a required field').label('File Surat Permohonan'),

// })

// const defaultValues = {
//   no_surat: '',
//   user_id: [],
//   surat_tugas: '',
//   tgl_surat: '',
//   tgl_mulai: '',
//   tgl_selesai: ''
// }

// const FormInput = ({ open, handleClose }) => {
//   const [selectedItems, setSelectedItems] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [searchResults, setSearchResults] = useState([])
//   const [showResults, setShowResults] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const dispatch = useDispatch()
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('selectedItems')) || []
//     setSelectedItems(storedItems)
//   }, [])

//   useEffect(() => {
//     console.log('oaoaop', id);
//   }, [id]);

//   const handleSearch = event => {
//     const term = event.target.value
//     setSearchTerm(term)
//     setLoading(true)

//     daftarMember
//       .search({
//         search: term,
//         sort: '',
//         sort_type: '',
//         per_page: 10,
//         page: 1
//       })
//       .then(response => {
//         setSearchResults(response || [])
//         setShowResults(true)
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error)
//       })
//       .finally(() => {
//         setLoading(false)
//       })
//   }

//   const handleSelect = item => {
//     const updatedItems = [...selectedItems, item]
//     setSelectedItems(updatedItems)
//     setSearchTerm('')
//     setShowResults(false)

//     localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
//   }

//   const handleRemove = item => {
//     const updatedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id)
//     setSelectedItems(updatedItems)

//     localStorage.setItem('selectedItems', JSON.stringify(updatedItems))
//   }

//   const handleCloseDialog = () => {
//     setSearchTerm('')
//     handleClose()
//   }

//   const theme = useTheme()

//   const styleToast = {
//     style: {
//       padding: '16px',
//       color: theme.palette.primary.main,
//       border: '1px solid ' + theme.palette.primary.main
//     },
//     iconTheme: {
//       primary: theme.palette.primary.main,
//       secondary: theme.palette.primary.contrastText
//     }
//   }

//   const styleToastError = {
//     style: {
//       padding: '16px',
//       color: theme.palette.primary.error,
//       border: '1px solid ' + theme.palette.primary.error
//     },
//     iconTheme: {
//       primary: theme.palette.primary.error,
//       secondary: theme.palette.primary.contrastText
//     }
//   }

//   const {
//     control,
//     handleSubmit,
//     reset,
//     setValue,
//     getValues,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onBlur',
//     resolver: yupResolver(schema)
//   })

//   const onSubmit = data => {
//     dispatch(showLoading());
  
//     const formattedData = {
//       ...data,
//       users: selectedItems,
//       surat_tugas: data.surat_tugas || '',
//       trans_penilaian_id: data.trans_penilaian_id || id
//     };
  
//     daftarMember.store(formattedData).then(response => {
//       // dispatch(hideLoading());
//       if (response.status === 200) {
//         handleClose();
//         toast.success('berhasil Menambahkan Member.', styleToast);
//         reset({
//           user_id: [],
//           no_surat: '',
//           surat_tugas: '',
//           tgl_surat: '',
//           tgl_mulai: '',
//           tgl_selesai: ''
//         });
//         setSelectedItems([]);

//         // loadData();
//       } else {
//         toast.error('gagal Menambahkan Member.', styleToastError);
//       }
//     });
//   };
  

//   return (
//     <>
//     <DialogContent>
//       <Dialog open={open} onClose={handleCloseDialog} aria-labelledby='form-dialog-title'>
//         <DialogTitle id='form-dialog-title'>Tambah Member</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Silahkan Tambahkan Member</DialogContentText>
//           <br />
//           <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Autocomplete
//                   multiple
//                   id='users'
//                   options={searchResults}
//                   getOptionLabel={option => option.fullname} 
//                   getOptionSelected={(option, value) => option.id === value.id}
//                   value={selectedItems}
//                   onChange={(_, newValue) => {
//                     setSelectedItems(newValue)
//                     setSearchTerm('')
//                     setValue(
//                       'user_id',
//                       newValue.map(user_id => user_id.id),
//                       { shouldValidate: true }
//                     )
//                   }}
//                   renderInput={params => (
//                     <TextField
//                       {...params}
//                       autoFocus
//                       autoComplete='off'
//                       label='Pilih Member'
//                       variant='outlined'
//                       fullWidth
//                       value={searchTerm}
//                       onChange={handleSearch}
//                     />
//                   )}
//                   renderTags={(value, getTagProps) =>
//                     value.map((option, index) => (
//                       <Chip
//                         key={index}
//                         label={option.fullname}
//                         {...getTagProps({ index })}
//                         onDelete={() => handleRemove(option)}
//                       />
//                     ))
//                   }
//                 />
//               </Grid>
//               <Grid item xs={12} sx={{ margin: '15px 0 0 10px' }}>
//                 <Divider>SURAT TUGAS</Divider>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='no_surat'
//                     control={control}
//                     render={({ field: { onBlur, onChange, value } }) => (
//                       <div>
//                         <TextField
//                           label='No Surat'
//                           onBlur={onBlur}
//                           onChange={e => onChange(e.target.value)}
//                           value={value}
//                           fullWidth
//                           error={Boolean(errors.no_surat)}
//                           placeholder='No Surat'
//                         />
//                         {errors.no_surat && (
//                           <FormHelperText sx={{ color: 'error.main' }}>{errors.no_surat.message}</FormHelperText>
//                         )}
//                       </div>
//                     )}
//                   />
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
//                   <div sx={{ mb: 4 }}>
//                     <label className='button label' htmlFor={'surat_tugas'}>
//                       <input
//                         style={{ display: 'none' }}
//                         id={'surat_tugas'}
//                         name={'surat_tugas'}
//                         type='file'
//                         onChange={event => {
//                           setValue('surat_tugas', event.currentTarget.files[0], { shouldValidate: true })
//                         }}
//                       />

//                       <Fab size='small' variant='extended' sx={{ '& svg': { mr: 1 }, width: '100%' }} fullWidth component='span'>
//                         <Icon icon='mdi:plus' />
//                         Upload surat tugas *
//                       </Fab>
//                     </label>
//                   </div>
//                   {getValues('surat_tugas') && (
//                     <label style={{ fontSize: 12, marginTop: 5 }}>{getValues('surat_tugas').name}</label>
//                   )}
//                   {errors.surat_tugas && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{errors.surat_tugas.message}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='tgl_surat'
//                     control={control}
//                     render={({ field: { onBlur, onChange, value } }) => (
//                       <div>
//                         <TextField
//                           fullWidth
//                           label='Tanggal Terbit Surat'
//                           type='date'
//                           onBlur={onBlur}
//                           onChange={e => onChange(e.target.value)}
//                           value={value}
//                           error={Boolean(errors.tgl_surat)}

                      
//                           InputLabelProps={{
//                             shrink: true
//                           }}
//                           style={{ marginTop: '15px' }}
//                         />
//                         {errors.tgl_surat && (
//                           <FormHelperText sx={{ color: 'error.main' }}>{errors.tgl_surat.message}</FormHelperText>
//                         )}
//                       </div>
//                     )}
//                   />
//                 </FormControl>
//               </Grid>
//               <Grid container spacing={2} style={{ marginLeft: 'auto', marginTop: '10px' }}>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth>
//                     <Controller
//                       name='tgl_mulai'
//                       control={control}
//                       render={({ field: { onBlur, onChange, value } }) => (
//                         <div>
//                           <TextField
//                             fullWidth
//                             label='Mulai'
//                             type='date'
//                             onBlur={onBlur}
//                             onChange={e => onChange(e.target.value)}
//                             value={value}
//                             error={Boolean(errors.tgl_mulai)}

                          
//                             InputLabelProps={{
//                               shrink: true
//                             }}
//                             style={{ marginTop: '15px' }}
//                           />
//                           {errors.tgl_mulai && (
//                             <FormHelperText sx={{ color: 'error.main' }}>{errors.tgl_mulai.message}</FormHelperText>
//                           )}
//                         </div>
//                       )}
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth>
//                     <Controller
//                       name='tgl_selesai'
//                       control={control}
//                       render={({ field: { onBlur, onChange, value } }) => (
//                         <div>
//                           <TextField
//                             fullWidth
//                             label='Selesai'
//                             type='date'
//                             onBlur={onBlur}
//                             onChange={e => onChange(e.target.value)}
//                             value={value}
//                             error={Boolean(errors.tgl_selesai)}

                        
//                             InputLabelProps={{
//                               shrink: true
//                             }}
//                             style={{ marginTop: '15px' }}
//                           />
//                           {errors.tgl_selesai && (
//                             <FormHelperText sx={{ color: 'error.main' }}>{errors.tgl_selesai.message}</FormHelperText>
//                           )}
//                         </div>
//                       )}
//                     />
//                   </FormControl>
//                 </Grid>
//               </Grid>
//               <Box sx={{ mt: 7,display: 'flex', justifyContent: 'space-between', marginLeft: 'auto' }}>
//                 <Grid item xs={12}>
//                   <Button
//                     variant='contained'
//                     color='error'
//                     sx={{ marginTop: '15px', marginRight: '20px' }}
//                     onClick={handleClose}
//                   >
//                     Batal
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Button type='submit' variant='contained' sx={{ marginTop: '15px' }}>
//                     Simpan
//                   </Button>
//                 </Grid>
//               </Box>
//             </Grid>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </DialogContent>
//     </>
//   )
// }

// export default FormInput
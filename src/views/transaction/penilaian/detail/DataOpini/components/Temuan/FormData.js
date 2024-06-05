import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material'

import { Controller } from 'react-hook-form'

const FormData = props => {
  const { title, open, handleClose, control, handleSubmit, errors, onSubmit, form } = props

  return (
    <Dialog maxWidth='sm' fullWidth onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Typography variant='h5' component='span' sx={{ mb: 2 }}>
          {form === 'add' ? 'Tambah' : 'Ubah'} Data
        </Typography>
        <Typography variant='body2'>Silahkan isi data form berikut</Typography>
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
              name='temuan'
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label='Temuan'
                  type='text'
                  multiline
                  rows={3}
                  maxRows={3}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.temuan)}
                />
              )}
            />
            {errors.temuan && <FormHelperText sx={{ color: 'error.main' }}>{errors.temuan.message}</FormHelperText>}
          </FormControl>

          <br />
          <DialogActions className='dialog-actions-dense'>
            <Button variant='contained' color='secondary' onClick={handleClose}>
              Batal
            </Button>
            <Button type='submit' variant='contained'>
              Simpan
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormData

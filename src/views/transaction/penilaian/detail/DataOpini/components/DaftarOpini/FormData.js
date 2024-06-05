import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography
} from '@mui/material'

import moment from 'moment'
import { Controller } from 'react-hook-form'

const FormData = props => {
  const { open, handleClose, control, handleSubmit, errors, onSubmit, form } = props

  const years = []

  for (let i = moment().year() + 1; i >= moment().year() - 5; i--) {
    years.push(i)
  }

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
            <InputLabel id='tahun'>Tahun</InputLabel>
            <Controller
              name='tahun'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  label='Tahun'
                  id='tahun'
                  name='tahun'
                  labelId='tahun'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.jenis_kk_lead_spip)}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {years.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item}>
                        {item}
                      </MenuItem>
                    )
                  })}
                </Select>
              )}
            />
            {errors.tahun && <FormHelperText sx={{ color: 'error.main' }}>{errors.tahun.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='opini'
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label='Opini'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.opini)}
                />
              )}
            />
            {errors.opini && <FormHelperText sx={{ color: 'error.main' }}>{errors.opini.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Typography>Persentase BMN</Typography>

            <Controller
              name='persentase_bmn'
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Grid container spacing={1}>
                  <Grid item xs={11}>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      valueLabelDisplay='auto'
                    />
                  </Grid>
                  <Grid item xs={1} style={{ textAlign: 'center' }}>
                    {value}%
                  </Grid>
                </Grid>
              )}
            />
            {errors.persentase_bmn && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.persentase_bmn.message}</FormHelperText>
            )}
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

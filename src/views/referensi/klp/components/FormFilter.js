// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

const FormFilter = (props) => {
  const initialParams = {
    jenis: '',
    level: '',
  };
  const [params, setParams] = useState(initialParams);

  const handleChangeJenis = (event) => {
    setParams({ ...params, jenis: event.target.value })
  }

  const handleChangeLevel = (event) => {
    setParams({ ...params, level: event.target.value })
  }

  const handleResetFilter = () => {
    setParams(initialParams);
    props.handleApplyFilter(initialParams);
  }

  const handleApplyFilter = () => {
    props.handleApplyFilter(params);
  }

  return (
    <>
      <Dialog maxWidth='sm' fullWidth onClose={props.handleDialogToggle} open={props.dialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Filter Data
          </Typography>
          <Typography variant='body2'>Data akan terfilter sesuai dengan filter dibawah ini.</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          }}
        >
          <br />
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='jenis'>Jenis</InputLabel>
                <Select
                  fullWidth
                  label='Jenis'
                  defaultValue=''
                  id='jenis'
                  labelId='Jenis'
                  onChange={handleChangeJenis}
                  value={params.jenis}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'KL'}>Kementrian Lembaga</MenuItem>
                  <MenuItem value={'PEMDA'}>Pemerintah Daerah</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }} required>
                <InputLabel id='jenis'>Level</InputLabel>
                <Select
                  fullWidth
                  label='Level'
                  defaultValue=''
                  id='level'
                  labelId='level'
                  onChange={handleChangeLevel}
                  value={params.level}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'PUSAT'}>Pusat</MenuItem>
                  <MenuItem value={'NON-PUSAT'}>Non Pusat</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid> */}
          <br />
          <DialogActions className='dialog-actions-dense' sx={{ padding: '0px !important' }}>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleResetFilter}
            >
              Reset Filter
            </Button>
            <Button
              variant='contained'
              onClick={handleApplyFilter}
            >
              Terapkan Filter
            </Button>
          </DialogActions>
        </DialogContent>
        
      </Dialog>
    </>
  )
}

export default FormFilter

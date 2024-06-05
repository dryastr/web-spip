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

// ** Services
import referensiServices from "src/services/referensi-services";

const FormFilter = (props) => {
  const initialParams = {
    ref_klp_id: '',
    status: ''
  };
  const [params, setParams] = useState(initialParams);
  const [listKlp, setListKlp] = useState([]);

  useEffect(() => {
    referensiServices.getListKlp({
      jenis: 'all'
    }).then((response) => {
      setListKlp(response);
    });
  }, [])

  const handleChangeRefKlpId = (event) => {
    setParams({ ...params, ref_klp_id: event.target.value })
  }

  const handleChangeStatus = (event) => {
    setParams({ ...params, status: event.target.value })
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
                <InputLabel id='ref_klp_id'>Kementrian Lembaga / PEMDA</InputLabel>
                <Select
                  fullWidth
                  label='Kementrian Lembaga / PEMDA'
                  defaultValue=''
                  id='ref_klp_id'
                  labelId='ref_klp_id'
                  onChange={handleChangeRefKlpId}
                  value={params.ref_klp_id}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {
                    listKlp.map((item) => {
                      return (<MenuItem value={item.id}>{item.kode} | {item.nama}</MenuItem>);
                    })
                  }
                  
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id='status'>Status</InputLabel>
                <Select
                  fullWidth
                  label='Status'
                  defaultValue=''
                  id='status'
                  labelId='status'
                  onChange={handleChangeStatus}
                  value={params.status}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='draft'>Draft</MenuItem>
                  <MenuItem value='preparation'>Preparation</MenuItem>
                  <MenuItem value='open-self-assessment'>Open Self Assessment</MenuItem>
                  <MenuItem value='open-verification-assessment'>Open Verification Assessment</MenuItem>
                  <MenuItem value='final'>Final</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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

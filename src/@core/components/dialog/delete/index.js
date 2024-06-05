// ** MUI Imports
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

const DialogDelete = (props) => {
  return (
    <>
      <Dialog maxWidth='sm' fullWidth onClose={props.handleDialogToggle} open={props.deleteDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Hapus Data
          </Typography>
          <Typography variant='body2'>Apakah anda yakin untuk menghapus data ini ?</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Alert severity='error' sx={{ maxWidth: '500px' }}>
            <AlertTitle>Warning!</AlertTitle>
            Data akan dihapus secara permanen
          </Alert>
          <br />
          <DialogActions className='dialog-actions-dense'>
            <Button
              variant='contained'
              color='secondary'
              onClick={props.handleDialogToggle}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              onClick={props.handleDialogDelete}
            >
              Hapus data
            </Button>
          </DialogActions>
        </DialogContent>
        
      </Dialog>
    </>
  )
}

export default DialogDelete

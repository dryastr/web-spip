// ** MUI Imports
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Grid, List, ListItem, ListItemText } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginLeft: theme.spacing(2),
  borderRadius: theme.shape.borderRadius
}))

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  paddingXNone: {
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
  }
}));

const DialogView = (props) => {
  const classes = useStyles();

  const item = props.item;
  const items = props.items;

  const midIndex = Math.ceil(items.length / 2);
  const [firstPart, secondPart] = [items.slice(0, midIndex), items.slice(midIndex)];

  const renderContent = (data) => {
    if (data.type === 'image') {
      return (
        <>
          <ListItem className={classes.paddingXNone}>
            <ListItemText
                primary={
                  <Typography variant='body2'>
                      {data.label}
                  </Typography>
                }
                secondary={
                  <ImgStyled src={data.logo_url || '/images/avatars/broken.png'} alt='Gambar' />
                }
            />
          </ListItem>
        </>
      )
    } else if (data.type === 'text') {
      return (
        <>
          <ListItem className={classes.paddingXNone}>
            <ListItemText
                primary={
                  <Typography variant='body2'>
                      {data.label}
                  </Typography>
                }
                secondary={
                  <Typography fontSize={16} variant='subtitle2' sx={{ color: 'text.primary', letterSpacing: '.1px' }}>
                      {item[data.field]}
                  </Typography>
                }
            />
          </ListItem>
        </>
      )
    }

    return null;
  }

  return (
    <>
      <Dialog maxWidth='md' fullWidth onClose={props.handleDialogToggle} open={props.dialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Detail Data
          </Typography>
          
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <List disablePadding>
                {
                  firstPart.map((data) => {
                    return renderContent(data)
                  })
                }
                </List>
              </Grid>
              <Grid item md={6} xs={12}>
                <List disablePadding>
                {
                  secondPart.map((data) => {
                    return renderContent(data)
                  })
                }
                </List>
              </Grid>
          </Grid>
          <br />
          <DialogActions className='dialog-actions-dense'>
            <Button
              variant='contained'
              color='secondary'
              onClick={props.handleDialogToggle}
            >
              Tutup
            </Button>
          </DialogActions>
        </DialogContent>
        
      </Dialog>
    </>
  )
}

export default DialogView

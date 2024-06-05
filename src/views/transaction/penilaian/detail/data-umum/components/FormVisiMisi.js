import React, { useEffect, useState } from 'react'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'
import { getData } from 'src/store/pages/penilaian/visiMisiSlice'

// ** Icon Imports  
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

// ** Custom Components Imports
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Services
import visiMisiService from 'src/services/visimisi-services'

// ** Component
import toast from 'react-hot-toast'

const useStyles = makeStyles(theme => ({
  number: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
}))

const FormVisiMisi = (props) => {
  // ** Redux
  const dispatch = useDispatch();
  const visiMisiSlice = useSelector(({visiMisiSlice}) => visiMisiSlice);

  // ** State
  const [visiMisiDialogOpen, setVisiMisiDialogOpen] = useState(false);
  const [type, setType] = useState('');
  const [value, setValue] = useState(EditorState.createEmpty())

  // ** Hooks
  const theme = useTheme()
  const classes = useStyles()

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

  useEffect(() => {
    loadData()
  }, [props.data.id])

  const loadData = () => {
    if (props.data.id) {
      dispatch(getData(props.data.id))
    }
  }

  const handleDialogVisiMisi = () => {
    setVisiMisiDialogOpen(false);
  }

  const handleChangeVisiMisi = (type) => {
    if (type === 'visi') {
      setValue(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(visiMisiSlice.visi)
        )
      ))
    } else {
      setValue(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(visiMisiSlice.misi)
        )
      ))
    }

    setType(type);
    setVisiMisiDialogOpen(true);
  }

  const handleSubmitVisiMisi = () => {
    dispatch(showLoading())
    console.warn('string', value.getCurrentContent().getPlainText());

    /** INI YANG DI SIMPAN DI DB BENTUK HTML */
    console.warn('html', draftToHtml(convertToRaw(value.getCurrentContent())))
    let payload = {};
    if (type === 'visi') {
      payload = {
        visi: draftToHtml(convertToRaw(value.getCurrentContent()))
      }
    } else {
      payload = {
        misi: draftToHtml(convertToRaw(value.getCurrentContent()))
      }
    }

    visiMisiService.store(props.data?.id, payload).then(response => {
      dispatch(getData(props.data?.id))
      dispatch(hideLoading())
      if (response?.status === 200) {
        toast.success('Data Penilaian berhasil diubah.', styleToast)
      } else {
        toast.error('Data Penilaian gagal diubah.', styleToastError)
      }
      setVisiMisiDialogOpen(false);
    })
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Visi Dan Misi'
          subheader={'Masukan Visi dan Misi ' + props.data?.klp?.nama}
          subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
          titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        />

        <CardContent>
          <div>
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Visi</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant='body2'
                dangerouslySetInnerHTML={{ __html: visiMisiSlice.visi }}
              />
              <div>
                <Tooltip title='Tambahkan Visi'>
                  <IconButton
                    aria-label='edit'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => handleChangeVisiMisi('visi')}
                  >
                    <Icon icon='mdi:square-edit-outline' fontSize='1.25rem' />
                  </IconButton>
                </Tooltip>
              </div>
            </Box>

            <Divider sx={{ mt: '0 !important', mt: 2, mb: theme => `${theme.spacing(4)} !important` }} />
          </div>

          <div>
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Misi</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant='body2'
                dangerouslySetInnerHTML={{ __html: visiMisiSlice.misi }}
              />
              <div>
                <Tooltip title='Tambahkan Misi'>
                  <IconButton
                    aria-label='edit'
                    sx={{ color: 'text.secondary' }}
                    onClick={() => handleChangeVisiMisi('misi')}
                  >
                    <Icon icon='mdi:square-edit-outline' fontSize='1.25rem' />
                  </IconButton>
                </Tooltip>
              </div>
            </Box>

            <Divider sx={{ mt: '0 !important', mt: 2, mb: theme => `${theme.spacing(4)} !important` }} />
          </div>
        </CardContent>

      </Card>

      <Dialog maxWidth='lg' fullWidth onClose={handleDialogVisiMisi} open={visiMisiDialogOpen}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            Edit {type.toUpperCase()}
          </Typography>
          <Typography variant='body2'>Silahkan isi data form berikut</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <div style={{ border: '1px solid #eee' }}>
            <ReactDraftWysiwyg
              editorState={value}
              editorStyle={{ height: '400px' }}
              onEditorStateChange={data => setValue(data)}
            />
          </div>

          <br />
          <DialogActions className='dialog-actions-dense'>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDialogVisiMisi}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              onClick={handleSubmitVisiMisi}
            >
              Simpan Data
            </Button>
          </DialogActions>
        </DialogContent>
        
      </Dialog>
    </>
  )
}

export default FormVisiMisi;
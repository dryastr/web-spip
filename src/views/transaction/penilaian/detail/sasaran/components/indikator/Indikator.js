import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Custom Components
import IndikatorTable from './IndikatorTable'
import IndikatorForm from './IndikatorForm'
import { Card, CardContent, Chip } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'

const Indikator = props => {
  const { item } = props
  const auth = useAuth()

  const handleCloseDialog = () => {
    props.handleCloseDialog()
  }

  return (
    <>
      <Dialog maxWidth='xl' fullWidth onClose={handleCloseDialog} open={props.dialongOpen}>
        <DialogTitle
          sx={{
            textAlign: 'left',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Typography variant='h5' component='span' sx={{ mb: 2 }}>
            {auth.user.default_klp.jenis == 'PEMDA'
              ? 'Daftar Indikator Sasaran Strategis Pemda'
              : 'Daftar Indikator Sasaran OPD'}
          </Typography>
          <Typography variant='body2' style={{ marginTop: '10px' }}>
            <Chip label={`Kode: ${item?.kode}`} /> <Chip label={`Nama: ${item?.nama}`} />
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <br />

          <Card>
            <CardContent>
              <IndikatorTable
                item={item}
                handleAddData={() => {
                  setFormDialogOpen(true)
                }}
              />
            </CardContent>
          </Card>

          <br />
          <DialogActions className='dialog-actions-dense'>
            <Button variant='contained' color='secondary' onClick={handleCloseDialog}>
              Tutup
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Indikator

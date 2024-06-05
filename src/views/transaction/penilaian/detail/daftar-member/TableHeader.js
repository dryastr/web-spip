// FromDaftarMember.js
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import FormInput from './components/FormInput'
import TableMember from './Table'
import Icon from 'src/@core/components/icon'

const TableHeader = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <br />
      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CardHeader title='Daftar Member' sx={{ letterSpacing: '0.15px' }} />
          <Box>
            <Button
              variant='contained'
              sx={{ marginRight: '20px', marginTop: '20px', background: 'rgb(42 51 255)' }}
              onClick={handleClickOpen}
            >
              <Icon icon={'mdi:add'} />
            </Button>
          </Box>
        </Box>

        {/* <FormInput open={open} handleClose={handleClose} /> */}
        <TableMember open={open} handleClose={handleClose}/>
      </Card>
    </>
  )
}

export default TableHeader

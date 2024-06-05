import React, { useState } from 'react'

// ** MUI Imports
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ItemChild = ({item}) => {
  return (
    <>
      <TableRow
        sx={{ '& .MuiTableCell-root': { 
          border: 0,
          paddingTop: '1px !important',
          paddingBottom: '1px !important',
          // paddingBottom: '0px !important'
        } }}
      >
        <TableCell colSpan={2}>
          <Box sx={{ display: 'flex', alignItemChilds: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItemChilds: 'center', justifyContent: 'flex-start' }}>
              <Icon icon={'mdi:circle'} fontSize={10} style={{ marginTop: 5 }} />
              <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary', ml: 2 }}>
                {item.nama}
              </Typography>
            </Box>
            <Button variant='outlined' size='small'>Indikator</Button>
          </Box>
        </TableCell>
        <TableCell align='center'>
          <Icon icon='mdi:close-box' color={'red'} />
        </TableCell>
        <TableCell align='center'>
          <Icon icon='mdi:check-circle' color={'green'} />
        </TableCell>
        <TableCell align='center'>
          <Icon icon='mdi:check-circle' color={'green'} />
        </TableCell>
        <TableCell align='center'>
          
        </TableCell>
      </TableRow>
    </>
  )
}

export default ItemChild;
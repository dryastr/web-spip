import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

// ** Config
import checkPermissions from 'src/configs/permissions'

const OptionActions = props => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    props.deleteData()
    handleRowOptionsClose()
  }

  const handleView = () => {
    props.viewData()
    handleRowOptionsClose()
  }

  return (
    <>
      <div style={{ right: 0, textAlign: 'right' }}>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
      </div>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleView}>
          <Icon icon='tabler:eye' fontSize={20} />
          Detail
        </MenuItem>
        {checkPermissions('referensi.jenis_sasaran.edit') && (
          <MenuItem
            component={Link}
            href={'/referensi/jenis-sasaran/edit/' + props.item.pid}
            onClick={handleRowOptionsClose}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='tabler:edit' fontSize={20} />
            Ubah
          </MenuItem>
        )}
        {checkPermissions('referensi.jenis_sasaran.delete') && (
          <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:trash' fontSize={20} />
            Hapus
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default OptionActions

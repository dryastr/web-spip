import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

const OptionActions = (props) => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleAddSasaran = () => {
    props.handleAddSasaran(props.item);
    handleRowOptionsClose()
  }

  const handleDeleteSasaran = () => {
    props.handleDeleteSasaran(props.item);
    handleRowOptionsClose()
  }

  const handleEditSasaran = () => {
    props.handleEditSasaran(props.item);
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
        {
          !props.isChild && (
            <MenuItem
              sx={{ '& svg': { mr: 2 } }}
              onClick={handleAddSasaran}
            >
              <Icon icon='tabler:playlist-add' fontSize={20} />
              Tambah Sasaran
            </MenuItem>
          )
        }
        <MenuItem
          onClick={handleEditSasaran}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          Ubah
        </MenuItem>
        <MenuItem
          onClick={handleDeleteSasaran}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tabler:trash' fontSize={20} />
          Hapus
        </MenuItem>
      </Menu>
    </>
  )
}

export default OptionActions

import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

import Icon from 'src/@core/components/icon'

const OptionAction = props => {
  // ** Hooks
  const dispatch = useDispatch()

  // const navigate = useNavigate()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
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
        <MenuItem onClick={() => props.handleApprove(props.id, props.nama, props.row)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:circle-check' fontSize={20} />
          Setujui
        </MenuItem>
        <MenuItem onClick={() => props.handleReject(props.id, props.row)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:accessible-off' fontSize={20} />
          Tolak
        </MenuItem>
      </Menu>
    </>
  )
}

export default OptionAction

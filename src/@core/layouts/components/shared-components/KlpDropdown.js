// ** React Import
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components Imports
import { Button, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'

const KlpDropdown = props => {
  // ** Props
  const { settings, auth } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectKlp, setSelectKlp] = useState(localStorage.getItem('klp') || auth.user.default_klp.id)

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleSelectKlp = id => {
    localStorage.setItem('klp', id)
    setSelectKlp(id)
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Button variant='outlined' color='info' onClick={handleDropdownOpen}>
        Pilih Klp <Icon icon={'icon-park-outline:right'} rotate={Boolean(anchorEl) ? '90deg' : ''} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        {auth.user.klp.map((i, k) => (
          <MenuItem key={k} selected={selectKlp == i.id} onClick={() => handleSelectKlp(i.id)}>
            ({i.kode}) | {i.nama}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

export default KlpDropdown

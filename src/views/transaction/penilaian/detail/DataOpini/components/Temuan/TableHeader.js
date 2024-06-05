// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Config

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  const [params, setParams] = useState({})
  const [search, setSearch] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(0)

  const handleOnchangeSearch = event => {
    setSearch(event.target.value)
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(
      setTimeout(() => {
        const paramsChanges = { ...params, search: event.target.value }
        setParams(paramsChanges)
        handleFilter(paramsChanges)
      }, 500)
    )
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div>
          <TextField
            size='small'
            value={search}
            sx={{ mr: 4, mb: 2.5 }}
            placeholder='Pencarian'
            onChange={handleOnchangeSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Icon icon='mdi:magnify' />
                </InputAdornment>
              )
            }}
          />
        </div>
      </Box>
    </>
  )
}

export default TableHeader

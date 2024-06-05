// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component
import FormFilter from './components/FormFilter'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter } = props
  
  const [params, setParams] = useState({});
  const [openFilter, setOpenFilter] = useState(false);
  const [search, setSearch] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleOnchangeSearch = (event) => {
    setSearch(event.target.value)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(setTimeout(() => {
      const paramsChanges = {...params, search: event.target.value}
      setParams(paramsChanges);
      handleFilter(paramsChanges);
    }, 500));
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
          <Button
            sx={{ mb: 2.5 }}
            startIcon={<Icon icon='mdi:filter-variant' />}
            style={{color: 'rgb(35 44 255)', borderColor: 'rgb(42 51 255)'}}
            variant='outlined'
            onClick={() => {
              setOpenFilter(true);
            }}
          >
            Filter
          </Button>
        </div>

        <Button
          component={Link}
          sx={{ mb: 2.5 }}
          variant='contained'
          href={`/transaction/penilaian/add`}
          style={{backgroundColor: 'rgb(42 51 255)'}}
        >
          Tambah Data
        </Button>
      </Box>

      <FormFilter
        handleApplyFilter={(filterParams) => {
          const paramsChanges = {...params, ...filterParams};
          setParams(paramsChanges)
          setOpenFilter(!openFilter);
          handleFilter(paramsChanges);
        }}
        handleDialogToggle={() => {
          setOpenFilter(!openFilter);
        }}
        dialogOpen={openFilter}
      />
    </>
  )
}

export default TableHeader

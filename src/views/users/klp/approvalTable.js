// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import toast from 'react-hot-toast'
import { getInitials } from 'src/@core/utils/get-initials'

// import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import QuickSearchToolbar from 'src/@core/components/data-grid/quick-search-toolbar'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Data Import
import userService from 'src/services/user-services'
import renderClient from './components/renderClient'
import DialogDelete from 'src/@core/components/dialog/delete'

const TableColumns = props => {
  const { rows } = props
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  // ** States
  const [item, setItem] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [rowsTotal, setRowsTotal] = useState(0)
  const [rowsCount, setRowsCount] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 10,
    sort: 'id',
    sort_type: 'asc'
  })

  // finishExec = useSelector(state => state)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = rows.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleDeleteData = item => {
    setItem(item)
    setDeleteDialogOpen(true)
  }

  const handleViewData = item => {
    setItem(item)
    setViewDialogOpen(true)
  }

  const handleDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen)
  const handleDialogToggleView = () => setViewDialogOpen(!viewDialogOpen)

  const handleDialogDelete = () => {
    dispatch(showLoading())
    referensiServices.deleteKlp(item.id).then(response => {
      dispatch(hideLoading())
      setDeleteDialogOpen(false)
      if (response?.status === 200) {
        toast.success('Data berhasil di hapus.', styleToast)
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  }

  useEffect(() => {
    setRowsTotal(rows.length)
    console.log(rows.length)
  }, [rows])

  const columns = [
    {
      flex: 0.255,
      minWidth: 150,
      field: 'fullname',
      headerName: 'Nama',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.fullname}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.255,
      minWidth: 150,
      field: 'roles',
      headerName: 'Peran',
      renderCell: params => {
        const { row } = params

        // const status = statusObj[params.row.status_approval]

        return (
          row.roles.length > 0 &&
          row.roles.map((role, index) => (
            <CustomChip
              key={index}
              size='small'
              skin='light'
              color={'error'}
              label={role.name || '-'}
              sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, mr: 2 }}
            />
          ))
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Edit Peran'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                handleDeleteData(row)
              }}
            >
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Hapus Pengguna'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => {
                handleDeleteData(row)
              }}
            >
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
        </Box>

        // <OptionAction
        //   id={row.id}
        //   nama={row.ref_klp_nama}
        //   row={row}
        //   handleApprove={handleApprove}
        //   handleReject={handleReject}
        // />
      )
    }
  ]

  // filteredData.length ? filteredData :
  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Daftar Pengguna' />
          <Divider sx={{ m: '0 !important' }} />
          <DataGrid
            autoHeight
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            slots={{ toolbar: QuickSearchToolbar }}
            onPaginationModelChange={setPaginationModel}
            rows={rows}
            disableColumnFilter
            slotProps={{
              baseButton: {
                variant: 'outlined'
              },
              toolbar: {
                value: searchText,
                clearSearch: () => handleSearch(''),
                onChange: event => handleSearch(event.target.value)
              }
            }}
          />

          <DialogDelete
            handleDialogToggle={handleDialogToggle}
            deleteDialogOpen={deleteDialogOpen}
            handleDialogDelete={handleDialogDelete}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default TableColumns

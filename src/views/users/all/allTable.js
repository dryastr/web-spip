// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import QuickSearchToolbar from 'src/@core/components/data-grid/quick-search-toolbar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Data Import
import userService from 'src/services/user-services'
import columns from './components/rowData'

const TableColumns = () => {
  // ** States

  const [rows, setRows] = useState([])
  const [rowsTotal, setRowsTotal] = useState(0)
  const [rowsCount, setRowsCount] = useState({})

  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 10,
    sort: 'id',
    sort_type: 'asc'
  })

  // finishExec = useSelector(state => state)

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const store = useSelector(state => state.user)

  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addUserOpen, setAddUserOpen] = useState(false)

  useEffect(() => {
    loadData(params)
  }, [dispatch])

  function loadData(paramsChanges) {
    setIsLoading(true)
    userService.getListUserAll(paramsChanges).then(response => {
      if (response.data) {
        console.log(response)
        setRows(response.data || [])
        setRowsTotal(response?.total)
      }

      // setIsLoading(false)
    })

    userService.getCountApproval(paramsChanges).then(response => {
      if (response) {
        console.log(response)
        setRowsCount(response || {})
      }

      setIsLoading(false)
    })
  }

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

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {rowsCount && (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} sm={6}>
              <CardStatsHorizontalWithDetails
                stats={rowsCount['dalam-antrian']}
                title={'Pengguna Aktif'}
                avatarColor='warning'
                icon='tabler:user-check'
                trendDiff='+'
                trend='positive'

                // subtitle='Menunggu persetujuan admin'
              />
            </Grid>

            <Grid item xs={12} md={6} sm={6}>
              <CardStatsHorizontalWithDetails
                stats={rowsCount['ditolak']}
                title={'Pengguna Tidak Aktif'}
                avatarColor='error'
                icon='tabler:user-check'
                trendDiff='-'
                trend='negative'

                // subtitle='Menunggu persetujuan admin'
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Filter Pengguna' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4} sm={6}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Role'
                  SelectProps={{
                    value: role,
                    displayEmpty: true,
                    onChange: e => handleRoleChange(e)
                  }}
                >
                  <MenuItem value=''>Select Role</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='author'>Author</MenuItem>
                  <MenuItem value='editor'>Editor</MenuItem>
                  <MenuItem value='maintainer'>Maintainer</MenuItem>
                  <MenuItem value='subscriber'>Subscriber</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} md={4} sm={6}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Status'
                  SelectProps={{
                    value: status,
                    displayEmpty: true,
                    onChange: e => handleStatusChange(e)
                  }}
                >
                  <MenuItem value=''>Select Status</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} md={4} sm={6}>
                <Button sx={{ mb: 2 }} fullWidth component={Link} variant='contained' href='/apps/invoice/add'>
                  <Icon fontSize='1.125rem' icon='tabler:plus' />
                  Tambah Pengguna
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <DataGrid
            autoHeight
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            slots={{ toolbar: QuickSearchToolbar }}
            onPaginationModelChange={setPaginationModel}
            rows={filteredData.length ? filteredData : rows}
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
        </Card>
      </Grid>
    </Grid>
  )
}

export default TableColumns

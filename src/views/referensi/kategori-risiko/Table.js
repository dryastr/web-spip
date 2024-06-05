// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'

// ** Custom Components Imports
import TableHeader from 'src/views/referensi/kategori-risiko/TableHeader'
import OptionActions from 'src/views/referensi/kategori-risiko/components/OptionActions'
import DialogDelete from 'src/@core/components/dialog/delete'
import DialogView from 'src/@core/components/dialog/view'

// ** Services
import lokasiService from 'src/services/lokasi-services'
import moment from 'moment'

// ** Component
import toast from 'react-hot-toast'
import kategoririsiko from 'src/services/kategoririsiko-service'

const defaultColumns = [
  {
    flex: 0.1,
    field: 'kode',
    minWidth: 150,
    headerName: 'Kode',
    renderCell: ({ row }) => <Typography fontSize={14}>{row.kode}</Typography>
  },

  {
    flex: 0.1,
    field: 'nama',
    minWidth: 150,
    headerName: 'Nama',
    renderCell: ({ row }) => <Typography fontSize={14}>{row.nama}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 215,
    field: 'nama_klp',
    headerName: 'Nama KLP',
    renderCell: ({ row }) => <Typography variant='body2'>{row.klp.nama}</Typography>
  }
]

const Table = () => {
  // ** Redux
  const dispatch = useDispatch()

  // ** Hooks
  const theme = useTheme()

  const styleToast = {
    style: {
      padding: '16px',
      color: theme.palette.primary.main,
      border: '1px solid ' + theme.palette.primary.main
    },
    iconTheme: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.primary.contrastText
    }
  }

  const styleToastError = {
    style: {
      padding: '16px',
      color: theme.palette.primary.error,
      border: '1px solid ' + theme.palette.primary.error
    },
    iconTheme: {
      primary: theme.palette.primary.error,
      secondary: theme.palette.primary.contrastText
    }
  }

  // ** State
  const [item, setItem] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const initialParams = {
    search: '',
    sort: '',
    sort_type: '',
    page: 1,
    per_page: 10
  }
  const [params, setParams] = useState(initialParams)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    loadData(params)
  }, [dispatch])

  const loadData = params => {
    setParams(params)
    kategoririsiko.getPagination(params).then(response => {
      setPagination(response)
    })
  }

  const handleFilter = useCallback(filterParams => {
    const paramsChanges = { ...params, ...filterParams }
    loadData(paramsChanges)
  }, [])

  const onChangePagination = event => {
    const paramsChanges = { ...params, per_page: event.pageSize, page: event.page + 1 }
    setParams(paramsChanges)
    loadData(paramsChanges)
  }

  const onChangeSorting = event => {
    let paramsChanges = { ...params, sort: 'id', sort_type: 'desc' }
    if (event[0]) {
      paramsChanges = { ...params, sort: event[0].field, sort_type: event[0].sort }
    }
    setParams(paramsChanges)
    loadData(paramsChanges)
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
    // console.log('test')
    dispatch(showLoading())
    kategoririsiko.delete(item.pid).then(response => {
      dispatch(hideLoading())
      setDeleteDialogOpen(false)
      if (response?.status === 200) {
        toast.success('Data berhasil di hapus.', styleToast)
        loadData(params)
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0,

      // minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'right' }}>
          <OptionActions
            item={row}
            deleteData={() => {
              handleDeleteData(row)
            }}
            viewData={() => {
              handleViewData(row)
            }}
          />
        </Box>
      )
    }
  ]

  return (
    <>
      <Card>
        <TableHeader value={params.search} handleFilter={handleFilter} />
        <DataGrid
          pagination
          paginationMode='server'
          rowCount={pagination.total}
          autoHeight
          rows={pagination.data || []}
          columns={columns}
          disableColumnFilter
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          paginationModel={{
            page: params.page - 1,
            pageSize: params.per_page
          }}
          onPaginationModelChange={onChangePagination}
          onSortModelChange={onChangeSorting}
          sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
        />
      </Card>

      <DialogDelete
        handleDialogToggle={handleDialogToggle}
        deleteDialogOpen={deleteDialogOpen}
        handleDialogDelete={handleDialogDelete}
      />

      <DialogView
        handleDialogToggle={handleDialogToggleView}
        dialogOpen={viewDialogOpen}
        item={item}
        items={[
          {
            type: 'text',
            field: 'kode',
            label: 'Kode'
          },
          {
            type: 'text',
            field: 'nama',
            label: 'Nama'
          },
          {
            type: 'text',
            field: 'nama_klp',
            label: 'Nama'
          }
        ]}
      />
    </>
  )
}

export default Table

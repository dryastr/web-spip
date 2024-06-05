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
import Chip from '@mui/material/Chip'

// ** Custom Components Imports
import TableHeader from 'src/views/referensi/klp/TableHeader'
import OptionActions from 'src/views/referensi/klp/components/OptionActions'
import ItemAvatar from 'src/views/referensi/klp/components/ItemAvatar'
import DialogDelete from 'src/@core/components/dialog/delete'
import DialogView from 'src/@core/components/dialog/view'

// ** Services
import referensiServices from 'src/services/referensi-services'
import moment from 'moment'

// ** Component
import toast from 'react-hot-toast'

const defaultColumns = [
  {
    flex: 0.5,
    minWidth: 280,
    field: 'nama',
    headerName: 'Nama',
    renderCell: ({ row }) => (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ItemAvatar row={row} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.nama}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.kode}
            </Typography>
          </Box>
        </Box>
      </>
    )
  },
  {
    flex: 0.05,
    field: 'nama_pendek',
    minWidth: 150,
    headerName: 'Nama Pendek',
    renderCell: ({ row }) => <Typography fontSize={14}>{row.nama_pendek}</Typography>
  },
  {
    flex: 0.05,
    field: 'level',
    minWidth: 150,
    headerName: 'Level',
    renderCell: ({ row }) => (
      <>
        {row.level === 'PUSAT' ? (
          <Chip label='PUSAT' style={{backgroundColor: 'rgb(35 44 255)', color: '#FFFF'}} size='small' />
        ) : (
          <Chip label='NON PUSAT' color='secondary' size='small' />
        )}
      </>
    )
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: 'created_at',
    headerName: 'Created Date',
    renderCell: ({ row }) => (
      <Typography variant='body2'>{moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: 'updated_by_name',
    headerName: 'Updated By',
    renderCell: ({ row }) => <Typography variant='body2'>{row.updated_by_name}</Typography>
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
  const [isLoading, setIsLoading] = useState(false)
  
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
    setIsLoading(true);
    setParams(params)
    referensiServices.getPaginationKlp(params).then(response => {
      setPagination(response)
      setIsLoading(false);
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

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
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
          loading={isLoading}
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
            field: 'nama_pendek',
            label: 'Nama Singkat'
          },
          {
            type: 'text',
            field: 'nama',
            label: 'Nama'
          },
          {
            type: 'text',
            field: 'jenis_description',
            label: 'Jenis'
          },
          {
            type: 'text',
            field: 'level_description',
            label: 'Level'
          },
          {
            type: 'image',
            field: 'logo_url',
            label: 'Logo'
          },
          {
            type: 'text',
            field: 'pimpinan',
            label: 'Pimpinan'
          },
          {
            type: 'text',
            field: 'jabatan_pimpinan',
            label: 'Jabatan Pimpinan'
          },
          {
            type: 'text',
            field: 'no_telp',
            label: 'Nomor Telpon'
          },
          {
            type: 'text',
            field: 'website',
            label: 'Website'
          },
          {
            type: 'text',
            field: 'fax',
            label: 'Fax'
          },
          {
            type: 'text',
            field: 'alamat',
            label: 'Alamat'
          }
        ]}
      />
    </>
  )
}

export default Table

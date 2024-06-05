// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'
import { showLoading, hideLoading } from 'src/store/loadingSlice'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

// ** Custom Components Imports
import TableHeader from 'src/views/transaction/penilaian/TableHeader'
import OptionActions from 'src/views/transaction/penilaian/components/OptionActions'
import DialogDelete from 'src/@core/components/dialog/delete'
import DialogView from 'src/@core/components/dialog/view'

// ** Services
import penilaianService from 'src/services/penilaian-services'
import moment from 'moment'

// ** Component
import toast from 'react-hot-toast'
import { Link } from '@mui/material'

const defaultColumns = [
  // {
  //   flex: 0.5,
  //   minWidth: 280,
  //   field: 'website',
  //   headerName: 'Website',
  //   renderCell: ({ row }) => (
  //     <>
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //           <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
  //             {row.klp.website ? (
  //               <Link href={row.klp.website} target='_blank' rel='noopener noreferrer'>
  //                 {row.klp.website}
  //               </Link>
  //             ) : (
  //               "Tidak ada website"
  //             )}
  //           </Typography>
  //           <Typography noWrap variant='caption'>
  //             {row.klp.kode}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     </>
  //   )
  // },
  {
    flex: 0.05,
    field: 'tahun',
    minWidth: 150,
    headerName: 'Tahun',
    renderCell: ({ row }) =>
      <Typography fontSize={14} >
        {row.tahun}
      </Typography>
  },
  {
    flex: 0.3,
    field: 'anggaran',
    minWidth: 150,
    headerName: 'Anggaran',
    renderCell: ({ row }) => <Typography fontSize={14}>{row.anggaran_rupiah}</Typography>
  },
  {
    flex: 0.2,
    field: 'info',
    minWidth: 150,
    headerName: 'info',
    renderCell: ({ row }) => <Typography fontSize={14}>{row.asal_data}</Typography>
  },
  {
    flex: 0.3,
    field: 'status',
    minWidth: 150,
    headerName: 'Status',
    renderCell: ({ row }) => (
      <>
        {row.status === 'draft' && (
          <Tooltip title={row.status_description || ''}>
            <Chip label={row.status_description} color='secondary' />
          </Tooltip>
        )}
        {row.status === 'preparation' && (
          <Tooltip title={row.status_description || ''}>
            <Chip label={row.status_description} color='warning' />
          </Tooltip>
        )}
        {row.status === 'open-self-assessment' && (
          <Tooltip title={row.status_description || ''}>
            <Chip label={row.status_description} color='primary' />
          </Tooltip>
        )}
        {row.status === 'open-verification-assessment' && (
          <Tooltip title={row.status_description || ''}>
            <Chip label={row.status_description} color='info' />
          </Tooltip>
        )}
        {row.status === 'final' && (
          <Tooltip title={row.status_description || ''}>
            <Chip label={row.status_description} color='success' />
          </Tooltip>
        )}
      </>
    )
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

  const loadData = async (params) => {
    setIsLoading(true);
    try {
      const response = await penilaianService.getPagination(params);
      if (response && response.data) {
        const sortedData = response.data.sort((a, b) => b.tahun - a.tahun);
        setPagination({ ...response, data: sortedData });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    dispatch(showLoading());
    penilaianService.delete(item.id).then(response => {
      dispatch(hideLoading());
      setDeleteDialogOpen(false);

      if (response?.status === 200) {
        setPagination(prevPagination => ({
          ...prevPagination,
          data: prevPagination.data.filter(row => row.id !== item.id)
        }));

        toast.success('Data berhasil dihapus.', styleToast);
      } else {
        toast.error('Data gagal dihapus.', styleToastError);
      }
    });
  };

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',

      // style: {},
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
            field: 'website',
            label: 'Website'
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

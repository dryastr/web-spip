import {
  Box,
  Chip,
  CircularProgress,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled
} from '@mui/material'
import OptionActions from './OptionActions'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

const CTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const LinearProgressWithLabel = props => {
  let values = Math.round(props.value)

  const color = v => {
    console.log(v)
    if (v < 60) {
      return 'error'
    } else if (v < 75) {
      return 'warning'
    } else if (v < 85) {
      return 'primary'
    } else {
      return 'success'
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' color={color(values)} {...props} />
      </Box>
      <Box sx={{ minWidth: 60 }}>
        <Typography variant='body2' color='text.secondary'>
          <Chip label={`${values}%`} color={color(values)} />
        </Typography>
      </Box>
    </Box>
  )
}

const TableData = props => {
  const state = useSelector(state => state.dataOpiniSlice)
  const { status, total, data, per_page, page } = state

  const { handleChangePage, handleChangeRowsPerPage, editData, viewData, deleteData } = props

  return (
    <Fragment>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
                <TableCell>No</TableCell>
                <TableCell>Tahun</TableCell>
                <TableCell>Opini</TableCell>
                <TableCell>Persentase BMN</TableCell>
                <TableCell align='right' sx={{ whiteSpace: 'nowrap' }} width={10}>
                  Tindakan
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === 'loading' ? (
                <>
                  <CTableRow hover sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(4)} !important` } }}>
                    <TableCell colSpan={5} align='center'>
                      <CircularProgress />
                    </TableCell>
                  </CTableRow>
                </>
              ) : (
                <>
                  {total > 0 ? (
                    data.map((i, k) => {
                      return (
                        <CTableRow
                          key={k}
                          hover
                          sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(1)} !important` } }}
                        >
                          <TableCell width={'5%'}>
                            <Typography variant='body2'>{k + 1}</Typography>
                          </TableCell>
                          <TableCell width={'10%'}>
                            <Typography variant='body2'>{i.tahun}</Typography>
                          </TableCell>
                          <TableCell width={'45%'}>
                            <Typography variant='body2'>{i.opini}</Typography>
                          </TableCell>
                          <TableCell width={'30%'}>
                            <Typography variant='body2'>
                              {/* {i.persentase_bmn}% */}
                              <LinearProgressWithLabel value={i.persentase_bmn} />
                            </Typography>
                          </TableCell>
                          <TableCell width={'10%'} align='center'>
                            <OptionActions
                              deleteData={() => deleteData(i)}
                              editData={() => editData(i)}
                              viewData={() => viewData(i)}
                            />
                          </TableCell>
                        </CTableRow>
                      )
                    })
                  ) : (
                    <>
                      <CTableRow
                        hover
                        sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(4)} !important` } }}
                      >
                        <TableCell colSpan={5} align='center'>
                          <Typography variant='body2'>Tidak ada data.</Typography>
                        </TableCell>
                      </CTableRow>
                    </>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <TablePagination
          sx={{
            '& .MuiTablePagination-spacer': {
              flex: 1
            }
          }}
          component='div'
          count={total || 0}
          rowsPerPage={per_page}
          page={page - 1}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
            <Pagination
              page={page}
              shape='rounded'
              component='div'
              count={Math.ceil((total || 0) / per_page)}
              defaultPage={1}
              boundaryCount={2}
              onChange={handleChangePage}
            />
          )}
        />
      </Box>
    </Fragment>
  )
}

export default TableData

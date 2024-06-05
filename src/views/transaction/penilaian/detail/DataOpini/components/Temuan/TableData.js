import {
  Box,
  CircularProgress,
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

const TableData = props => {
  const state = useSelector(state => state.penilaianTemuanSlice)
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
                <TableCell>Temuan</TableCell>
                <TableCell align='right' sx={{ whiteSpace: 'nowrap' }} width={10}>
                  Tindakan
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === 'loading' ? (
                <>
                  <CTableRow hover sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(4)} !important` } }}>
                    <TableCell colSpan={3} align='center'>
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
                          <TableCell>
                            <Typography variant='body2'>{k + 1}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='body2'>{i.temuan}</Typography>
                          </TableCell>
                          <TableCell>
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
                        <TableCell colSpan={3} align='center'>
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

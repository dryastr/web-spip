
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

const FormDaftarOpd = () => {

  return (
    <>
      <Card>
        <CardHeader
          title='Daftar OPD'
          titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        />

        <CardContent sx={{ pb: theme => `${theme.spacing(1.75)} !important` }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` },
                  '&:last-of-type td': { border: 0, pb: 0 },
                    '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` },
                    '& .MuiTableCell-root': {
                      '&:last-of-type': { pr: 0 },
                      '&:first-of-type': { pl: '0 !important' },
                      py: theme => `${theme.spacing(2.75)} !important`
                    }
                }}>
                  <TableCell>Kode</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell align='right'>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    '&:last-of-type td': { border: 0, pb: 0 },
                    '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` },
                    '& .MuiTableCell-root': {
                      '&:last-of-type': { pr: 0 },
                      '&:first-of-type': { pl: '0 !important' },
                      py: theme => `${theme.spacing(2.75)} !important`
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.875rem' }}>001</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Jawa Barat</Typography>
                  </TableCell>
                  <TableCell align='left' width={100}>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={'Siap'}
                      color={'primary'}
                      sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    '&:last-of-type td': { border: 0, pb: 0 },
                    '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` },
                    '& .MuiTableCell-root': {
                      '&:last-of-type': { pr: 0 },
                      '&:first-of-type': { pl: '0 !important' },
                      py: theme => `${theme.spacing(2.75)} !important`
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.875rem' }}>002</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Jawa Tengah</Typography>
                  </TableCell>
                  <TableCell align='left' width={100}>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={'Belum Siap'}
                      color={'warning'}
                      sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    '&:last-of-type td': { border: 0, pb: 0 },
                    '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` },
                    '& .MuiTableCell-root': {
                      '&:last-of-type': { pr: 0 },
                      '&:first-of-type': { pl: '0 !important' },
                      py: theme => `${theme.spacing(2.75)} !important`
                    }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '0.875rem' }}>003</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align='left'>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Jawa Timur</Typography>
                  </TableCell>
                  <TableCell align='left' width={100}>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={'Belum Siap'}
                      color={'warning'}
                      sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  )
}

export default FormDaftarOpd

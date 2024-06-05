import React, { useState } from 'react'

// ** MUI Imports
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component
import OptionActions from './OptionActions'
import BtnCheck from './BtnCheck'

const Item = ({ item, handleAddSasaran, handleDeleteSasaran, handleEditSasaran, handleIndikatorSasaran }) => {
  const [expanded, setExpanded] = useState(true)

  const handleExpanded = () => {
    setExpanded(!expanded)
  }

  const handleIndikator = data => {
    handleIndikatorSasaran(data)
  }

  return (
    <>
      <TableRow
        hover
        sx={{
          '& .MuiTableCell-root': {
            border: 0,
            py: theme => `${theme.spacing(2)} !important`
          }
        }}
      >
        <TableCell valign='center'>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Icon
              icon={expanded ? 'mdi:collapse-all' : 'mdi:expand-all'}
              style={{ cursor: 'pointer' }}
              onClick={handleExpanded}
            />
            <Typography variant='body2' sx={{ ml: 2 }}>
              {item.kode}
            </Typography>
          </Box>
        </TableCell>
        <TableCell valign='center'>
          <Box
            sx={{
              display: 'flex',
              alignItemChilds: 'center',
              justifyContent: 'space-between',
              verticalAlign: 'center'
            }}
          >
            <Typography variant='body2' sx={{ paddingTop: 1 }}>
              {item.nama}
            </Typography>
            <Button
              variant='outlined'
              size='small'
              onClick={() => {
                handleIndikator(item)
              }}
            >
              Indikator
            </Button>
          </Box>
        </TableCell>

        <TableCell align='center'>
          <Typography variant='body2' sx={{ paddingTop: 1 }}>
            {item.jenis_sasaran.nama}
          </Typography>
        </TableCell>
        <TableCell align='center'>
          <BtnCheck type='nsa_orientasi_hasil' data={item} />
        </TableCell>
        <TableCell align='center'>
          <BtnCheck type='nsa_relevan_mandat_sa' data={item} />
        </TableCell>
        <TableCell align='center'>
          <BtnCheck type='nsa_uji_kecukupan_indikator_sa' data={item} />
        </TableCell>

        {/* <TableCell valign='center'>
          <Box sx={{ display: 'flex', alignItemChilds: 'center', justifyContent: 'space-between' }}>
            <Typography fontSize={12}>
              {item.catatan}
            </Typography>
          </Box>
        </TableCell> */}

        <TableCell align='center'>
          <OptionActions
            handleAddSasaran={handleAddSasaran}
            handleDeleteSasaran={handleDeleteSasaran}
            handleEditSasaran={handleEditSasaran}
            item={item}
          />
        </TableCell>
      </TableRow>

      {expanded && (
        <>
          {item.childrens.length > 0 &&
            item.childrens.map(itemChild => {
              return (
                <>
                  <TableRow
                    hover
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        py: theme => `${theme.spacing(2)} !important`
                      }
                    }}
                  >
                    <TableCell valign='center'>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 4 }}>
                        <Icon icon={'mdi:circle'} fontSize={10} style={{ marginTop: 5 }} />
                        <Typography variant='body2' sx={{ ml: 2 }}>
                          {itemChild.kode}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell valign='center'>
                      <Box sx={{ display: 'flex', alignItemChilds: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='body2' sx={{ paddingTop: 1 }}>
                          {itemChild.nama}
                        </Typography>
                        <Button
                          variant='outlined'
                          size='small'
                          onClick={() => {
                            handleIndikator(itemChild)
                          }}
                        >
                          Indikator
                        </Button>
                      </Box>
                    </TableCell>

                    <TableCell align='center'>
                      <Typography variant='body2' sx={{ paddingTop: 1 }}>
                        {itemChild.jenis_sasaran.nama}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <BtnCheck type='nsa_orientasi_hasil' data={itemChild} parentId={item.id} />
                    </TableCell>
                    <TableCell align='center'>
                      <BtnCheck type='nsa_relevan_mandat_sa' data={itemChild} parentId={item.id} />
                    </TableCell>
                    <TableCell align='center'>
                      <BtnCheck type='nsa_uji_kecukupan_indikator_sa' data={itemChild} parentId={item.id} />
                    </TableCell>

                    {/* <TableCell valign='center'>
                      <Box sx={{ display: 'flex', alignItemChilds: 'center', justifyContent: 'space-between' }}>
                        <Typography fontSize={12}>
                          {item.catatan}
                        </Typography>
                      </Box>
                    </TableCell> */}
                    <TableCell align='center'>
                      <OptionActions
                        isChild
                        handleAddSasaran={handleAddSasaran}
                        handleDeleteSasaran={handleDeleteSasaran}
                        handleEditSasaran={handleEditSasaran}
                        item={itemChild}
                      />
                    </TableCell>
                  </TableRow>
                </>
              )
            })}
        </>
      )}
    </>
  )
}

export default Item

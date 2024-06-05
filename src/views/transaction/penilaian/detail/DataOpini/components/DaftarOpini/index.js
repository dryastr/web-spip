import { useCallback, useEffect, useState } from 'react'

import { Button, Card, CardHeader, Divider } from '@mui/material'
import Icon from 'src/@core/components/icon'
import TableHeader from './TableHeader'

import TableData from './TableData'
import FormData from './FormData'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DialogDelete from 'src/@core/components/dialog/delete'
import DialogView from 'src/@core/components/dialog/view'
import { useDispatch } from 'react-redux'
import { getData } from 'src/store/pages/penilaian/dataOpiniSlice'
import toast from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { hideLoading, showLoading } from 'src/store/loadingSlice'
import dataOpiniService from 'src/services/data-opini-service'

const schema = yup.object().shape({
  tahun: yup.string().required().label('Tahun'),
  opini: yup.string().required().label('Opini'),
  persentase_bmn: yup.number().required().label('Persentase BMN')
})

const defaultValues = {
  tahun: '',
  opini: '',
  persentase_bmn: 0
}

const DaftarOpini = props => {
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

  const dispatch = useDispatch()
  const { penilaianId } = props

  const initialParams = {
    search: '',
    sort: '',
    sort_type: '',
    page: 1,
    per_page: 10,
    penilaian: penilaianId
  }
  const [params, setParams] = useState(initialParams)
  const [item, setItem] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [formDataOpen, setFormDataOpen] = useState(false)
  const [form, setForm] = useState('add')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const loadData = useCallback(() => {
    dispatch(getData(params))
  }, [dispatch, params])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleFilter = useCallback(
    filterParams => {
      const paramsChanges = { ...params, ...filterParams }
      setParams(paramsChanges)
    },
    [params]
  )

  const handleChangePage = (event, page) => {
    const paramsChanges = { ...params, page }
    setParams(paramsChanges)
  }

  const handleChangeRowsPerPage = event => {
    const paramsChanges = { ...params, per_page: event.target.value }
    setParams(paramsChanges)
  }

  const handleDeleteData = item => {
    setItem(item)
    setDeleteDialogOpen(true)
  }

  const handleViewData = item => {
    setItem(item)
    setViewDialogOpen(true)
  }

  const handleDialogToggleView = () => {
    setItem({})
    setViewDialogOpen(false)
  }

  const handleFormData = (item, form) => {
    setFormDataOpen(true)
    setForm(form)
    reset(item)
  }

  const handleFormDataClose = () => {
    setFormDataOpen(false)
    setForm('add')
    reset(defaultValues)
  }

  const handleDialogToggle = () => setDeleteDialogOpen(!deleteDialogOpen)

  const onSubmit = async data => {
    dispatch(showLoading())
    data.trans_penilaian_id = penilaianId
    let action = null
    if (form === 'add') {
      action = dataOpiniService.store(data)
    } else {
      let newData = {
        trans_penilaian_id: data.trans_penilaian_id,
        tahun: data.tahun,
        opini: data.opini,
        persentase_bmn: data.persentase_bmn
      }
      action = dataOpiniService.update(data.id, newData)
    }

    action.then(response => {
      dispatch(hideLoading())
      if (response?.status === 200) {
        handleFormDataClose()
        toast.success('Data Opini berhasil disimpan.', styleToast)
      } else {
        toast.error('Data Opini gagal disimpan.', styleToastError)
      }
      loadData()
    })
  }

  const handleDialogDelete = () => {
    dispatch(showLoading())
    dataOpiniService.delete(item.id).then(response => {
      dispatch(hideLoading())
      setDeleteDialogOpen(false)
      setItem({})
      if (response?.status === 200) {
        loadData(params)
        toast.success('Data berhasil di hapus.', styleToast)
      } else {
        toast.error('Data gagal dihapus..', styleToastError)
      }
    })
  }

  return (
    <Card>
      <CardHeader
        title='Daftar Opini'
        action={
          <Button
            variant='contained'
            startIcon={<Icon icon='mdi:add' />}
            onClick={() => handleFormData(defaultValues, 'add')}
          >
            Tambah
          </Button>
        }
      />
      <Divider />

      <TableHeader value={params.search} handleFilter={handleFilter} />
      <TableData
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        editData={item => handleFormData(item, 'edit')}
        deleteData={item => handleDeleteData(item)}
        viewData={item => handleViewData(item)}
      />

      <FormData
        open={formDataOpen}
        handleClose={handleFormDataClose}
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        form={form}
      />

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
            field: 'tahun',
            label: 'Tahun'
          },
          {
            type: 'text',
            field: 'opini',
            label: 'Opini'
          },
          {
            type: 'text',
            field: 'persentase_bmn',
            label: 'Persentase BMN'
          }
        ]}
      />
    </Card>
  )
}

export default DaftarOpini

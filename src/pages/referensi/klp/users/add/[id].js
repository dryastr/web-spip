// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Redux
import { useDispatch } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { DataGrid } from '@mui/x-data-grid'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'

const KlpUserAdd = () => {
  const router = useRouter()
  const { id } = router.query

  // ** Redux
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setBreadCrumb({
        parent: [
          {
            link: '/',
            label: 'Home'
          },
          {
            link: '/referensi/klp/user',
            label: 'Unit K/L/P User'
          }
        ],
        title: 'Tambah'
      })
    )
  }, [dispatch])

  // ** State
  return (
    <>
      Tambah User KLP
      <div>
        <h1>Edit User</h1>
        <p>id: {id}</p>
        {/* Komponen untuk mengedit pengguna */}
      </div>
    </>
  )
}

export default KlpUserAdd

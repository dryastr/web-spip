// ** Third Party Imports
import axios from 'axios'

// ** MUI Imports
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBreadCrumb } from 'src/store/breadCrumbSlice'

// ** Next Import
import { useRouter } from 'next/router'
import Link from 'next/link'

// ** Demo Components Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import KlpViewPage from 'src/views/users/klp/KlpViewPage'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const KlpView = () => {
  const router = useRouter()
  const { id, tab } = router.query
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
            link: '/kl',
            label: 'Kementerian / Lembaga / Pemda'
          }
        ],
        title: 'Pengguna dan Organisasi'
      })
    )
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              Pengguna dan Organisasi K/L/P
            </LinkStyled>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            Management pengguna dan organisasi Kementerian Lembaga dan Pemerintah Daerah
          </Typography>
        }
      />
      <Grid item xs={12}>
        <KlpViewPage tab={tab} id={id} invoiceData={null} />
      </Grid>
    </Grid>
  )
}

export default KlpView

import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import KlpViewLeft from './KlpViewLeft'
import KlpViewRight from './KlpViewRight'
import referensiServices from 'src/services/referensi-services'

const KlpView = ({ tab, id, invoiceData }) => {
  const dispatch = useDispatch()
  const [rows, setRows] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [params, setParams] = useState({
    search: '',
    page: 1,
    per_page: 10,
    sort: 'id',
    sort_type: 'asc'
  })

  useEffect(() => {
    loadData(id, params)
  }, [dispatch])

  function loadData(id, paramsChanges) {
    setIsLoading(true)
    referensiServices.getKlpUserList(id, paramsChanges).then(response => {
      if (response) {
        console.log(response)
        setRows(response || {})

        // setRowsTotal(response?.total)
      }

      setIsLoading(false)
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        {!isLoading ? <KlpViewLeft data={rows} /> : null}
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        {!isLoading ? <KlpViewRight tab={tab} id={id} rows={rows} /> : null}
      </Grid>
    </Grid>
  )
}

export default KlpView

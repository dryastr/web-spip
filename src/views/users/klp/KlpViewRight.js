// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab'
import MuiTabList from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import KlpViewList from 'src/views/users/klp/KlpViewList'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const KlpViewRight = ({ tab, id, rows }) => {
  // ** State
  const [activeTab, setActiveTab] = useState(tab)
  const [isLoading, setIsLoading] = useState(true)

  // ** Hooks
  const router = useRouter()

  const handleChange = (event, value, id) => {
    setIsLoading(true)
    setActiveTab(value)
    router
      .push({
        pathname: `/referensi/klp/users/${value.toLowerCase()}/${id}/`
      })
      .then(() => setIsLoading(false))
  }
  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])
  useEffect(() => {
    if (rows) {
      console.log(rows)
      setIsLoading(false)
    }
  }, [rows])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='fullWidth'
        scrollButtons='false'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value='list'
          id={id}
          label='Daftar Pengguna'
          icon={<Icon fontSize='1.125rem' icon='tabler:user-check' />}
        />
        <Tab value='organisasi' id={id} label='Organisasi' icon={<Icon fontSize='1.125rem' icon='tabler:lock' />} />
      </TabList>
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value='list'>
              <KlpViewList rows={rows?.users} />
            </TabPanel>
            {/* <TabPanel sx={{ p: 0 }} value='security'>
              <KlpViewSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='billing-plan'>
              <KlpViewBilling />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='notification'>
              <KlpViewNotification />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='connection'>
              <KlpViewConnection />
            </TabPanel> */}
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default KlpViewRight

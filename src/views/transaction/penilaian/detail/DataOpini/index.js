import { Fragment, useState } from 'react'
import { TabContext, TabList } from '@mui/lab'
import { Paper, Tab, styled, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'

import DaftarOpini from './components/DaftarOpini'
import Temuan from './components/Temuan'
import { useRouter } from 'next/router'

const CTabList = styled(TabList)(({ theme }) => ({
  width: '100%',
  borderRight: 0,
  marginBottom: '15px',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTabs-flexContainer': {
    marginBottom: '25px'
  },
  '& .Mui-selected': {
    backgroundColor: `${theme.palette.primary.main} !important`,
    position: 'relative',
    overflow: 'unset',
    color: `${theme.palette.common.white} !important`,
    borderBottom: `solid 1px ${theme.palette.primary.main}`
  },
  '& .Mui-selected::before': {
    content: '""',
    position: 'absolute',
    borderTop: `solid 10px ${theme.palette.primary.main}`,
    borderLeft: 'solid 18px transparent',
    borderRight: 'solid 18px transparent',
    width: '0',
    height: '0',
    bottom: '-10px',
    zIndex: '10'
  },
  '& .MuiTab-root': {
    fontSize: '12px',
    minHeight: 38,
    minWidth: 110,
    borderRadius: '10px 10px 0 0',
    borderBottom: 'solid 1px',
    backgroundColor: 'rgba(76, 78, 100, 0.08)',
    color: 'rgba(76, 78, 100, 0.87)',
    margin: theme.spacing(1, 0.2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1)
}))

const DataOpini = props => {
  const [activeTab, setActiveTab] = useState(1)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const router = useRouter()
  const queryData = router.query
  const penilaianId = queryData.id

  const tabs = [
    {
      value: 1,
      label: 'Daftar Opini',
      title: (
        <Fragment>
          Daftar <br /> Opini
        </Fragment>
      ),
      icon: 'fluent:people-chat-16-filled'
    },
    {
      value: 2,
      label: 'Temuan BPK atas Keandalan LK',
      title: (
        <Fragment>
          Temuan BPK <br /> atas Keandalan LK
        </Fragment>
      ),
      icon: 'fluent:people-chat-16-filled',
      code: 'bpk-atas-keandalan-lk'
    },
    {
      value: 3,
      label: 'Temuan Administrasi Aset',
      title: (
        <Fragment>
          Temuan <br /> Administrasi Aset
        </Fragment>
      ),
      icon: 'fluent:people-chat-16-filled',
      code: 'administrasi-aset'
    },
    {
      value: 4,
      label: 'Temuan Kepemilikan Aset',
      title: (
        <Fragment>
          Temuan <br /> Kepemilikan Aset
        </Fragment>
      ),
      icon: 'fluent:people-chat-16-filled',
      code: 'kepemilikan-aset'
    },
    {
      value: 5,
      label: 'Temuan BPK atas Ketidakpatuhan',
      title: (
        <Fragment>
          Temuan BPK <br /> atas Ketidakpatuhan
        </Fragment>
      ),
      icon: 'fluent:people-chat-16-filled',
      code: 'bpk-atas-ketidakpatuhan'
    },
    {
      value: 6,
      label: 'Keterjadian Tipikor',
      title: (
        <Fragment>
          Keterjadian <br /> Tipikor
        </Fragment>
      ),
      icon: 'fluent:people-chat-16-filled',
      code: 'keterjadian-tipikor'
    }
  ]

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <Item>
      <TabContext value={activeTab}>
        <CTabList variant='fullWidth' scrollButtons='auto' onChange={handleChange}>
          {tabs.map((item, i) => {
            return (
              <Tab
                key={i}
                value={item.value}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                    {!hideText && item.title}
                  </Box>
                }
              />
            )
          })}
        </CTabList>
      </TabContext>
      {activeTab === 1 && <DaftarOpini penilaianId={penilaianId} />}
      {activeTab === 2 && <Temuan penilaianId={penilaianId} data={tabs.find(f => f.value === 2)} />}
      {activeTab === 3 && <Temuan penilaianId={penilaianId} data={tabs.find(f => f.value === 3)} />}
      {activeTab === 4 && <Temuan penilaianId={penilaianId} data={tabs.find(f => f.value === 4)} />}
      {activeTab === 5 && <Temuan penilaianId={penilaianId} data={tabs.find(f => f.value === 5)} />}
      {activeTab === 6 && <Temuan penilaianId={penilaianId} data={tabs.find(f => f.value === 6)} />}
    </Item>
  )
}

export default DataOpini

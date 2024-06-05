// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box } from '@mui/system'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component
import ProgramComponent from './components/Program'
import SasaranProgram from './components/SasaranProgram'

const Program = () => {
  const [activeTab, setActiveTab] = useState(1)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const tabs = [
    {
      value: 1,
      label: 'Sasaran Program',
      icon: 'mdi:target'
    },
    {
      value: 2,
      label: 'Program',
      icon: 'mdi:laptop'
    },
  ]

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <>
      <Card>
        <TabContext value={activeTab}>
          <TabList
            variant='fullWidth'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='customized tabs example'
          >
            {tabs.map((item, i) => {
              return (
                <Tab
                  key={i}
                  value={item.value}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                      <Icon fontSize='1.125rem' icon={item.icon} />
                      {!hideText && item.label}
                    </Box>
                  }
                />
              )
            })}
          </TabList>
        </TabContext>

        {
          activeTab === 1 && (
            <SasaranProgram />
          )
        }

        {
          activeTab === 2 && (
            <ProgramComponent />
          )
        }
      </Card>
    </>
  )
}

export default Program

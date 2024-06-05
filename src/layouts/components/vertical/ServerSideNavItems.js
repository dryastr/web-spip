// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'src/services/config'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {
    axios.get('/api/v1/menu/me').then(response => {
      const menuArray = response.data.data
      setMenuItems(menuArray)
    })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems

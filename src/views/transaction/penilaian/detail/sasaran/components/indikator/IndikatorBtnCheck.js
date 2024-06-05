import { Fragment, useState } from 'react'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import sasaranIndikatorService from 'src/services/sasaran-indikator-service'

const IndikatorBtnCheck = props => {
  const { type, data, changeData } = props

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)

    let newData = {
      nsa_indikator_kinerja_tepat: data.nsa_indikator_kinerja_tepat,
      nsa_target_kinerja_tepat: data.nsa_target_kinerja_tepat
    }
    newData[type] = !data[type]

    sasaranIndikatorService.updateCheckList(data.id, newData).then(res => {
      changeData({
        ...data,
        ...newData
      })
      setLoading(false)
    })
  }

  return (
    <Fragment>
      <IconButton onClick={handleClick} disabled={loading}>
        {loading ? (
          <Icon icon='eos-icons:bubble-loading' color={'#09a6eb'} />
        ) : data[type] ? (
          <Icon icon='mdi:check-circle' color={'green'} />
        ) : (
          <Icon icon='mdi:close-box' color={'red'} />
        )}
      </IconButton>
    </Fragment>
  )
}

export default IndikatorBtnCheck

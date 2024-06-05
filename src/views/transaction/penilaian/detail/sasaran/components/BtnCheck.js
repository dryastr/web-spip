import { Fragment, useState } from 'react'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import { updateChecklist } from 'src/store/pages/penilaian/sasaranSlice'

const BtnCheck = props => {
  const { type, data, parentId } = props

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    let newData = {
      nsa_orientasi_hasil: data.nsa_orientasi_hasil,
      nsa_relevan_mandat_sa: data.nsa_relevan_mandat_sa,
      nsa_uji_kecukupan_indikator_sa: data.nsa_uji_kecukupan_indikator_sa
    }

    dispatch(updateChecklist(data.id, { ...newData, [type]: !data[type] }, setLoading, parentId))
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

export default BtnCheck

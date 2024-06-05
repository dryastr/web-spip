import axios from './config'

const referensiServices = {}

referensiServices.getListKlp = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/ref/klp/list', { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

referensiServices.getListLokasi = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/ref/lokasi/list', { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

referensiServices.getPaginationKlp = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/ref/klp', { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

referensiServices.deleteKlp = async (id = null) => {
  try {
    const response = await axios.delete('/api/v1/ref/klp/' + id)

    return response
  } catch (e) {
    return {}
  }
}

referensiServices.storeKlp = async body => {
  try {
    const response = await axios.post('/api/v1/ref/klp', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  } catch (e) {
    return e.response
  }
}

referensiServices.updateKlp = async (id, body) => {
  try {
    const response = await axios.put('/api/v1/ref/klp/' + id, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  } catch (e) {
    return e.response
  }
}

referensiServices.showKlp = async (id = null) => {
  try {
    const response = await axios.get('/api/v1/ref/klp/' + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

referensiServices.getKlpUserList = async (id = null) => {
  try {
    const response = await axios.get('/api/v1/ref/klp/user/' + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

referensiServices.getListJenisSasaran = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/ref/jenis-sasaran/list', { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

export default referensiServices

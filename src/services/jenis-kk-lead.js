import axios from './config'

const jenisKkLead = {}

jenisKkLead.getJenis = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/ref/jenis-leadspip/', { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

jenisKkLead.delete = async (id = null) => {
  try {
    const response = await axios.delete('/api/v1/ref/jenis-leadspip/' + id)

    return response
  } catch (e) {
    return {}
  }
}

jenisKkLead.store = async body => {
  try {
    const response = await axios.post('/api/v1/ref/jenis-leadspip', body)

    return response
  } catch (e) {
    return e.response
  }
}

jenisKkLead.update = async (id, body) => {
  try {
    const response = await axios.put('/api/v1/ref/jenis-leadspip/' + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

jenisKkLead.show = async (id = null) => {
  try {
    const response = await axios.get('/api/v1/ref/jenis-leadspip/' + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

jenisKkLead.list = async () => {
  try {
    const response = await axios.get('/api/v1/ref/jenis-leadspip/list')

    return response.data.data
  } catch (e) {
    return {}
  }
}

export default jenisKkLead

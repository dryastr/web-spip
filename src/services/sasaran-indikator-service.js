import axios from './config'

// const visiMisiService = {}
const sasaranIndikatorService = {}
const URL = '/api/v1/trans/penilaian/sasaran-indikator'

sasaranIndikatorService.list = async (params = {}) => {
  try {
    const response = await axios.get(`${URL}/list`, { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

sasaranIndikatorService.getPagination = async (params = {}) => {
  try {
    const response = await axios.get(`${URL}`, { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranIndikatorService.store = async body => {
  try {
    const response = await axios.post(URL, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranIndikatorService.update = async (id, body) => {
  try {
    const response = await axios.put(`${URL}/${id}`, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranIndikatorService.updateCheckList = async (id, body) => {
  try {
    const response = await axios.put(`${URL}/update-checklist/` + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranIndikatorService.show = async (id = null) => {
  try {
    const response = await axios.get(`${URL}/${id}`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranIndikatorService.delete = async (id = null) => {
  try {
    const response = await axios.delete(`${URL}/${id}`)

    return response
  } catch (e) {
    return {}
  }
}

export default sasaranIndikatorService

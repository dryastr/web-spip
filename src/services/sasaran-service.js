import axios from './config'

// const visiMisiService = {}
const sasaranService = {}
const URL = '/api/v1/trans/penilaian/sasaran'

sasaranService.get = async (params = null) => {
  try {
    const response = await axios.get(`${URL}`, { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranService.getAll = async (params = null) => {
  try {
    const response = await axios.get(`${URL}/${params}/all`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranService.getByPenilaian = async (parent = null) => {
  try {
    const response = await axios.get(`/api/v1/trans/sasaran/parent/${parent}`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranService.store = async body => {
  try {
    const response = await axios.post(`${URL}`, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranService.update = async (id, body) => {
  try {
    const response = await axios.put(`${URL}/` + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranService.updateCheckList = async (id, body) => {
  try {
    const response = await axios.put(`${URL}/update-checklist/` + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranService.show = async (id = null) => {
  try {
    const response = await axios.get(`${URL}/` + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranService.delete = async (id = null) => {
  try {
    const response = await axios.delete(`${URL}/` + id)

    return response
  } catch (e) {
    return {}
  }
}

sasaranService.list = async (params = {}) => {
  try {
    const response = await axios.get(`${URL}/list`, { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

export default sasaranService

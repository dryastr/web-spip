import axios from './config'

const programService = {}
const URL = '/api/v1/trans/penilaian/program'
programService.get = async (params = null) => {
  try {
    const response = await axios.get(`${URL}`, { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

programService.store = async body => {
  try {
    const response = await axios.post(URL, body)

    return response
  } catch (e) {
    return e.response
  }
}

programService.update = async (id, body) => {
  try {
    const response = await axios.put(`${URL}/${id}`, body)

    return response
  } catch (e) {
    return e.response
  }
}

programService.show = async (id = null) => {
  try {
    const response = await axios.get(`${URL}/${id}`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

programService.delete = async (id = null) => {
  try {
    const response = await axios.delete(`${URL}/${id}`)

    return response
  } catch (e) {
    return {}
  }
}

programService.list = async (params = {}) => {
  try {
    const response = await axios.get(`${URL}/list`, { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

export default programService

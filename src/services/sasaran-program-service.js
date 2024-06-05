import axios from './config'

const sasaranProgramService = {}
const URL = '/api/v1/trans/penilaian/sasaran-program'
sasaranProgramService.get = async (params = null) => {
  try {
    const response = await axios.get(`${URL}`, { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranProgramService.store = async body => {
  try {
    const response = await axios.post(URL, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranProgramService.update = async (id, body) => {
  try {
    const response = await axios.put(`${URL}/${id}`, body)

    return response
  } catch (e) {
    return e.response
  }
}

sasaranProgramService.show = async (id = null) => {
  try {
    const response = await axios.get(`${URL}/${id}`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

sasaranProgramService.delete = async (id = null) => {
  try {
    const response = await axios.delete(`${URL}/${id}`)

    return response
  } catch (e) {
    return {}
  }
}

export default sasaranProgramService

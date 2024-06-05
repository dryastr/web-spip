import axios from './config'

const dataOpiniService = {}

const URL_API = '/api/v1/trans/penilaian/data-opini'

dataOpiniService.getPagination = async (params = {}) => {
  try {
    const response = await axios.get(URL_API, { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

dataOpiniService.delete = async (id = null) => {
  try {
    const response = await axios.delete(URL_API + '/' + id)

    return response
  } catch (e) {
    return {}
  }
}

dataOpiniService.store = async body => {
  try {
    const response = await axios.post(URL_API, body)

    return response
  } catch (e) {
    return e.response
  }
}

dataOpiniService.update = async (id, body) => {
  try {
    const response = await axios.put(URL_API + '/' + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

dataOpiniService.show = async (id = null) => {
  try {
    const response = await axios.get(URL_API + '/' + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

export default dataOpiniService

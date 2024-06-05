import axios from './config'

const penilaianTemuanService = {}

const URL_API = '/api/v1/trans/penilaian/penilaian-temuan'

penilaianTemuanService.getPagination = async (params = {}) => {
  try {
    const response = await axios.get(URL_API, { params })

    return response.data.data
  } catch (e) {
    return {}
  }
}

penilaianTemuanService.delete = async (id = null) => {
  try {
    const response = await axios.delete(URL_API + '/' + id)

    return response
  } catch (e) {
    return {}
  }
}

penilaianTemuanService.store = async body => {
  try {
    const response = await axios.post(URL_API, body)

    return response
  } catch (e) {
    return e.response
  }
}

penilaianTemuanService.update = async (id, body) => {
  try {
    const response = await axios.put(URL_API + '/' + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

penilaianTemuanService.show = async (id = null) => {
  try {
    const response = await axios.get(URL_API + '/' + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

export default penilaianTemuanService

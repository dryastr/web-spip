import axios from './config'

const visiMisiService = {}

visiMisiService.get = async (id = null) => {
  try {
    const response = await axios.get('/api/v1/trans/penilaian/' + id + '/visi-misi')
    return response.data.data
  } catch (e) {
    return false
  }
}

visiMisiService.store = async (id, body) => {
  try {
    const response = await axios.post('/api/v1/trans/penilaian/' + id + '/visi-misi', body)

    return response
  } catch (e) {
    return e.response
  }
}

export default visiMisiService

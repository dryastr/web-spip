import axios from './config'

const UpdateAnggaranService = {}

UpdateAnggaranService.show = async (id, body) => {
  try {
    const response = await axios.get('/api/v1/trans/penilaian/anggaran/' + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

UpdateAnggaranService.update = async (id, body) => {
  try {
    const response = await axios.put('/api/v1/trans/penilaian/anggaran/' + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

export default UpdateAnggaranService

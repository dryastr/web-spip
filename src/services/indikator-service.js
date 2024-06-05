import axios from './config'

// const visiMisiService = {}
const indikatorservice = {}

indikatorservice.get = async (params = null) => {
  try {
    const response = await axios.get(`/api/v1/trans/sasaran_indikator/${params}`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

indikatorservice.list = async (params = null) => {
  try {
    const response = await axios.get(`/api/v1/trans/sasaran_indikator/${params}/list`)

    return response.data.data
  } catch (e) {
    return {}
  }
}

indikatorservice.show = async (id = null) => {
  try {
    const response = await axios.get('/api/v1/trans/sasaran_indikator/detail/' + id)

    return response.data.data
  } catch (e) {
    return {}
  }
}

// indikatorservice.getByPenilaian = async (parent = null) => {
//   try {
//     const response = await axios.get(`/api/v1/trans/sasaran/parent/${parent}`)

//     return response.data.data
//   } catch (e) {
//     return {}
//   }
// }

indikatorservice.store = async body => {
  try {
    // const response = await axios.post('/api/v1/trans/visimisi', body)
    const response = await axios.post('/api/v1/trans/sasaran_indikator/', body)

    return response
  } catch (e) {
    return e.response
  }
}

indikatorservice.update = async (id, body) => {
  try {
    const response = await axios.put('/api/v1/trans/sasaran_indikator/' + id, body)

    return response
  } catch (e) {
    return e.response
  }
}

indikatorservice.delete = async (id = null) => {
  try {
    const response = await axios.delete('/api/v1/trans/sasaran_indikator/' + id)

    return response
  } catch (e) {
    return {}
  }
}

export default indikatorservice

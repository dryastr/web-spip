// ** Redux Imports

import axios from './config'

const userServices = {}

userServices.registration = async body => {
  try {
    const response = await axios.post('/api/v1/registration', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response
  } catch (e) {
    return e.response
  }
}

// Approval user service
userServices.getListUserApproval = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/approval/list-user', { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

userServices.approveReject = async (approveReject, id) => {
  try {
    const response = await axios.put(`/api/v1/approval/${approveReject}/${id}`)

    return response
  } catch (e) {
    return e.response
  }
}

// Count approval
userServices.getCountApproval = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/approval/count')

    return response.data.data
  } catch (e) {
    return []
  }
}

// ==========================================================
// Daftar User Pengguna
// ==========================================================

// All user
userServices.getListUserAll = async (params = {}) => {
  try {
    const response = await axios.get('/api/v1/users/list-user', { params })

    return response.data.data
  } catch (e) {
    return []
  }
}

export default userServices

import baseAxios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const axios = baseAxios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(authConfig.storageTokenKeyName)
    let userData = localStorage.getItem('userData')
    let klpId = localStorage.getItem('klp') || null
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    if (userData) {
      userData = JSON.parse(userData)
      config.headers['X-Klp-Id'] = klpId || userData.default_klp.id
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
      //todo logout the user
      localStorage.removeItem('userData')
      localStorage.removeItem('klp')
      localStorage.removeItem(authConfig.storageTokenKeyName)
      window.location = '/login'
    }

    return Promise.reject(err)
  }
)

//todo: define interceptors and other configuration like baseURL, headers etc. here
export default axios

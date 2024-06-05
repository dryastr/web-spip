export default {
  meEndpoint: '/api/v1/user',
  loginEndpoint: '/api/v1/login',
  registerEndpoint: '/api/v1/registration',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}

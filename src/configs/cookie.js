import Cookies from 'universal-cookie';
import { encryptValue, decryptValue } from './encryptor';

const cookies = new Cookies();
const cookieDefaultOptions = {
  path: '/',
  sameSite: 'strict',
};

export const setAppStorage = (key, value, options = {}) => {
  try {
    if (value) {
      const stringValue = value.toString();
      const encryptedValue = encryptValue(stringValue).toString();
      cookies.set(key, encryptedValue , { ...cookieDefaultOptions, ...options})
    }
  } catch (e) {
    console.log('error while set cookie', e);
  }
}

export const getAppStorage = (key, options = {}) => {
  const value = cookies.get(key, options);
  if (value) {
    return decryptValue(value);
  }
  return null;
}

export const removeAppStorage = (key, options = {}) => {
  cookies.remove(key, { ...cookieDefaultOptions, ...options})
}
import CryptoJS from 'crypto-js';

const SECRET = '5P1P';

export const encryptValue = (value) => {
    return CryptoJS.AES.encrypt(value, SECRET)
};

export const decryptValue = (value) => {
  const bytes = CryptoJS.AES.decrypt(value, SECRET);
  // return as string
  return bytes.toString(CryptoJS.enc.Utf8);
};

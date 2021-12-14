const CryptoJS = require("crypto-js");

let hashIt = (msg, key) => {
  return CryptoJS.AES.encrypt(msg, key).toString();
};

let reveal = (msg, key) => {
  return CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
};

let hash = (msg) => {
  return CryptoJS.SHA1(msg).toString();
};

module.exports = { hashIt, reveal, hash };

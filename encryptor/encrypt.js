const CryptoJS = require("crypto-js");

// const key = "alex";
// const message = "Hello World!";
// let ciphertext = CryptoJS.AES.encrypt(message, key).toString();
// let bytes = CryptoJS.AES.decrypt(ciphertext, key);
// let originalText = bytes.toString(CryptoJS.enc.Utf8);

// console.log(ciphertext);
// console.log(originalText);

let hashIt = (msg, key) => {
  return CryptoJS.AES.encrypt(msg, key).toString();
};

let reveal = (msg, key) => {
  return CryptoJS.AES.decrypt(msg, key).toString(CryptoJS.enc.Utf8);
};

module.exports = { hashIt, reveal };

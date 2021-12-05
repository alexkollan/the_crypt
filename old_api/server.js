var CryptoJS = require("crypto-js");

const key = "alex";
const message = "Hello World!";
let ciphertext = CryptoJS.AES.encrypt(message, key).toString();
let bytes = CryptoJS.AES.decrypt(ciphertext, key);
let originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(ciphertext);
console.log(originalText);

require("./config/db");
// require express and bodyParser
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// create express app
const app = express();
// define port to run express app
const port = process.env.PORT || 3001;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import DB Connection
require("./config/db");

// Import API route
var routes = require("./routes/apiRoutes"); //importing route
routes(app);

// Add endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Listen to server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

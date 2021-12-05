// // import Guest Model
const User = require("../models/user");
const Secret = require("../models/secret");
const encrypt = require("../encryptor/encrypt");
// // DEFINE CONTROLLER FUNCTIONS

// exports.listAllGuests = (req, res) => {
//   console.log(req);
//   Guest.find({}, (err, guest) => {
//     if (err) {
//       res.status(500).send({ code: 500, message: "Server error!" });
//     }
//     res.status(200).json(guest);
//   });
// };

// exports.findGuestById = (req, res) => {
//   console.log(req);
//   Guest.find({ _id: req.params.id }, (err, guest) => {
//     if (err) {
//       res.status(500).send({ code: 500, message: "Server error!" });
//     }
//     res.status(200).json(guest);
//   });
// };

// exports.findGuestByMail = (req, res) => {
//   console.log(req);
//   Guest.find({ email: req.params.mail }, (err, guest) => {
//     if (err) {
//       res.status(500).send({ code: 500, message: "Server error! Alex" });
//     }
//     res.status(200).json(guest);
//   });
// };
// // `[${currDate.getFullYear()}/${currDate.getMonth()}/${currDate.getDay()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}]`

let testUserData = {
  email: "kollan.alex+1@gmail.com",
  userKey: "alexSecretKey1",
  firstName: "Alex",
  lastName: "Collin",
  tags: ["admin"],
  registrationDate: new Date(),
};
exports.createNewUser = (req, res) => {
  let currDate = new Date();
  // console.log("\x1b[33m", `\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, "\x1b[34m", `\n[${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}|${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}]`, "\x1b[32m", "\nPOST", "\x1b[37m", "from ", "\x1b[36m", req.headers["x-forwarded-for"] || req.socket.remoteAddress, "\x1b[35m", "\nBody ", "\x1b[37m", JSON.stringify(req.body));
  // let newGuest = new Guest(req.body);
  let user = new User(testUserData);
  user.save((err, guest) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Server error! Alex" });
    }
    res.status(201).json(user);
  });
};

let testSecret = {
  title: "Test Secret 4",
  hashedSecret: encrypt.hashIt("Encrypted Text 4", "alexSecretKey"),
  userId: "61ac9e5106c30a142800b5a1",
  secretTags: ["Top Secret", "Encrypted", "For real"],
  creationDate: new Date(),
  lastEdit: new Date(),
};

exports.createNewSecret = (req, res) => {
  let currDate = new Date();
  // console.log("\x1b[33m", `\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, "\x1b[34m", `\n[${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}|${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}]`, "\x1b[32m", "\nPOST", "\x1b[37m", "from ", "\x1b[36m", req.headers["x-forwarded-for"] || req.socket.remoteAddress, "\x1b[35m", "\nBody ", "\x1b[37m", JSON.stringify(req.body));
  // let newGuest = new Guest(req.body);
  let secret = new Secret(testSecret);
  secret.save((err, guest) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Server error! Alex" });
    }
    res.status(201).json(secret);
  });
};

exports.readSecret = (req, res) => {
  // console.log(req);
  Secret.find({ _id: req.params.id }, (err, secrets) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Server error!" });
    }
    secrets.forEach((secret) => {
      console.log("Decrypted text: ", encrypt.reveal(secret.hashedSecret, "alexSecretKey"));
    });

    res.status(200).json(secrets);
  });
};

// let user = new User(userData);
// user.save((err, user) => {
//   if (err) {
//     res.status(500).send({ code: 500, message: "Server error! Alex" });
//   }
//   res.status(201).json(guest);
// });

// exports.updateGuest = (req, res) => {
//   console.log(req);
//   Guest.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, guest) => {
//     if (err) {
//       res.status(500).send({ code: 500, message: "Server error!" });
//     }
//     res.status(200).json(guest);
//   });
// };

// exports.deleteGuest = async (req, res) => {
//   console.log(req);
//   await Guest.deleteOne({ _id: req.params.id }, (err) => {
//     if (err) {
//       return res.status(404).send({ code: 404, message: "Guest not found!" });
//     }
//     res.status(200).json({ message: "Guest successfully deleted" });
//   });
// };

// exports.deleteGuestByEmail = async (req, res) => {
//   console.log(req);
//   await Guest.deleteOne({ email: req.params.mail }, (err) => {
//     if (err) {
//       return res.status(404).send({ code: 404, message: "Guest not found!" });
//     }
//     res.status(200).json({ message: "Guest successfully deleted" });
//   });
// };

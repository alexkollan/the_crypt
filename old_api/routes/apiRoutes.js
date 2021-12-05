"use strict";

// create App function
module.exports = function (app) {
  var controller = require("../controllers/apiController");
  app.route("/register").get(controller.createNewUser).post(controller.createNewUser);
  app.route("/addSecret").get(controller.createNewSecret).post(controller.createNewSecret);
  app.route("/readSecret/:id").get(controller.readSecret);

  // app.route("/guestList").get(guestList.listAllGuests).post(guestList.createNewGuest);

  // app.route("/guestList/:id").get(guestList.findGuestById).put(guestList.updateGuest).delete(guestList.deleteGuest);

  // app.route("/guestList/email/:mail").get(guestList.findGuestByMail).delete(guestList.deleteGuestByEmail);
};

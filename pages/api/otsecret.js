"use strict";
import dbConnect from "../../lib/dbConnect";
import Secret from "../../models/secret";
// import User from "../../models/user";
import OtSecret from "../../models/otsecret";
import encrypt from "../../lib/encrypt";
// create App function
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log(req.query);
        let url = req.body.ots;
        let otsecret = await OtSecret.find({ url: req.query.ots });
        console.log(otsecret[0].hashedSecret);
        let decryptedOtSecret = encrypt.reveal(otsecret[0].hashedSecret, "1");
        console.log(decryptedOtSecret);
        console.log(otsecret[0].url);
        OtSecret.findOneAndDelete({ url: otsecret[0].url }, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted Secret : ", docs);
          }
        });
        res.status(200).json({ status: "ok", data: decryptedOtSecret });
      } catch (error) {
        res.status(400).json({ status: "error", data: error });
      }
      break;
    case "POST":
      try {
        let secretBody = req.body;
        console.log(secretBody);
        const secrets = await OtSecret.create(secretBody);
        res.status(201).json({ status: "ok", data: secrets });
        console.log("Successfully saved a One Time Secret!");
      } catch (error) {
        // console.log("Body: ", req.body, error);
        res.status(400).json({ status: "error", data: error });
      }
      break;
    default:
      res.status(400).json({ status: "error", data: "Undefined reason (exception)." });
      break;
  }
}

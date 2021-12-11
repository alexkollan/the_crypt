"use strict";
import dbConnect from "../../lib/dbConnect";
import Secret from "../../models/secret";
import User from "../../models/user";
import encrypt from "../../lib/encrypt";
// create App function
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        console.log(req.query);
        let secrets = await Secret.find({ _id: req.query.secretId });
        let user = await User.find({ _id: req.query.userId });
        secrets[0].hashedSecret = encrypt.reveal(secrets[0].hashedSecret, user[0].userKey);
        console.log(secrets);
        res.status(200).json({ status: "ok", data: secrets });
      } catch (error) {
        res.status(400).json({ status: "error", data: error });
      }
      break;
    case "POST":
      try {
        let secretBody = req.body.postForm;
        // console.log(secretBody);
        let user = await User.find({ _id: secretBody.userId });
        secretBody.hashedSecret = encrypt.hashIt(secretBody.hashedSecret, user[0].userKey);
        console.log("New Secret encoded encrypted!");
        const secrets = await Secret.create(secretBody);
        res.status(201).json({ status: "ok", data: secrets });
        console.log("Successfully saved a Secret!");
      } catch (error) {
        console.log("Body: ", req.body, error);
        res.status(400).json({ status: "error", data: error });
      }
      break;
    default:
      res.status(400).json({ status: "error", data: "Undefined reason (exception)." });
      break;
  }
}

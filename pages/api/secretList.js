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
        let secrets = await Secret.find({ userId: req.query.userId });
        res.status(200).json({ status: "ok", data: secrets });
      } catch (error) {
        res.status(400).json({ status: "error", data: error });
      }
      break;
    default:
      res.status(400).json({ status: "error", data: "Undefined reason (exception)." });
      break;
  }
}

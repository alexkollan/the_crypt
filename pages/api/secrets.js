"use strict";
import dbConnect from "../../lib/dbConnect";
import Secret from "../../models/secret";
// create App function
export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const secrets = await Secret.find({});
        res.status(200).json({ success: true, data: secrets });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "POST":
      try {
        const secrets = await Secret.create(req.body.form);
        res.status(201).json({ status: "OK", data: secrets });
        console.log("Successfully added a Secret!");
      } catch (error) {
        console.log("Body: ", req.body);
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

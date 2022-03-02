import nc from "next-connect";
import bcryptjs from "bcryptjs";

import { User, ValidateSignup, getToken } from "../../../models/users";
import { connectDB, disconnectDB } from "../../../libs/db";

const handler = nc({
  onError: (err, _, res) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
  },
  onNoMatch: (_, res) => {
    res.status(404).end("Page is not found");
  },
});

/**
 * @desc signup user
 */
handler.post(async (req, res) => {
  const { error, value } = ValidateSignup(req.body);

  if (error)
    return res.status(422).json({
      error: true,
      message: error.details[0].message,
    });

  const { email, password, name } = value;

  await connectDB();
  const user = await User.findOne({ email });
  await disconnectDB();

  //check if email already exist
  if (user)
    return res
      .status(400)
      .json({ error: true, message: "user with email already exist" });

  await connectDB();
  const newUser = new User({ email, name, password });
  await newUser.save();
  await disconnectDB();

  res.status(201).json({ message: "signup successul" });
});

export default handler;

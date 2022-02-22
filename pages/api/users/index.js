import nc from "next-connect";

import { User } from "../../../models/users";
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
 * @desc get all users
 */
handler.get(async (req, res) => {
  await connectDB();

  const users = await User.find();

  await disconnectDB();
  res.json({ users });
});

/**
 * @desc login user
 */
handler.post(async (req, res) => {
  console.log(req.body);

  res.json({ message: "success" });
});

export default handler;

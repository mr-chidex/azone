import nc from "next-connect";
import bcryptjs from "bcryptjs";

import { User, Validate, getToken } from "../../../models/users";
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
 * @desc login user
 */
handler.post(async (req, res) => {
  const { error, value } = Validate(req.body);

  if (error)
    return res.status(422).json({
      error: true,
      message: error.details[0].message,
    });

  const { email, password } = value;

  const user = await User.findOne({ email });

  //check if email is valid
  if (!user)
    return res
      .status(400)
      .json({ error: true, message: "email or password is incorrect" });

  const isValid = await bcryptjs.compare(password, user.password);

  // check if password is valid
  if (!isValid)
    return res
      .status(400)
      .json({ error: true, message: "email or password is incorrect" });

  const token = getToken(user);

  res.json({ message: "success", token });
});

export default handler;

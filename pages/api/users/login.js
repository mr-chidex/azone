import nc from "next-connect";

import { User, Validate } from "../../../models/users";
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
  console.log(error.details);
  console.log(value);
  // if (error)
  //   return res.status(422).json({
  //     error: true,
  //     message: error.details[0].message,
  //   });

  if (error) res.json({ message: "success", body: req.body });
});

export default handler;

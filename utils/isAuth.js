import { User } from "../models/users";

const JWT = require("jsonwebtoken");

export default isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(400).json({ message: "No authorization header" });

    if (!req.headers.authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "Invalid token format" });

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    JWT.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      console.log("decode - ", decode);
      // const user = await User.findById(decodeToken.payload);
      req.user = decode;

      next();
    });
  } catch (err) {
    next(err);
  }
};

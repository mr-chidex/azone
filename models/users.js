import mongoose from "mongoose";
import { Schema } from "mongoose";
import Joi from "joi";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//hash password
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// generate token
const generateToken = (user) => {
  const jwtToken = JWT.sign(
    {
      iss: "@mr-chidex",
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY
  );
  return jwtToken;
};

const validate = (user) => {
  return Joi.object({
    email: Joi.string().trim().required().email().normalize(),
    password: Joi.string().min(4).trim().required(),
  }).validate(user);
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const getToken = generateToken;
export const Validate = validate;

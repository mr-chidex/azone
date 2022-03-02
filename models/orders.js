import mongoose from "mongoose";
import { Schema } from "mongoose";
import Joi from "joi";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        Price: { type: Number, required: true },
      },
    ],
    shippingAdress: {
      fullName: { type: String, required: true },
      address1: { type: String, required: true },
      city: { type: String, required: true },
      pcode: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
    },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, default: null },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const validate = (product) => {
  return Joi.object({
    user: Joi.string().min(3).trim().required(),
    orderItems: Joi.array().required(),
    shippingAdress: Joi.object().required(),
    shippingPrice: Joi.number().trim().required(),
    paymentMethod: Joi.string().trim().required(),
    taxPrice: Joi.number().trim().required(),
    totalPrice: Joi.number().trim().required(),
  }).validate(product);
};

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export const Validate = validate;

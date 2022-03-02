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
    orderItems: { type: Array, required: true },
    shippingAddress: {
      type: Object,
      required: true,
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

const validate = (order) => {
  return Joi.object({
    orderItems: Joi.array().required(),
    shippingAddress: Joi.object().required(),
    shippingPrice: Joi.number().required(),
    paymentMethod: Joi.string().trim().required(),
    taxPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
  }).validate(order);
};

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export const Validate = validate;

import nc from "next-connect";
import mongoose from "mongoose";

import { connectDB, disconnectDB } from "../../../libs/db";
import { Order, Validate } from "../../../models/orders";
import isAuth from "../../../utils/isAuth";

const handler = nc({
  onError: (err, _, res) => {
    console.error(err.message);
    res.status(500).json({ message: "Something broke!" });
  },
  onNoMatch: (_, res) => {
    res.status(404).end("Page is not found");
  },
});

//middlewares
handler.use(isAuth);

/**
 * @desc get all orders
 */
handler.get(async (req, res) => {
  await connectDB();

  const orders = await Order.find();

  disconnectDB();
  res.json({ orders });
});

/**
 * @desc place order
 */
handler.post(async (req, res) => {
  const { error, value } = Validate(req.body);

  if (error)
    return res.status(422).json({
      error: true,
      message: error.details[0].message,
    });

  const {
    orderItems,
    shippingAddress,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
  } = value;

  await connectDB();
  const order = new Order({
    user: req.user?._id,
    orderItems,
    shippingAddress,
    shippingPrice,
    paymentMethod,
    taxPrice,
    totalPrice,
  });

  await order.save();

  res.status(201).json({ order, message: "order successfully created" });
});

export default handler;

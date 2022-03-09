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
 * @desc get order
 */
handler.get(async (req, res) => {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "Invalid order id" });

  await connectDB();
  const order = await Order.findById(id);

  // disconnectDB();
  res.json({ order });
});

/**
 * @desc payment successful
 */
handler.put(async (req, res) => {
  const { id } = req.query;
  const { ref } = req.body;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "Invalid order id" });

  await connectDB();
  const order = await Order.findById(id);

  order.isPaid = true;
  order.paidAt = new Date().toDateString();
  order.ref = ref;

  await order.save();

  // disconnectDB();
  res.json({ message: "payment successful", order });
});

/**
 * @desc delete order
 */
handler.delete(async (req, res) => {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: "Invalid order id" });

  await connectDB();
  await Order.findByIdAndDelete(id);

  // disconnectDB();
  res.json({ message: "delete successful" });
});

export default handler;

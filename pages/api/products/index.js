import nc from "next-connect";

import Product from "../../../models/products";
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

handler.get(async (req, res) => {
  await connectDB();

  const products = await Product.find({});

  await disconnectDB();
  res.json({ products });
});

handler.post(async (req, res) => {});

export default handler;

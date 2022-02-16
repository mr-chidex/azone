import nc from "next-connect";
import { connectDB, disconnectDB } from "../../libs/db";
import Product from "../../models/products";
import { data } from "../../utils/data";

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

  await Product.deleteMany();
  await Product.insertMany(data.products);

  await disconnectDB();
  res.json({ message: "seeded successfully" });
});

export default handler;

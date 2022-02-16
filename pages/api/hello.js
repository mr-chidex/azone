import { connectDB, disconnectDB } from "../../libs/db";

export default async function handler(req, res) {
  await connectDB();
  await disconnectDB();
  res.status(200).json({ name: "John Doe" });
}

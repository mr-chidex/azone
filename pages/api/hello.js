// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectDB, disconnectDB } from "../../libs/db";

export default async function handler(req, res) {
  await connectDB();
  res.status(200).json({ name: "John Doe" });
  await disconnectDB();
}

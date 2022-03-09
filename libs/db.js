import mongoose from "mongoose";
let connection = false;

export const connectDB = async () => {
  //check if connection is already established
  if (connection) {
    console.log("already connected");
    return;
  }

  if (mongoose.connection.readyState === 1) {
    console.log("already connected", mongoose.connection.readyState);
    //already connected
    return;
  }

  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => {
      console.log("db connected");
      connection = true;
    })
    .catch((error) => {
      console.log("db error", error.message);
    });
};

export const disconnectDB = () => {
  // if (connection) {
  //disconnect in production mode
  // if (process.env.NODE_ENV === "production") {
  //   console.log("disonnect");
  //   connection = false;
  //   return mongoose.disconnect();
  // }
  return;
  // }
};

export const convertObj = (document) => {
  document._id = document._id.toString();
  document.createdAt = document.createdAt.toString();
  document.updatedAt = document.updatedAt.toString();
  document.user ? (document.user = document.user?.toString()) : null;
  document.paidAt ? (document.paidAt = document.paidAt?.toString()) : null;

  return document;
};

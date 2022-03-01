import mongoose from "mongoose";

export const connectDB = async () => {
  //check if connection is already established
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
    })
    .catch((error) => {
      console.log("db error", error.message);
    });
};

export const disconnectDB = () => {
  // if (process.env.NODE_ENV === "production") {
  //   console.log("disonnect");
  //   //disconnect in production mode
  //   return mongoose.disconnect();
  // }

  // console.log("not disconnecting");
  return;
};

export const convertObj = (document) => {
  document._id = document._id.toString();
  document.createdAt = document.createdAt.toString();
  document.updatedAt = document.updatedAt.toString();

  return document;
};

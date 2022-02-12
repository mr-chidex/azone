import mongoose from "mongoose";

export const connectDB = async () => {
  //check if connection is already established
  if (mongoose.connection.readyState === 1) {
    // console.log("already connected", mongoose.connection.readyState);
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
  return mongoose.disconnect();
};

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/books")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose;

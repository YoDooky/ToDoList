import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import "dotenv/config";

import router from "./router.js";

// connet to mongoDB via mongoose
mongoose
  .connect(
    "mongodb+srv://admin-dooky:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.uh2nq.mongodb.net/todo?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connection to DB success"))
  .catch((err) => console.log("Connection to DB error", err));

const app = express();

//use json to send data
app.use(express.json());
app.use(cors()); //use cors to access to backend from frontend
app.use("", router);

app.listen(4444, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server started on port 4444");
});

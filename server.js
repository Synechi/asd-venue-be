import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User";

const app = express();
const port = 4000;
const router = express.Router();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.URL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection to MongoDB established successfully");
});

// Example route for searching DB for ID
router.route("/user/:id").get((req, res) => {
  User.findByID(req.params.id, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

// Example route of searching DB for all users
router.route("/user").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});

app.use("/", router);

app.listen(port, () => console.log("Express sever running on port " + port));

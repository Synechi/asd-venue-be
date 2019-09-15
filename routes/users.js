import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users
import UserService from '../services/users';

const app = express(); //making a simple express app
const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
const router = express.Router(); //creates a router object that is of the router function
dotenv.config(); //allows us to use the .env file when developing code 

// router.route("/user").post((req, res) => {
//     console.dir(req.body.lastname);
//     res.send(
//       "{'hello: 'hi'}"
//     );
//     // console.log(req.body);
//   })

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users
import { stringify } from "querystring";
import { parse } from "path";

//Routes
import venueListRouter from "./routes/venuelist";

const app = express(); //making a simple express app
const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
const router = express.Router(); //creates a router object that is of the router function
dotenv.config(); //allows us to use the .env file when developing code

// Debugging

let testconnection = false;

var suggestedFriendsRouter = require("./routes/suggestedFriends");
var friendRequestRouter = require("./routes/friendRequest");
var currentFriendsRouter = require("./routes/currentFriends");
var pendingRequestsRouter = require("./routes/pendingRequests");
var friendStatusUpdateRouter = require("./routes/friendStatusUpdate");
var friendRemovalRouter = require("./routes/friendRemoval");

app.use(cors()); //establishing the connecting with an external server database
app.use(bodyParser.json()); //same as above but for passing json through
app.use("/suggestedFriends", suggestedFriendsRouter);
app.use("/friendRequest", friendRequestRouter);
app.use("/currentFriends", currentFriendsRouter);
app.use("/pendingRequests", pendingRequestsRouter);
app.use("/friendStatusUpdate", friendStatusUpdateRouter);
app.use("/friendRemoval", friendRemovalRouter);
app.use("/venuelist", venueListRouter);

mongoose.connect(process.env.URL); //calling connect function and passing throug the url for the mongodb server

const connection = mongoose.connection; //creating an object out of that connection

//testing to see if the connection is successful
connection.once("open", () => {
  console.log("Connection to MongoDB established successfully");
  testconnection = true;
});

//route for searching DB for users with ID
router.route("/user/:id").get((req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

router.route("/user").post((req, res) => {
  console.dir(req.body.lastname);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });

  user.save().then(result => {
    console.log(result);
  });

  res.send("{'hello: 'hi'}");
  // console.log(req.body);
});

// Example route of searching DB for all users (Doing a query on the database)
router.route("/user").get((req, res) => {
  User.find((err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

//Default Error-Handler:
app.use(function(error, req, res, next) {
  res.json({ message: error.message });
});

//creating a route for the backend that will pass through the json data for what you are querying
//.get displays and gets data on the route (but only using the reponse part)

app.get("/", (req, res) => res.send("Is db connected? - " + testconnection));

app.use("/", router);

app.listen(port || 4000, () =>
  console.log("Express sever running on port " + port)
);

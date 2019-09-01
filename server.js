import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users

const app = express(); //making a simple express app
const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
const router = express.Router(); //creates a router object that is of the router function
dotenv.config(); //allows us to use the .env file when developing code

// Debugging

let testconnection = false;

app.use(cors()); //establishing the connecting with an external server database
app.use(bodyParser.json()); //same as above but for passing json through

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

//Google maps API Route
router.route("/gmapi").get((req, res) => {
  res.json([process.env.GMAPI]);
});

//creating a route for the backend that will pass through the json data for what you are querying
//.get displays and gets data on the route (but only using the reponse part)

app.get("/", (req, res) => res.send("Is db connected? - " + testconnection));

app.use("/", router);

app.listen(port || 4000, () =>
  console.log("Express sever running on port " + port)
);

// //create route for returning all venue lists 
// router.route("/venuelist").get((req, res) => {
//   venuelist.find((err, venuelists) => {
//     if (err) console.log(err);
//     else res.json(venuelists);
//   });
// });

// //creating a route for creating a new list
// app.post("/venuelist/", (req, res) => {
//   var myData = new venuelist(req.body);
//   myData.save()
//   .then(item => {
//   res.send("List created and saved");
//   })
//   .catch(err => {
//   res.status(400).send("unable to save to database");
//   });
//  });

//route for searching DB with ID to get all lists of one user
router.route("/lists/:id").get((req, res) => {
  User.findById(req.params.id, {venuelists: 1, _id: 0}, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

//route for creating a list for a user
router.route("/createlist/:id").patch((req, res) => {
  var list = {
    name: req.body.name,
    colour: req.body.colour
  }
  User.findByIdAndUpdate(req.params.id, {$push: {venuelists: {name: req.body.name, colour: req.body.colour}}}, {new:true}, (err,doc) => {
    if (err) res.status(500).send(err);
    return console.log(doc);
});
});

//route for deleting a list for a user
router.route("/deletelist/:id/:listid").delete((req, res) => {
  console.log("delete list");
  console.log(req.params);
  User.findByIdAndUpdate(req.params.id, {$pull: { venuelists: {_id: req.params.listid}}}, {new:true}, (err,doc) => {
    if (err) res.status(500).send(err);
    return console.log(doc);
  });
});
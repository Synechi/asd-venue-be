import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users

const app = express(); //making a simple express app
const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
const router = express.Router(); //creates a router object that is of the router function
<<<<<<< Updated upstream
dotenv.config(); //allows us to use the .env file when developing code 
=======
// const userRouter = express.Router();
dotenv.config(); //allows us to use the .env file when developing code
//const User = require('./models/User');
const userRouter = require('./routes/userRouter')(User);

>>>>>>> Stashed changes

// Debugging

let testconnection = false;

app.use(cors()); //establishing the connecting with an external server database
<<<<<<< Updated upstream
app.use(bodyParser.json()); //same as above but for passing json through 
=======
app.use(bodyParser.json()); //same as above but for passing json through
app.use('/api', userRouter);
>>>>>>> Stashed changes

mongoose.connect(process.env.URL); //calling connect function and passing throug the url for the mongodb server

const connection = mongoose.connection; //creating an object out of that connection 

//testing to see if the connection is successful 
connection.once("open", () => {
  console.log("Connection to MongoDB established successfully");
  testconnection = true;
});

<<<<<<< Updated upstream
// Example route for searching DB for ID
router.route("/user/:id").get((req, res) => {
  console.log(req.params.id)
  User.findByID(req.params.id, (err, user) => {
    if (err) console.log(err);
    else res.json(user);
  });
});

router.route("/user").post((req, res) => {
  console.dir(req.body.lastname);
  const MyModel = new User ();
  // MyModel.find({ email: req.body.email }, null, function (err, docs) {});
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    preference: req.body.preference,
  });

//   user.model.count({email: req.body.email}, function (err, count){ 
//     if(count>0){
//       console.log("hellofjkdshfs");
//     }
// }); 

  user.save()
  .then(result => {
    console.log(result);
    
  })
  res.send({body: "Account has been created"});

  // res.send(
  //   "{'hello: 'hi'}"
  // );
  // console.log(req.body);
})

// Example route of searching DB for all users (Doing a query on the database)
router.route("/user").get((req, res) => {
  User.find();
  find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});
=======
// // Example route for searching DB for ID
// router.route("/user/:id").get((req, res) => {
//   console.log(req.params.id);
//   User.findByID(req.params.id, (err, user) => {
//     if (err) console.log(err);
//     else res.json(user);
//   });
// });
// userRouter.route("/user").post((req, res) => {
// // router.route("/user").post((req, res) => {
//   console.dir(req.body.lastname);
//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password
//   });
//   user.save().then(result => {
//     console.log(result);
//   });
//   res.send("{'hello: 'hi'}");
//   // console.log(req.body);
// });

// Example route of searching DB for all users (Doing a query on the database)
// router.route("/user").get((req, res) => {
//   User.find((err, users) => {
//     if (err) console.log(err);
//     else res.json(users);
//   });
// });

//Google maps API Route
// router.route("/gmapi").get((req, res) => {
//   res.json([process.env.GMAPI]);
// });

>>>>>>> Stashed changes
//creating a route for the backend that will pass through the json data for what you are querying
//.get displays and gets data on the route (but only using the reponse part)

app.get("/", (req, res) => res.send("Is db connected? - " + testconnection));

<<<<<<< Updated upstream

app.use("/", router);
=======
// app.use("/", router);
app.use("/", userRouter);
>>>>>>> Stashed changes

app.listen(port || 4000, () =>
  console.log("Express sever running on port " + port)
);

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users
import { stringify } from "querystring";
import { parse } from "path";

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

// Example route for searching DB for ID
router.route("/user/:id").get((req, res) => {
  console.log(req.params.id);
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
});

// Example route of searching DB for all users (Doing a query on the database)
router.route("/user").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});



//Google maps API Route
router.route("/gmapi").get((req, res) => {
  res.json([process.env.GMAPI]);
});

//Friend APIS 
//Route to display users as 'suggested friends' 
router.route("/displayUsers").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});  

//Route in Progress - Saving a Friend Request to the Database 
router.route("/friendRequest").post((req,res) => {
  
  //Hardcoding the userID for testing purposes because sessions are not setup yet 
  //Use that userID to to find its JSON file in the DB 
  User.findById("5d626b53fa8afa89b5f13ebd", (err, user) => {
    if(err) console.log(err);
    else { 
      user['USER_FRIENDS'].push({"friendID": req.body.friendID, "friendStatus": 'Sent'}); //pushing new object with friend request  
    }

    user.save((err, user) => {
        if (err) next(err);
        User.findById(req.body.friendID, (err, friend) => {
          if(err) console.log(err);
          else { 
            friend['USER_FRIENDS'].push({"friendID": "5d626b53fa8afa89b5f13ebd", "friendStatus":'Received'}); //pushing new sub-array with friend request  
          }
          user.save((err, friend) => {
              if (err) next(err);
              res.json(user);
              
          });
          
      });
      
    });
    
  });
  
});






//creating a route for the backend that will pass through the json data for what you are querying
//.get displays and gets data on the route (but only using the reponse part)

app.get("/", (req, res) => res.send("Is db connected? - " + testconnection));

app.use("/", router);

app.listen(port || 4000, () =>
  console.log("Express sever running on port " + port)
);

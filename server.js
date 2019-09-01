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
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});

//Google maps API Route
router.route("/gmapi").get((req, res) => {
  res.json([process.env.GMAPI]);
});

//Friend APIS - Bella L

//Route to display users as 'suggested friends'
router.route("/displayUsers").get((req, res) => {
  User.find((err, users) => {
    if (err) console.log(err);
    else res.json(users);
  });
});

function search(id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]["friendID"] == id) {
      return id;
    }
  }
}

//Updates 2 user documents in the DB with the sent friend request
router.route("/friendRequest/:friendID").post((req, res, next) => {
  //Hardcoding the userID for testing purposes because login feature is not established - please replace with req.session._id
  //Use that userID to to find its JSON file in the DB

  User.findById("5d6a819446f3f4e9240a5258", (err, user) => {
    if (err) console.log(err);
    else {
      if (
        search(req.params.friendID, user["USER_FRIENDS"]) ===
        req.params.friendID
      ) {
        next(new Error("FRIEND_ALREADY_EXISTS"));
      } else {
        user["USER_FRIENDS"].push({
          friendID: req.params.friendID,
          friendStatus: "Sent"
        }); //update the document of the user in session

        user.save((err, user) => {
          if (err) next(err);
          User.findById(req.params.friendID, (err, friend) => {
            if (err) console.log(err);
            else {
              friend["USER_FRIENDS"].push({
                friendID: "5d6a819446f3f4e9240a5258",
                friendStatus: "Received"
              }); //update the document of the friend the request is being sent to
            }
            friend.save((err, friend) => {
              if (err) next(err);
              res.json(user);
            });
          });
        });
      }
    }
  });
});

// function searchByStatus(status, oldArr, newArr) {
//   for (var i = 0; i < oldArr.length; i++) {
//     if (oldArr[i]["friendStatus"] == status) {
//       newArr.push(oldArr[i]["friendID"]);
//     }
//   }
//   return newArr;
// }

//Bella L created 31/08/19 - Api that displays all the user's pending friend requests
router.route("/currentFriends").get((req, res) => {
  User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId("5d6a819446f3f4e9240a5258") }
    },
    {
      $project: {
        USER_FRIENDS: {
          $filter: {
            input: "$USER_FRIENDS",
            as: "friend",
            cond: { $eq: ["$$friend.friendStatus", "Accepted"] }
          }
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "USER_FRIENDS.friendID",
        foreignField: "_id",
        as: "friends"
      }
    }
  ]).exec((err, friends) => {
    if (err) console.log(err);
    else res.json(friends);
  });
});


router.route("/pendingRequests").get((req, res) => {
  User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId("5d6a844cc0f026e9cba26c4c") }
    },
    {
      $project: {
        USER_FRIENDS: {
          $filter: {
            input: "$USER_FRIENDS",
            as: "friend",
            cond: { $eq: ["$$friend.friendStatus", "Received"] }
          }
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "USER_FRIENDS.friendID",
        foreignField: "_id",
        as: "friends"
      }
    }
  ]).exec((err, friends) => {
    if (err) console.log(err);
    else res.json(friends);
  });
});

function updateFriendStatus(friendid, array, status) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]["friendID"] == friendid) {
        
      array[i]["friendStatus"] = status;
      
    }
  }
}

router.route("/friendStatusUpdate/:friendID").put((req, res, next) => {
  //Hardcoding the userID for testing purposes because login feature is not established - please replace with req.session._id
  //Use that userID to to find its JSON file in the DB

  User.findById("5d6a844cc0f026e9cba26c4c", (err, user) => {
    if (err) console.log(err);
    else {
          updateFriendStatus(req.params.friendID, user["USER_FRIENDS"], req.body.friendStatus);
    }
        user.save((err, user) => {
          if (err) next(err);
          User.findById(req.params.friendID, (err, friend) => {
            if (err) console.log(err);
            else { updateFriendStatus("5d6a844cc0f026e9cba26c4c", friend["USER_FRIENDS"], req.body.friendStatus);
               }
            friend.save((err, friend) => {
              if (err) next(err);
              res.json(user);
            });
          });
        });
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

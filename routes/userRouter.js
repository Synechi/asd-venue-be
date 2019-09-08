import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users

const app = express(); //making a simple express app
const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
const router = express.Router(); //creates a router object that is of the router function
dotenv.config(); //allows us to use the .env file when developing code 

function routes(User) {
    const userRouter = express.Router();
    userRouter.route("/user").get((req, res) => {
      const query1 = {};
      if (req.query.email && req.query.password) {
        query1.email = req.query.email;
        query1.password = req.query.password;
      }
      User.findOne(query1, (err, users) => {
        if (err) {
          console.dir("hellogcgfsd");
          return res.status(404).send(err);
        }
        else if (users && users._id) {
         console.log("eeeee");
          var status = {
            "UserID" : users._id
          };
          return res.status(200).send(status)
        }
        else {
          console.log("rrrrrr");
          var status = {
            "Status" : "Incorrect email and/or password"
          };
          return res.status(200).send(status)
        }
      })
    });
    userRouter.route("/user").post((req, res) => {
        const user = new User(req.body);
        console.dir(req.body.firstname);
        const query = {};
        console.dir(req.body);
        query.email = user.email;
        console.dir(query);

        User.findOne(query, (err, users) => {
          console.log(users);
          if (err) {
            console.dir("hellogcgfsd");
            return res.status(404).send(err);
          }
          else if (users && users._id) {
            console.log(users.email);
            var status = {
              "Status" : "Email Address already exists"
            };
            return res.status(200).send(status);
            // return res.status(200).send("{'Status': 'Email Address already exists'}");
            // console.log(users);
          }
          else {
            const user1 = new User({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: req.body.password
            });
            user1.save().then(result => {
              console.log(result);
            });
            var status = {
              "UserID" : user1._id
              // "Status" : "Account has been created"
            };
            return res.status(201).send(status);
          }
        });
      });

      



    return userRouter;
}

module.exports = routes;
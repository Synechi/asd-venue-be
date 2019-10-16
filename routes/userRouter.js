import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// import User from "./models/User"; //pulling the schema for the structure of how a collection is supposed to be displayed, pulling the schema from mongoose and then creating the schema for users

const app = express(); //making a simple express app
const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
const router = express.Router(); //creates a router object that is of the router function
dotenv.config(); //allows us to use the .env file when developing code 

function routes(User) {
    const userRouter = express.Router();
    userRouter.route("/user").get((req, res) => {
      const query1 = {};
//Login
      if (req.query.email && req.query.password) {
        query1.email = req.query.email;
      }
      User.findOne(query1, (err, users) => {
        if (err) {
          return res.status(404).send(err);
        }
//Encryption for login
else if (users === null) {
              var status = {"Status" : "User not found"};
              return res.status(400).send(status)
            }
    
            else {
              if (users.validPassword(req.query.password)) { 
                var status = {
                  "UserID" : users._id
                };
                return res.status(201).send(status) 
              } 
              else { 
                var status = {
                  "Status" : "Incorrect email and/or password"
                };
                return res.status(200).send(status)
              } 
            }
      })
    });
//Create Account
    userRouter.route("/user").post((req, res) => {
        const user = new User(req.body);
        const query = {};
        query.email = user.email;

        User.findOne(query, (err, users) => {
          if (err) {
            return res.status(404).send(err);
          }
          else if (users && users._id) {
            var status = {
              "Status" : "Email Address already exists"
            };
            return res.status(200).send(status);
          }
          else {
    let user1 = new User();
           user1._id = new mongoose.Types.ObjectId();
           user1.firstname = req.body.firstname;
           user1.lastname = req.body.lastname;
           user1.email = req.body.email;
           user1.setPassword(req.body.password);
//             const user1 = new User({
//               _id: new mongoose.Types.ObjectId(),
//               firstname: req.body.firstname,
//               lastname: req.body.lastname,
//               email: req.body.email,
//               password: req.body.password
//             });
            user1.save().then(result => {
            });
            var status = {
              "UserID" : user1._id
            };
            return res.status(201).send(status);
          }
        });
      });

      



    return userRouter;
}

module.exports = routes;

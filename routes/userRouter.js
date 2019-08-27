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
    userRouter.route("/user").post((req, res) => {
        const user = new User(req.body);
        console.dir(req.body.firstname);
        const query = {};
        console.dir(req.body.email);
        query.email = user.email;
        console.dir(query);

        User.findOne(query, (err, users) => {
          console.log(users);
          if (err) {
            console.dir("hellogcgfsd");
            return res.send(err);
          }
          else if (users && users._id) {
            console.log(users.email);
            return res.send("{'email': 'email exits'}");
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
            return res.send("{'send': 'help'}");
          }

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
          return res.send("{'hello: 'hi'}");
          // return res.json(users);
        });
        // const user = new User({
        //   _id: new mongoose.Types.ObjectId(),
        //   firstname: req.body.firstname,
        //   lastname: req.body.lastname,
        //   email: req.body.email,
        //   password: req.body.password
        // });
        // user.save().then(result => {
        //   console.log(result);
        // });
        // return res.send("{'hello: 'hi'}");
        // console.log(req.body);
      });
    return userRouter;
}

module.exports = routes;
// router.route("/user").post((req, res) => {
//     console.dir(req.body.lastname);
//     res.send(
//       "{'hello: 'hi'}"
//     );
//     // console.log(req.body);
//   })
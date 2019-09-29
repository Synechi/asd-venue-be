var express = require("express");
var router = express.Router();
import User from "../models/User";
import mongoose from "mongoose";


router.route("/addReview/:id").post((req, res) => {

    if (req.query.email && req.query.password) {
        query1.email = req.query.email;
        query1.password = req.query.password;
      }

    User.findById(req.query.id, (err, user) => {
        if (err) {
            console.log(err);
        }
        else if (user && user._id) {
            user["flaggedvenues"].push({
            reviewDescription: req.query.reviewDescription,
            ratings: req.query.ratings,
            thumbsUp: req.query.thumbsUp,
            thumbsDown: req.query.thumbsDown
            });

            user.save((err, user) => {
                if (err) {
                    next(err);
                }
                else {
                    return res.status(404).send("Review has been created");
                }

              });
        }
        else {
            return res.status(404).send("hello");
        }
    });


    // console.log("kjdgfkjdsgfdsf");
    // User.findById(req.params.id, (err, user) => {
    //     if (err) 
    //         console.log(err);
    //     else {
    //         console.log("kjdgfkjgdfgfgdsgfdsf");
    //       res.status(204);
    //     }
    //     });
        
    // User.aggregate([
    //   {
    //     $match: { _id: mongoose.Types.ObjectId(req.params.id) }
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       friends: {
    //         $filter: {
    //           input: "$friends",
    //           as: "friend",
    //           cond: { $eq: ["$$friend.friendStatus", "Accepted"] } //Filters out the friends that have an 'Accepted' status
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "friends.friendID",
    //       foreignField: "_id",
    //       as: "friends"
    //     } //Self-join on friendID and _id
    //   },
    //   {$unwind: { path: '$friends' }}, 
    //   {$project: {
    //     _id: "$friends._id",
    //     firstname: "$friends.firstname",
    //     lastname: "$friends.lastname"
    //   }} //Results contain the friend's _id, first and last name
      
    // ]).exec((err, friends) => {
    //   if (err) console.log(err);
    //   else res.json(friends);
    // });
    // return res.status(404).send("Review has been created");
  });

  module.exports = router;



















// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import User from "../models/User";
// import "core-js";

// var router = express.Router();


// const app = express(); //making a simple express app
// const port = process.env.PORT; //assigning a port (Heroku assigns its own port)
// const router = express.Router(); //creates a router object that is of the router function
// dotenv.config(); //allows us to use the .env file when developing code 

// var express = require("express");
// var router = express.Router();
// import User from "../models/User";

// function routes() {
//     const venueReviews = express.Router();
//     venueReviews.route("/addReviews").get((req, res) => {
//         User.findById(req.params.id, (err, user) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("hello");
//             }
//         });
        
//     });
//         return venueReviews;
// }

// router.route("/addReviews").get((req, res) => {

//     // console.log("helhkjfhdskjfhkslo");

//     User.findById(req.params.id, (err, user) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("hello");
//         }
//     });

//     return venueReviews;
    
// });

// module.exports = router;


// // router.route("/addReviews").get((req, res, next) => {
// //     const venueReviews = express.Router();
// //     return venueReviews;
    
// //   });



// // // function routes() {
// // //     const venueReviews = express.Router();
// // //     venueReviews.route("/addReviews").get((req, res) => {
// // //         User.findById(req.params.id, (err, user) => {
// // //             if (err) {
// // //                 console.log(err);
// // //             }
// // //             else {
// // //                 console.log("hello");
// // //             }
// // //         });
// // //     });

// // //     return venueReviews;
// // // }
// // module.exports = router;

// //Created by Bella L

// // var express = require("express");
// // var router = express.Router();
// // import User from "../models/User";
// // import mongoose from "mongoose";

// //GET a user's current friends from the database
// // router.route("/addReviews/:id").get((req, res) => {
// //     User.aggregate([
// //       {
// //         $match: { _id: mongoose.Types.ObjectId(req.params.id) }
// //       },
// //       {
// //         $project: {
// //           _id: 0,
// //           friends: {
// //             $filter: {
// //               input: "$friends",
// //               as: "friend",
// //               cond: { $eq: ["$$friend.friendStatus", "Accepted"] } //Filters out the friends that have an 'Accepted' status
// //             }
// //           }
// //         }
// //       },
// //       {
// //         $lookup: {
// //           from: "users",
// //           localField: "friends.friendID",
// //           foreignField: "_id",
// //           as: "friends"
// //         } //Self-join on friendID and _id
// //       },
// //       {$unwind: { path: '$friends' }}, 
// //       {$project: {
// //         _id: "$friends._id",
// //         firstname: "$friends.firstname",
// //         lastname: "$friends.lastname"
// //       }} //Results contain the friend's _id, first and last name
      
// //     ]).exec((err, friends) => {
// //       if (err) console.log(err);
// //       else res.json(friends);
// //     });
// //   });

// //   module.exports = router;
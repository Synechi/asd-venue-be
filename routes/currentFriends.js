//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";
import mongoose from "mongoose";

//GET a user's current friends from the database
router.route("/currentFriends").get((req, res) => {
    User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.session._id) }
      },
      {
        $project: {
          _id: 0,
          friends: {
            $filter: {
              input: "$friends",
              as: "friend",
              cond: { $eq: ["$$friend.friendStatus", "Accepted"] } //Filters out the friends that have an 'Accepted' status
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "friends.friendID",
          foreignField: "_id",
          as: "friends"
        } //Self-join on friendID and _id
      },
      {$unwind: { path: '$friends' }}, 
      {$project: {
        _id: "$friends._id",
        firstname: "$friends.firstname",
        lastname: "$friends.lastname"
      }} //Results contain the friend's _id, first and last name
      
    ]).exec((err, friends) => {
      if (err) console.log(err);
      else res.json(friends);
    });
  });

  module.exports = router;
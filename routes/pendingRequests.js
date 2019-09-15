//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";
import mongoose from "mongoose";

//GET a user's pending friend requests from the database
router.route("/pendingRequests").get((req, res) => {
    User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.session._id) }
      },
      {
        $project: {
          friends: {
            $filter: {
              input: "$friends",
              as: "friend",
              cond: { $eq: ["$$friend.friendStatus", "Received"] } //Filters out the friends that have an 'Received' status
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
      }}
    ]).exec((err, friends) => {
      if (err) console.log(err);
      else res.json(friends);
    });
  });
  
  module.exports = router;
//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";

//Updates the friendStatus property of the specified id
function updateFriendStatus(friendid, array, status) {
    for (var i = 0; i < array.length; i++) {
      if (array[i]["friendID"] == friendid) {
        array[i]["friendStatus"] = status;
      }
    }
  }
  
  //PUT - Updates the friendStatus property for 2 users
  router.route("/friendStatusUpdate/:friendID").put((req, res, next) => {
  
    User.findById("5d6a844cc0f026e9cba26c4c", (err, user) => {
      if (err) console.log(err);
      else {
        updateFriendStatus(
          req.params.friendID,
          user["friends"],
          req.body.friendStatus
        );
      }
      user.save((err, user) => {
        if (err) next(err);
        User.findById(req.params.friendID, (err, friend) => {
          if (err) console.log(err);
          else {
            updateFriendStatus(
              "5d6a844cc0f026e9cba26c4c",
              friend["friends"],
              req.body.friendStatus
            );
          }
          friend.save((err, friend) => {
            if (err) next(err);
            res.json(202);
          });
        });
      });
    });
  });
  
  module.exports = router;
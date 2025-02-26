//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";

//Searchs for an existing friend ID, if found returns that ID
function searchFriendID(id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]["friendID"] == id) {
      return id;
    }
  }
}

//POST a friend request and creates/updates the 'friends' array for 2 users
router.route("/friendRequest/:friendID/:id").post((req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    else {
      if (
        searchFriendID(req.params.friendID, user["friends"]) === req.params.friendID
      ) {
        next(new Error("FRIEND_ALREADY_EXISTS"));
      }else {
        user["friends"].push({
          friendID: req.params.friendID,
          friendStatus: "Sent"
        });

        user.save((err, user) => {
          if (err) next(err);
          User.findById(req.params.friendID, (err, friend) => {
            if (err) console.log(err);
            else {
              friend["friends"].push({
                friendID: req.params.id,
                friendStatus: "Received"
              });
            }
            friend.save((err, friend) => {
              if (err) next(err);
              res.status(204);
            });
          });
        });
      }
    }
  });
});



module.exports = router;

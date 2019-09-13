//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";

function deleteFriend(arr, friendID) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]["friendID"] == friendID) {
      arr.splice(i, 1);
    }
  }
}

//PUT - Deletes the friend object from the user 'friends' array 
router.route("/friendRemoval/:friendID").put((req, res, next) => {
  User.findById("5d6a819446f3f4e9240a5258", (err, user) => {
    if (err) console.log(err);
    else {
      deleteFriend(user["friends"], req.params.friendID);
    }
    user.save((err, user) => {
      if (err) next(err);
      User.findById(req.params.friendID, (err, friend) => {
        if (err) console.log(err);
        else {
          deleteFriend(friend["friends"], "5d6a819446f3f4e9240a5258");
        }
        friend.save((err, friend) => {
          if (err) next(err);
          res.status(204);
        });
      });
    });
  });
});

module.exports = router;

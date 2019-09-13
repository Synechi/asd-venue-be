//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";

function getFriendIDs(oldArr, newArr) {
  for (var i = 0; i < oldArr.length; i++) {
    newArr.push(oldArr[i]["friendID"]);
  }
  return newArr;
}

//GET 'suggested friends' from the database
router.route("/suggestedFriends").get((req, res) => {
  let newArr = [];
  let usedArr = [];
  User.findById("5d6a819446f3f4e9240a5258", (err, user) => {
    if (err) console.log(err);
    else {
      usedArr = getFriendIDs(user["friends"], newArr);
      usedArr.push("5d6a819446f3f4e9240a5258"); //Adds the logged in user (PLEASE REMOVE WHEN LOGIN)
      User.find(
        {
          _id: {
            $nin: usedArr
          } //Query that excludes the friendIDs of the user's current friends
        },
        (err, users) => {
          if (err) console.log(err);
          else {
            res.json(users);
          }
        }
      );
    }
  });
});

module.exports = router;

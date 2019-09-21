//Created by Bella L

var express = require("express");
var router = express.Router();
import User from "../models/User";
import "core-js";

function getFriendIDs(oldArr, newArr) {
  for (var i = 0; i < oldArr.length; i++) {
    newArr.push(oldArr[i]["friendID"]);
  }
  return newArr;
}

//GET 'suggested friends' based on search input from the database
router.route("/suggestedFriends/:searchBox/:id").get((req, res) => {
  let newArr = [];
  let usedArr = [];
  let input = req.params.searchBox;
  let pattern = new RegExp(input)

  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err);
    else {
      usedArr = getFriendIDs(user["friends"], newArr);
      usedArr.push(req.params.id);
      User.find(
        {
          _id: {
            $nin: usedArr //Excludes current friends
          },
          $or: [
            { firstname: { $regex: input , $options: 'xi' } },
            { lastname: { $regex: input , $options: 'xi' } } //Matches the user search input with the first or last names of all the users in the database
          ]
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

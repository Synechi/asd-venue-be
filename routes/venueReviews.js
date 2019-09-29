var express = require("express");
var router = express.Router();
import User from "../models/User";
import mongoose from "mongoose";


router.route("/addReview").post((req, res) => {
    var review = JSON.parse(JSON.stringify(req.body));
    console.log(review);

    User.findById(review.id, (err, user) => {
        if (err) {
            console.log(err);
        }
        else if (user && user._id) {
            if (review.thumbsUp) {
                user["flaggedvenues"].push({
                reviewDescription: review.reviewDescription,
                ratings: review.ratings,
                thumbsUp: review.thumbsUp
                });
            }
            else if (review.thumbsDown) {
                user["flaggedvenues"].push({
                reviewDescription: review.reviewDescription,
                ratings: review.ratings,
                thumbsDown: review.thumbsDown
                });
            }

            else {
                user["flaggedvenues"].push({
                reviewDescription: review.reviewDescription,
                ratings: review.ratings
                });
            }

            user.save((err, user1) => {
                if (err) {
                    // console.log("Review has not been created");
                    var status = {
                        "Status" : "Review has not been created"
                    };
                    return res.status(404).send(status);
                }
                else {
                    var status = {
                        "Status" : "Review has been created"
                    };
                    return res.status(201).send(status);
                }

              });
        }
        else {
            console.log(user)
            var status = {
                "Status" : "Not found"
            };
            return res.status(404).send(status);
        }
    });
  });

  module.exports = router;
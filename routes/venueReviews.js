var express = require("express");
var router = express.Router();
import User from "../models/User";
import mongoose from "mongoose";

//Add Review
router.route("/addReview").post((req, res) => {
    var review = JSON.parse(JSON.stringify(req.body));
    console.log(review);

    console.log(review.rating);

    // Finds user ID
    User.findById(review._userid, (err, user) => {
        //If an error occurs do this
        if (err) {
            console.log(err);
        }
        // Else if it is a thumbs Up do this
        else if (user && user._id) {
            if (review.thumbsUpDown == "thumbsUp") {
                user["flaggedvenues"].push({
                reviewDescription: review.reviewDescription,
                rating: review.rating,
                // thumbsUp: review.thumbsUp
                thumbsUp: true
                });
            }
            // Or if it is a thumbs Down do this
            else if (review.thumbsUpDown == "thumbsDown") {
                user["flaggedvenues"].push({
                reviewDescription: review.reviewDescription,
                rating: review.rating,
                // thumbsDown: review.thumbsDown
                thumbsDown: true
                });
            }
            // Otherwise push the review into the DB
            else {
                console.log("hellollllo");
                user["flaggedvenues"].push({
                reviewDescription: review.reviewDescription,
                rating: review.rating
                });
                
            }
            // Status for the front end
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
        // When the user is not found
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
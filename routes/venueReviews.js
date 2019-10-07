import express from "express";
import User from "../models/User";

var router = express.Router();


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
                    thumbsUp: review.thumbsUp
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
                        "Status": "Review has not been created"
                    };
                    return res.status(404).send(status);
                }
                else {
                    var status = {
                        "Status": "Review has been created"
                    };
                    return res.status(201).send(status);
                }

            });
        }
        else {
            console.log(user)
            var status = {
                "Status": "Not found"
            };
            return res.status(404).send(status);
        }
    });
});

router.route("/getfriendreviews/:id/:placeID").get((req, res) => {
    let list = [];
    User.findById(req.params.id, (err, user) => {
        if (err) res.status(500).send(err);
        for (let friend in user.friends) {

            if (user.friends[friend].friendStatus === "Accepted") {
                User.findById(user.friends[friend].friendID, (err, friend) => {
                    if (err) res.status(500).send(err);
                    for (let venue in friend.flaggedvenues) {
                        if (friend.flaggedvenues[venue].placeID === req.params.placeID) {
                            let response = {
                                firstname: friend.firstname,
                                venueName: friend.flaggedvenues[venue].venueName,
                                reviewDescription: friend.flaggedvenues[venue].reviewDescription,
                                placeID: friend.flaggedvenues[venue].placeID
                            }
                            list.push(response)

                        }
                    }
                    return res.status(201).send(list)
                })
            }

        }

    })


})



module.exports = router;
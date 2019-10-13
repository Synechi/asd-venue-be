import express from "express";
import User from "../models/User";

var router = express.Router();

//Add Review
router.route("/addReview").post((req, res) => {
    var review = JSON.parse(JSON.stringify(req.body));
    console.log(review);

    console.log(review.rating);

    User.findById(review._userid, (err, user) => {
        if (err) {
            console.log(err);
        }
        else if (user && user._id) {
            if (review.thumbsUpDown == "thumbsUp") {
                user["flaggedvenues"].push({
                    reviewDescription: review.reviewDescription,
                    rating: review.rating,
                    // thumbsUp: review.thumbsUp
                    thumbsUp: true,
                    score: 0
                });
            }
            else if (review.thumbsUpDown == "thumbsDown") {
                user["flaggedvenues"].push({
                    reviewDescription: review.reviewDescription,
                    rating: review.rating,
                    // thumbsDown: review.thumbsDown
                    thumbsDown: true,
                    score: 0
                });
            }

            else {
                console.log("hellollllo");
                user["flaggedvenues"].push({
                    reviewDescription: review.reviewDescription,
                    rating: review.rating,
                    score: 0
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
        for (let friends in user.friends) {
            console.log(user.friends[friends].friendStatus)
            if (user.friends[friends].friendStatus === "Accepted") {
                User.findById(user.friends[friends].friendID, (err, friend) => {
                    if (err) res.status(500).send(err);
                    console.log(friend)
                    for (let venue in friend.flaggedvenues) {
                        console.log(friend.flaggedvenues[venue])
                        if (friend.flaggedvenues[venue].placeID === req.params.placeID) {
                            let response = {
                                firstname: friend.firstname,
                                _id: friend._id,
                                _venueid: friend.flaggedvenues[venue]._id,
                                venueName: friend.flaggedvenues[venue].venueName,
                                reviewDescription: friend.flaggedvenues[venue].reviewDescription,
                                placeID: friend.flaggedvenues[venue].placeID,
                                rating: friend.flaggedvenues[venue].rating,
                                score: friend.flaggedvenues[venue].score
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

router.route("/updateScore/:id/:friendid/:reviewid/:score").get((req, res) => {
    User.findById(req.params.friendid, (err, user) => {

        if (err) res.status(500).send(err);
        if (user === null) {
            res.status(500).send("null")
        } else {
            console.log(user.flaggedvenues)
            let reviewFlag = false;
            for (let reviews in user.flaggedvenues) {
                reviewFlag = true;
                if (user.flaggedvenues[reviews]._id == req.params.reviewid) {
                    let arr = new Array();
                    let flag = false;
                    arr = user.flaggedvenues[reviews].userRated
                    if (arr.length > 0) {
                        for (let ratedUser in user.flaggedvenues[reviews].userRated) {
                            if (user.flaggedvenues[reviews].userRated[ratedUser].userID == req.params.id) {
                                let oldUserRating = user.flaggedvenues[reviews].userRated[ratedUser].userRating;
                                var y = +req.params.score;
                                flag = true;
                                if (y == user.flaggedvenues[reviews].userRated[ratedUser].userRating) {
                                    user.flaggedvenues[reviews].userRated[ratedUser].userRating = 0;
                                    user.flaggedvenues[reviews].score = user.flaggedvenues[reviews].score - oldUserRating;
                                    user.save((err) => {
                                        if (err) res.status(500).send(err);
                                        else {
                                            return res.status(201).send({
                                                message: "User removed rating!"
                                            });
                                        }
                                    })

                                    break;
                                } else if (y == -1) {
                                    user.flaggedvenues[reviews].userRated[ratedUser].userRating = -1;
                                    user.flaggedvenues[reviews].score = (user.flaggedvenues[reviews].score - oldUserRating) + -1;
                                    user.save((err) => {
                                        if (err) res.status(500).send(err);
                                        else {
                                            return res.status(201).send({
                                                message: "User gave a thumbs down!"
                                            })
                                        }
                                    })
                                    break;

                                } else if (y == 1) {
                                    user.flaggedvenues[reviews].userRated[ratedUser].userRating = 1;
                                    user.flaggedvenues[reviews].score = (user.flaggedvenues[reviews].score - oldUserRating) + 1;
                                    user.save((err) => {
                                        if (err) res.status(500).send(err);
                                        else {
                                            return res.status(201).send({
                                                message: "User gave a thumbs up!"
                                            });
                                        }
                                    })
                                    break;
                                }
                            }
                        }
                        if (!flag) {
                            user.flaggedvenues[reviews].userRated.push({
                                "userRating": req.params.score,
                                "userID": req.params.id
                            })
                            user.flaggedvenues[reviews].score = user.flaggedvenues[reviews].score + +req.params.score;
                            console.log("User not found adding")
                            user.save((err) => {
                                if (err) res.status(500).send(err);
                                else {
                                    return res.status(201).send({
                                        message: "User rating updated!"
                                    });
                                }
                            })
                            break;
                        }

                    } else if (arr.length == 0) {
                        user.flaggedvenues[reviews].userRated.push({
                            "userRating": req.params.score,
                            "userID": req.params.id
                        })
                        user.flaggedvenues[reviews].score = user.flaggedvenues[reviews].score + req.params.score
                        console.log("Saving new user to rating.")
                        user.save((err) => {
                            if (err) res.status(500).send(err);
                            else {
                                return res.status(201).send({
                                    message: "User rating updated!"
                                });
                            }
                        })
                        break;
                    }



                }
            }
            if (reviewFlag == false) {
                res.status(201).send({
                    id1: user.flaggedvenues[reviews]._id,
                    id2: req.params.reviewid,
                    message: "No matching review"
                })

            }
        }

    })
})



module.exports = router;
var express = require("express");
var router = express.Router();
import User from "../models/User";
import { userInfo } from "os";

//Creates The Route For the Venue Flag
router.route('/venueFlag/:id').post((req, res, next) => {
    //Locates The ID Of The User That Has Logged In
    User.findById(req.params.id, (err, user) => {
    //Logs Any Errors In The Console
        if(err) console.log(err);
    else {
        //Stores The Venue Name & Venue Flag In The FlaggedVenues Array In The Database Based On The User's Information
        user["flaggedvenues"].push({
            venueName: req.body.venueName,
            venueFlag: req.body.venueFlag 
        })
    }
    user.save((err, user) => {
        { if (err) next(err);
        else 
        { 
            res.json(user); 
        }
    }
    }
    )}
)});
module.exports = router;
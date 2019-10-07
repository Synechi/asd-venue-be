var express = require("express");
var router = express.Router();
import User from "../models/User";
import { userInfo } from "os";

router.route('/venueFlag').post((req, res, next) => {
User.findById("5d626b1afa8afa89b5f13eb9", (err, user) => {
    if(err) console.log(err);
    else {
        user["flaggedvenues"].push({
            venueName: req.body.venueName,
            flag: req.body.flag 
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
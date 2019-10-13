var express = require("express");
var router = express.Router();
import User from "../models/User";
import { userInfo } from "os";

router.route('/venueFlag/:id').post((req, res, next) => {
User.findById(req.params.id, (err, user) => {
    if(err) console.log(err);
    else {
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
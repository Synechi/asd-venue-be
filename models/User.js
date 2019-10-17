/**
 * Bella L (24/08/19) - updated the user schema with the friends array.
 * Bella L (24/08/19) - updated the user schema to reflect Data Dictionary
 * Chantel D - includes venue review section
 */

import mongoose from "mongoose";
import Venuelists from "./Venuelists";

var crypto = require('crypto');

const Schema = mongoose.Schema;

let User = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  password: {
    type: String
  },

  hash: String,
  salt: String,

  venuelists: [Venuelists.schema],
  friends: [
    {
      friendID: Schema.Types.ObjectId,
      friendStatus: String,
      _id: false
    }
  ],

  //Creates The Flagged Venues Array In The Database & Determines Which Values Will Be Stored In This Array
  flaggedvenues: [
    {
      //Declares The VenueName Variable As A String
      venueName: String,
      //Declares The VenueName Variable As A String
      flag: String,
      reviewDescription: String,
      rating: String,
      thumbsUp: Boolean,
      placeID: String,
      date: String,
      venueFlag: String,
      score: Number,
      userRated: [
        {
          userRating: Number,
          userID: String
        }
      ]
    }
  ]
});

// Password Encryption:

User.methods.setPassword = function (password) {
  // Schema.methods.setPassword = function(password) {
  //Create unique salt
  this.salt = crypto.randomBytes(16).toString("hex");
  //Hasing salt and password with 1000 itr
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

User.methods.validPassword = function (password) {
  // Schema.methods.validPassword = function(password) { 
  var hash = crypto.pbkdf2Sync(password,
    this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};


export default mongoose.model("User", User);

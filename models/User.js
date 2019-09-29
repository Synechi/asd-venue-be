/**
 * Bella L (24/08/19) - updated the user schema with the friends array.
 * Bella L (24/08/19) - updated the user schema to reflect Data Dictionary
 *
 */

import mongoose from "mongoose";
import Venuelists from "./Venuelists";

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
  phoneNumber: {
    type: String
  },
  password: {
    type: String
  },
  venuelists: [Venuelists.schema],
  friends: [
    {
      friendID: Schema.Types.ObjectId,
      friendStatus: String,
      _id: false
    }
  ],
  flaggedvenues: [
    {
      venueName: String,
      flag: String,
      reviewDescription: String,
      ratings: String,
      thumbsUp: Boolean,
      placeID: String,
      date: String
    }
  ]
});



// Password Encryption:

// Schema.methods.setPassword = function(password) {
//   //Create unique salt
//   this.salt = crypto.randomBytes(16).toString("hex");
//   //Hasing salt and password with 1000 itr
//   this.hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
//     .toString("hex");
// };

export default mongoose.model("User", User);

/**
 * Bella L (24/08/19) - updated the user schema with the User_Friends array.
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
      flag: String
    }
  ]
});

export default mongoose.model("User", User);

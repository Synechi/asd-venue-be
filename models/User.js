/**
 * Bella L (24/08/19) - updated the user schema with the User_Friends object.
 * Bella L (24/08/19) - updated the user schema to reflect Data Dictionary
 * 
 */

import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
  
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  emailAddress: {
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
  USER_FRIENDS: [{
    friendID: Schema.Types.ObjectId,  
    friendStatus: String,
    _id: false
  }], 
      
  preference: {
    type: String
  }
});

export default mongoose.model("User", User);

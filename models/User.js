/**
 * Bella L (24/08/19) - updated the user schema with the User_Friends array.
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
  password: {
    type: String
  },
  friends: [{
    friendID: Schema.Types.ObjectId,  
    friendStatus: String,
    _id: false
  }] 
      
});

export default mongoose.model("User", User);

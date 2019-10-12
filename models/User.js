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
  flaggedvenues: [
    {
      venueName: String,
      flag: String,
      reviewDescription: String,
      rating: String,
      thumbsUp: Boolean,
      thumbsDown: Boolean
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

// // Method to check the entered password is correct or not 
// // valid password method checks whether the user 
// // password is correct or not 
// // It takes the user password from the request  
// // and salt from user database entry 
// // It then hashes user password and salt 
// // then checks if this generated hash is equal 
// // to user's hash in the database or not 
// // If the user's hash is equal to generated hash  
// // then the password is correct otherwise not 
// Schema.methods.validPassword = function(password) { 
//   var hash = crypto.pbkdf2Sync(password,  
//   this.salt, 1000, 64, `sha512`).toString(`hex`); 
//   return this.hash === hash; 
// }; 

// // Exporting module to allow it to be imported in other files 
// const User = module.exports = mongoose.model('User', Schema); 


export default mongoose.model("User", User);

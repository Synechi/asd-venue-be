import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  pword: {
    type: String
  }
});

export default mongoose.model("User", User);

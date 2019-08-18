import mongoose from "mongoose";

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
  preference: {
    type: String
  }
});

export default mongoose.model("User", User);

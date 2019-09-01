import mongoose from "mongoose";
import { userInfo } from "os";

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
  password: {
    type: String
  },
  venuelists: [{
    name: String,
    colour: String
  }]
});

export default mongoose.model("User", User);




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
  password: {
    type: String
  },
  venuelists: [Venuelists.schema]
});

export default mongoose.model("User", User);

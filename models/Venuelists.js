import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Venuelist = new Schema({
  name: {
    type: String
  },
  colour: {
    type: String
  }
});

export default mongoose.model("Venuelist", Venuelist);

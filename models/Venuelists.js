import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Venuelist = new Schema({
  name: {
    type: String
  },
  colour: {
    type: String
  },
  venues: [
    {
      placeID: String
    }
  ]
});

export default mongoose.model("Venuelist", Venuelist);

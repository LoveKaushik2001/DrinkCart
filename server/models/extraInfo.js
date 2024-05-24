import mongoose from "mongoose";

const extraInfoSchema = mongoose.Schema({
  customerId: String,
  timeStamp: String,
  coords: {
    lat: String,
    lng: String,
  },
  bottlesCollected: {
    type: Number,
    default: 0,
  },
  bottlesRemaining: {
    type: Number,
    default: 0,
  },
  hasAnyData: {
    type: Boolean,
    default: false,
  },
});

const ExtraInfo = mongoose.model("ExtraInfoSchema", extraInfoSchema);
export default ExtraInfo;

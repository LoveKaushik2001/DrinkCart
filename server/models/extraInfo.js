import mongoose from "mongoose";

const extraInfoSchema = mongoose.Schema({
  customerId: String,
  timeStamp: String,
  coords: {
    lat: String,
    lng: String,
  },
  hasAnyData: {
    type: Boolean,
    default: false,
  },
});

const ExtraInfo = mongoose.model("ExtraInfoSchema", extraInfoSchema);
export default ExtraInfo;

import mongoose from "mongoose";

const extraInfoSchema = mongoose.Schema({
  customerId: String,
  customerName: String,
  address: {
    type: String,
    default: "",
  },
  routeBoy: {
    type: String,
    default: "",
  },
  distanceFromLastPoint: {
    type: Number,
    default: 0,
  },
  timeStamp: String,
  coords: {
    lat: String,
    lng: String,
  },
  origin: {
    lat: String,
    lng: String,
  },
  lastPoint: {
    lat: String,
    lng: String,
  },
  bottlesDelivered: {
    type: Number,
    default: 0,
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

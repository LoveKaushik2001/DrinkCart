import mongoose from "mongoose";

const deliverySchema = mongoose.Schema({
  customerId: String,
  deliveryPoint: {
    type: String,
    default: "",
  },
  deliveryRoute: {
    type: String,
    default: "unspecified",
  },
  deliveryOrder: Number,
  deliveryStatus: {
    type: String,
    default: "To Deliver",
  },
  gloriousRed: {
    type: Number,
    default: 0,
  },
  greenDetox: {
    type: Number,
    default: 0,
  },
  shikanji: {
    type: Number,
    default: 0,
  },
  mint: {
    type: Number,
    default: 0,
  },
  sproutSalad: {
    type: Number,
    default: 0,
  },
  quinoaSalad: {
    type: Number,
    default: 0,
  },
});

const DeliveryInfo = mongoose.model("DeliveryInfo", deliverySchema);
export default DeliveryInfo;

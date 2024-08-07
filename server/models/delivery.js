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
  roseKatira: {
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
  farmSalad: {
    type: Number,
    default: 0,
  },
  quinoaSalad: {
    type: Number,
    default: 0,
  },
  pohaMeal: {
    type: Number,
    default: 0,
  },
  upmaMeal: {
    type: Number,
    default: 0,
  },
  theplaMeal: {
    type: Number,
    default: 0,
  },
  appeMeal: {
    type: Number,
    default: 0,
  },
});

const DeliveryInfo = mongoose.model("DeliveryInfo", deliverySchema);
export default DeliveryInfo;

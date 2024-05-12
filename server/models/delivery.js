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
  timeOfContact: {
    type: String,
    default: "",
  },
  gloriousRed: {
    type: Number,
    default: 0,
  },
  greenDetox: {
    type: Number,
    default: 0,
  },
  soup: {
    type: Number,
    default: 0,
  },
  salad: {
    type: Number,
    default: 0,
  },
});

const DeliveryInfo = mongoose.model("DeliveryInfo", deliverySchema);
export default DeliveryInfo;

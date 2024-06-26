import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  customerId: String,
  customerName: String,
  phoneNumber: String,
  address: String,
  organization: {
    type: String,
    default: "",
  },
  location: {
    lat: String,
    lng: String,
  },
  deliveredItemsTillDate: {
    gloriousRed: {
      type: Number,
      default: 0,
    },
    greenDetox: {
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
    farmSalad: {
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
    poha: {
      type: Number,
      default: 0,
    },
    upma: {
      type: Number,
      default: 0,
    },
    thepla: {
      type: Number,
      default: 0,
    },
  },
  bottlesToBeCollected: {
    type: Number,
    default: 0,
  },
  discountAvailed: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    default: "",
  },
});

const CustomerInfo = mongoose.model("CustomerInfo", customerSchema);
export default CustomerInfo;

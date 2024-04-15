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
    salad: {
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
  },
  bottlesRemaining: {
    gloriousRed: {
      type: Number,
      default: 0,
    },
    greenDetox: {
      type: Number,
      default: 0,
    },
    salad: {
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
  },
  discountAvailed: {
    type: Number,
    default: 0,
  },
});

const CustomerInfo = mongoose.model("CustomerInfo", customerSchema);
export default CustomerInfo;

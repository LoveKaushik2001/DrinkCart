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
    papayaPunch: {
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
    gardenGlow: {
      type: Number,
      default: 0,
    },
    whiteDetox: {
      type: Number,
      default: 0,
    },
    dhoklaMeal: {
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
    kebabMeal: {
      type: Number,
      default: 0,
    },
    sundaySpecial: {
      type: Number,
      default: 0,
    },
    noirChoclate: {
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

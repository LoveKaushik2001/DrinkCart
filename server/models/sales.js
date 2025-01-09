import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const saleSchema = mongoose.Schema(
  {
    salesPersonName: {
      type: String,
      required: true,
      trim: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    chocolates: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      default: null,
    },
    location: {
      type: locationSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", saleSchema);
export default Sales;

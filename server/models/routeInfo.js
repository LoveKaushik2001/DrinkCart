import mongoose from "mongoose";

const routeSchema = mongoose.Schema({
  address: String,
  gloriousRed: Number,
  papayaPunch: Number,
  greenDetox: Number,
  roseKatira: Number,
  whiteDetox: Number,
  quinoaSalad: Number,
  gardenGlow: Number,
  sproutSalad: Number,
  farmSalad: Number,
  dhoklaMeal: Number,
  upmaMeal: Number,
  theplaMeal: Number,
  appeMeal: Number,
  kebabMeal: Number,
  sundaySpecial: Number,
  noirChoclate: Number,
  route: String,
  total: Number,
});

const RouteInfo = mongoose.model("RouteInfo", routeSchema);
export default RouteInfo;

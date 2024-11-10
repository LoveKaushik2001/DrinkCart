import mongoose from "mongoose";

const routeSchema = mongoose.Schema({
  address: String,
  gloriousRed: Number,
  papayaPunch: Number,
  greenDetox: Number,
  roseKatira: Number,
  kokam: Number,
  quinoaSalad: Number,
  shikanji: Number,
  sproutSalad: Number,
  farmSalad: Number,
  dhoklaMeal: Number,
  upmaMeal: Number,
  theplaMeal: Number,
  appeMeal: Number,
  sabudanaKhichdi: Number,
  sabudanaCutlet: Number,
  paneerKheer: Number,
  route: String,
  total: Number,
});

const RouteInfo = mongoose.model("RouteInfo", routeSchema);
export default RouteInfo;

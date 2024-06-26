import mongoose from "mongoose";

const routeSchema = mongoose.Schema({
  address: String,
  gloriousRed: Number,
  greenDetox: Number,
  greenMint: Number,
  quinoaSalad: Number,
  shikanji: Number,
  sproutSalad: Number,
  farmSalad: Number,
  poha: Number,
  upma: Number,
  thepla: Number,
  route: String,
  total: Number,
});

const RouteInfo = mongoose.model("RouteInfo", routeSchema);
export default RouteInfo;

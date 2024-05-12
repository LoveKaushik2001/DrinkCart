import express from "express";
import RouteInfo from "../models/routeInfo.js";

const router = express.Router();

// Get All route
export const getAllRouteInfo = async (req, res) => {
  try {
    const data = await RouteInfo.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json("No data found");
    console.log("in error getRouteInfo", error);
  }
};

// Add route
export const addRouteSheet = async (req, res) => {
  const routeData = req.body;
  try {
    await RouteInfo.deleteMany();
    const result = await RouteInfo.insertMany(routeData);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

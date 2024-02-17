import express from "express";
import DeliveryInfo from "../models/delivery.js";

const router = express.Router();

// Get Delivery Data for all customers
export const getAllDeliveryInfo = async (req, res) => {
  try {
    const deliveries = await DeliveryInfo.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add Delivery sheet
export const addDeliverySheet = async (req, res) => {
  const deliveryData = req.body;
  try {
    await DeliveryInfo.deleteMany();
    const result = await DeliveryInfo.insertMany(deliveryData);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

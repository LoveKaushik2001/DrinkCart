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

//update status
export const updateStatus = async (req, res) => {
  const dateTime = new Date();
  const currTime = dateTime.getHours() + " : " + dateTime.getMinutes();
  const { ids, status } = req.body;
  const condition = { customerId: { $in: ids } };
  const update = { deliveryStatus: status, timeOfContact: currTime };
  try {
    const result = await DeliveryInfo.updateMany(condition, update);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

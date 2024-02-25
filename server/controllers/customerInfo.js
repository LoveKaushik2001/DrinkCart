import express from "express";
import CustomerInfo from "../models/customerInfo.js";

const router = express.Router();

// Get All customers
export const getAllCustomersInfo = async (req, res) => {
  try {
    const data = await CustomerInfo.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json("No data found");
    console.log("in error getCustomerInfo", error);
  }
};

// Add customer
export const addCustomerInfo = async (req, res) => {
  const customerData = req.body.customerData;
  const needToDrop = req.body.needToDrop;
  try {
    console.log(customerData);
    if (needToDrop) await CustomerInfo.deleteMany();
    const result = await CustomerInfo.insertMany(customerData);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

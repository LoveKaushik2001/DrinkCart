import express from "express";
import Sales from "../models/sales.js";

const router = express.Router();

export const setSaleInfo = async (req, res) => {
  const formData = req.body;
  console.log(req.body);
  try {
    const result = await Sales.insertMany(formData);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getSalesInfo = async (req, res) => {
  try {
    const saleInfo = await Sales.find();
    res.status(200).json(saleInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import express from "express";
import Sales from "../models/sales.js";

const router = express.Router();

export const setSaleInfo = async (req, res) => {
  const formData = req.body;
  try {
    const result = await Sales.insertMany(formData);
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getSalesInfo = async (req, res) => {
  try {
    const saleInfo = await Sales.find()
      .sort({ createdAt: -1 })
      .allowDiskUse(true);
    res.status(200).json(saleInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteSaleInfo = async (req, res) => {
  try {
    const formId = req.params.id;
    const deletedForm = await Sales.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

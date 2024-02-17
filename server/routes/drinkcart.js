import express from "express";
import {
  getAllCustomersInfo,
  addCustomerInfo,
} from "../controllers/customerInfo.js";
import {
  addDeliverySheet,
  getAllDeliveryInfo,
} from "../controllers/delivery.js";
const router = express.Router();
router.get("/getAllCustomers", getAllCustomersInfo);
router.post("/addCustomer", addCustomerInfo);
router.get("/getAllDeliveries", getAllDeliveryInfo);
router.post("/addDeliverySheet", addDeliverySheet);

export default router;

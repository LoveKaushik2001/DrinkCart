import express from "express";
import {
  getAllCustomersInfo,
  addCustomerInfo,
} from "../controllers/customerInfo.js";
import {
  addDeliverySheet,
  getAllDeliveryInfo,
  updateStatus,
} from "../controllers/delivery.js";
import { addRouteSheet, getAllRouteInfo } from "../controllers/routeInfo.js";
import {
  initExtraInfo,
  updateExtraInfo,
  getExtraInfo,
  updateBottleCollectionCount,
} from "../controllers/extraInfo.js";
import { setSaleInfo, getSalesInfo } from "../controllers/sales.js";
const router = express.Router();
router.get("/getAllCustomers", getAllCustomersInfo);
router.post("/addCustomer", addCustomerInfo);

router.get("/getAllDeliveries", getAllDeliveryInfo);
router.post("/addDeliverySheet", addDeliverySheet);
router.patch("/updateStatus", updateStatus);

router.get("/getAllRouteInfo", getAllRouteInfo);
router.post("/addRouteSheet", addRouteSheet);

router.post("/extraInfoInit", initExtraInfo);
router.patch("/updateExtraInfo", updateExtraInfo);
router.patch("/updateBottleCollectionCount", updateBottleCollectionCount);
router.get("/getExtraInfo", getExtraInfo);

router.post("/setSaleInfo", setSaleInfo);
router.get("/getSalesInfo", getSalesInfo);
export default router;

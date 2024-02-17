import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getAllCustomersInfo = () => API.get("/drinkcart/getAllCustomers");

export const addCustomerInfo = (customerData: any, needToDrop = false) =>
  API.post("/drinkcart/addCustomer", { customerData, needToDrop });

export const getAllDeliveriesInfo = () =>
  API.get("/drinkcart/getAllDeliveries");

export const addDeliverySheet = (deliverySheet: any) =>
  API.post("/drinkcart/addDeliverySheet", deliverySheet);

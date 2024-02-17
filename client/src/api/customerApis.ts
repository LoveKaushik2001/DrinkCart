import axios from "axios";

const API = axios.create({
  baseURL: "https://drink-cart-api.vercel.app",
});

export const getAllCustomersInfo = () => API.get("/drinkcart/getAllCustomers");

export const addCustomerInfo = (customerData: any, needToDrop = false) =>
  API.post("/drinkcart/addCustomer", { customerData, needToDrop });

export const getAllDeliveriesInfo = () =>
  API.get("/drinkcart/getAllDeliveries");

export const addDeliverySheet = (deliverySheet: any) =>
  API.post("/drinkcart/addDeliverySheet", deliverySheet);

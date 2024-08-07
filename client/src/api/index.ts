import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "https://drink-cart-api.vercel.app",
});

export const getAllCustomersInfo = () => API.get("/drinkcart/getAllCustomers");

export const addCustomerInfo = (customerData: any, needToDrop = false) =>
  API.post("/drinkcart/addCustomer", { customerData, needToDrop });

export const getAllDeliveriesInfo = () =>
  API.get("/drinkcart/getAllDeliveries");

export const addDeliverySheet = (deliverySheet: any) =>
  API.post("/drinkcart/addDeliverySheet", deliverySheet);

export const updateDeliveryStatus = (ids: string[], status: string) =>
  API.patch(`/drinkcart/updateStatus`, { ids, status });

export const updateExtraInfo = (id: string, extraData: any) =>
  API.patch(`/drinkCart/updateExtraInfo`, { id, extraData });

export const updateBottleCollectionCount = (id: string, extraData: any) =>
  API.patch(`/drinkCart/updateBottleCollectionCount`, { id, extraData });

export const initExtraInfo = async (data: any) => {
  API.post(`/drinkCart/extraInfoInit`, data);
};

export const getExtraInfo = () => API.get("/drinkcart/getExtraInfo");

export const addRouteSheet = (routeSheet: any) =>
  API.post("/drinkcart/addRouteSheet", routeSheet);

export const getAllRouteInfo = () => API.get("/drinkcart/getAllRouteInfo");

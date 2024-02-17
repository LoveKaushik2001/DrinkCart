import { ICustomerInfo, IItems } from "./customerInfo";

export interface IDeliveryInfo {
  customerId: string;
  deliveryOrder: number;
  deliveryStatus: string;
  gloriousRed: number;
  greenDetox: number;
  salad: number;
  soup: number;
}

export interface IMasterDeliveryInfo {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  deliveryOrder: number;
  deliveryStatus: string;
  itemsToBeDelivered: IItems;
  itemsToBeCollected: IItems;
}

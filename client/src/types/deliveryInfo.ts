import { ICustomerInfo, IItems } from "./customerInfo";

export interface IDeliveryInfo {
  customerId: string;
  deliveryPoint: string;
  deliveryOrder: number;
  deliveryStatus: string;
  gloriousRed: number;
  greenDetox: number;
  salad: number;
  soup: number;
}

export interface IClubbedData {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  organization: string;
  deliveryPoint: string;
  address: string;
  deliveryOrder: number;
  deliveryStatus: string;
  itemsToBeDelivered: IItems;
  itemsToBeCollected: IItems;
}

export interface IMasterData {
  organization: string;
  masterData: IClubbedData[];
  deliveryOrder: number;
  deliveryStatus: string;
}

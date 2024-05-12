import { ICustomerInfo, IItems, ILocationCoordinates } from "./customerInfo";

export interface IDeliveryInfo {
  customerId: string;
  deliveryPoint: string;
  deliveryRoute: string;
  deliveryOrder: number;
  deliveryStatus: string;
  timeOfContact: string;
  gloriousRed: number;
  greenDetox: number;
  sproutSalad: number;
  quinoaSalad: number;
  shikanji: number;
  mint: number;
}

export interface IClubbedData {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  location: ILocationCoordinates;
  organization: string;
  deliveryPoint: string;
  deliveryRoute: string;
  address: string;
  deliveryOrder: number;
  deliveryStatus: string;
  timeOfContact: string;
  itemsToBeDelivered: IItems;
  itemsToBeCollected: IItems;
}

export interface IMasterData {
  organization: string;
  masterData: IClubbedData[];
  deliveryOrder: number;
  deliveryStatus: string;
  timeOfContact: string;
}

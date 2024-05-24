import { ICustomerInfo, IItems, ILocationCoordinates } from "./customerInfo";

export interface IDeliveryInfo {
  customerId: string;
  deliveryPoint: string;
  deliveryRoute: string;
  deliveryOrder: number;
  deliveryStatus: string;
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
  itemsToBeDelivered: IItems;
  bottlesToBeCollected: Number;
}

export interface IMasterData {
  organization: string;
  masterData: IClubbedData[];
  deliveryOrder: number;
  deliveryStatus: string;
}

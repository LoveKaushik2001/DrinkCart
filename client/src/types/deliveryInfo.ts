import { ICustomerInfo, IItems, ILocationCoordinates } from "./customerInfo";

export interface IDeliveryInfo {
  customerId: string;
  deliveryPoint: string;
  deliveryRoute: string;
  deliveryOrder: number;
  deliveryStatus: string;
  gloriousRed: number;
  papayaPunch: number;
  greenDetox: number;
  roseKatira: number;
  sproutSalad: number;
  quinoaSalad: number;
  farmSalad: number;
  shikanji: number;
  kokam: number;
  dhoklaMeal: number;
  upmaMeal: number;
  theplaMeal: number;
  appeMeal: number;
  sabudanaKhichdi: number;
  sabudanaCutlet: number;
  paneerKheer: number;
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
  note: string;
}

export interface IMasterData {
  organization: string;
  masterData: IClubbedData[];
  deliveryOrder: number;
  deliveryStatus: string;
}

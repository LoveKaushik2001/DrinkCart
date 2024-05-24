export interface ICustomerInfo {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  organization: string;
  deliveredItemsTillDate: IItems;
  location: ILocationCoordinates;
  bottlesToBeCollected: Number;
  discountAvailed: number;
}

export interface IItems {
  gloriousRed: number;
  greenDetox: number;
  sproutSalad: number;
  quinoaSalad: number;
  shikanji: number;
  mint: number;
}

export interface ILocationCoordinates {
  lat: string;
  lng: string;
}

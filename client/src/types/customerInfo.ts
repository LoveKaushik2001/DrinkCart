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
  note: string;
}

export interface IItems {
  gloriousRed: number;
  greenDetox: number;
  roseKatira: number;
  sproutSalad: number;
  quinoaSalad: number;
  pohaMeal: number;
  upmaMeal: number;
  theplaMeal: number;
  appeMeal: number;
  farmSalad: number;
  shikanji: number;
  mint: number;
}

export interface ILocationCoordinates {
  lat: string;
  lng: string;
}

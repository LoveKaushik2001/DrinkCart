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
  papayaPunch: number;
  greenDetox: number;
  roseKatira: number;
  sproutSalad: number;
  quinoaSalad: number;
  dhoklaMeal: number;
  upmaMeal: number;
  theplaMeal: number;
  appeMeal: number;
  farmSalad: number;
  gardenGlow: number;
  whiteDetox: number;
  kebabMeal: number;
  sundaySpecial: number;
  noirChoclate: number;
}

export interface ILocationCoordinates {
  lat: string;
  lng: string;
}

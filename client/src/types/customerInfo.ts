export interface ICustomerInfo {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  organization: string;
  deliveredItemsTillDate: IItems;
  location: ILocationCoordinates;
  bottlesRemaining: IItems;
  discountAvailed: number;
}

export interface IItems {
  gloriousRed: number;
  greenDetox: number;
  salad: number;
  soup: number;
}

export interface ILocationCoordinates {
  lat: string;
  lng: string;
}

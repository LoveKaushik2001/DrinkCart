export interface ICustomerInfo {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  deliveredItemsTillDate: IItems;
  bottlesRemaining: IItems;
  discountAvailed: number;
}

export interface IItems {
  gloriousRed: number;
  greenDetox: number;
  salad: number;
  soup: number;
}

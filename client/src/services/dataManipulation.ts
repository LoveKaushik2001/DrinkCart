import {
  ICustomerInfo,
  IDeliveryInfo,
  IItems,
  IMasterDeliveryInfo,
} from "@/types";

export const createFinalData = (
  customers: ICustomerInfo[],
  deliveries: IDeliveryInfo[]
) => {
  return deliveries
    .map((delivery) => {
      const customerData = customers.filter(
        (customer) => customer.customerId === delivery.customerId
      )[0];
      return {
        customerId: delivery.customerId,
        customerName: customerData.customerName,
        phoneNumber: customerData.phoneNumber,
        address: customerData.address,
        deliveryStatus: delivery.deliveryStatus,
        deliveryOrder: delivery.deliveryOrder,
        itemsToBeDelivered: {
          gloriousRed: delivery.gloriousRed,
          greenDetox: delivery.greenDetox,
          salad: delivery.salad,
          soup: delivery.soup,
        } as IItems,
        itemsToBeCollected: {
          gloriousRed: customerData.bottlesRemaining.gloriousRed,
          greenDetox: customerData.bottlesRemaining.greenDetox,
          salad: 0,
          soup: customerData.bottlesRemaining.soup,
        } as IItems,
      } as IMasterDeliveryInfo;
    })
    .sort((a, b) => {
      if (a.deliveryOrder < b.deliveryOrder) {
        return -1;
      } else if (a.deliveryOrder > b.deliveryOrder) {
        return 1;
      } else {
        return 0;
      }
    });
};

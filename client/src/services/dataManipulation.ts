import { DeliveryPoint } from "@/constants";
import {
  ICustomerInfo,
  IDeliveryInfo,
  IMasterData,
  IItems,
  IClubbedData,
} from "@/types";

export const createFinalData = (
  customers: ICustomerInfo[],
  deliveries: IDeliveryInfo[]
) => {
  const masterData = getMasterData(customers, deliveries);
  const finalData = [] as IMasterData[];
  masterData.forEach((data) => {
    if (
      !data.organization?.trim() ||
      (data.organization && data.deliveryPoint !== DeliveryPoint.ORGANIZATION)
    ) {
      finalData.push({
        organization: "",
        masterData: [data],
        deliveryOrder: data.deliveryOrder,
        deliveryStatus: data.deliveryStatus,
        timeOfContact: data.timeOfContact,
      });
    } else {
      const organizationExist = finalData.findIndex(
        (item) => item.organization === data.organization
      );
      if (organizationExist >= 0) {
        finalData[organizationExist].masterData.push(data);
      } else {
        finalData.push({
          organization: data.organization,
          masterData: [data],
          deliveryOrder: data.deliveryOrder,
          deliveryStatus: data.deliveryStatus,
          timeOfContact: data.timeOfContact,
        });
      }
    }
  });
  return finalData.sort((a, b) => {
    if (a?.deliveryOrder < b?.deliveryOrder) {
      return -1;
    } else if (a?.deliveryOrder > b?.deliveryOrder) {
      return 1;
    } else {
      return 0;
    }
  });
};

const getMasterData = (
  customers: ICustomerInfo[],
  deliveries: IDeliveryInfo[]
) => {
  return deliveries.map((delivery) => {
    const customerData = customers.filter(
      (customer) => customer.customerId === delivery.customerId
    )[0];
    return {
      customerId: delivery.customerId,
      timeOfContact: delivery.timeOfContact,
      customerName: customerData.customerName,
      phoneNumber: customerData.phoneNumber,
      location: customerData.location,
      address: customerData.address,
      deliveryStatus: delivery.deliveryStatus,
      deliveryOrder: delivery.deliveryOrder,
      organization: customerData.organization,
      deliveryPoint: delivery.deliveryPoint,
      deliveryRoute: delivery.deliveryRoute,
      itemsToBeDelivered: {
        gloriousRed: delivery.gloriousRed,
        greenDetox: delivery.greenDetox,
        sproutSalad: delivery.sproutSalad,
        quinoaSalad: delivery.quinoaSalad,
        shikanji: delivery.shikanji,
        mint: delivery.mint,
      } as IItems,
      itemsToBeCollected: {
        gloriousRed: customerData.bottlesRemaining.gloriousRed,
        greenDetox: customerData.bottlesRemaining.greenDetox,
        sproutSalad: 0,
        quinoaSalad: 0,
        shikanji: customerData.bottlesRemaining.shikanji,
        mint: customerData.bottlesRemaining.mint,
      } as IItems,
    } as IClubbedData;
  });
};

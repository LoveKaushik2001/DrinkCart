<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { getAllCustomersInfo, getAllDeliveriesInfo, updateDeliveryStatus, updateBottleCollectionCount } from '@/api';
import { ICustomerInfo, IDeliveryInfo, IMasterData } from '@/types';
import { DeliveryStatus } from '@/constants';
import { calculateDistance, createFinalData } from '@/services';
import StatusList from './StatusList.vue';
import RouteSelection from './RouteSelection.vue';
import { getExtraInfo } from '@/api';
const customerData = ref([] as ICustomerInfo[]);
const deliveryData = ref([] as IDeliveryInfo[]);
const masterData = ref([] as IMasterData[]);
const toDeliver = ref([] as IMasterData[]);
const delivered = ref([] as IMasterData[]);
const notDelivered = ref([] as IMasterData[]);
const deliveryStatus = ref(['To Deliver', 'Delivered', 'Not Delivered']);
const statusList = computed(() => {
    return [toDeliver.value, delivered.value, notDelivered.value];
})
const showModal = ref(true);
const routePaths = ref([] as string[]);
const activeRoutePath = ref('');
const finalDistance = ref(0);
onMounted(async () => {
    try {
        await getData();
        routePaths.value = [...new Set(masterData.value.map(data => data.masterData[0].deliveryRoute))];
    } catch (error) {
        console.log(error);
    }
})
const getData = async () => {
    customerData.value = (await getAllCustomersInfo()).data as ICustomerInfo[];
    deliveryData.value = (await getAllDeliveriesInfo()).data as IDeliveryInfo[];
    if (customerData.value.length && deliveryData.value.length) {
        masterData.value = createFinalData(customerData.value, deliveryData.value);
    }
    updateList();
}
const updateList = () => {
    toDeliver.value = masterData.value.filter(data => data.deliveryStatus === DeliveryStatus.TO_DELIVER);
    delivered.value = masterData.value.filter(data => data.deliveryStatus === DeliveryStatus.DELIVERED);
    notDelivered.value = masterData.value.filter(data => data.deliveryStatus === DeliveryStatus.NOT_DELIVERED);
}

const changeStatus = async (event: any) => {
    const ids = [] as string[];
    if (event.isOrganization) {
        masterData.value = masterData.value.map(data => {
            if (data.organization === event.organization) {
                data.deliveryStatus = event.status;
                data.masterData.forEach(customer => {
                    customer.deliveryStatus = event.status
                    ids.push(customer.customerId);
                });
            }
            return data;
        })
    } else {
        masterData.value = masterData.value.map(data => {
            if (data.masterData.length === 1 && data.masterData[0].customerId === event.id) {
                ids.push(data.masterData[0].customerId);
                data.deliveryStatus = data.masterData[0].deliveryStatus = event.status
            }
            return data;
        })
    }
    await updateDeliveryDbs(ids, event.status);
    await updateBottleCollectionCount(ids[0], { bottlesCollected: event.bottlesCollected, bottlesRemaining: event.bottlesRemaining, bottlesDelivered: event.bottlesDelivered, routeBoy: event.routeBoy });
    updateList();
}
const updateDeliveryDbs = async (ids: string[], status: string) => {
    try {
        await updateDeliveryStatus(ids, status);
    } catch (error) {
        alert('Something went wrong while update.');
        location.reload();
    }
}
const changeRoute = async (selectedOption: string) => {
    activeRoutePath.value = selectedOption;
    masterData.value = masterData.value.filter(data => data.masterData[0].deliveryRoute === selectedOption);
    updateList();
}
const lastDeliveryTime = ref('00:00:00');
const bottlesDelivered = ref(0);
const bottlesCollected = ref(0);
const lastCoords = ref(null as any);
const clicked = ref(false);
const showDistance = async () => {
    const result = (await getExtraInfo()).data;
    const resultWithData = result.filter((res: any) => res.hasAnyData);
    resultWithData.forEach((res: any) => {
        if (res.routeBoy.toLowerCase() === activeRoutePath.value.toLowerCase()) {
            finalDistance.value += res.distanceFromLastPoint;
            bottlesCollected.value += res.bottlesCollected;
            bottlesDelivered.value += res.bottlesDelivered;
            if (res.timeStamp > lastDeliveryTime.value) {
                lastDeliveryTime.value = res.timeStamp;
                lastCoords.value = res.lastPoint;
            }
        }
    })
    const lastDist = (await calculateDistance(resultWithData[0].lastPoint, resultWithData[0].origin)) || 0;
    finalDistance.value += lastDist;
    clicked.value = true;
}
const startJourney = computed(() => {
    return !!localStorage.length;
})
const clearLocal = () => {
    localStorage.removeItem('lastDeliveryPoint');
}
</script>
<template>
    <RouteSelection v-if="showModal && routePaths?.length" @close-modal="showModal = false" :options="routePaths"
        @save-route="changeRoute" />
    <div class="flex flex-col gap-5 max-w-50 items-center justify-center">
        <button @click="clearLocal()" v-if="startJourney" :class="[' bg-teal-50rounded-md border-2 p-1']">Start
            Journey</button>
        <button class="rounded-md bg-lime-100 p-2" @click="showDistance">Know your Delivery Info</button>
    </div>
    <div v-if="clicked">
        <p>
            Distance Traveled: {{ finalDistance }} KM
        </p>
        <p>
            Last Delivered at: {{ lastDeliveryTime }}
        </p>
        <p>
            Bottles Delivered: {{ bottlesDelivered }}
        </p>
        <p>
            Bottles Collected: {{ bottlesCollected }}
        </p>
        <p>
            Last Delivery Coordinates: {{ }}
        </p>
    </div>
    <div class="w-full max-w-md px-2 py-16 sm:px-0">
        Current Active Route: <span class="key-heading">{{ activeRoutePath }}</span>
        <TabGroup>
            <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab v-for="(status, idx) in deliveryStatus" as="template" :key="idx" v-slot="{ selected }">
                    <button :class="[
        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
        selected
            ? 'bg-white text-blue-700 shadow'
            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
    ]">
                        {{ status }}
                    </button>
                </Tab>
            </TabList>
            <TabPanels class="mt-2">
                <TabPanel v-for="(list, idx) in statusList" :key="idx" :class="[
        'rounded-xl bg-white p-3',
        'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
    ]">
                    <StatusList v-if="list.length" :list="list" @change-status="changeStatus"
                        :key="statusList.toString()" />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
<style lang="scss">
.button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.button:hover {
    background-color: #0056b3;
}

.key-heading {
    font-size: 20px;
    margin-top: 15px;
    background-color: #34D399;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
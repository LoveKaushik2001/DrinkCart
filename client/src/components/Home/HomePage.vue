<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { getAllCustomersInfo, getAllDeliveriesInfo, updateDeliveryStatus } from '@/api';
import { ICustomerInfo, IDeliveryInfo, IMasterData } from '@/types';
import { DeliveryStatus } from '@/constants';
import { createFinalData } from '@/services';
import StatusList from './StatusList.vue';
const customerData = ref([] as ICustomerInfo[]);
const deliveryData = ref([] as IDeliveryInfo[]);
const masterData = ref([] as IMasterData[])
const toDeliver = ref([] as IMasterData[]);
const delivered = ref([] as IMasterData[]);
const notDelivered = ref([] as IMasterData[]);
const deliveryStatus = ref(['To Deliver', 'Delivered', 'Not Delivered']);
const statusList = computed(() => {
    return [toDeliver.value, delivered.value, notDelivered.value];
})
onMounted(async () => {
    try {
        await getData();
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
</script>
<template>
    <div class="w-full max-w-md px-2 py-16 sm:px-0">
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
<style lang="scss"></style>
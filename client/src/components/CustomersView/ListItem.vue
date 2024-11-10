<template>
    <div class="delivery-info">
        <Disclosure v-slot="{ open }">
            <DisclosureButton class="disclosure-button" :style="deliveryToMake ? '' : 'background-color:#e48c6b'"
                :class="{ open }">
                <div class="button-content">
                    <div class="address-wrapper">
                        <div class="customer-info">
                            <span class="address">{{ masterData.address }}</span>
                        </div>
                    </div>
                    <div class="chevron-wrapper">
                        <ChevronDownIcon class="toggle-icon" />
                    </div>
                </div>
            </DisclosureButton>
            <Transition name="fade">
                <DisclosurePanel class="details-panel" v-show="open">
                    <div class="flex flex-row gap-4">
                        <button v-if="masterData?.location?.lat?.trim() && masterData?.location?.lng?.trim()"
                            @click="openGoogleMaps(masterData.location)"
                            class="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                            <MapPinIcon class="map-pin-icon" />
                            <span class="cta-text">Open Map</span>
                        </button>
                        <button @click="recordCoordinates()"
                            class="flex items-center gap-1 text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-800">
                            <BookmarkIcon class="map-pin-icon" />
                            Add Location
                        </button>
                    </div>
                    <div class="contact-info">
                        <span class="customer-name">{{ masterData.customerName }}</span>
                        <div class="flex justify-between items-center">
                            <div>
                                <strong>Mobile Number:</strong>
                                <a :href="`tel:${masterData.phoneNumber}`">{{ masterData.phoneNumber }}</a>
                            </div>
                            <a :href="`https://wa.me/+91${formatMobileNumber(masterData.phoneNumber)}`" target="_blank">
                                <ChatBubbleOvalLeftEllipsisIcon class="map-pin-icon" />
                            </a>
                        </div>
                    </div>
                    <div v-if="masterData?.note" class="border-dotted border-gray-600 border box-border mb-1">
                        <strong>Note: </strong>
                        {{ masterData?.note }}
                    </div>
                    <div class="grid-container">
                        <div class="items-to-deliver" style="background-color: aliceblue;">
                            <label style="font-style: oblique; color: rgb(140, 109, 0);">Deliveries</label>
                            <p v-if="masterData.itemsToBeDelivered.gloriousRed">Red: {{
                                masterData.itemsToBeDelivered.gloriousRed }}</p>
                            <p v-if="masterData.itemsToBeDelivered.greenDetox">Green: {{
                                masterData.itemsToBeDelivered.greenDetox }}</p>
                            <p v-if="masterData.itemsToBeDelivered.papayaPunch">Papaya: {{
                                masterData.itemsToBeDelivered.papayaPunch }}</p>
                            <p v-if="masterData.itemsToBeDelivered.roseKatira">Rose Katira: {{
                                masterData.itemsToBeDelivered.roseKatira }}</p>
                            <p v-if="masterData.itemsToBeDelivered.sproutSalad">Sprout Salad: {{
                                masterData.itemsToBeDelivered.sproutSalad }}</p>
                            <p v-if="masterData.itemsToBeDelivered.quinoaSalad">Quinoa Salad: {{
                                masterData.itemsToBeDelivered.quinoaSalad }}</p>
                            <p v-if="masterData.itemsToBeDelivered.farmSalad">Farm Salad: {{
                                masterData.itemsToBeDelivered.farmSalad }}</p>
                            <p v-if="masterData.itemsToBeDelivered.shikanji">Shikanji: {{
                                masterData.itemsToBeDelivered.shikanji }}</p>
                            <p v-if="masterData.itemsToBeDelivered.kokam">Kokam Sharbat: {{
                                masterData.itemsToBeDelivered.kokam }}</p>
                            <p v-if="masterData.itemsToBeDelivered.dhoklaMeal">Dhokla: {{
                                masterData.itemsToBeDelivered.dhoklaMeal }}</p>
                            <p v-if="masterData.itemsToBeDelivered.upmaMeal">Upma: {{
                                masterData.itemsToBeDelivered.upmaMeal }}</p>
                            <p v-if="masterData.itemsToBeDelivered.theplaMeal">Thepla: {{
                                masterData.itemsToBeDelivered.theplaMeal }}</p>
                            <p v-if="masterData.itemsToBeDelivered.appeMeal">Appe: {{
                                masterData.itemsToBeDelivered.appeMeal }}</p>
                            <p v-if="masterData.itemsToBeDelivered.sabudanaKhichdi">Sabudana Khichdi: {{
                                masterData.itemsToBeDelivered.sabudanaKhichdi }}</p>
                            <p v-if="masterData.itemsToBeDelivered.sabudanaCutlet">Sabudana Cutlet: {{
                                masterData.itemsToBeDelivered.sabudanaCutlet }}</p>
                            <p v-if="masterData.itemsToBeDelivered.paneerKheer">Paneer Kheer: {{
                                masterData.itemsToBeDelivered.paneerKheer }}</p>
                        </div>
                        <div class="items-to-deliver flex flex-col space-y-4" style="background-color: beige;">
                            <div style="font-style: oblique; color: rgb(140, 109, 0);">
                                Empty Bottles
                                <span> - {{ masterData.bottlesToBeCollected || 0 }}</span>
                            </div>
                            <input v-model="collectedBottles" type="Number" required>
                        </div>
                    </div>
                    <div v-show="DeliveryStatus.TO_DELIVER === masterData.deliveryStatus" class="action-buttons">
                        <button
                            @click="updateDeliveryStatus('delivered'), emptyBottlesEntered() ? emit('delivered', bottleCollectionData('delivered')) : ''"
                            class="delivered-button">Delivered</button>
                        <button
                            @click="updateDeliveryStatus('not-delivered'), emptyBottlesEntered() ? emit('notDelivered', bottleCollectionData('notDelivered')) : ''"
                            class="not-delivered-button">Not Delivered</button>
                    </div>
                </DisclosurePanel>
            </Transition>
        </Disclosure>
    </div>
    <div v-if="isLoading" class="loader-overlay">
        <div class="loader"></div>
    </div>
</template>

<script setup lang="ts">
import { updateExtraInfo } from '@/api';
import { DeliveryStatus } from '@/constants';
import { IClubbedData, ILocationCoordinates } from '@/types';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon, MapPinIcon } from '@heroicons/vue/20/solid';
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline';
import { defineProps, defineEmits, toRefs, ref, onMounted } from 'vue';
import { calculateDistance } from '@/services';
const origin = ref(null as any);
onMounted(async () => {
    const originPoint = localStorage.getItem('originPoint');
    if (!originPoint) {
        await currentCoordinate();
        origin.value = coords.value;
        localStorage.setItem('originPoint', `{"lat": ${coords.value.lat}, "lng": ${coords.value.lng}}`);
    }
})
const props = defineProps<{ masterData: IClubbedData, deliveryToMake: boolean }>();
const { masterData, deliveryToMake } = toRefs(props);
const collectedBottles = ref(null);
const emit = defineEmits(['delivered', 'notDelivered']);
const coords = ref({
    lat: '',
    lng: ''
})

const formatMobileNumber = (number: string) => {
    const nums = number.split(" ");
    const finalNum = nums.filter(num => num.trim()?.length).join("");
    return finalNum.slice(-10);
}

const openGoogleMaps = (location: ILocationCoordinates) => {
    const lat = String(location.lat).trim();
    const lng = String(location.lng).trim();
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.location.href = googleMapsUrl;
};
const isLoading = ref(false);
const recordCoordinates = async () => {
    isLoading.value = true;
    await currentCoordinate();
    await updateExtraInfo(
        masterData.value.customerId,
        {
            coords: coords.value,
            timeStamp: ''
        }
    );
    isLoading.value = false;
}

const currentCoordinate = async () => {
    return new Promise<void>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            coords.value.lat = position.coords.latitude.toString();
            coords.value.lng = position.coords.longitude.toString();
            resolve();
        }, (error) => {
            console.log(error);
            reject(error);
        })
    })
}

const emptyBottlesEntered = () => {
    return !(collectedBottles.value === null || collectedBottles.value === undefined || collectedBottles.value === '')
}

const updateDeliveryStatus = async (status: string) => {
    if (collectedBottles.value === null || collectedBottles.value === undefined || collectedBottles.value === '') {
        alert("Please enter the number of collected bottles.");
        return;
    }
    await currentCoordinate();
    origin.value = JSON.parse(localStorage.getItem('originPoint') as string);
    const lastDeliveryPoint = localStorage.getItem('lastDeliveryPoint');
    let distance = 0;
    const p1 = lastDeliveryPoint ? JSON.parse(lastDeliveryPoint) : origin.value;
    const p2 = coords.value;
    const value = await calculateDistance(p1, p2);
    distance = value || 0;
    const time = new Date().toLocaleTimeString().toString();
    await updateExtraInfo(masterData.value.customerId, { coords: null, timeStamp: time, distanceFromLastPoint: distance, origin: origin.value, lastPoint: coords.value })
    localStorage.setItem('lastDeliveryPoint', `{"lat": ${coords.value.lat}, "lng": ${coords.value.lng}}`);
}

const bottleCollectionData = (status: string) => {
    let totalDeliveredBottles = 0;
    if (status === 'delivered') {
        Object.keys(masterData.value.itemsToBeDelivered).forEach(key => {
            if (!key.toLowerCase().includes('salad') && !key.toLowerCase().includes('sabudana') && !key.toLowerCase().includes('kheer') && !key.toLowerCase().includes('meal')) {
                const obj = masterData.value.itemsToBeDelivered as any;
                totalDeliveredBottles += Number(obj[key]);
            }
        });
    }
    const todaysPending = totalDeliveredBottles + (+masterData.value.bottlesToBeCollected || 0) - (collectedBottles.value || 0);
    return { bottlesCollected: collectedBottles.value, bottlesRemaining: todaysPending, bottlesDelivered: totalDeliveredBottles, routeBoy: masterData.value.deliveryRoute };
}
</script>

<style scoped>
.delivery-info {
    margin-bottom: 10px;
}

.disclosure-button {
    width: 100%;
    background-color: #e5f2e5;
    border-radius: 8px;
    padding: 16px 24px;
    font-size: 18px;
    font-weight: bold;
    color: #2d635e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.3s ease;
}

.disclosure-button:hover {
    background-color: #c5e5c6;
}

.button-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.address-wrapper {
    flex-grow: 1;
}

.toggle-icon {
    color: #2d635e;
    width: 24px;
    height: 24px;
}

.chevron-wrapper {
    margin-left: 10px;
}

.open .toggle-icon {
    transform: rotate(180deg);
}

.details-panel {
    padding: 24px;
    background-color: #f9fafb;
    border-radius: 0 0 8px 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.contact-info {
    margin-bottom: 20px;
}

.customer-name {
    font-weight: bold;
}

.address {
    font-style: italic;
    width: 100%;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.items-to-deliver {
    border: 1px solid #ccc;
    padding: 10px;
}

.items-to-deliver p {
    margin-bottom: 10px;
}

.action-buttons button {
    margin-top: 10px;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.delivered-button {
    background-color: #34d399;
    color: white;
}

.delivered-button:hover {
    background-color: #046e47;
}

.not-delivered-button {
    background-color: #ef4444;
    color: white;
}

.not-delivered-button:hover {
    background-color: #e10f0f;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.location-cta {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #2d635e;
}

.location-cta:hover {
    color: #046e47;
}

.map-pin-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.cta-text {
    font-size: 16px;
}

.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
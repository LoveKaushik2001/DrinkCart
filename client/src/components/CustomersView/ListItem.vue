<template>
    <div class="delivery-info">
        <Disclosure v-slot="{ open }">
            <DisclosureButton class="disclosure-button" :class="{ 'open': open }">
                <div class="button-content">
                    <div class="address-wrapper">
                        <div class="customer-info">
                            <!-- Adjusted width to 100% -->
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
                    <div v-if="masterData.timeOfContact">
                        Time of contact: {{ masterData.timeOfContact }}
                    </div>
                    <div v-if="masterData?.location?.lat?.trim() && masterData?.location?.lng?.trim()"
                        class="location-cta" @click="openGoogleMaps(masterData.location)">
                        <MapPinIcon class="map-pin-icon" />
                        <span class="cta-text">View Location on Map</span>
                    </div>
                    <div v-else>Coordinates not provided</div>
                    <div class="contact-info">
                        <span class="customer-name">{{ masterData.customerName }}</span>
                        <p><strong>Mobile Number:</strong> <a :href="`tel:${masterData.phoneNumber}`">{{
            masterData.phoneNumber }}</a></p>
                    </div>
                    <div class="grid-container">
                        <div class="items-to-deliver" style="background-color: aliceblue;">
                            <label style="font-style: oblique; color: rgb(140, 109, 0);">Deliveries</label>
                            <p v-if="masterData.itemsToBeDelivered.gloriousRed">Red: {{
            masterData.itemsToBeDelivered.gloriousRed }}</p>
                            <p v-if="masterData.itemsToBeDelivered.greenDetox">Green: {{
            masterData.itemsToBeDelivered.greenDetox }}</p>
                            <p v-if="masterData.itemsToBeDelivered.sproutSalad">Sprout Salad: {{
            masterData.itemsToBeDelivered.sproutSalad
        }}</p>
                            <p v-if="masterData.itemsToBeDelivered.quinoaSalad">Quinoa Salad: {{
            masterData.itemsToBeDelivered.quinoaSalad
        }}</p>
                            <p v-if="masterData.itemsToBeDelivered.shikanji">Shikanji: {{
            masterData.itemsToBeDelivered.shikanji
        }}
                            </p>
                            <p v-if="masterData.itemsToBeDelivered.mint">Green Mint: {{
            masterData.itemsToBeDelivered.mint
        }}
                            </p>
                        </div>
                        <div class="items-to-deliver" style="background-color: beige;">
                            <label style="font-style: oblique; color: rgb(140, 109, 0);">Empty Bottles</label>
                            <p v-if="masterData.itemsToBeCollected.gloriousRed">Red: {{
            masterData.itemsToBeCollected.gloriousRed }}</p>
                            <p v-if="masterData.itemsToBeCollected.greenDetox">Green: {{
            masterData.itemsToBeCollected.greenDetox }}</p>
                            <p v-if="masterData.itemsToBeCollected.shikanji">Shikanji: {{
            masterData.itemsToBeCollected.shikanji
        }}
                            </p>
                            <p v-if="masterData.itemsToBeCollected.mint">Green Mint: {{
                                masterData.itemsToBeCollected.mint
                                }}
                            </p>
                        </div>
                    </div>
                    <div v-show="DeliveryStatus.TO_DELIVER === masterData.deliveryStatus" class="action-buttons">
                        <button @click="emit('delivered')" :class="['delivered-button']">Delivered</button>
                        <button @click="emit('notDelivered')" :class="['not-delivered-button']">Not Delivered</button>
                    </div>
                </DisclosurePanel>
            </Transition>
        </Disclosure>
    </div>
</template>

<script setup lang="ts">
import { DeliveryStatus } from '@/constants';
import { IClubbedData, ILocationCoordinates } from '@/types';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon, MapPinIcon } from '@heroicons/vue/20/solid'
import { defineProps, defineEmits, toRefs, ref, computed } from 'vue';
const props = defineProps<{
    masterData: IClubbedData
}>();

const { masterData } = toRefs(props);
const emit = defineEmits(['delivered', 'notDelivered']);
const openGoogleMaps = (location: ILocationCoordinates) => {
    const lat = location.lat.trim();
    const lng = location.lng.trim();
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.location.href = googleMapsUrl;
}
const getCurrentTime = computed(() => {
    const today = new Date();
    return today.getHours() + ":" + today.getMinutes();
})
</script>

<style scoped>
.delivery-info {
    margin-bottom: 10px;
    /* Adjusted margin */
}

.disclosure-button {
    width: 100%;
    background-color: #E5F2E5;
    border-radius: 8px;
    padding: 16px 24px;
    font-size: 18px;
    font-weight: bold;
    color: #2D635E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.3s ease;
}

.disclosure-button:hover {
    background-color: #C5E5C6;
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
    color: #2D635E;
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
    background-color: #F9FAFB;
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
    /* Adjusted width to 100% */
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
    background-color: #34D399;
    color: white;
}

.delivered-button:hover {
    background-color: #046e47;
}

.not-delivered-button {
    background-color: #EF4444;
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
    color: #2D635E;
}

.location-cta:hover {
    color: #046e47;
    /* Adjust hover color as needed */
}

.map-pin-icon {
    width: 20px;
    /* Adjust icon size as needed */
    height: 20px;
    margin-right: 5px;
    /* Adjust spacing between icon and text */
}

.cta-text {
    font-size: 16px;
    /* Adjust text size as needed */
}
</style>

<template>
    <div class="delivery-info">
        <Disclosure v-slot="{ open }">
            <DisclosureButton class="disclosure-button" :class="{ 'open': open }">
                <div class="button-content">
                    <div class="customer-info">
                        <span class="customer-name">{{ masterData.customerName }}</span>
                        <span class="address">{{ masterData.address }}</span>
                    </div>
                    <ChevronDownIcon class="toggle-icon" />
                </div>
            </DisclosureButton>
            <Transition name="fade">
                <DisclosurePanel class="details-panel" v-show="open">
                    <div class="contact-info">
                        <p><strong>Mobile Number:</strong> <a :href="`tel:${masterData.phoneNumber}`">{{
                            masterData.phoneNumber }}</a></p>
                    </div>
                    <div class="items-to-deliver">
                        <label style="font-style: oblique;">Deliveries</label>
                        <p v-if="masterData.itemsToBeDelivered.gloriousRed">Red: {{
                            masterData.itemsToBeDelivered.gloriousRed }}</p>
                        <p v-if="masterData.itemsToBeDelivered.greenDetox">Green: {{
                            masterData.itemsToBeDelivered.greenDetox }}</p>
                        <p v-if="masterData.itemsToBeDelivered.salad">Salad: {{ masterData.itemsToBeDelivered.salad }}</p>
                        <p v-if="masterData.itemsToBeDelivered.soup">Soup: {{ masterData.itemsToBeDelivered.soup }}</p>
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
import { IMasterDeliveryInfo } from '@/types';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { defineProps, defineEmits, toRefs } from 'vue';

const props = defineProps<{
    masterData: IMasterDeliveryInfo
}>();

const { masterData } = toRefs(props);
const emit = defineEmits(['delivered', 'notDelivered']);
</script>
  
<style scoped>
.delivery-info {
    margin-bottom: 10px;
    /* Adjusted margin */
}

.disclosure-button {
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

.toggle-icon {
    color: #2D635E;
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
</style>
  
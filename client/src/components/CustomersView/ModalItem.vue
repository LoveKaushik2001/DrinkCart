<template>
    <div>
        <TransitionRoot appear :show="isOpen" as="template">
            <Dialog as="div" class="relative z-[101]" @close="closeModal">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                    enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900 bg-opacity-80"></div>
                </TransitionChild>
                <div class="fixed inset-0 max-h-full overflow-auto base-scrollbar">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel class="modal-dialog flex flex-col gap-4 w-full px-6 py-10 lg:p-14 relative">
                            <button @click="closeModal()" class="close-button text-gray-700 hover:text-gray-900">
                                X
                            </button>
                            <div class="modal-body text-gray-900">
                                <h2 class="text-xl font-bold mb-4 text-center">All Customers Data for {{
            data.organization
        }}</h2>
                                <table class="w-full">
                                    <thead>
                                        <tr>
                                            <th class="px-4 py-2">Customer Name</th>
                                            <th class="px-4 py-2">Red</th>
                                            <th class="px-4 py-2">Green</th>
                                            <th class="px-4 py-2">Salad</th>
                                            <th class="px-4 py-2">Shikanji</th>
                                            <th class="px-4 py-2">Mint</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(customer, index) in data.masterData" :key="index">
                                            <tr>
                                                <td class="border px-4 py-2">{{ customer.customerName }}</td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.gloriousRed
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.greenDetox
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.papayaPunch
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.roseKatira
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.sproutSalad
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.quinoaSalad
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.farmSalad
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.shikanji }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.mint }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.pohaMeal }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.upmaMeal }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.theplaMeal
                                                    }}
                                                </td>
                                                <td class="border px-4 py-2">{{ customer.itemsToBeDelivered.appeMeal
                                                    }}
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
    <div @click.stop="openModal()"
        class="open-modal-button bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400">
        <div class="customer-info">
            <span class="organization">{{ data.organization }}</span>
            <div class="grid-container">
                <div class="items-to-deliver">
                    <label style="font-style: oblique;">Deliveries</label>
                    <p v-if="itemsToBeDelivered.gloriousRed">Red: {{
            itemsToBeDelivered.gloriousRed }}</p>
                    <p v-if="itemsToBeDelivered.greenDetox">Green: {{
            itemsToBeDelivered.greenDetox }}</p>
                    <p v-if="itemsToBeDelivered.papayaPunch">Papaya: {{
            itemsToBeDelivered.papayaPunch }}</p>
                    <p v-if="itemsToBeDelivered.roseKatira">Rose Katira: {{
            itemsToBeDelivered.roseKatira }}</p>
                    <p v-if="itemsToBeDelivered.sproutSalad">Sprout Salad: {{ itemsToBeDelivered.sproutSalad }}</p>
                    <p v-if="itemsToBeDelivered.quinoaSalad">Quinoa Salad: {{ itemsToBeDelivered.quinoaSalad }}</p>
                    <p v-if="itemsToBeDelivered.farmSalad">Farm Salad: {{ itemsToBeDelivered.farmSalad }}</p>
                    <p v-if="itemsToBeDelivered.shikanji">Shikanji: {{ itemsToBeDelivered.shikanji }}</p>
                    <p v-if="itemsToBeDelivered.mint">Green Mint: {{ itemsToBeDelivered.mint }}</p>
                    <p v-if="itemsToBeDelivered.pohaMeal">Poha: {{ itemsToBeDelivered.pohaMeal }}</p>
                    <p v-if="itemsToBeDelivered.upmaMeal">Upma: {{ itemsToBeDelivered.upmaMeal }}</p>
                    <p v-if="itemsToBeDelivered.theplaMeal">Thepla: {{ itemsToBeDelivered.theplaMeal }}</p>
                    <p v-if="itemsToBeDelivered.appeMeal">Appe: {{ itemsToBeDelivered.appeMeal }}</p>
                </div>
                <div class="items-to-deliver">
                    <label style="font-style: oblique;">Empty Bottles</label>
                </div>
            </div>
            <div v-show="DeliveryStatus.TO_DELIVER === data.deliveryStatus" class="action-buttons">
                <button @click.stop="emit('delivered')" :class="['delivered-button']">Delivered</button>
                <button @click.stop="emit('notDelivered')" :class="['not-delivered-button']">Not
                    Delivered</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs, defineEmits, computed, onMounted } from 'vue';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
} from '@headlessui/vue';
import { IItems, IMasterData } from '@/types';
import { DeliveryStatus } from '@/constants';
const props = defineProps<{
    data: IMasterData
}>();
const { data } = toRefs(props);
onMounted(() => {
    getDeliveryDataToBeDelivered();
})
const emit = defineEmits(['delivered', 'notDelivered']);
const isOpen = ref(false);
const itemsToBeDelivered = ref({
    gloriousRed: 0,
    papayaPunch: 0,
    greenDetox: 0,
    roseKatira: 0,
    sproutSalad: 0,
    quinoaSalad: 0,
    farmSalad: 0,
    shikanji: 0,
    mint: 0,
    pohaMeal: 0,
    upmaMeal: 0,
    theplaMeal: 0,
    appeMeal: 0
} as IItems);
const getDeliveryDataToBeDelivered = () => {
    data.value.masterData.forEach(customer => {
        itemsToBeDelivered.value.gloriousRed += customer.itemsToBeDelivered.gloriousRed;
        itemsToBeDelivered.value.papayaPunch += customer.itemsToBeDelivered.papayaPunch;
        itemsToBeDelivered.value.greenDetox += (customer.itemsToBeDelivered.greenDetox)
        itemsToBeDelivered.value.roseKatira += (customer.itemsToBeDelivered.roseKatira)
        itemsToBeDelivered.value.sproutSalad += (customer.itemsToBeDelivered.sproutSalad)
        itemsToBeDelivered.value.quinoaSalad += (customer.itemsToBeDelivered.quinoaSalad)
        itemsToBeDelivered.value.farmSalad += (customer.itemsToBeDelivered.farmSalad)
        itemsToBeDelivered.value.shikanji += (customer.itemsToBeDelivered.shikanji)
        itemsToBeDelivered.value.mint += (customer.itemsToBeDelivered.mint)
        itemsToBeDelivered.value.pohaMeal += (customer.itemsToBeDelivered.pohaMeal)
        itemsToBeDelivered.value.upmaMeal += (customer.itemsToBeDelivered.upmaMeal)
        itemsToBeDelivered.value.theplaMeal += (customer.itemsToBeDelivered.theplaMeal)
        itemsToBeDelivered.value.appeMeal += (customer.itemsToBeDelivered.appeMeal)
    })
}
const openModal = () => {
    isOpen.value = true;
}

const closeModal = () => {
    isOpen.value = false;
}
</script>

<style scoped>
/* Adjustments to match health-focused styling */
.modal-dialog {
    background-color: #FFFFFF;
    /* White background */
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-body {
    line-height: 1.5;
    /* Improved readability */
}

.close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
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

.not-delivered-button {
    background-color: #EF4444;
    color: white;
}
</style>
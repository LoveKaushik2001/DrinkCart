<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { IMasterDeliveryInfo } from '@/types';
import { defineProps, defineEmits, toRefs, onMounted } from 'vue';
const props = defineProps<{
    masterData: IMasterDeliveryInfo
}>();
const { masterData } = toRefs(props);
const emit = defineEmits(['delivered', 'notDelivered']);
</script>
<template>
    <div>
        <Disclosure>
            <DisclosureButton
                class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>{{ masterData.deliveryOrder }}</span>
                <span>{{ masterData.customerName }}</span>
                <span>{{ masterData.address }}</span>
                <ChevronUpIcon class="h-5 w-5 text-purple-500" />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
                Mobile Number: <a :href="`tel:${masterData.phoneNumber}`">{{ masterData.phoneNumber }}</a>
                <div>
                    <span v-if="masterData.itemsToBeDelivered.gloriousRed">
                        Red: {{ masterData.itemsToBeDelivered.gloriousRed }}
                    </span>
                    <span v-if="masterData.itemsToBeDelivered.greenDetox">
                        Green: {{ masterData.itemsToBeDelivered.greenDetox }}
                    </span>
                    <span v-if="masterData.itemsToBeDelivered.salad">
                        Salad: {{ masterData.itemsToBeDelivered.salad }}
                    </span>
                    <span v-if="masterData.itemsToBeDelivered.soup">
                        Soup: {{ masterData.itemsToBeDelivered.soup }}
                    </span>
                </div>
                <button style="color: green;" @click="emit('delivered')">Delivered</button>
                <br>
                <button style="color: red;" @click="emit('notDelivered')">Not Delivered</button>
            </DisclosurePanel>
        </Disclosure>
    </div>
</template>
<style scoped></style>
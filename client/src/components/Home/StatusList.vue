<script lang="ts" setup>
import { IMasterData } from '@/types';
import { defineProps, onMounted, toRefs, ref, defineEmits } from 'vue';
import draggable from 'vuedraggable';
import ListItem from '../CustomersView/ListItem.vue';
import ModalItem from '../CustomersView/ModalItem.vue';
import { DeliveryStatus } from '@/constants';
const props = defineProps<{
    list: IMasterData[]
}>();
const { list } = toRefs(props);
const orderList = ref([] as IMasterData[]);
const emit = defineEmits(['changeStatus']);
onMounted(() => {
    orderList.value = list.value;
})
const handleDragEnd = () => {
    orderList.value = orderList.value.map((item, idx) => {
        item.deliveryOrder = idx + 1;
        return item;
    });
}
</script>
<template>
    <div>
        <draggable v-model="orderList" @end="handleDragEnd" :item-key="(item: IMasterData) => item.deliveryOrder"
            :disabled="true">
            <template #item="{ element }: { element: IMasterData }">
                <div class="w-full px-4 pt-16">
                    <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                        <ListItem v-if="!element.organization" :masterData="element.masterData[0]"
                            @delivered="emit('changeStatus', { id: element.masterData[0].customerId, status: DeliveryStatus.DELIVERED, isOrganization: false, bottlesCollected: $event.bottlesCollected, bottlesRemaining: $event.bottlesRemaining })"
                            @not-delivered="emit('changeStatus', { id: element.masterData[0].customerId, status: DeliveryStatus.NOT_DELIVERED, isOrganization: false })" />
                        <ModalItem v-else :data="element"
                            @delivered="emit('changeStatus', { organization: element.organization, status: DeliveryStatus.DELIVERED, isOrganization: true })"
                            @not-delivered="emit('changeStatus', { organization: element.organization, status: DeliveryStatus.NOT_DELIVERED, isOrganization: true })" />
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>
<style></style>
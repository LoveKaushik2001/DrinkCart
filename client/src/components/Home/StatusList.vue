<script lang="ts" setup>
import { IMasterDeliveryInfo } from '@/types';
import { defineProps, onMounted, toRefs, ref, defineEmits } from 'vue';
import draggable from 'vuedraggable';
import ListItem from './ListItem.vue';
import { DeliveryStatus } from '@/constants';
const props = defineProps<{
    list: IMasterDeliveryInfo[]
}>();
const { list } = toRefs(props);
const orderList = ref([] as IMasterDeliveryInfo[]);
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
        order - name
        <draggable v-model="orderList" @end="handleDragEnd" :item-key="(item: IMasterDeliveryInfo) => item.deliveryOrder">
            <template #item="{ element }: { element: IMasterDeliveryInfo }">
                <div class="w-full px-4 pt-16">
                    <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                        <ListItem :masterData="element"
                            @delivered="emit('changeStatus', { id: element.customerId, status: DeliveryStatus.DELIVERED })"
                            @not-delivered="emit('changeStatus', { id: element.customerId, status: DeliveryStatus.NOT_DELIVERED })" />
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>
<style></style>
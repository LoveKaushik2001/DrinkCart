<template>
    <div class="modal-overlay">
        <div v-if="firstModal" class="modal">
            <h2>Select Route</h2>
            <div class="options-container">
                <label v-for="(option, index) in options" :key="index" class="option-label">
                    <input type="radio" :value="option" v-model="selectedOption" class="option-input" />
                    {{ option }}
                </label>
            </div>
            <button @click="saveRoute">Save</button>
        </div>
        <div v-else class="modal">
            <div v-if="!routeCountData?.length">No Data found yet</div>
            <div v-else class="options-container">
                <div class="option-label" v-for="(route, idx) in routeCountData" :key="idx">
                    <div class="dotted-container">
                        <span class="highlighted-address">{{ route.address }}</span>
                        <div class="vertical-align">
                            <span v-if="route.gloriousRed">Glorious Red: {{ route.gloriousRed }}</span>
                            <span v-if="route.greenDetox">Green Detox: {{ route.greenDetox }}</span>
                            <span v-if="route.greenMint">Green Mint: {{ route.greenMint }}</span>
                            <span v-if="route.shikanji">Shikanji: {{ route.shikanji }}</span>
                            <span v-if="route.quinoaSalad">Quinoa Salad: {{ route.quinoaSalad }}</span>
                            <span v-if="route.sproutSalad">Sprout Salad: {{ route.sproutSalad }}</span>
                        </div>
                    </div>
                </div>
                ------Ready To Go-------
                <button @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref, toRefs } from 'vue';
import { getAllRouteInfo } from '@/api';
import { IRouteInfo } from '../../types';
const emit = defineEmits(['saveRoute', 'closeModal']);
const props = defineProps<{
    options: string[]
}>()
const { options } = toRefs(props);
const selectedOption = ref(options.value[0]);
const firstModal = ref(false);
const routeCountData = ref([] as IRouteInfo[]);
onMounted(() => {
    routeCountData.value = [];
    firstModal.value = true;
})
const saveRoute = () => {
    emit('saveRoute', selectedOption.value);
    firstModal.value = false;
    getDataForSelectedRoute();
}

const closeModal = () => {
    emit('closeModal');
}

const getDataForSelectedRoute = async () => {
    try {
        const data = (await getAllRouteInfo()).data as IRouteInfo[];
        if (data?.length) routeCountData.value = data.filter(d => d.route === selectedOption.value && d.total);
    } catch (error) {
        console.log(error);
    }
    console.log(routeCountData.value, routeCountData?.value?.length);
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
}

.radio-options {
    margin-bottom: 20px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.options-container {
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
}

.option-label {
    display: block;
    /* Display as block element */
    margin-bottom: 10px;
    /* Add margin between options */
}

.dotted-container {
    border: 1px dotted #ccc;
    /* Dotted border */
    padding: 10px;
    /* Add padding */
    margin-bottom: 10px;
    /* Add margin between containers */
}

/* Style to align spans vertically */
.vertical-align {
    display: flex;
    /* Use flexbox */
    flex-direction: column;
    /* Arrange spans vertically */
}

/* Style for individual spans */
.vertical-align span {
    margin-bottom: 5px;
    /* Add margin between spans */
}

.highlighted-address {
    background-color: #ffd700;
    /* Yellow background */
    padding: 5px;
    /* Add padding */
    border-radius: 5px;
    /* Rounded corners */
}

.option-label {
    display: block;
    /* Display as block element */
    margin-bottom: 10px;
    /* Add margin between options */
}
</style>

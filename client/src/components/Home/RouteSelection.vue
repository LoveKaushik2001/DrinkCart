<template>
    <div class="modal-overlay">
        <div class="modal">
            <h2>Select Route</h2>
            <div class="options-container">
                <label v-for="(option, index) in options" :key="index" class="option-label">
                    <input type="radio" :value="option" v-model="selectedOption" class="option-input" />
                    {{ option }}
                </label>
            </div>
            <button @click="saveRoute">Save</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, toRefs } from 'vue';
const emit = defineEmits(['saveRoute', 'closeModal']);
const props = defineProps<{
    options: string[]
}>()
const { options } = toRefs(props);
const selectedOption = ref(options.value[0]);
const saveRoute = () => {
    emit('saveRoute', selectedOption.value);
    emit('closeModal');
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

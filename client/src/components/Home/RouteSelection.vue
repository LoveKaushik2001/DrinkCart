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
    closeModal();
}

const closeModal = () => {
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
}

.option-label {
    display: block;
    /* Display as block element */
    margin-bottom: 10px;
    /* Add margin between options */
}
</style>

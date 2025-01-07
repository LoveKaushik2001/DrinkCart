<template>
    <div id="app" class="container">
        <h1>Chocolate Order Form</h1>

        <form @submit.prevent="handleSubmit" @reset="handleReset" class="form-container">
            <!-- Name -->
            <div class="form-group">
                <label for="salesPersonName">SalesPerson Name:</label>
                <input type="text" id="name" v-model="form.salesPersonName"
                    :class="{ 'is-invalid': errors.salesPersonName }" required />
                <span v-if="errors.salesPersonName" class="error">{{ errors.salesPersonName }}</span>
            </div>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }" required />
                <span v-if="errors.name" class="error">{{ errors.name }}</span>
            </div>

            <!-- Address -->
            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" id="address" v-model="form.address" :class="{ 'is-invalid': errors.address }"
                    required />
                <span v-if="errors.address" class="error">{{ errors.address }}</span>
            </div>

            <!-- Number of chocolates -->
            <div class="form-group">
                <label for="chocolates">Number of Chocolates:</label>
                <input type="number" id="chocolates" v-model.number="form.chocolates"
                    :class="{ 'is-invalid': errors.chocolates }" required min="1" />
                <span v-if="errors.chocolates" class="error">{{ errors.chocolates }}</span>
            </div>

            <!-- Take a picture -->
            <div class="form-group">
                <label for="picture">Take a Picture:</label>
                <input type="file" id="picture" @change="handlePictureUpload" />
                <div v-if="form.picture">
                    <img :src="form.picture" alt="Preview" class="preview-image" />
                </div>
            </div>

            <!-- Current location coordinates -->
            <div class="form-group">
                <button type="button" @click="getLocation" :disabled="loading">
                    Get Current Location
                </button>

                <!-- Loader spinner -->
                <div v-if="loading" class="loader">Loading...</div>

                <div v-if="form.location && !loading">
                    <p>Latitude: {{ form.location.latitude }}</p>
                    <p>Longitude: {{ form.location.longitude }}</p>
                </div>
            </div>

            <!-- Submit and Reset buttons -->
            <div class="form-group buttons">
                <button type="submit" :disabled="isFormInvalid">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>
    </div>
    <SaleTable />
</template>

<script setup>
import { ref, computed } from 'vue';
import { getSalesInfo, setSaleInfo } from '@/api';
import SaleTable from '@/components/SaleTable.vue';

const form = ref({
    name: '',
    salesPersonName: '',
    address: '',
    chocolates: '',
    picture: null,
    location: null,
});

const errors = ref({});
const loading = ref(false); // Loading state for location fetching

// Computed property to check if the form is invalid
const isFormInvalid = computed(() => {
    return !form.value.salesPersonName || !form.value.name || !form.value.address || !form.value.chocolates || Object.keys(errors.value).length > 0;
});

// Handle form submission
const handleSubmit = async () => {
    if (validateForm()) {
        // Submit form (for example, send data to a server)
        console.log("Form Submitted", form.value);
        await setSaleInfo(form.value);
        console.log(await getSalesInfo());
        alert('Form submitted successfully!');
        handleReset();
    }
};

// Reset form
const handleReset = () => {
    form.value = {
        name: '',
        salesPersonName: '',
        address: '',
        chocolates: '',
        picture: null,
        location: null,
    };
    errors.value = {};
};

// Handle picture upload
const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            form.value.picture = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

// Get the current location coordinates
const getLocation = () => {
    loading.value = true; // Set loading state to true

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                form.value.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                loading.value = false; // Set loading state to false after getting the location
            },
            (error) => {
                alert('Error getting location: ' + error.message);
                loading.value = false; // Set loading state to false if there's an error
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
        loading.value = false; // Set loading state to false if geolocation is not supported
    }
};

// Form validation
const validateForm = () => {
    errors.value = {};

    if (!form.value.name) {
        errors.value.name = 'Name is required';
    }

    if (!form.value.salesPersonName) {
        errors.value.salesPersonName = 'salesPersonName is required';
    }

    if (!form.value.address) {
        errors.value.address = 'Address is required';
    }

    if (!form.value.chocolates || form.value.chocolates <= 0) {
        errors.value.chocolates = 'Number of chocolates must be a positive number';
    }
    if (!form.value.picture) {
        errors.value.picture = 'Image should be clicked';
    }
    if (!form.value.location) {
        errors.value.chocolates = 'Location should be stored';
    }

    return Object.keys(errors.value).length === 0;
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-container {
    display: grid;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

input[type="text"],
input[type="number"],
input[type="file"] {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
}

input.is-invalid {
    border-color: red;
}

button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button[type="reset"] {
    background-color: #f44336;
}

.error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.preview-image {
    width: 100px;
    height: auto;
    margin-top: 10px;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.loader {
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: #007bff;
}

.loader::after {
    content: '';
    display: block;
    margin: 10px auto;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
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

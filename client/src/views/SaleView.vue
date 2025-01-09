<template>
    <div id="app" class="container">
        <h1>Chocolate Order Form</h1>

        <form @submit.prevent="handleSubmit" @reset="handleReset" class="form-container">
            <!-- Name -->
            <div class="form-group">
                <label for="salesPersonName">SalesPerson Name:</label>
                <input type="text" id="salesPersonName" v-model="form.salesPersonName"
                    :class="{ 'is-invalid': errors.salesPersonName }" required />
                <span v-if="errors.salesPersonName" class="error">{{ errors.salesPersonName }}</span>
            </div>

            <!-- Shop Name -->
            <div class="form-group">
                <label for="shopName">Shop Name:</label>
                <input type="text" id="shopName" v-model="form.shopName" :class="{ 'is-invalid': errors.shopName }"
                    required />
                <span v-if="errors.shopName" class="error">{{ errors.shopName }}</span>
            </div>

            <!-- Owner Name -->
            <div class="form-group">
                <label for="ownerName">Owner Name:</label>
                <input type="text" id="ownerName" v-model="form.ownerName" :class="{ 'is-invalid': errors.ownerName }"
                    required />
                <span v-if="errors.ownerName" class="error">{{ errors.ownerName }}</span>
            </div>

            <!-- Shop Owner Phone -->
            <div class="form-group">
                <label for="phone">Shop Owner Phone Number:</label>
                <input type="tel" id="phone" v-model="form.phone" :class="{ 'is-invalid': errors.phone }" required
                    pattern="^\d{10}$" />
                <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
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
                    :class="{ 'is-invalid': errors.chocolates }" required />
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

                <!-- Loader spinner for location -->
                <div v-if="loading" class="loader">Loading...</div>

                <div v-if="form.location && !loading">
                    <p>Latitude: {{ form.location.latitude }}</p>
                    <p>Longitude: {{ form.location.longitude }}</p>
                </div>
                <span v-if="errors.location" class="error">{{ errors.location }}</span>
            </div>

            <!-- Loader spinner for form submission -->
            <div v-if="loadingSubmit" class="loader">Submitting...</div>

            <!-- Submit and Reset buttons -->
            <div class="form-group buttons">
                <button type="submit" :disabled="loadingSubmit">Submit</button>
                <button type="reset">Reset</button>
            </div>
        </form>
    </div>
    <SaleTable />
</template>

<script setup>
import { ref } from 'vue';
import { setSaleInfo } from '@/api';
import SaleTable from '@/components/SaleTable.vue';

const form = ref({
    ownerName: '',
    shopName: '',
    salesPersonName: '',
    address: '',
    chocolates: 0,
    picture: null,
    location: null,
    phone: '',  // New phone property
});

const errors = ref({});
const loading = ref(false); // Loading state for location fetching
const loadingSubmit = ref(false); // New loading state for form submission

// Handle form submission
const handleSubmit = async () => {
    if (validateForm()) {
        loadingSubmit.value = true;
        await setSaleInfo(form.value);
        alert('Form submitted successfully!');
        handleReset();
        loadingSubmit.value = false; // Hide the loader after form submission
    } else {
        alert("Fill form correctly.")
    }
};

// Reset form
const handleReset = () => {
    form.value = {
        shopName: '',
        ownerName: '',
        salesPersonName: '',
        address: '',
        chocolates: 0,
        picture: null,
        location: null,
        phone: '',
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

    if (!form.value.ownerName) {
        errors.value.ownerName = 'Owner name is required';
    }
    if (!form.value.shopName) {
        errors.value.shopName = 'Shop name is required';
    }

    if (!form.value.salesPersonName) {
        errors.value.salesPersonName = 'SalesPerson name is required';
    }

    if (!form.value.address) {
        errors.value.address = 'Address is required';
    }

    if (form.value.chocolates < 0) {
        errors.value.chocolates = 'Number of chocolates must be a positive number';
    }

    if (!form.value.phone) {
        errors.value.phone = 'Phone number is required';
    } else if (!/^(\d{10})$/.test(form.value.phone)) {
        errors.value.phone = 'Phone number must be 10 digits';
    }

    if (!form.value.picture) {
        errors.value.picture = 'Image should be clicked';
    }

    if (!form.value.location) {
        errors.value.location = 'Location should be stored';
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
input[type="tel"],
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

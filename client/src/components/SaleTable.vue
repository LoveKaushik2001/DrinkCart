<template>
    <div>
        <h1 class="page-title">All Form Submissions</h1>

        <!-- Table Layout for Desktop -->
        <div class="table-wrapper">
            <table class="table" v-if="!isMobile">
                <thead>
                    <tr>
                        <th>salesPerson Name</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Chocolates</th>
                        <th>Picture</th>
                        <th>Location</th>
                        <th>Map</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(form, index) in forms" :key="index">
                        <td>{{ form.salesPersonName }}</td>
                        <td>{{ form.name }}</td>
                        <td>{{ form.address }}</td>
                        <td>{{ form.chocolates }}</td>

                        <!-- Display Image if it exists -->
                        <td v-if="form.picture">
                            <img :src="form.picture" alt="Preview" class="preview-image" />
                        </td>
                        <td v-else>No image</td>

                        <!-- Display Location (Latitude and Longitude) -->
                        <td v-if="form.location">
                            Latitude: {{ form.location.latitude }} <br />
                            Longitude: {{ form.location.longitude }}
                        </td>
                        <td v-else>No location</td>

                        <!-- Button to open Google Maps -->
                        <td v-if="form.location">
                            <button @click="openMap(form.location.latitude, form.location.longitude)" class="map-btn">
                                Open in Map
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Card Layout for Mobile -->
        <div class="entries-wrapper" v-if="isMobile">
            <div v-for="(form, index) in forms" :key="index" class="entry-card">
                <div class="entry-item">
                    <strong>salesPerson Name:</strong> {{ form.salesPersonName }}
                </div>
                <div class="entry-item">
                    <strong>Name:</strong> {{ form.name }}
                </div>
                <div class="entry-item">
                    <strong>Address:</strong> {{ form.address }}
                </div>
                <div class="entry-item">
                    <strong>Chocolates:</strong> {{ form.chocolates }}
                </div>

                <!-- Display Image if it exists -->
                <div v-if="form.picture" class="entry-item image-container">
                    <strong>Picture:</strong>
                    <img :src="form.picture" alt="Preview" class="preview-image" />
                </div>
                <div v-else class="entry-item">
                    <strong>Picture:</strong> No image
                </div>

                <!-- Display Location (Latitude and Longitude) -->
                <div v-if="form.location" class="entry-item">
                    <strong>Location:</strong>
                    Latitude: {{ form.location.latitude }} <br />
                    Longitude: {{ form.location.longitude }}
                </div>
                <div v-else class="entry-item">
                    <strong>Location:</strong> No location
                </div>

                <!-- Button to open Google Maps -->
                <div v-if="form.location" class="entry-item">
                    <button @click="openMap(form.location.latitude, form.location.longitude)" class="map-btn">
                        Open in Map
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getSalesInfo } from '@/api';

const forms = ref([]);

// Function to detect if the current device is mobile
const isMobile = computed(() => {
    return window.innerWidth <= 768;
});

onMounted(async () => {
    await fetchAllForms();
});

const fetchAllForms = async () => {
    try {
        const data = (await getSalesInfo()).data;
        if (data) {
            forms.value = data;
        } else {
            console.log('No forms found');
        }
    } catch (error) {
        console.error('Error fetching all form data:', error);
    }
};

// Function to open the map with the provided latitude and longitude
const openMap = (latitude, longitude) => {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapUrl, '_blank'); // Open map in a new tab
};
</script>

<style scoped>
.page-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
}

.table-wrapper {
    display: none;
}

/* Table Styles for Desktop */
.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.table th,
.table td {
    text-align: left;
    padding: 10px;
    border: 1px solid #ddd;
}

.table th {
    background-color: #f2f2f2;
}

.preview-image {
    max-width: 100px;
    height: auto;
}

.map-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.map-btn:hover {
    background-color: #45a049;
}

/* Card Layout for Mobile */
.entries-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
}

.entry-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
}

.entry-item {
    margin-bottom: 10px;
    font-size: 16px;
}

.entry-item strong {
    font-weight: bold;
}

.image-container {
    text-align: center;
    /* Center-align the image container */
}

.preview-image {
    max-width: 100px;
    height: auto;
    margin-top: 10px;
}

.map-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.map-btn:hover {
    background-color: #45a049;
}

/* Media Query for Mobile (Max 768px) */
@media (max-width: 768px) {
    .page-title {
        font-size: 20px;
    }

    .table-wrapper {
        display: none;
    }

    .entry-card {
        padding: 12px;
    }

    .entry-item {
        font-size: 14px;
        line-height: 1.5;
    }

    .entry-item strong {
        color: #333;
    }

    .map-btn {
        font-size: 14px;
        padding: 8px 12px;
        min-width: 100px;
        margin-top: 10px;
    }
}

/* Media Query for Desktop (Min 769px) */
@media (min-width: 769px) {
    .table-wrapper {
        display: block;
    }

    .entries-wrapper {
        display: none;
    }
}
</style>
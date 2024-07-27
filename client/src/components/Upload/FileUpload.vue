<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { addCustomerInfo, addDeliverySheet, addRouteSheet, initExtraInfo } from '../../api/index';
import DownloadExtraInfo from './DownloadExtraInfo.vue';
const file = ref<File | null>(null);
const customerDetail = ref({} as {
    customerId: string,
    customerName: string,
    phoneNumber: string,
    address: string,
    discountAvailed: string
})
const jsonData = ref([] as any[]);
const loaderVisible = ref(false);

const readSheetFile = async () => {
    loaderVisible.value = true;
    const fileUrl = 'https://docs.google.com/spreadsheets/d/1Rd7Io_lQCCbr9DGeFBH7mNNioB-CrkOV5WXU4qfA2s8/export?format=xlsx';
    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Network response was not ok.');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            const workbook = XLSX.read(e.target.result, { type: 'array' });
            await processWorkbook(workbook);
            loaderVisible.value = false;
        };
        reader.readAsArrayBuffer(blob);
    } catch (error) {
        loaderVisible.value = false;
        alert('OOPS!!!, Something went wrong.')
        console.error('Error fetching or processing the file:', error);
    }
}

const processWorkbook = async (workbook: XLSX.WorkBook) => {
    const customerSheetName = workbook.SheetNames.find((ele) => ele.includes('customersite'))
    const deliverySheetName = workbook.SheetNames.find((ele) => ele.includes('deliverysite'))
    const packagingSheetName = workbook.SheetNames.find((ele) => ele.includes('packagingsite'))
    if (customerSheetName && deliverySheetName) {
        const customerInfo = workbook.Sheets[customerSheetName];
        const deliveryInfo = workbook.Sheets[deliverySheetName];
        const customerInfoData = XLSX.utils.sheet_to_json(customerInfo, { raw: false });
        const deliveryInfoData = XLSX.utils.sheet_to_json(deliveryInfo, { raw: false });
        await storeData(customerInfoData, 'customerInfo');
        await storeData(deliveryInfoData, 'deliveryInfo');
    }
    if (packagingSheetName) {
        const packageInfo = workbook.Sheets[packagingSheetName];
        const packageInfoData = XLSX.utils.sheet_to_json(packageInfo, { raw: false });
        await storeData(packageInfoData, 'route');
    }
};
const storeData = async (jsonData: any[], name: string) => {
    jsonData.map(row => {
        Object.keys(row).forEach(key => {
            if (typeof row[key] === 'number' && XLSX.SSF.is_date(key)) {
                row[key] = XLSX.SSF.parse_date_code(row[key]);
            }
            const nestedFields = key.split('_');
            if (nestedFields?.length === 2) {
                if (!row[nestedFields[0]]) {
                    row[nestedFields[0]] = {};
                }
                row[nestedFields[0]][nestedFields[1]] = row[key];
                delete row[key];
            }
        })
    })
    try {
        if (name?.toLowerCase()?.includes?.('customerinfo')) {
            const result = await addCustomerInfo(jsonData, true);
            const initExtraInfoData = [] as any;
            jsonData.forEach(data => {
                initExtraInfoData.push({
                    customerId: data.customerId,
                    customerName: data.customerName,
                    address: data.address,
                    routeBoy: '',
                    timeStamp: '',
                    distanceFromLastPoint: 0,
                    coords: { lat: '', lng: '' },
                    origin: { lat: '', lng: '' },
                    lastPoint: { lat: '', lng: '' },
                    bottlesDelivered: 0,
                    bottlesCollected: 0,
                    bottlesRemaining: 0
                })
            })
            await initExtraInfo(initExtraInfoData);
        } else if (name?.toLowerCase().includes('route') || name?.toLowerCase().includes('package')) {
            const result = await addRouteSheet(jsonData);
        }
        else {
            const result = await addDeliverySheet(jsonData);
        }
        localStorage.clear();
    } catch (error) {
        alert('Something went wrong try again');
    }
}

const readFile = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input?.files?.length > 0) {
        file.value = input.files[0];
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                jsonData.value = XLSX.utils.sheet_to_json(sheet, { raw: false });
                jsonData.value.map(row => {
                    Object.keys(row).forEach(key => {
                        if (typeof row[key] === 'number' && XLSX.SSF.is_date(key)) {
                            row[key] = XLSX.SSF.parse_date_code(row[key]);
                        }
                        const nestedFields = key.split('_');
                        if (nestedFields?.length === 2) {
                            if (!row[nestedFields[0]]) {
                                row[nestedFields[0]] = {};
                            }
                            row[nestedFields[0]][nestedFields[1]] = row[key];
                            delete row[key];
                        }
                    })
                })
            } catch (error) {
                console.log('try: ', error);
            }
        }
        reader.onerror = (error: any) => {
            console.log('onerror: ', error);
        }
        reader.readAsArrayBuffer(file.value);
    } else {
        file.value = null;
    }
}

const addData = async (isUploaded: boolean) => {
    loaderVisible.value = true;
    const dataToBeSaved = isUploaded ? jsonData.value : [customerDetail.value];
    try {
        if (file.value && file.value?.name?.toLowerCase().includes?.('customerinfo')) {
            const result = await addCustomerInfo(dataToBeSaved, isUploaded);
            const initExtraInfoData = [] as any;
            dataToBeSaved.forEach(data => {
                initExtraInfoData.push({
                    customerId: data.customerId,
                    customerName: data.customerName,
                    address: data.address,
                    routeBoy: '',
                    timeStamp: '',
                    distanceFromLastPoint: 0,
                    coords: { lat: '', lng: '' },
                    origin: { lat: '', lng: '' },
                    lastPoint: { lat: '', lng: '' },
                    bottlesDelivered: 0,
                    bottlesCollected: 0,
                    bottlesRemaining: 0
                })
            })
            await initExtraInfo(initExtraInfoData);
        } else if (file.value && (file.value?.name?.toLowerCase().includes('route') || file.value?.name?.toLowerCase().includes('packag'))) {
            const result = await addRouteSheet(dataToBeSaved);
        }
        else {
            const result = await addDeliverySheet(dataToBeSaved);
        }
        loaderVisible.value = false
        file.value = null;
        alert('Data Added');
        localStorage.clear();
    } catch (error) {
        file.value = null;
        loaderVisible.value = false;
        alert('Something went wrong try again');
    }
}
</script>
<template>
    <div v-if="loaderVisible" class="loader active"></div>
    <DownloadExtraInfo />
    <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px] bg-white">
            Note: If you want to add customer data the file name should be "customerInfo". All other files will be
            stored
            for
            daily delivery count.
            Format of file: csv
            <form @submit.prevent="addData(true)" enctype="multipart/form-data" class="py-6 px-9">
                <div class="mb-6 pt-4">
                    <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                        Upload File
                    </label>
                    <div class="mb-8">
                        <input type="file" name="file" id="file" class="sr-only" @change="readFile" />
                        <label for="file"
                            class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                            <div>
                                <span
                                    class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                    Browse
                                </span>
                                <span v-if="file">{{ file.name }}</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        :class="[file?.name ? '' : 'cursor-not-allowed opacity-50', 'disabled bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded w-full rounded-md']">Send
                        File</button>
                </div>
            </form>
        </div>
        <button @click="readSheetFile"
            :class="['bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded w-full rounded-md']">Read
            File</button>
    </div>
</template>
<style>
.form {
    border: dashed black 1px;
    width: 200px;
    padding: 20px;
}

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    /* Ensure it appears above other content */
}

.loader.active {
    display: block;
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
<script lang="ts" setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { addCustomerInfo, addDeliverySheet, addRouteSheet } from '../../api/index';
const file = ref<File | null>(null);
const customerDetail = ref({} as {
    customerId: string,
    customerName: string,
    phoneNumber: string,
    address: string,
    discountAvailed: string
})
const jsonData = ref([] as any[]);
const readFile = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input?.files?.length > 0) {
        file.value = input.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
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
                console.log(jsonData.value);
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
    const dataToBeSaved = isUploaded ? jsonData.value : [customerDetail.value];
    try {
        if (file.value && file.value?.name?.toLowerCase().includes?.('customerinfo')) {
            const result = await addCustomerInfo(dataToBeSaved, isUploaded);
        } else if (file.value && (file.value?.name?.toLowerCase().includes('route') || file.value?.name?.toLowerCase().includes('packag'))) {
            const result = await addRouteSheet(dataToBeSaved);
        }
        else {
            const result = await addDeliverySheet(dataToBeSaved);
        }
        file.value = null;
        alert('Data Added');
    } catch (error) {
        file.value = null;
        alert('Something went wrong try again');
    }
}
</script>
<template>
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
    </div>

    <div class="flex items-center justify-center p-12">
        <div class="mx-auto w-full max-w-[550px] bg-white">
            <form @submit.prevent="addData(false)" class="form">
                <label class="mb-5 block text-xl font-semibold text-[#07074D]">
                    Enter customers details:
                </label>
                <p>
                    Customer Id*
                    <input type="text" required placeholder="Id like 0001" v-model="customerDetail.customerId" />
                </p>
                <p>
                    Customer Name*
                    <input type="text" required placeholder="Name" v-model="customerDetail.customerName" />
                </p>
                <p>
                    Customer Phone Number*
                    <input type="text" required placeholder="phone number" v-model="customerDetail.phoneNumber" />
                </p>
                <p>
                    Customer Address*
                    <input type="text" required placeholder="address" v-model="customerDetail.address" />
                </p>
                <p>
                    Discount Availed
                    <input type="text" placeholder="discount" v-model="customerDetail.discountAvailed" />
                </p>
                <button type="submit"
                    :class="['bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded']">Add
                    Customer</button>
            </form>
        </div>
    </div>
</template>
<style>
.form {
    border: dashed black 1px;
    width: 200px;
    padding: 20px;
}
</style>
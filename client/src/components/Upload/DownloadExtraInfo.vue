<template>
    <button @click="downloadDataAsCsv()"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Download
        Extra Info</button>
</template>
<script setup lang="ts">
import { getExtraInfo } from '@/api';
const jsonToCsv = (jsonData: any) => {
    const array = typeof jsonData !== 'object' ? JSON.parse(jsonData) : jsonData;
    let csvStr = '';
    const keys = Object.keys(array[0]);
    const heads = [] as string[];
    keys.map(key => {
        if (key === 'coords') {
            heads.push('lat');
            heads.push('lng');
        } else {
            heads.push(key);
        }
    })
    csvStr += heads.join(',') + '\n';
    for (const row of array) {
        const values = [] as string[];
        keys.map(key => {
            if (key === 'coords') {
                const pos = row[key];
                values.push(pos.lat);
                values.push(pos.lng);
            } else {
                values.push(row[key]);
            }
        })
        csvStr += values.join(',') + '\n';
    }
    return csvStr;
};

const downloadCsv = (data: any, filename = 'data.csv') => {
    const csvStr = jsonToCsv(data);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
const downloadDataAsCsv = async () => {
    const result = (await getExtraInfo()).data;
    const resultWithData = result.filter((res: any) => res.hasAnyData);
    downloadCsv(resultWithData);
};

const download = async () => {
    const result = (await getExtraInfo()).data;
    const resultWithData = result.filter((res: any) => res.hasAnyData);
    console.log(resultWithData);
}
</script>
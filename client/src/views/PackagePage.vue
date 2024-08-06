<template>
    <TabGroup v-if="deliveryRoutes.length">
        <TabList class="flex flex-wrap gap-2 p-1 tab-list">
            <Tab v-for="(tab, index) in deliveryRoutes" :key="index" as="template" v-slot="{ selected }">
                <button :class="buttonClasses(selected)">
                    {{ tab.route }}
                </button>
            </Tab>
        </TabList>
        <TabPanels class="tab-panels">
            <TabPanel v-for="(tab, index) in deliveryRoutes" :key="index" :class="panelClasses">
                <div class="option-label" v-for="(route, idx) in tab.routeData" :key="idx">
                    <div class="dotted-container">
                        <span class="highlighted-address">{{ route.address }}</span>
                        <div class="vertical-align">
                            <span v-if="route.gloriousRed">Glorious Red - GR: {{ route.gloriousRed }}</span>
                            <span v-if="route.greenDetox">Green Detox - GD: {{ route.greenDetox }}</span>
                            <span v-if="route.roseKatira">Rose Katira - RK: {{ route.roseKatira }}</span>
                            <span v-if="route.greenMint">Green Mint - GM: {{ route.greenMint }}</span>
                            <span v-if="route.shikanji">Shikanji - AS: {{ route.shikanji }}</span>
                            <span v-if="route.quinoaSalad">Quinoa Salad - QS: {{ route.quinoaSalad }}</span>
                            <span v-if="route.sproutSalad">Sprout Salad - SS: {{ route.sproutSalad }}</span>
                            <span v-if="route.farmSalad">Farm Salad - FS: {{ route.farmSalad }}</span>
                            <span v-if="route.pohaMeal">Poha - PM: {{ route.pohaMeal }}</span>
                            <span v-if="route.upmaMeal">Upma - UM: {{ route.upmaMeal }}</span>
                            <span v-if="route.theplaMeal">Thepla - tm: {{ route.theplaMeal }}</span>
                        </div>
                    </div>
                </div>
                <span style="background-color: aquamarine;">
                    ------------ You are ready to go ------------
                </span>
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script setup lang="ts">
import { getAllRouteInfo } from '@/api';
import { IRouteInfo } from '@/types';
import { onMounted, ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
const deliveryRoutes = ref([] as { route: string, routeData: IRouteInfo[] }[]);

onMounted(async () => {
    const data = (await getAllRouteInfo()).data as IRouteInfo[];
    const uniqueRoutes = [] as string[];
    data.forEach(d => {
        if (!uniqueRoutes.includes(d.route) && d.route) uniqueRoutes.push(d.route);
    })
    uniqueRoutes.forEach(route => {
        const routeData = data.filter(d => d.route === route);
        deliveryRoutes.value.push({ route, routeData });
    })
});

const buttonClasses = (selected: boolean) => [
    'rounded-lg py-2.5 px-4 text-sm font-medium leading-5',
    'focus:outline-none focus:ring-2',
    selected
        ? 'bg-blue-700 text-white shadow-md'
        : 'bg-white text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-300',
];

const panelClasses = [
    'rounded-xl bg-white p-3 tab-panel',
    'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
];
</script>

<style scoped lang="scss">
.tab-list {
    gap: 10px;
}

.tab {
    cursor: pointer;
}

.tab-panel {
    margin-top: 10px;
}

.tab-panel:first-child {
    margin-top: 0;
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
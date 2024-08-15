<template>
    <TabGroup v-if="itemRoutes.length">
        <TabList class="flex flex-wrap gap-2 p-1 tab-list">
            <Tab v-for="(tab, index) in itemRoutes" :key="index" as="template" v-slot="{ selected }">
                <button :class="buttonClasses(selected)">
                    {{ tab.item }}
                </button>
            </Tab>
        </TabList>
        <TabPanels class="tab-panels">
            <TabPanel v-for="(tab, index) in itemRoutes" :key="index" :class="panelClasses">
                <div class="option-label" v-for="(route, idx) in tab.routeData" :key="idx">
                    <div class="vertical-align">
                        <span class="highlighted-address"
                            v-if="(idx > 0 && route.route !== tab.routeData[idx - 1].route) || idx === 0">{{
        route.route }}</span>
                        <div>
                            <span v-if="route.count">{{ route.address }} : {{ route.count }}</span>
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
import { IRouteInfo, IItemRouteInfo } from '@/types';
import { onMounted, ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
const itemRoutes = ref([] as { item: string, routeData: IItemRouteInfo[] }[]);

onMounted(async () => {
    const data = (await getAllRouteInfo()).data as IRouteInfo[];
    const items = Object.keys(data[0]).filter(
        (k) => !['address', 'total', '_id', '__v', 'route'].includes(k)
    );
    items.forEach(item => {
        itemRoutes.value.push({ item, routeData: [] });
    })
    data.forEach(d => {
        itemRoutes.value.forEach(item => {
            const key = item.item as keyof IRouteInfo;
            const itemData = {
                route: d.route,
                address: d.address,
                count: d[key]
            }
            item.routeData.push(itemData);
        })
    })
    itemRoutes.value.forEach(item => {
        item.routeData.sort((a, b) => {
            if (a.route < b.route) {
                return -1;
            } else if (a.route > b.route) {
                return 1;
            } else {
                return 0;
            }
        })
    })
    itemRoutes.value.forEach(item => {
        item.routeData = item.routeData.filter(i => i.count);
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
<script lang="ts" setup>
// import DrinkCart from './components/DrinkCart.vue';
// import FileUpload from './components/Upload/FileUpload.vue';
</script>
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/packageByRoute">Packing by Route</router-link> |
    <router-link to="/packageByItem">Packing by Item</router-link> |
    <router-link to="/data">Update Data</router-link> |
    <router-link to="/sales">Sales Team</router-link>
  </nav>
  <router-view />
  <!-- <DrinkCart />
  <FileUpload /> -->
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
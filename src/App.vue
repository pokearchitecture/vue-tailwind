<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header class="bg-darkgray-100"></header>
  <aside class="bg-darkgray-300">
    <Navbar />
  </aside>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
#app {
  height: 100%;
  display: grid;
  grid-template-rows: 45px 1fr;
  grid-template-columns: 200px 1fr;
}

html,
body {
  height: 100%;
  margin: 0;
}

header {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);
  grid-column: 1/-1;
}

main {
  overflow: auto;
}
</style>

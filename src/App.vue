<script setup lang="ts">
import PokemonList from './components/PokemonList.vue';
</script>

<template>
  <header></header>
  <aside></aside>
  <main>
    <PokemonList />
  </main>
</template>

<style>
#app {
  background-color: #dcdcdc;
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
  background-color: white;
}

aside {
  background-color: #213e48;
}

main {
  overflow: auto;
}
</style>

<script setup lang="ts">
import PokemonList from './components/PokemonList.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header></header>
  <aside>
    <div class="pt-3">
      <Navbar />
    </div>
  </aside>
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
  background-color: rgba(55, 65, 81, 1);
}

main {
  overflow: auto;
}
</style>

<script setup lang="ts">
import NavLink from './NavLink.vue';
</script>

<template>
  <div class="text-white text-2xl font-bold">
    <NavLink style="margin-top: 0.19rem" to="kanto" text="Kanto" />
    <NavLink to="johto" text="Johto" />
    <NavLink to="hoenn" text="Hoenn" />
    <NavLink to="sinnoh" text="Sinnoh" />
    <NavLink to="unova" text="Unova" />
    <NavLink to="kalos" text="Kalos" />
    <NavLink to="alola" text="Alola" />
    <NavLink to="galar" text="Galar" />
    <NavLink to="all" text="All" />
  </div>
</template>

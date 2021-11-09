<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import PokeAPI, { INamedApiResource, IPokemon } from 'pokeapi-typescript';

let pokemon = ref<Array<INamedApiResource<IPokemon>>>();

onBeforeMount(async () => {
  const response = await PokeAPI.Pokemon.list(151);
  pokemon.value = response.results;
});
</script>

<template>
  <div class="pl-5">
    <div class="flex justify-center">
      <ul class="list-disc">
        <li v-for="mon in pokemon">
          {{ mon.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

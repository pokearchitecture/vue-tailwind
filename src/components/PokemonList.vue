<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import PokeAPI, { INamedApiResource, IPokemon } from 'pokeapi-typescript';

interface PokemonListViewModel {
  name: string;
  imageUrl: string;
}

let pokemonList = ref<Array<PokemonListViewModel>>();

onBeforeMount(async () => {
  const imageUrlRoot = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
  
  const response = await PokeAPI.Pokemon.list(151);
  
  pokemonList.value = response.results.map(item => {
    const url = item.url.slice(0, item.url.length-1)
    const pokemonId = url.slice(url.lastIndexOf('/')+1)
    
    return {
      name: item.name,
      imageUrl: `${imageUrlRoot}${pokemonId}.png`
    }
  })
});
</script>

<template>
  <div class="pl-5">
    <div class="flex justify-center">
      <ul class="list-disc">
        <li v-for="pokemon in pokemonList" class="flex items-center">
          <div class="flex items-center"> {{ pokemon.name }} </div>
          <img :src="pokemon.imageUrl">
        </li>
      </ul>
    </div>
  </div>
</template>

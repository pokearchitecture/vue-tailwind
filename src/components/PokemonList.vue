<script setup lang="ts">
import { onBeforeMount, ref, toRefs, defineProps } from 'vue';
import PokeAPI from 'pokeapi-typescript';
import Toggle from './Toggle.vue';

interface PokemonListViewModel {
  id: number;
  name: string;
  imageUrl: string;
}

const props = defineProps({
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
})

const { start, end } = toRefs(props)

let pokemonList = ref<Array<PokemonListViewModel>>();

onBeforeMount(async () => {
  const imageUrlRoot =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  const response = await PokeAPI.Pokemon.list(end.value - (start.value - 1), (start.value - 1))

  pokemonList.value = response.results.map((item) => {
    const url = item.url.slice(0, item.url.length - 1);
    const pokemonId = url.slice(url.lastIndexOf('/') + 1);
    const id = parseInt(pokemonId);

    if (isNaN(id)) {
      console.error('Failed to parse pokemon id');
      return {} as PokemonListViewModel;
    }

    return {
      name: item.name,
      id,
      imageUrl: `${imageUrlRoot}${pokemonId}.png`,
    };
  });
});
</script>

<template>
  <div class="flex justify-center flex-wrap">
    <div v-for="pokemon in pokemonList" :key="pokemon.id" class="mt-3 mr-3">
      <div class="flex justify-between bg-gray-600 py-5 px-7 rounded-2xl">
        <div class="pr-5">
          <div class="text-white text-2xl font-bold leading-10 capitalize">
            {{ pokemon.name }}
          </div>
          <div class="text-gray-400">National Dex #{{ pokemon.id }}</div>
          <Toggle :label="'Caught'" />
        </div>
        <img :src="pokemon.imageUrl" />
      </div>
    </div>
  </div>
</template>

<style></style>

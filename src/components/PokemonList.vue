<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue';
import PokeAPI from 'pokeapi-typescript';
import { PokemonCardViewModel } from './PokemonCardViewModel';
import PokemonCard from './PokemonCard.vue';

const props = defineProps({
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
});

const { start, end } = toRefs(props);

let pokemonList = ref<Array<PokemonCardViewModel>>();

onBeforeMount(async () => {
  const imageUrlRoot =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  const response = await PokeAPI.Pokemon.list(
    end.value - (start.value - 1),
    start.value - 1
  );

  pokemonList.value = response.results.map((item) => {
    const url = item.url.slice(0, item.url.length - 1);
    const pokemonId = url.slice(url.lastIndexOf('/') + 1);
    const id = parseInt(pokemonId);

    if (isNaN(id)) {
      console.error('Failed to parse pokemon id');
      return {} as PokemonCardViewModel;
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
      <PokemonCard :pokemon="pokemon" />
    </div>
  </div>
</template>

<style></style>

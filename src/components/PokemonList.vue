<script setup lang="ts">
import { onBeforeMount, ref, toRefs } from 'vue';
import PokeAPI from 'pokeapi-typescript';
import { PokemonCardViewModel } from './PokemonCardViewModel';
import PokemonCard from './PokemonCard.vue';
import SearchBar from './search-bar/SearchBar.vue';

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

let pokemonList = ref<Array<PokemonCardViewModel>>([]);
let filteredPokemonList = ref<Array<PokemonCardViewModel>>([]);
let isLoaded = ref(false);

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
  filteredPokemonList.value = pokemonList.value;

  isLoaded.value = true;
});
</script>

<template>
  <div>
    <div v-if="isLoaded" class="flex justify-center flex-wrap px-8 mt-4">
      <div class="basis-full mx-2">
        <SearchBar
          :items="pokemonList"
          @update:filtered-list="
            (filteredList) => (filteredPokemonList = filteredList)
          "
        />
      </div>

      <div
        v-for="pokemon in filteredPokemonList"
        :key="pokemon.id"
        class="mt-3 mx-2 grow"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>

    <div v-else class="text-white">Loading...</div>
  </div>
</template>

<style></style>

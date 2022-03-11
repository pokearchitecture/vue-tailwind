<script setup lang="ts">
import { onBeforeMount, provide, ref, toRefs } from 'vue';
import { usePokemonList } from './pokemonGateway';
import PokemonCard from './PokemonCard.vue';
import SearchBar from './search-bar/SearchBar.vue';
import Spinner from './spinner/Spinner.vue';
import { toggleCaughtKey, toggleSeenKey } from './lib';
import DexProgress from './DexProgress.vue';

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
const {
  pokemonList,
  filteredPokemonList,
  getPokemonList,
  markPokemonAsSeen,
  markPokemonAsCaught,
} = usePokemonList();

let isLoaded = ref(false);
onBeforeMount(async () => {
  pokemonList.value = await getPokemonList(start.value, end.value);
  filteredPokemonList.value = pokemonList.value;

  isLoaded.value = true;
});

provide(toggleSeenKey, markPokemonAsSeen);
provide(toggleCaughtKey, markPokemonAsCaught);
</script>

<template>
  <div class="h-full">
    <div v-if="isLoaded" class="flex justify-center flex-wrap px-8 mt-4">
      <div class="mb-3">
        <DexProgress />
      </div>

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
        class="mt-3 mx-2"
      >
        <PokemonCard :pokemon="pokemon" />
      </div>
    </div>

    <Spinner v-else />
  </div>
</template>

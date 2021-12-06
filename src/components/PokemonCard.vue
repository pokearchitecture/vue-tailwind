<script setup lang="ts">
import { toRefs, PropType } from 'vue';
import { PokemonCardViewModel } from './PokemonCardViewModel';
import Toggle from './Toggle.vue';

const props = defineProps({
  pokemon: {
    type: Object as PropType<PokemonCardViewModel>,
    required: true,
  },
});

const { pokemon } = toRefs(props);
</script>

<template>
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
</template>

<script setup lang="ts">
import { toRefs, PropType, ref, inject } from 'vue';
import { PokemonCardViewModel } from '../models/PokemonCardViewModel';
import Toggle from './Toggle.vue';
import { toggleCaughtKey, toggleSeenKey } from './lib';

const props = defineProps({
  pokemon: {
    type: Object as PropType<PokemonCardViewModel>,
    required: true,
  },
});

const { pokemon } = toRefs(props);
const seen = inject(toggleSeenKey);
const caught = inject(toggleCaughtKey);

function onSeen(isToggled: boolean) {
  if (!seen) {
    return;
  }

  seen(props.pokemon.id, isToggled);
}

function onCaught(isToggled: boolean) {
  if (!caught) {
    return;
  }

  caught(props.pokemon.id, isToggled);
}
</script>

<template>
  <div class="bg-darkgray-300 py-5 px-7 rounded-2xl">
    <div class="flex justify-between">
      <div class="pr-5">
        <div class="text-white text-2xl font-bold leading-10 capitalize">
          {{ pokemon.name }}
        </div>
        <div class="text-gray-400">National Dex #{{ pokemon.id }}</div>
      </div>

      <img :src="pokemon.imageUrl" />
    </div>

    <div class="flex">
      <div class="pr-3">
        <Toggle
          :label="'Seen'"
          :is-toggled="pokemon.seen"
          @update:is-toggled="onSeen"
        />
      </div>
      <Toggle
        :label="'Caught'"
        :is-toggled="pokemon.caught"
        @update:is-toggled="onCaught"
      />
    </div>
  </div>
</template>

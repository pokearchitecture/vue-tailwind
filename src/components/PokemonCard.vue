<script setup lang="ts">
import { toRefs, PropType, ref } from 'vue';
import { PokemonCardViewModel } from './PokemonCardViewModel';
import Toggle from './Toggle.vue';

const props = defineProps({
  pokemon: {
    type: Object as PropType<PokemonCardViewModel>,
    required: true,
  },
});

const { pokemon } = toRefs(props);

const isSeen = ref(false);
const isCaught = ref(false);

function handleIsSeen(isToggled: boolean) {
  isSeen.value = isToggled;

  if (isToggled === false) {
    isCaught.value = false;
  }
}

function handleIsCaught(isToggled: boolean) {
  isCaught.value = isToggled;

  if (isToggled === true) {
    isSeen.value = true;
  }
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
          v-model:is-toggled="isSeen"
          @update:is-toggled="handleIsSeen"
        />
      </div>
      <Toggle
        :label="'Caught'"
        v-model:is-toggled="isCaught"
        @update:is-toggled="handleIsCaught"
      />
    </div>
  </div>
</template>

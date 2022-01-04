<script setup lang="ts">
import { onMounted, watchEffect } from 'vue';
import { PokemonCardViewModel } from '../PokemonCardViewModel';
import { useSearch } from './useSearch';

const props = defineProps<{
  items: Array<PokemonCardViewModel>;
}>();

const emit = defineEmits<{
  (
    event: 'update:filteredList',
    filteredList: Array<PokemonCardViewModel>
  ): void;
}>();

const { searchText, filteredList } = useSearch(props.items);

watchEffect(() => {
  emit('update:filteredList', filteredList.value);
});
</script>

<template>
  <div class="bg-darkgray-300 rounded-2xl overflow-hidden flex">
    <input
      v-model="searchText"
      type="text"
      class="shadow-sm w-4/5 text-white bg-darkgray-100 border-none rounded-lg m-2 focus:ring-2 focus:ring-green-400 focus:border-green-400"
      placeholder="Search..."
    />
  </div>
</template>

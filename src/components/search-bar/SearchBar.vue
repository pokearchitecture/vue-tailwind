<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import { PokemonCardViewModel } from '../PokemonCardViewModel';
import { useSearch } from './useSearchSort';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/solid';
import { SortValues } from './SortValues';
import Toggle from '../Toggle.vue';
import Checkbox from '../Checkbox.vue';

const props = defineProps<{
  items: Array<PokemonCardViewModel>;
}>();

const emit = defineEmits<{
  (
    event: 'update:filteredList',
    filteredList: Array<PokemonCardViewModel>
  ): void;
}>();

const arrowIconClasses = ref('w-5 h-5 text-white');

const {
  searchText,
  filteredList,
  activeSort,
  lastDexNumberSortValue,
  lastNameSortValue,
  onDexNumberSort,
  onNameSort,
  filterSeen,
  filterCaught,
} = useSearch(props.items);

watchEffect(() => {
  emit('update:filteredList', filteredList.value);
});

function toggleCaught(isToggled: boolean) {
  filterCaught.value = isToggled;

  if (isToggled) {
    filterSeen.value = true;
  }
}

function toggleSeen(isToggled: boolean) {
  filterSeen.value = isToggled;

  if (!isToggled) {
    filterCaught.value = false;
  }
}
</script>

<template>
  <div class="bg-darkgray-300 rounded-2xl overflow-hidden flex">
    <input
      v-model="searchText"
      type="text"
      class="shadow-sm w-3/5 text-white bg-darkgray-100 border-none rounded-lg my-2 ml-5 focus:ring-2 focus:ring-green-400 focus:border-green-400"
      :class="searchText ? 'outline outline-2 outline-green-400' : ''"
      placeholder="Search..."
    />

    <div class="flex justify-center items-center ml-4">
      <button
        class="pr-2"
        :class="
          activeSort === SortValues.DexNumberAscending ||
          activeSort === SortValues.DexNumberDescending
            ? 'outline outline-2 outline-green-400 rounded-2xl p-1'
            : ''
        "
        @click="onDexNumberSort"
      >
        <div class="flex justify-center items-center">
          <ArrowUpIcon
            v-if="lastDexNumberSortValue === SortValues.DexNumberAscending"
            :class="arrowIconClasses"
          />
          <ArrowDownIcon
            v-if="lastDexNumberSortValue === SortValues.DexNumberDescending"
            :class="arrowIconClasses"
          />

          <div class="text-white ml-2">Dex #</div>
        </div>
      </button>

      <button
        class="ml-4 pr-2"
        :class="
          activeSort === SortValues.NameAscending ||
          activeSort === SortValues.NameDescending
            ? 'outline outline-2 outline-green-400 rounded-2xl p-1'
            : ''
        "
        @click="onNameSort"
      >
        <div class="flex justify-center items-center">
          <ArrowUpIcon
            v-if="lastNameSortValue === SortValues.NameAscending"
            :class="arrowIconClasses"
          />
          <ArrowDownIcon
            v-if="lastNameSortValue === SortValues.NameDescending"
            :class="arrowIconClasses"
          />

          <div class="text-white ml-2">Name</div>
        </div>
      </button>

      <div class="pl-3 flex">
        <Checkbox
          label="Seen"
          v-model:is-checked="filterSeen"
          @update:is-checked="toggleSeen"
        />
        <Checkbox
          label="Caught"
          v-model:is-checked="filterCaught"
          @update:is-checked="toggleCaught"
          class="ml-2"
        />
      </div>
    </div>
  </div>
</template>

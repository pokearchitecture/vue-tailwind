<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import { PokemonCardViewModel } from '../PokemonCardViewModel';
import { useSearch } from './useSearchSort';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/20/solid';
import { SortValues } from './SortValues';
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
  <div class="bg-darkgray-300 rounded-2xl overflow-hidden md:flex">
    <div class="mb-2 w-full flex justify-center">
      <input
        v-model="searchText"
        type="text"
        class="shadow-sm text-white bg-darkgray-100 border-none rounded-lg pl-2 py-2 my-2 mx-4 flex-grow focus:ring-2 focus:ring-green-400 focus:border-green-400"
        :class="searchText ? 'outline outline-2 outline-green-400' : ''"
        placeholder="Search..."
      />
    </div>

    <div class="sm:flex sm:justify-center basis-7/12">
      <div class="flex justify-center items-center mb-2">
        <button
          style="width: 6rem"
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
      </div>

      <div class="flex justify-center items-center mr-3 mb-2">
        <div class="pl-3 flex">
          <Checkbox
            label="Seen"
            :is-checked="filterSeen"
            @update:is-checked="toggleSeen"
          />
          <Checkbox
            label="Caught"
            :is-checked="filterCaught"
            @update:is-checked="toggleCaught"
            class="ml-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

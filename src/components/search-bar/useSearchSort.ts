import { computed, ref, watch } from 'vue';
import { PokemonCardViewModel } from '../PokemonCardViewModel';
import debounce from 'lodash/debounce';
import { SortValues } from './SortValues';

export function useSearch(items: Array<PokemonCardViewModel>) {
  const searchText = ref<string>('');
  const debouncedSearchText = ref<string>('');
  const activeSort = ref<SortValues>(SortValues.DexNumberAscending);
  const lastDexNumberSortValue = ref<SortValues>(SortValues.DexNumberAscending);
  const lastNameSortValue = ref<SortValues>(SortValues.NameAscending);

  const setDebouncedSearchText = debounce((value: string) => {
    debouncedSearchText.value = value;
  }, 100);

  watch(searchText, (searchText) => {
    setDebouncedSearchText(searchText);
  });

  const searchedList = computed(() => {
    if (!debouncedSearchText.value) {
      return items;
    }

    return items.filter((item) => {
      return item.name.includes(debouncedSearchText.value);
    });
  });

  const filteredList = computed(() => {
    switch (activeSort.value) {
      case SortValues.DexNumberAscending:
        return [
          ...searchedList.value.sort((a, b) => {
            return a.id - b.id;
          }),
        ];
      case SortValues.DexNumberDescending:
        return [
          ...searchedList.value.sort((a, b) => {
            return b.id - a.id;
          }),
        ];
      case SortValues.NameAscending:
        return [
          ...searchedList.value.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else {
              return 1;
            }
          }),
        ];
      case SortValues.NameDescending:
        return [
          ...searchedList.value.sort((a, b) => {
            if (b.name < a.name) {
              return -1;
            } else {
              return 1;
            }
          }),
        ];
    }
  });

  function onDexNumberSort() {
    if (
      activeSort.value !== SortValues.DexNumberAscending &&
      activeSort.value !== SortValues.DexNumberDescending
    ) {
      activeSort.value = lastDexNumberSortValue.value;
      return;
    }

    const newValue =
      lastDexNumberSortValue.value === SortValues.DexNumberAscending
        ? SortValues.DexNumberDescending
        : SortValues.DexNumberAscending;

    activeSort.value = newValue;
    lastDexNumberSortValue.value = newValue;
  }

  function onNameSort() {
    if (
      activeSort.value !== SortValues.NameAscending &&
      activeSort.value !== SortValues.NameDescending
    ) {
      activeSort.value = lastNameSortValue.value;
      return;
    }

    const newValue =
      lastNameSortValue.value === SortValues.NameAscending
        ? SortValues.NameDescending
        : SortValues.NameAscending;

    activeSort.value = newValue;
    lastNameSortValue.value = newValue;
  }

  return {
    searchText,
    filteredList,
    activeSort,
    lastDexNumberSortValue,
    lastNameSortValue,
    onDexNumberSort,
    onNameSort,
  };
}

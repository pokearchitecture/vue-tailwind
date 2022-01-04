import { computed, ref, watch } from 'vue';
import { PokemonCardViewModel } from "../PokemonCardViewModel";
import debounce from 'lodash/debounce';

export function useSearch(items: Array<PokemonCardViewModel>) {
  const searchText = ref<string>('');
  const debouncedSearchText = ref<string>('');

  const setDebouncedSearchText = debounce((value: string) => {
    debouncedSearchText.value = value;
  }, 100)

  watch(searchText, searchText => {
    setDebouncedSearchText(searchText)
  })

  const filteredList = computed(() => {
    if (!debouncedSearchText.value) {
      return items;
    }

    return items.filter((item) => {
      return item.name.includes(debouncedSearchText.value);
    });
  })

  return { searchText, filteredList }
}
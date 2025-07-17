import { type NamedApiResource, type Pokemon } from 'pokeapi-typescript';
import { type Ref, ref, type InjectionKey } from 'vue';
import { type PokemonCardViewModel } from '../models/PokemonCardViewModel';

export interface RegisteredPokemon {
  id: number;
  seen: boolean;
  caught: boolean;
}

export function usePokemonList() {
  const pokemonList = ref<Array<PokemonCardViewModel>>([]);
  const filteredPokemonList = ref<Array<PokemonCardViewModel>>([]);

  async function getPokemonList(start: number, end: number) {
    const results = await getPokemonFromApi(start, end);

    let pokemonCardViewModels = toViewModels(results);

    return addSeenAndCaughtData(pokemonCardViewModels);
  }

  async function markPokemonAsSeen(id: number, isToggled: boolean) {
    if (!isToggled) {
      toggleSeenOrCaught({
        pokemonList,
        id,
        isSeen: isToggled,
        isCaught: false,
      });
    } else {
      toggleSeenOrCaught({ pokemonList, id, isSeen: isToggled });
    }
  }

  async function markPokemonAsCaught(id: number, isToggled: boolean) {
    if (isToggled) {
      toggleSeenOrCaught({
        pokemonList,
        id,
        isCaught: isToggled,
        isSeen: true,
      });
    } else {
      toggleSeenOrCaught({ pokemonList, id, isCaught: isToggled });
    }
  }

  return {
    pokemonList,
    filteredPokemonList,
    getPokemonList,
    markPokemonAsSeen,
    markPokemonAsCaught,
  };
}

async function getPokemonFromApi(start: number, end: number) {
  const limit = end - (start - 1);
  const offset = start - 1;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    console.error('Failed to fetch pokemon data from PokeAPI');
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results as NamedApiResource<Pokemon>[];
}

function toViewModels(list: NamedApiResource<Pokemon>[]) {
  const imageUrlRoot =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  return list.map((item) => {
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
      seen: false,
      caught: false,
    } as PokemonCardViewModel;
  });
}

function addSeenAndCaughtData(viewModels: PokemonCardViewModel[]) {
  const newViewModels = [...viewModels];

  const pokemonDict = {} as { [key: number]: PokemonCardViewModel };

  for (const vm of newViewModels) {
    pokemonDict[vm.id] = vm;
  }

  for (const vm of newViewModels) {
    const registeredPokemonString = localStorage.getItem(`#${vm.id}`);
    if (!registeredPokemonString) {
      continue;
    }

    const registeredPokemon = JSON.parse(
      registeredPokemonString
    ) as RegisteredPokemon;
    pokemonDict[registeredPokemon.id].seen = registeredPokemon.seen;
    pokemonDict[registeredPokemon.id].caught = registeredPokemon.caught;
  }

  return newViewModels;
}

interface toggleSeenOrCaughtParams {
  pokemonList: Ref<PokemonCardViewModel[]>;
  id: number;
  isSeen?: boolean;
  isCaught?: boolean;
}

function toggleSeenOrCaught({
  pokemonList,
  id,
  isSeen,
  isCaught,
}: toggleSeenOrCaughtParams) {
  const affectedPokemonIndex = pokemonList.value.findIndex((pokemon) => {
    return pokemon.id === id;
  });

  if (affectedPokemonIndex < 0) {
    return;
  }

  const newPokemon = {
    ...pokemonList.value[affectedPokemonIndex],
  } as PokemonCardViewModel;

  if (isSeen !== undefined) {
    newPokemon.seen = isSeen;
  }

  if (isCaught !== undefined) {
    newPokemon.caught = isCaught;
  }

  localStorage.setItem(
    `#${newPokemon.id}`,
    JSON.stringify({
      id: newPokemon.id,
      seen: newPokemon.seen,
      caught: newPokemon.caught,
    } as RegisteredPokemon)
  );

  pokemonList.value.splice(affectedPokemonIndex, 1, newPokemon);
}

type ToggleSeenFunction = (id: number, isToggled: boolean) => void;
export const toggleSeenKey: InjectionKey<ToggleSeenFunction> =
  Symbol('toggleSeen');

type ToggleCaughtFunction = (id: number, isToggled: boolean) => void;
export const toggleCaughtKey: InjectionKey<ToggleCaughtFunction> =
  Symbol('toggleCaught');

import PokeAPI, { INamedApiResource, IPokemon } from 'pokeapi-typescript';
import { Ref, ref } from 'vue';
import { PokemonCardViewModel } from '../models/PokemonCardViewModel';
import { InjectionKey } from 'vue';

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
  const response = await PokeAPI.Pokemon.list(end - (start - 1), start - 1);
  return response.results;
}

function toViewModels(list: INamedApiResource<IPokemon>[]) {
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

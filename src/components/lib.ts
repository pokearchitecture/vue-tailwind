import { InjectionKey } from 'vue';

type ToggleSeenFunction = (id: number, isToggled: boolean) => void;
export const toggleSeenKey: InjectionKey<ToggleSeenFunction> =
  Symbol('toggleSeen');

type ToggleCaughtFunction = (id: number, isToggled: boolean) => void;
export const toggleCaughtKey: InjectionKey<ToggleCaughtFunction> =
  Symbol('toggleCaught');

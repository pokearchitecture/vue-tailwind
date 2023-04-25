<script setup lang="ts">
import Navbar from './components/nav-bar/Navbar.vue';
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from '@heroicons/vue/20/solid';
import { ref } from 'vue';

const isNavMenuVisible = ref(false);
</script>

<template>
  <div
    class="relative bg-darkgray-500 h-full grid grid-rows-layout grid-cols-layout lg:grid-cols-layout-full"
  >
    <header class="bg-darkgray-100 flex items-center">
      <MenuIcon
        class="w-6 h-6 text-white ml-2 cursor-pointer lg:hidden"
        @click="isNavMenuVisible = true"
      />
      <div class="text-green-400 flex items-center h-full pl-3 font-bold">
        vue - tailwind
      </div>
    </header>

    <aside
      class="bg-darkgray-300 w-300 lg:w-200 lg:!ml-0 absolute lg:static top-0 left-0 z-50 py-1 border-4 border-solid border-darkgray-500 transition-all"
      :style="isNavMenuVisible ? 'margin-left: 0' : 'margin-left: -300px'"
    >
      <div class="flex justify-end py-1 lg:hidden" style="height: 30px">
        <XIcon
          class="w-6 h-6 text-white mr-3 cursor-pointer"
          @click="isNavMenuVisible = false"
        />
      </div>
      <Navbar />
      <div class="py-1 lg:hidden" style="height: 30px"></div>
    </aside>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

header {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);
  grid-column: 1/-1;
}

main {
  overflow: auto;
}
</style>

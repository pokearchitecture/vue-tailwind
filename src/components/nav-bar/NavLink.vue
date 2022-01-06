<script setup lang="ts">
import { toRefs } from 'vue';

const boxShadow = 'box-shadow: inset 0 0 3px #0d1117;';

const props = defineProps<{
  text: string;
  to: string;
}>();

const { text, to } = toRefs(props);
</script>

<template>
  <div
    class="
      py-2
      w-full
      text-left
      pl-5
      bg-darkgray-500
      hover:bg-green-400
      cursor-pointer
    "
    :style="boxShadow"
  >
    <router-link :to="to" class="w-full h-full inline-block">{{
      text
    }}</router-link>
  </div>
</template>

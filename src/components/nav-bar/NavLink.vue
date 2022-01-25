<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  text: string;
  to: string;
}>();

const { text, to } = toRefs(props);
</script>

<template>
  <div
    class="py-2 w-full text-left pl-5 bg-darkgray-500 hover:bg-green-400 cursor-pointer"
    style="box-shadow: inset 0 0 10px #0d1117"
  >
    <router-link :to="to" class="w-full h-full inline-block">{{
      text
    }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  label: string;
  isChecked: boolean;
}>();

const { label } = toRefs(props);

const emit = defineEmits<{
  (event: 'update:isChecked', isChecked: boolean): void;
}>();

function emitCheckedEvent(event: Event) {
  const htmlInput = event.target as HTMLInputElement;
  emit('update:isChecked', htmlInput.checked);
}
</script>

<template>
  <div class="flex items-center mt-1">
    <label class="flex select-none text-white">
      {{ label }}
      <input
        type="checkbox"
        name="Filter Pokemon Seen"
        class="opacity-0 invisible absolute h-8 w-8"
        :checked="isChecked"
        @change="emitCheckedEvent"
      />
      <div
        class="bg-darkgray-500 border-2 rounded-lg border-darkgray-100 w-7 h-7 flex flex-shrink-0 justify-center items-center ml-2 focus-within:border-green-400"
      >
        <svg
          class="fill-current hidden w-3 h-3 text-green-400 pointer-events-none"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fill-rule="evenodd">
            <g
              transform="translate(-9 -11)"
              fill="rgb(74, 222, 128)"
              fill-rule="nonzero"
            >
              <path
                d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
              />
            </g>
          </g>
        </svg>
      </div>
    </label>
  </div>
</template>

<style scoped>
input:checked + div {
  @apply border-green-400 bg-darkgray-100;
}
input:checked + div svg {
  @apply block;
}
</style>

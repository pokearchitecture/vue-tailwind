<script setup lang="ts">
const props = defineProps<{
  label: string;
  isToggled: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:isToggled', isToggled: boolean): void;
}>();

function emitToggledEvent(event: Event) {
  const htmlInput = event.target as HTMLInputElement;
  emit('update:isToggled', htmlInput.checked);
}
</script>

<template>
  <label
    class="
      flex
      justify-center
      items-center
      p-2
      pl-0
      text-xl
      relative
      group
      text-white
    "
  >
    {{ props.label }}
    <input
      type="checkbox"
      class="appearance-none peer absolute left-0 top-0 h-full rounded-md"
      v-model="isToggled"
      @change="emitToggledEvent"
    />
    <span
      class="
        w-12
        h-7
        flex
        items-center
        flex-shrink-0
        ml-4
        p-1
        bg-gray-300
        rounded-full
        peer-checked:bg-green-400
        duration-300
        ease-in-out
        after:w-5
        after:h-5
        after:bg-white
        after:rounded-full
        after:shadow-md
        after:duration-300
        peer-checked:after:translate-x-5
        group-hover:after:translate-x-1
      "
    ></span>
  </label>
</template>

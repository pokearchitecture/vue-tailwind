<script setup lang="ts">
  const props = defineProps<{
    label: String
  }>()
</script>

<template>
  <label class="flex justify-center items-center p-2 pl-0 text-xl relative group text-white">
    {{ props.label }}
    <input
      type="checkbox"
      class="
        appearance-none
        peer
        absolute
        left-0
        top-0
        w-full
        h-full
        rounded-md
      "
    />
    <span
      class="
        w-16
        h-10
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
        after:w-8
        after:h-8
        after:bg-white
        after:rounded-full
        after:shadow-md
        after:duration-300
        peer-checked:after:translate-x-6
        group-hover:after:translate-x-1
      "
    ></span>
  </label>
</template>

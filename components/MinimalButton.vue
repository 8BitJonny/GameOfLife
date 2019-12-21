<template>
  <button
    v-on="$listeners"
    :disabled="disabled"
    class="h-full mx-1 px-1 bg-transparent text-white font-bold border border-transparent rounded appearance-none active:underline focus:outline-none"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean
    }
  }
}
</script>

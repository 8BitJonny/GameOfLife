<template>
  <button
    class="h-full mx-1 px-1 bg-transparent text-white font-bold border border-transparent rounded appearance-none focus:outline-none"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

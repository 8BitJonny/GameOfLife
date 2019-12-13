<template>
  <button
    v-on="$listeners"
    class="h-full mx-1 px-1 bg-transparent text-white font-bold border border-transparent rounded appearance-none focus:outline-none"
  >
    <slot></slot>
  </button>
</template>

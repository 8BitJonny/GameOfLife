<template>
  <div class="app flex flex-col mx-0">
    <nav-bar />
    <grid />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import Grid from '~/components/Grid.vue'

export default {
  components: {
    NavBar,
    Grid
  }
}
</script>

<style>
.app {
  font-family: 'Rubik', sans-serif;
}
</style>

<template>
  <div
    class="w-full h-12 flex-shrink-0 px-6 flex flex-wrap items-center justify-between bg-black select-none"
  >
    <div>
      <span class="text-white font-extrabold text-3xl">Game of Life</span>
    </div>
    <div id="controls" class="h-full my-auto py-1 text-xl">
      <minimal-button @click="setGridMode('PAUSE')" v-if="gridMode === 'PLAY'"
        >Pause</minimal-button
      >
      <minimal-button @click="setGridMode('PLAY')" v-else>
        Play
      </minimal-button>
      <minimal-button @click="emitGridEvent('RANDOM')"
        >Randomize</minimal-button
      >
      <minimal-button @click="setGridMode('EDIT')">Edit</minimal-button>
      <minimal-button @click="emitGridEvent('CLEAR')">Clear</minimal-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MinimalButton from '../components/MinimalButton.vue'

export default {
  components: {
    MinimalButton
  },
  computed: mapGetters({
    gridMode: 'gridMode/get'
  }),
  methods: {
    setGridMode(newGridState) {
      this.$store.commit('gridMode/set', newGridState)
    },
    emitGridEvent() {}
  }
}
</script>

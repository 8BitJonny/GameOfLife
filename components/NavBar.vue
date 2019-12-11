<template>
  <div
    class="w-full h-12 flex-shrink-0 px-6 flex flex-wrap items-center justify-between bg-black"
  >
    <div>
      <span class="text-white font-extrabold text-3xl">Game of Life</span>
    </div>
    <div id="controls" class="h-full my-auto py-1 text-xl">
      <minimal-button>{{ gridState }}</minimal-button>
      <minimal-button @click="setGridState('PAUSE')" v-if="gridState === 'PLAY'"
        >Pause</minimal-button
      >
      <minimal-button @click="setGridState('PLAY')" v-else>
        Play
      </minimal-button>
      <minimal-button>Randomize</minimal-button>
      <minimal-button @click="setGridState('EDIT')">Edit</minimal-button>
      <minimal-button>Clear</minimal-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MinimalButton from '~/components/MinimalButton.vue'

export default {
  components: {
    MinimalButton
  },
  computed: mapGetters({
    gridState: 'gridControlState/get'
  }),
  methods: {
    setGridState(newGridState) {
      this.$store.commit('gridControlState/set', newGridState)
    }
  }
}
</script>

<template>
  <div
    class="w-full h-12 flex-shrink-0 px-6 flex flex-wrap items-center justify-between bg-black select-none"
  >
    <div>
      <span class="text-white font-extrabold text-3xl">Game of Life</span>
    </div>
    <div id="controls" class="h-full my-auto py-1 text-xl">
      <minimal-button
        v-for="item in navigationItems"
        v-if="item.displayCondition()"
        :disabled="actionShouldBeDisabled(item.id)"
        v-on:click="item.action"
        v-bind:class="{
          'opacity-50 cursor-not-allowed': actionShouldBeDisabled(item.id),
          underline: actionShouldBeUnderlined(item.id)
        }"
        >{{ item.text }}</minimal-button
      >
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
  data() {
    return {
      navigationItems: [
        {
          id: 'PLAY',
          text: 'Play',
          displayCondition: () => this.gridMode !== 'PLAY',
          action: () => {
            this.setGridMode('PLAY')
            this.emitGridEvent('PLAY')
          }
        },
        {
          id: 'PAUSE',
          text: 'Pause',
          displayCondition: () => this.gridMode === 'PLAY',
          action: () => this.setGridMode('PAUSE')
        },
        {
          id: 'RANDOM',
          text: 'Random',
          displayCondition: () => true,
          action: () => this.emitGridEvent('RANDOM')
        },
        {
          id: 'EDIT',
          text: 'Edit',
          displayCondition: () => true,
          action: () => {
            if (this.gridMode === 'EDIT') {
              this.setGridMode('PAUSE')
            } else {
              this.setGridMode('EDIT')
            }
          }
        },
        {
          id: 'CLEAR',
          text: 'Clear',
          displayCondition: () => true,
          action: () => this.emitGridEvent('CLEAR')
        }
      ]
    }
  },
  computed: mapGetters({
    gridMode: 'gridMode/get'
  }),
  methods: {
    setGridMode(newGridState) {
      this.$store.commit('gridMode/set', newGridState)
    },
    emitGridEvent(event) {
      this.$bus.$emit('gridEvent', event)
    },
    actionShouldBeDisabled(action) {
      if (this.gridMode === 'PLAY') {
        return action !== 'PAUSE'
      }
      return false
    },
    actionShouldBeUnderlined(action) {
      return action === 'EDIT' && this.gridMode === 'EDIT'
    }
  }
}
</script>

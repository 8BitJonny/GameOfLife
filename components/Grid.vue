<template>
  <div class="bg-darkgreen flex-grow flex-shrink overflow-hidden p-2">
    <div
      id="GridWrapper"
      ref="gridWrapper"
      class="h-full flex justify-center content-center"
    >
      <Canvas
        :gridConfig="gridConfig"
        :gridState="gridState.state"
        v-on:click="onClick"
      >
      </Canvas>
    </div>
  </div>
</template>

<script>
import Canvas from '../components/Canvas.vue'
import {
  calculateCellCountFromPixelSize,
  calculatePixelSizeFromCellCount
} from '../utils'
import Grid from '../model/Grid.ts'

export default {
  components: {
    Canvas
  },
  data() {
    return {
      gridConfig: {
        cellSize: 14,
        cellPadding: 7,
        cellCount: { rowCount: 30, columnCount: 60 },
        size: { h: 623, w: 1253 }
      },
      gridState: Grid.generateEmptyState({ rowCount: 30, columnCount: 60 })
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.$bus.$on('gridEvent', this.handleGridEvents)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    onClick(event) {
      const cellIndex = this.gridState.findCellFromCoordinates(
        { x: event.x, y: event.y },
        { size: this.gridConfig.cellSize, padding: this.gridConfig.cellPadding }
      )

      if (!cellIndex) return

      this.gridState.toggleCell(cellIndex, true)
    },
    handleGridEvents(event) {
      switch (event) {
        case 'RANDOM':
          this.gridState = Grid.generateNewRandomState(
            this.gridConfig.cellCount
          )
          break
        case 'CLEAR':
          this.gridState = Grid.generateEmptyState(this.gridConfig.cellCount)
          break
        default:
      }
    },
    handleResize() {
      const wrapperElement = this.$refs.gridWrapper
      if (wrapperElement) {
        const rowCount = calculateCellCountFromPixelSize(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          wrapperElement.clientHeight
        )
        const columnCount = calculateCellCountFromPixelSize(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          wrapperElement.clientWidth
        )

        const pixelH = calculatePixelSizeFromCellCount(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          rowCount
        )
        const pixelW = calculatePixelSizeFromCellCount(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          columnCount
        )

        this.gridConfig.size = { h: pixelH, w: pixelW }
        this.gridConfig.cellCount = { rowCount, columnCount }
        this.gridState = this.gridState.adjustGridToNewSize(
          this.gridConfig.cellCount
        )
      }
    }
  }
}
</script>

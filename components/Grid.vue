<template>
  <div class="bg-darkgreen flex-grow flex-shrink overflow-hidden p-2">
    <div
      id="GridWrapper"
      ref="gridWrapper"
      class="h-full flex justify-center content-center"
    >
      <Canvas :gridConfig="gridConfig" :gridState="gridState.state"> </Canvas>
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
        cellCount: { h: 30, w: 60 },
        size: { h: 623, w: 1253 }
      },
      gridState: Grid.generateEmptyState(30, 60)
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      const wrapperElement = this.$refs.gridWrapper
      if (wrapperElement) {
        const h = calculateCellCountFromPixelSize(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          wrapperElement.clientHeight
        )
        const w = calculateCellCountFromPixelSize(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          wrapperElement.clientWidth
        )

        const pixelH = calculatePixelSizeFromCellCount(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          h
        )
        const pixelW = calculatePixelSizeFromCellCount(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          w
        )

        this.gridConfig.size = { h: pixelH, w: pixelW }
        this.gridConfig.cellCount = { h, w }
        this.gridState = this.gridState.adjustGridToNewSize(h, w)
      }
    }
  }
}
</script>

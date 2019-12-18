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
import { mapGetters } from 'vuex'
import Canvas from '../components/Canvas.vue'
import {
  calculate1DCellCountFromPixelSize,
  calculate1DPixelSizeFromCellCount
} from '../utils'
import Grid from '../model/Grid.ts'

export default {
  components: {
    Canvas
  },
  data() {
    return {
      gridConfig: {
        speed: 150,
        cellSize: 14,
        cellPadding: 7,
        cellCount: { rowCount: 30, columnCount: 60 },
        size: { h: 623, w: 1253 }
      },
      gridState: Grid.generateEmptyState({ rowCount: 30, columnCount: 60 })
    }
  },
  computed: mapGetters({
    gridMode: 'gridMode/get'
  }),
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.$bus.$on('gridEvent', this.handleGridEvents)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    calculateNextState(nextStepTime = 0) {
      if (this.gridMode !== 'PLAY') return

      if (new Date().getTime() >= nextStepTime) {
        nextStepTime = new Date().getTime() + this.gridConfig.speed

        this.gridState.calculateNextGrid()
      }

      requestAnimationFrame(this.calculateNextState.bind(this, nextStepTime))
    },
    handleGridEvents(event) {
      switch (event) {
        case 'PLAY':
          this.calculateNextState()
          break
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
    onClick(event) {
      const cellIndex = this.gridState.findCellFromCoordinates(
        { x: event.x, y: event.y },
        { size: this.gridConfig.cellSize, padding: this.gridConfig.cellPadding }
      )

      if (!cellIndex) return

      this.gridState.toggleCell(cellIndex, true)
    },
    handleResize() {
      const wrapperElement = this.$refs.gridWrapper
      if (wrapperElement) {
        this.gridConfig.cellCount = this.calculateCellCountFromPixelSize(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          {
            height: wrapperElement.clientHeight,
            width: wrapperElement.clientWidth
          }
        )

        this.gridConfig.size = this.calculatePixelSizeFromCellCount(
          this.gridConfig.cellSize,
          this.gridConfig.cellPadding,
          this.gridConfig.cellCount
        )

        this.gridState = this.gridState.adjustGridToNewSize(
          this.gridConfig.cellCount
        )
      }
    },
    calculateCellCountFromPixelSize(cellSize, cellPadding, pixelSize) {
      return {
        rowCount: calculate1DCellCountFromPixelSize(
          cellSize,
          cellPadding,
          pixelSize.height
        ),
        columnCount: calculate1DCellCountFromPixelSize(
          cellSize,
          cellPadding,
          pixelSize.width
        )
      }
    },
    calculatePixelSizeFromCellCount(cellSize, cellPadding, cellCount) {
      return {
        h: calculate1DPixelSizeFromCellCount(
          cellSize,
          cellPadding,
          cellCount.rowCount
        ),
        w: calculate1DPixelSizeFromCellCount(
          cellSize,
          cellPadding,
          cellCount.columnCount
        )
      }
    }
  }
}
</script>

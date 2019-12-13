<template>
  <canvas
    v-bind:height="gridConfig.size.h"
    v-bind:width="gridConfig.size.w"
    ref="canvas"
  >
  </canvas>
</template>

<script>
import { GridState } from '../model/Grid.ts'

export default {
  props: {
    gridConfig: {
      size: {
        h: { type: Number },
        w: { type: Number }
      }
    },
    gridState: {
      type: GridState
    }
  },
  data() {
    return {
      ctx: undefined
    }
  },
  mounted() {
    this.setupCanvas(() => {
      this.drawCycle()
    })
  },
  methods: {
    setupCanvas(callback) {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.imageSmoothingEnabled = false

      this.ctx = ctx

      callback()
    },
    drawCycle() {
      this.clearCanvas(this.ctx)

      this.drawCanvas(this.ctx)

      requestAnimationFrame(this.drawCycle.bind(this))
    },
    drawCanvas(ctx) {
      for (let i = 0; i < this.gridConfig.cellCount.h; i++) {
        for (let j = 0; j < this.gridConfig.cellCount.w; j++) {
          this.gridState[i][j].draw(
            ctx,
            this.gridConfig.cellSize,
            this.gridConfig.cellPadding
          )
        }
      }
    },
    clearCanvas(ctx) {
      ctx.clearRect(0, 0, this.gridConfig.size.w, this.gridConfig.size.h)
    },
    onMouseMove(event) {
      const rect = this.$refs.canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      this.clearCanvas(this.ctx)

      // add a single rect to path:
      this.ctx.beginPath()
      this.ctx.rect(0, 0, 10, 10)

      // check if we hover it, fill red, if not fill it blue
      this.ctx.fillStyle = this.ctx.isPointInPath(x, y) ? 'red' : 'blue'
      this.ctx.fill()
    }
  }
}
</script>

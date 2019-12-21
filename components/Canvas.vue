<template>
  <canvas
    ref="canvas"
    v-bind:height="gridConfig.size.h"
    v-bind:width="gridConfig.size.w"
    v-bind:class="{
      'cursor-pointer': isInEditMode
    }"
  >
  </canvas>
</template>

<script>
import { mapGetters } from 'vuex'
import { GridState } from '../model/Grid.ts'
import ClickHandler from '../model/CanvasInteractionHandler'

export default {
  props: {
    gridConfig: {
      size: {
        h: { type: Number },
        w: { type: Number }
      },
      cellCount: {
        rowCount: { type: Number },
        columnCount: { type: Number }
      }
    },
    gridState: {
      type: GridState
    }
  },
  data() {
    return {
      ctx: undefined,
      lastFrameTime: 0,
      clickHandler: undefined
    }
  },
  computed: {
    ...mapGetters({
      gridMode: 'gridMode/get'
    }),
    isInEditMode() {
      return this.gridMode === 'EDIT'
    }
  },
  mounted() {
    this.setupCanvas(() => {
      this.drawCycle()
    })

    this.clickHandler = new ClickHandler(
      this.$refs.canvas,
      this.handleClick.bind(this)
    )
  },
  methods: {
    setupCanvas(callback) {
      const ctx = this.$refs.canvas.getContext('2d')
      ctx.imageSmoothingEnabled = false

      this.ctx = ctx

      callback()
    },
    drawCycle(time) {
      const timeSinceLastFrame = time - this.lastFrameTime
      this.lastFrameTime = time

      this.clearCanvas(this.ctx)

      this.drawCanvas(this.ctx, timeSinceLastFrame)

      requestAnimationFrame(this.drawCycle.bind(this))
    },
    drawCanvas(ctx, timePassed) {
      for (let i = 0; i < this.gridConfig.cellCount.rowCount; i++) {
        for (let j = 0; j < this.gridConfig.cellCount.columnCount; j++) {
          this.gridState[i][j].draw(
            ctx,
            this.gridConfig.cellSize,
            this.gridConfig.cellPadding,
            timePassed
          )
        }
      }
    },
    clearCanvas(ctx) {
      ctx.clearRect(0, 0, this.gridConfig.size.w, this.gridConfig.size.h)
    },
    handleClick({ x, y }, clicked) {
      if (this.isInEditMode || !clicked) {
        this.$emit('click', { x, y }, clicked)
      }
    }
  }
}
</script>

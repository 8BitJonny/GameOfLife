import Vector from '~/model/Vector'

export default class CanvasInteractionHandler {
  canvas: HTMLCanvasElement
  onClickNotifier: (pos: Vector, clicked: boolean) => void

  constructor(canvas: HTMLCanvasElement, onClickNotifier: (pos: Vector) => void) {
    this.canvas = canvas
    this.onClickNotifier = onClickNotifier

    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('mousedown', this.onClickedOrMouseDrag.bind(this))
    this.canvas.addEventListener('mouseup',this.onMouseUp.bind(this))
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons === 1) {
      this.onClickedOrMouseDrag(event)
    }
  }

  onClickedOrMouseDrag(event: MouseEvent) {
    this.onClickNotifier(this.calculatePosition(this.canvas, event), true)
  }

  onMouseUp(event: MouseEvent) {
    this.onClickNotifier(this.calculatePosition(this.canvas, event), false)
  }

  calculatePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
    const rect = canvas.getBoundingClientRect()
    return new Vector(
      event.clientX - rect.left,
      event.clientY - rect.top
    )
  }
}

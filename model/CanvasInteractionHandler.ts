import Vector from '~/model/Vector'

export default class CanvasInteractionHandler {
  canvas: HTMLCanvasElement
  onClickNotifier: (pos: Vector) => void

  constructor(canvas: HTMLCanvasElement, onClickNotifier: (pos: Vector) => void) {
    this.canvas = canvas
    this.onClickNotifier = onClickNotifier

    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('click', this.onClickedOrMouseDrag.bind(this))
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons === 1) {
      this.onClickedOrMouseDrag(event)
    }
  }

  onClickedOrMouseDrag(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    this.onClickNotifier(new Vector(x,y))
  }
}

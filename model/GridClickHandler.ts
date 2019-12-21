import Cell from '~/model/Cell'
import Vector from '~/model/Vector'
import Alive from '~/model/Alive'

export default class GridClickHandler {
  firstClickedCellState: Alive | undefined
  toggleCell: (index: Vector, fillMode: boolean) => void
  returnCellFromCoordinates: (coordinates: Vector) => Cell

  constructor(returnCellFromCoordinates: (coordinates: Vector) => Cell, toggleCell: (index: Vector, fillMode: boolean) => void) {
    this.firstClickedCellState = undefined
    this.toggleCell = toggleCell
    this.returnCellFromCoordinates = returnCellFromCoordinates

    this.onClick = this.onClick.bind(this)
  }

  onClick(event: {x: number, y: number}, clicked: boolean) {
    if (clicked) {
      const cell = this.returnCellFromCoordinates(new Vector(event.x, event.y))

      if (!cell) return

      if (this.firstClickedCellState === undefined) {
        this.firstClickedCellState = cell.alive
      }

      this.toggleCell(cell.index, !this.firstClickedCellState)
    } else {
      this.firstClickedCellState = undefined
    }
  }
}

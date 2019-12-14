import CanvasCell from "./Cell";
import Vector from "./Vector";

export interface GridState extends Array<Array<CanvasCell>> {
  [index: number]: CanvasCell[];
}

export default class Grid {
  state: GridState;
  constructor(grid: GridState) {
    this.state = grid;
  }

  static generateNewRandomState(rowCount: number, columnCount: number): Grid {
    let newGridObject: GridState = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
      newGridObject[rowIndex] = [];
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
        newGridObject[rowIndex].push( new CanvasCell(columnIndex, rowIndex, Math.random() > 0.7 ? 1 : 0) );
      }
    }
    return new Grid(newGridObject);
  }

  static generateEmptyState(rowCount: number, columnCount: number): Grid {
    let newGridObject: GridState = [];
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
      newGridObject[rowIndex] = this.generateEmptyColumn(rowIndex, columnCount);
    }
    return new Grid(newGridObject);
  }

  static generateEmptyColumn(rowIndex: number, size: number): CanvasCell[] {
    let emptyColumn: CanvasCell[] = [];
    for (let columnIndex = 0; columnIndex < size; columnIndex ++) {
      emptyColumn.push( new CanvasCell(columnIndex, rowIndex) );
    }
    return emptyColumn;
  }

  findCellFromCoordinates(coordinate: {x: number, y: number}, cellConfig: {size: number, padding: number}) {
    let xIndex = this.calculateClickedCellIn1D(coordinate.x, cellConfig);
    let yIndex = this.calculateClickedCellIn1D(coordinate.y, cellConfig);

    if (xIndex !== null && yIndex !== null) {
      return new Vector(xIndex, yIndex);
    } else return null
  }

  calculateClickedCellIn1D(cursorPos: number, cellConfig: {size: number, padding: number}): number | null {
    let posModulo = (cursorPos) % (cellConfig.size + cellConfig.padding);
    const paddingThreshHold = 0.3;

    if (posModulo < cellConfig.size + (paddingThreshHold * cellConfig.padding)) {
      return Math.floor(cursorPos / (cellConfig.size + cellConfig.padding));
    } else {
      return null
    }
  }

  toggleCell(index: Vector, fillMode: boolean) {
    this.state[index.y][index.x].toggle(fillMode);
    return new Grid(this.state);
  }

  calculateNextGrid(): Grid {
    for (let rowIndex = 0; rowIndex < this.state.length; rowIndex ++) {
      for (let columnIndex = 0; columnIndex < this.state[rowIndex].length; columnIndex ++) {
        const aliveNeighbours = this._countAliveNeighbours({rowIndex, columnIndex});
        this.state[rowIndex][columnIndex].nextCellState(aliveNeighbours);
      }
    }

    for (let rowIndex = 0; rowIndex < this.state.length; rowIndex ++) {
      for (let columnIndex = 0; columnIndex < this.state[rowIndex].length; columnIndex ++) {
        this.state[rowIndex][columnIndex].applyNextState();
      }
    }

    return new Grid(this.state);
  }

  _countAliveNeighbours(cellIndex: { rowIndex: number, columnIndex: number }): number {
    let count = 0;
    for (let gridRowIndexOffset = -1; gridRowIndexOffset <= 1; gridRowIndexOffset++ ) {
      for (let gridColumnIndexOffset = -1; gridColumnIndexOffset <= 1; gridColumnIndexOffset++ ) {
        const rowIndex = cellIndex.rowIndex + gridRowIndexOffset;
        const columnIndex = cellIndex.columnIndex + gridColumnIndexOffset;
        if (this._indexInGridBounds({rowIndex, columnIndex})
          && !(gridColumnIndexOffset === 0 && gridRowIndexOffset === 0)) {
          if (this.state[rowIndex][columnIndex].alive === 1) {
            count ++
          }
        }
      }
    }
    return count
  }

  _indexInGridBounds(cellIndex: { rowIndex: number, columnIndex: number }) {
    return cellIndex.rowIndex >= 0 && cellIndex.rowIndex < this.state.length
      && cellIndex.columnIndex >= 0 && cellIndex.columnIndex < this.state[0].length;
  }

  adjustGridToNewSize(newHeight: number, newWidth: number): Grid {
    const oldHeight = this.state.length, oldWidth = this.state[0].length;

    for (let rowIndex = 0; rowIndex < oldHeight; rowIndex ++) {
      this.state[rowIndex] = Grid.truncateOrFillWith(newWidth, oldWidth, this.state[rowIndex],(index) => {return new CanvasCell(index, rowIndex)});
    }

    this.state = Grid.truncateOrFillWith(newHeight, oldHeight, this.state ,(index) => Grid.generateEmptyColumn(index, newWidth));

    return new Grid(this.state);
  }

  static truncateOrFillWith<T>(newLength: number, oldLength: number, parent: T[], fillElement: (index: number) => T): T[] {
    if (newLength < oldLength) {
      parent = parent.splice(0, newLength);
    } else {
      for (let i = oldLength; i < newLength; i++) {
        parent.push(fillElement(i));
      }
    }
    return parent
  }
};

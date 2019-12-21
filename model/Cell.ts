import Alive from "./alive";
import Vector from "./vector";
import CellAnimation from '../model/CellAnimation'

const keyFrames = {0:0, 80:120, 100:100}

export default class Cell {
  alive: Alive;
  nextAliveState: Alive | undefined;
  index: Vector;
  animation: any
  constructor(x: number, y: number, alive: Alive = 0) {
    this.alive = alive;
    this.nextAliveState = undefined;
    this.index = new Vector(x,y)

    this.animation = new CellAnimation(keyFrames, 750)
  }

  nextCellState(aliveNeighbours: number) {
    if (this.alive) {
      this.nextAliveState = (aliveNeighbours === 2 || aliveNeighbours === 3) ? 1 : 0;
    } else {
      this.nextAliveState = aliveNeighbours === 3 ? 1 : 0;
    }
  }

  applyNextState() {
    if (this.nextAliveState !== undefined) {
      this.alive = this.nextAliveState;
      this.nextAliveState = undefined;
    }
  }

  toggle(newState: boolean) {
    if (this.alive === 0 && newState) {
      this.animation = new CellAnimation(keyFrames)
    }

    this.alive = newState ? 1 : 0;
  }

  draw(ctx: CanvasRenderingContext2D, size:number, cellPadding: number, timePassed: number) {
    let xPos = (size + cellPadding) * this.index.x
    let yPos = (size + cellPadding) * this.index.y
    let sizeVector = new Vector(size,size)
    let posVector = new Vector(xPos, yPos)
    let fillColor = this.alive ? "#bababa" : "#1b331d"

    if (this.animation) {
      sizeVector = this.animation.calculateSize(timePassed, sizeVector)
      posVector = posVector.add((size - sizeVector.x) / 2)

      if (this.animation.done) {
        this.animation = undefined
      }
    }

    this._drawRect(ctx, posVector, sizeVector, 5, fillColor);
  }

  _drawRect(ctx: CanvasRenderingContext2D, pos: Vector, size: Vector, borderRadius: number = 5, fillColor: string) {
    ctx.beginPath();
    ctx.moveTo(pos.x + borderRadius, pos.y);
    ctx.lineTo(pos.x + size.x - borderRadius, pos.y);
    ctx.quadraticCurveTo(pos.x + size.x, pos.y, pos.x + size.x, pos.y + borderRadius);
    ctx.lineTo(pos.x + size.x, pos.y + size.y - borderRadius);
    ctx.quadraticCurveTo(pos.x + size.x, pos.y + size.y, pos.x + size.x - borderRadius, pos.y + size.y);
    ctx.lineTo(pos.x + borderRadius, pos.y + size.y);
    ctx.quadraticCurveTo(pos.x, pos.y + size.y, pos.x, pos.y + size.y - borderRadius);
    ctx.lineTo(pos.x, pos.y + borderRadius);
    ctx.quadraticCurveTo(pos.x, pos.y, pos.x + borderRadius, pos.y);
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();
  }
}

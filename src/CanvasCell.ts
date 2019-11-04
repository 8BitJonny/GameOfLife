import Alive from "./model/alive";
import Vector from "./model/vector";

export default class Cell {
	alive: Alive;
	nextAliveState: Alive | undefined;
	index: {x: number, y: number};
	constructor(x: number, y: number, alive: Alive = 0) {
		this.alive = alive;
		this.nextAliveState = undefined;
		this.index = {x: x, y: y}
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

	toggle() {
		this.alive = this.alive ? 0 : 1;
	}

	draw(ctx: CanvasRenderingContext2D, size:number, cellPadding: number) {
		ctx.beginPath();

		let xPos = (size + cellPadding) * this.index.x;
		let yPos = (size + cellPadding) * this.index.y;
		let fillColor = "#1b331d";

		if (this.alive === 1) {
			fillColor = "#bababa"
		}

		this._drawRect(ctx, new Vector(xPos,yPos), new Vector(size,size), 5, fillColor);
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
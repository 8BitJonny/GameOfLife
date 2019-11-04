import Alive from "./model/alive";
import Vector from "./model/vector";
import Canvas from "./Canvas";

export default class Cell {
	size: number;
	alive: Alive;
	nextAliveState: Alive | undefined;
	index: {x: number, y: number};
	constructor(x: number, y: number, alive: Alive = 0, size = 14) {
		this.size = size;
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

	draw(ctx: CanvasRenderingContext2D, cellPadding: number) {
		ctx.beginPath();

		let xPos = this.size * this.index.x + this.index.x*cellPadding;
		let yPos = this.size * this.index.y + this.index.y*cellPadding;
		let fillColor = "#1b331d";

		if (this.alive === 1) {
			fillColor = "#bababa"
		}

		this._drawRoundRect(ctx, new Vector(xPos,yPos), new Vector(this.size,this.size), 5, fillColor);
	}

	_drawRect(ctx: CanvasRenderingContext2D, pos: Vector, size: Vector, fillColor: string) {
		ctx.rect( pos.x, pos.y, size.x, size.y);
		ctx.fillStyle = fillColor;
		ctx.fill()
	}

	_drawRoundRect(ctx: CanvasRenderingContext2D, pos: Vector, size: Vector, radius: number = 5, fillColor: string) {
		ctx.beginPath();
		ctx.moveTo(pos.x + radius, pos.y);
		ctx.lineTo(pos.x + size.x - radius, pos.y);
		ctx.quadraticCurveTo(pos.x + size.x, pos.y, pos.x + size.x, pos.y + radius);
		ctx.lineTo(pos.x + size.x, pos.y + size.y - radius);
		ctx.quadraticCurveTo(pos.x + size.x, pos.y + size.y, pos.x + size.x - radius, pos.y + size.y);
		ctx.lineTo(pos.x + radius, pos.y + size.y);
		ctx.quadraticCurveTo(pos.x, pos.y + size.y, pos.x, pos.y + size.y - radius);
		ctx.lineTo(pos.x, pos.y + radius);
		ctx.quadraticCurveTo(pos.x, pos.y, pos.x + radius, pos.y);
		ctx.closePath();

		ctx.fillStyle = fillColor;
		ctx.fill();
	}
}
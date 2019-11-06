import React, {createRef} from 'react';
import {GridState} from "./model/grid";
import GridConfig from "./model/gridConfig";
import Vector from "./model/vector";

interface ComponentsProps { gridState: GridState, gridConfig: GridConfig, animation?: "loadingIn" | "poppingIn", handleCellClick: (cell: Vector, fillMode: boolean) => void }
interface ComponentsState { ctx: CanvasRenderingContext2D | undefined, fillMode: boolean }

export default class Canvas extends React.Component<ComponentsProps, ComponentsState> {
	private canvasRef = createRef<HTMLCanvasElement>();
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			ctx: undefined,
			fillMode: false
		};
	}

	componentDidMount(): void {
		this.setupCanvas(() => {
			this.drawCanvas();
		});
	}

	componentDidUpdate() {
		this.clearCanvas();
		this.drawCanvas();
	}

	setupCanvas(cb?: () => void) {
		if (!this.canvasRef.current) return;

		let ctx = this.canvasRef.current.getContext("2d");

		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;

		this.setState({ctx: ctx}, () => {
			if (cb) cb();
		})
	}

	clearCanvas() {
		if (!this.state.ctx) return;
		this.state.ctx.clearRect(0,0, this.props.gridConfig.size.w, this.props.gridConfig.size.h);
	}

	drawCanvas() {
		if (!this.state.ctx) return;

		for (let i = 0; i < this.props.gridConfig.cellCount.h; i++) {
			for (let j = 0; j < this.props.gridConfig.cellCount.w; j++) {
				this.props.gridState[i][j].draw(this.state.ctx, this.props.gridConfig.cellSize, this.props.gridConfig.cellPadding);
			}
		}
	}

	getCursorPosition(event: React.MouseEvent, canvasRef: HTMLCanvasElement) {
		let rect = canvasRef.getBoundingClientRect();
		return new Vector(event.clientX - rect.left, event.clientY - rect.top);
	}

	onMouseMove(event: React.MouseEvent) {
		if (event.buttons === 1) {
			this.onMouseMoveDown(event);
		}
	}

	onMouseMoveDown(event: React.MouseEvent) {
		const clickedCell = this.calculateClickedCell(event);
		if (clickedCell) this.props.handleCellClick(clickedCell, this.state.fillMode);
	}

	onClick(event: React.MouseEvent) {
		const clickedCell = this.calculateClickedCell(event);
		if (clickedCell) {
			let newFillMode = this.calculateFillMode(clickedCell);
			this.setState({fillMode: newFillMode});

			this.props.handleCellClick(clickedCell, newFillMode)
		}
	}

	calculateFillMode(clickedCell: Vector) {
		return !this.props.gridState[clickedCell.y][clickedCell.x].alive
	}

	calculateClickedCell(event: React.MouseEvent) {
		if (!this.canvasRef.current) return;

		const cursorPos = this.getCursorPosition(event, this.canvasRef.current);
		return this.calculateClickedCellFromCursor(cursorPos);
	}

	calculateClickedCellFromCursor(cursorPos: Vector): Vector | null {
		let xIndex = this.calculateClickedCellIn1D(cursorPos.x);
		let yIndex = this.calculateClickedCellIn1D(cursorPos.y);

		if (xIndex !== null && yIndex !== null) {
			return new Vector(xIndex, yIndex);
		} else {
			return null
		}
	}

	calculateClickedCellIn1D(cursorPos: number): number | null {
		let posModulo = (cursorPos - 2) % (this.props.gridConfig.cellSize + this.props.gridConfig.cellPadding);

		if (posModulo < this.props.gridConfig.cellSize) {
			return Math.floor(cursorPos / (this.props.gridConfig.cellSize + this.props.gridConfig.cellPadding));
		} else {
			return null
		}
	}

	render() {
		return(
			<canvas
				id="canvas"
				ref={this.canvasRef}
				className={""}
				onMouseMove={this.onMouseMove.bind(this)}
				onMouseDown={this.onClick.bind(this)}
				width={this.props.gridConfig.size.w}
				height={this.props.gridConfig.size.h}>

			</canvas>
		)
	}
}
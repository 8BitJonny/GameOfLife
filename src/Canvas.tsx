import React from 'react';
import Grid from "./model/grid";

interface ComponentsProps { gridState: Grid, cellSize: number, size: { h: number, w: number }, animation?: "loadingIn" | "poppingIn", handleCellClick: (e:React.SyntheticEvent, row: number, column: number) => void }
interface ComponentsState { ctx: CanvasRenderingContext2D | undefined }

export default class Canvas extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			ctx: undefined
		};
	}

	componentDidMount(): void {
		this.setupCanvas(() => {
			this.drawCanvas();
		});
	}

	setupCanvas(cb?: () => void) {
		let canvas = document.getElementById('canvas') as HTMLCanvasElement;
		if (!canvas) return;

		let ctx = canvas.getContext("2d");

		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;

		this.setState({ctx: ctx}, () => {
			if (cb) cb();
		})
	}

	clearCanvas() {
		if (!this.state.ctx) return;
		this.state.ctx.clearRect(0,0, this.props.size.w * this.props.cellSize, this.props.size.h * this.props.cellSize);
	}

	drawCanvas() {
		if (!this.state.ctx) return;

		const cellPadding = 7;

		for (let i = 0; i < this.props.size.h; i++) {
			for (let j = 0; j < this.props.size.w; j++) {
				this.props.gridState[i][j].draw(this.state.ctx, cellPadding);
			}
		}
	}

	render() {
		this.clearCanvas();
		this.drawCanvas();

		return(
			<canvas
				id="canvas"
				className={""}
				width={this.props.size.w * this.props.cellSize}
				height={this.props.size.h * this.props.cellSize}>

			</canvas>
		)
	}
}
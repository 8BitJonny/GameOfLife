import React from 'react';
import {GridState} from "./model/grid";
import GridConfig from "./model/gridConfig";

interface ComponentsProps { gridState: GridState, gridConfig: GridConfig, animation?: "loadingIn" | "poppingIn" }
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

	render() {
		this.clearCanvas();
		this.drawCanvas();

		return(
			<canvas
				id="canvas"
				className={""}
				width={this.props.gridConfig.size.w}
				height={this.props.gridConfig.size.h}>

			</canvas>
		)
	}
}
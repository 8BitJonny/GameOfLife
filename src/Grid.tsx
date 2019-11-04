import React from "react";
import {ControlEvent} from "./model/controlEvent";
import Canvas from "./Canvas";
import GridConfig from "./model/gridConfig";
import {calculateCellCountFromPixelSize, calculatePixelSizeFromCellCount} from "./utils";
import Grid from "./model/grid";

interface ComponentsProps {  }
interface ComponentsState { play: boolean, edit: boolean, gridConfig: GridConfig, gridState: Grid, animation: "loadingIn" | "poppingIn" | undefined }

class GridComponent extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			play: false,
			edit: false,
			gridConfig: {
				speed: 150,
				cellSize: 14,
				cellPadding: 7,
				size: { h: 623, w: 1253 },
				cellCount: { h: 30, w: 60 }
			},
			gridState: Grid.generateEmptyState(30,60),
			animation: undefined
		}
	}

	componentDidMount(): void {
		this.updateGridSize();

		window.addEventListener("resize", this.updateGridSize.bind(this));
	}

	updateGridSize() {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) {
			const h = calculateCellCountFromPixelSize(this.state.gridConfig.cellSize, this.state.gridConfig.cellPadding, wrapperElement.clientHeight);
			const w = calculateCellCountFromPixelSize(this.state.gridConfig.cellSize, this.state.gridConfig.cellPadding, wrapperElement.clientWidth);

			const pixelH = calculatePixelSizeFromCellCount(this.state.gridConfig.cellSize, this.state.gridConfig.cellPadding, h);
			const pixelW = calculatePixelSizeFromCellCount(this.state.gridConfig.cellSize, this.state.gridConfig.cellPadding, w);

			this.setState( {
				gridConfig: {...this.state.gridConfig, size: {h: pixelH, w: pixelW}, cellCount: {h, w}},
				gridState: this.state.gridState.adjustGridToNewSize(h, w)
			});
		}
	}

	handleControlEvent(event: ControlEvent, callback: (state: ControlEvent) => void) {
		switch (event) {
			case "PLAY":
				if (!this.state.play) {
					this.setState({play: true, animation: undefined, edit: false}, () => {this.handleNextState()});
					callback("PLAY");
				}
				return;
			case "PAUSE":
				this.setState({play: false});
				callback("PAUSE");
				return;
			case "RAND":
				this.setState({gridState: Grid.generateNewRandomState(this.state.gridConfig.cellCount.h, this.state.gridConfig.cellCount.w), animation: "loadingIn"});
				return;
			case "EDIT":
				if (this.state.edit) {
					this.setState({edit: false, animation: undefined});
					callback("PAUSE");
				} else {
					this.setState({edit: true, animation: "poppingIn"});
					callback("EDIT");
				}
				return;
			case "CLEAR":
				this.setState({gridState: Grid.generateEmptyState(this.state.gridConfig.cellCount.h, this.state.gridConfig.cellCount.w), animation: undefined});
				return;
			default:
				return;
		}
	}

	handleNextState(nextStepTime: number = 0) {
		if (!this.state.play) return;

		if (new Date().getTime() >= nextStepTime) {
			nextStepTime = new Date().getTime() + this.state.gridConfig.speed;
			this.setState({gridState: this.state.gridState.calculateNextGrid()});
		}

		requestAnimationFrame(this.handleNextState.bind(this, nextStepTime));
	}

	render () {
		return (
			<div className="bg-darkgreen flex-grow flex-shrink overflow-hidden">
				<div className="h-full p-2">
					<div id="GridWrapper" className={"h-full flex justify-center content-center"}>
						<Canvas
							gridState={this.state.gridState.state}
							gridConfig={this.state.gridConfig}
							animation={this.state.animation}/>
					</div>
				</div>
			</div>
		)
	};
}

export default GridComponent;
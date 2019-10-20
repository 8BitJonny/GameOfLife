import React from "react";
import GridLayout from "./GridLayout";
import {ControlEvent} from "./model/controlEvent";

interface ComponentsProps {  }
interface ComponentsState { cellSize: number, size: { h: number, w: number }, gridState: boolean[][] }

class Grid extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			cellSize: 30,
			size: { h: 30, w: 60 },
			gridState: this.generateNewRandomState(30,60)
		}
	}

	componentDidMount(): void {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) {
			const h =  Math.floor(wrapperElement.clientHeight / this.state.cellSize);
			const w = Math.floor(wrapperElement.clientWidth / this.state.cellSize);

			this.setState({
				size: {h, w},
				gridState: this.generateNewRandomState(h, w)
			});
		}
	}

	handleControlEvent(event: ControlEvent) {
		switch (event) {
			case "RAND":
				this.setState({gridState: this.generateNewRandomState()});
				return;
			default:
				return;
		}
	}

	generateNewRandomState(rowCount: number = this.state.size.h, columnCount: number = this.state.size.w ): boolean[][] {
		let newState: boolean[][] = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				newState[rowIndex].push( Math.random() > 0.5 );
			}
		}

		return newState;
	}

	render () {
		return (
			<div className="h-full pt-20 bg-darkgreen">
				<div className="h-full p-2">
					<div id="GridWrapper" className={"h-full flex justify-center content-center"}>
						<GridLayout gridState={this.state.gridState} cellSize={this.state.cellSize} size={this.state.size}/>
					</div>
				</div>
			</div>
		)
	};
}

export default Grid;
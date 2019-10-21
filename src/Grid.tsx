import React from "react";
import GridLayout from "./GridLayout";
import {ControlEvent} from "./model/controlEvent";

interface ComponentsProps {  }
interface ComponentsState { play: boolean, cellSize: number, size: { h: number, w: number }, gridState: boolean[][] }

class Grid extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			play: false,
			cellSize: 25,
			size: { h: 30, w: 60 },
			gridState: this.generateEmptyState(30,60)
		}
	}

	componentDidMount(): void {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) {
			const h =  Math.floor(wrapperElement.clientHeight / this.state.cellSize);
			const w = Math.floor(wrapperElement.clientWidth / this.state.cellSize);

			this.setState({
				size: {h, w},
				gridState: this.generateEmptyState(h, w)
			});
		}
	}

	handleControlEvent(event: ControlEvent) {
		switch (event) {
			case "PLAY":
				if (!this.state.play) this.setState({play: true}, () => {this.handleNextState()});
				return;
			case "PAUSE":
				this.setState({play: false});
				return;
			case "RAND":
				this.setState({gridState: this.generateNewRandomState()});
				return;
			default:
				return;
		}
	}

	handleNextState() {
		if (!this.state.play) return;

		this.setState({gridState: this.calculateNextGrid()});

		setTimeout(() => {this.handleNextState()}, 200)
	}

	calculateNextGrid(): boolean[][] {
		let newGridState: boolean[][] = [];
		for (let rowIndex = 0; rowIndex < this.state.size.h; rowIndex ++) {
			newGridState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < this.state.size.w; columnIndex ++) {
				const aliveNeighbours = this.countAliveNeighbours(this.state.gridState, {rowIndex, columnIndex});
				const oldCellState = this.state.gridState[rowIndex][columnIndex];
				const newCellState = this.calculateCellState(aliveNeighbours, oldCellState);
				newGridState[rowIndex].push( newCellState );
			}
		}
		return newGridState
	}

	countAliveNeighbours(grid: boolean[][], cellIndex: { rowIndex: number, columnIndex: number }): number {
		let count = 0;
		for (let gridRowIndexOffset = -1; gridRowIndexOffset <= 1; gridRowIndexOffset++ ) {
			for (let gridColumnIndexOffset = -1; gridColumnIndexOffset <= 1; gridColumnIndexOffset++ ) {
				const gridRowIndex = cellIndex.rowIndex + gridRowIndexOffset;
				const gridColumnIndex = cellIndex.columnIndex + gridColumnIndexOffset;
				if (this.indexInGridBounds(grid, gridRowIndex, gridColumnIndex)
				&& !(gridColumnIndexOffset === 0 && gridRowIndexOffset === 0)) {
					count += grid[gridRowIndex][gridColumnIndex] ? 1 : 0;
				}
			}
		}
		return count
	}

	indexInGridBounds(grid: boolean[][], rowIndex: number, columnIndex: number) {
		return rowIndex >= 0 && rowIndex < grid.length && columnIndex >= 0 && columnIndex < grid[0].length;
	}

	calculateCellState(aliveNeighbours: number, oldState: boolean): boolean {
		if (oldState) {
			return aliveNeighbours === 2 || aliveNeighbours === 3;
		} else {
			return aliveNeighbours === 3;
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

	generateEmptyState(rowCount: number = this.state.size.h, columnCount: number = this.state.size.w ): boolean[][] {
		let newState: boolean[][] = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				newState[rowIndex].push( false );
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
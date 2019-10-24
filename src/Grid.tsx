import React from "react";
import GridLayout from "./GridLayout";
import {ControlEvent} from "./model/controlEvent";
import GridObject from "./model/grid";
import Alive from "./model/alive";

interface ComponentsProps {  }
interface ComponentsState { play: boolean, cellSize: number, size: { h: number, w: number }, gridState: GridObject, loadingIn: boolean }

class Grid extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			play: false,
			cellSize: 20,
			size: { h: 30, w: 60 },
			gridState: this.generateEmptyState(30,60),
			loadingIn: false
		}
	}

	componentDidMount(): void {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) {
			const h =  Math.floor(wrapperElement.clientHeight / this.state.cellSize);
			const w = Math.floor(wrapperElement.clientWidth / this.state.cellSize);

			this.setState({
				size: {h, w},
				gridState: this.generateEmptyState(h, w),
				loadingIn: false
			});
		}
	}

	handleControlEvent(event: ControlEvent) {
		switch (event) {
			case "PLAY":
				if (!this.state.play) this.setState({play: true, loadingIn: false}, () => {this.handleNextState()});
				return;
			case "PAUSE":
				this.setState({play: false});
				return;
			case "RAND":
				this.setState({gridState: this.generateNewRandomState(), loadingIn: true});
				return;
			default:
				return;
		}
	}

	handleNextState() {
		if (!this.state.play) return;

		this.setState({gridState: this.calculateNextGrid( this.state.gridState )});

		setTimeout(() => {this.handleNextState()}, 150)
	}

	calculateNextGrid(grid: GridObject, rowCount: number = this.state.size.h, columnCount: number = this.state.size.w): GridObject {
		let newGridState: GridObject = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newGridState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				const aliveNeighbours = this.countAliveNeighbours(grid, {rowIndex, columnIndex});
				const oldCellState = grid[rowIndex][columnIndex];
				const newCellState = this.calculateCellState(aliveNeighbours, oldCellState);
				newGridState[rowIndex].push( newCellState );
			}
		}
		return newGridState
	}

	countAliveNeighbours(grid: GridObject, cellIndex: { rowIndex: number, columnIndex: number }): number {
		let count = 0;
		for (let gridRowIndexOffset = -1; gridRowIndexOffset <= 1; gridRowIndexOffset++ ) {
			for (let gridColumnIndexOffset = -1; gridColumnIndexOffset <= 1; gridColumnIndexOffset++ ) {
				const rowIndex = cellIndex.rowIndex + gridRowIndexOffset;
				const columnIndex = cellIndex.columnIndex + gridColumnIndexOffset;
				if (this.indexInGridBounds(grid, {rowIndex, columnIndex})
				&& !(gridColumnIndexOffset === 0 && gridRowIndexOffset === 0)) {
					count += grid[rowIndex][columnIndex] ? 1 : 0;
				}
			}
		}
		return count
	}

	indexInGridBounds(grid: GridObject, cellIndex: { rowIndex: number, columnIndex: number }) {
		return cellIndex.rowIndex >= 0 && cellIndex.rowIndex < grid.length && cellIndex.columnIndex >= 0 && cellIndex.columnIndex < grid[0].length;
	}

	calculateCellState(aliveNeighbours: number, oldState: Alive): Alive {
		if (oldState) {
			return (aliveNeighbours === 2 || aliveNeighbours === 3) ? 1 : 0;
		} else {
			return aliveNeighbours === 3 ? 1 : 0;
		}
	}

	generateNewRandomState(rowCount: number = this.state.size.h, columnCount: number = this.state.size.w ): GridObject {
		let newState: GridObject = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				newState[rowIndex].push( Math.random() > 0.7 ? 1 : 0 );
			}
		}
		return newState;
	}

	generateEmptyState(rowCount: number = this.state.size.h, columnCount: number = this.state.size.w ): GridObject {
		let newState: GridObject = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				newState[rowIndex].push( 0 );
			}
		}
		return newState;
	}

	render () {
		return (
			<div className="bg-darkgreen flex-grow">
				<div className="h-full p-2">
					<div id="GridWrapper" className={"h-full flex justify-center content-center"}>
						<GridLayout gridState={this.state.gridState} cellSize={this.state.cellSize} size={this.state.size} loadingAnimation={this.state.loadingIn}/>
					</div>
				</div>
			</div>
		)
	};
}

export default Grid;
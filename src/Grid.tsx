import React from "react";
import GridLayout from "./GridLayout";
import {ControlEvent} from "./model/controlEvent";
import GridObject from "./model/grid";
import Alive from "./model/alive";

interface ComponentsProps {  }
interface ComponentsState { play: boolean, edit: boolean, cellSize: number, size: { h: number, w: number }, gridState: GridObject, animation: "loadingIn" | "poppingIn" | undefined }

class Grid extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			play: false,
			edit: false,
			cellSize: 20,
			size: { h: 30, w: 60 },
			gridState: this.generateEmptyState(30,60),
			animation: undefined
		}
	}

	updateGridSize() {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) {
			const h =  Math.floor(wrapperElement.clientHeight / this.state.cellSize);
			const w = Math.floor(wrapperElement.clientWidth / this.state.cellSize);

			this.setState({
				size: {h, w},
				gridState: this.adjustGridToNewSize(this.state.gridState, h, w)
			});
		}
	}

	adjustGridToNewSize(grid: GridObject, newHeight: number, newWidth: number): GridObject {
		const oldHeight = grid.length, oldWidth = grid[0].length;

		for (let rowIndex = 0; rowIndex < oldHeight; rowIndex ++) {
			grid[rowIndex] = this.truncateOrFillWith(newWidth, oldWidth, grid[rowIndex], 0);
		}

		grid = this.truncateOrFillWith(newHeight, oldHeight, grid ,this.generateEmptyColumn(newWidth));

		return grid;
	}

	truncateOrFillWith<T>(newLength: number, oldLength: number, parent: T[], fillElement: T): T[] {
		if (newLength < oldLength) {
			parent = parent.splice(0, newLength);
		} else {
			for (let i = oldLength; i < newLength; i++) {
				parent.push(fillElement)
			}
		}
		return parent
	}

	componentDidMount(): void {
		this.updateGridSize();

		window.addEventListener("resize", this.updateGridSize.bind(this));
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
				this.setState({gridState: this.generateNewRandomState(), animation: "loadingIn"});
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
			newState[rowIndex] = this.generateEmptyColumn(columnCount);
		}
		return newState;
	}

	generateEmptyColumn(columnSize: number): Alive[] {
		let emptyColumn: Alive[] = [];
		for (let columnIndex = 0; columnIndex < columnSize; columnIndex ++) {
			emptyColumn.push( 0 );
		}
		return emptyColumn;
	}

	handleCellClick(e: React.SyntheticEvent, row: number, column: number) {
		if (!this.state.edit) return;
		this.toggleCellStateAt(row, column)
	}

	toggleCellStateAt(row: number, column: number) {
		let clonedGrid = [ ...this.state.gridState ];
		clonedGrid[row][column] = clonedGrid[row][column] === 1 ? 0 : 1;
		this.setState({ gridState: clonedGrid })
	}

	render () {
		return (
			<div className="bg-darkgreen flex-grow flex-shrink overflow-hidden">
				<div className="h-full p-2">
					<div id="GridWrapper" className={"h-full flex justify-center content-center"}>
						<GridLayout
							gridState={this.state.gridState}
							cellSize={this.state.cellSize}
							size={this.state.size}
							animation={this.state.animation}
							handleCellClick={this.handleCellClick.bind(this)}/>
					</div>
				</div>
			</div>
		)
	};
}

export default Grid;
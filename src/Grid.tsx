import React from "react";
import {ControlEvent} from "./model/controlEvent";
import GridObject from "./model/grid";
import Canvas from "./Canvas";
import CanvasCell from "./CanvasCell";
import GridConfig from "./model/gridConfig";

interface ComponentsProps {  }
interface ComponentsState { play: boolean, edit: boolean, gridConfig: GridConfig, gridState: GridObject, animation: "loadingIn" | "poppingIn" | undefined }

class Grid extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			play: false,
			edit: false,
			gridConfig: {
				cellSize: 20,
				cellPadding: 7,
				size: { h: 30, w: 60 }
			},
			gridState: this.generateEmptyState(30,60),
			animation: undefined
		}
	}

	updateGridSize() {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) {
			const h =  Math.floor(wrapperElement.clientHeight / this.state.gridConfig.cellSize);
			const w = Math.floor(wrapperElement.clientWidth / this.state.gridConfig.cellSize);

			this.setState( {
				gridConfig: {...this.state.gridConfig, size: {h, w}},
				gridState: this.adjustGridToNewSize(this.state.gridState, h, w)
			});
		}
	}

	adjustGridToNewSize(grid: GridObject, newHeight: number, newWidth: number): GridObject {
		const oldHeight = grid.length, oldWidth = grid[0].length;

		for (let rowIndex = 0; rowIndex < oldHeight; rowIndex ++) {
			grid[rowIndex] = this.truncateOrFillWith(newWidth, oldWidth, grid[rowIndex],(index) => new CanvasCell(rowIndex, index));
		}

		grid = this.truncateOrFillWith(newHeight, oldHeight, grid ,(index) => this.generateEmptyColumn(index, newWidth));

		return grid;
	}

	truncateOrFillWith<T>(newLength: number, oldLength: number, parent: T[], fillElement: (index: number) => T): T[] {
		if (newLength < oldLength) {
			parent = parent.splice(0, newLength);
		} else {
			for (let i = oldLength; i < newLength; i++) {
				parent.push(fillElement(i))
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
			case "CLEAR":
				this.setState({gridState: this.generateEmptyState(), animation: undefined});
				return;
			default:
				return;
		}
	}

	handleNextState() {
		if (!this.state.play) return;

		this.setState({gridState: this.calculateNextGrid( this.state.gridState )});

		requestAnimationFrame(this.handleNextState.bind(this));
	}

	calculateNextGrid(grid: GridObject, rowCount: number = this.state.gridConfig.size.h, columnCount: number = this.state.gridConfig.size.w): GridObject {
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				const aliveNeighbours = this.countAliveNeighbours(grid, {rowIndex, columnIndex});
				grid[rowIndex][columnIndex].nextCellState(aliveNeighbours);
			}
		}

		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				grid[rowIndex][columnIndex].applyNextState();
			}
		}
		return grid
	}

	countAliveNeighbours(grid: GridObject, cellIndex: { rowIndex: number, columnIndex: number }): number {
		let count = 0;
		for (let gridRowIndexOffset = -1; gridRowIndexOffset <= 1; gridRowIndexOffset++ ) {
			for (let gridColumnIndexOffset = -1; gridColumnIndexOffset <= 1; gridColumnIndexOffset++ ) {
				const rowIndex = cellIndex.rowIndex + gridRowIndexOffset;
				const columnIndex = cellIndex.columnIndex + gridColumnIndexOffset;
				if (this.indexInGridBounds(grid, {rowIndex, columnIndex})
				&& !(gridColumnIndexOffset === 0 && gridRowIndexOffset === 0)) {
					if (grid[rowIndex][columnIndex].alive === 1) {
						count ++
					}
				}
			}
		}
		return count
	}

	indexInGridBounds(grid: GridObject, cellIndex: { rowIndex: number, columnIndex: number }) {
		return cellIndex.rowIndex >= 0 && cellIndex.rowIndex < grid.length && cellIndex.columnIndex >= 0 && cellIndex.columnIndex < grid[0].length;
	}

	generateNewRandomState(rowCount: number = this.state.gridConfig.size.h, columnCount: number = this.state.gridConfig.size.w ): GridObject {
		let newState: GridObject = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newState[rowIndex] = [];
			for (let columnIndex = 0; columnIndex < columnCount; columnIndex ++) {
				newState[rowIndex].push( new CanvasCell(columnIndex, rowIndex, Math.random() > 0.7 ? 1 : 0) );
			}
		}
		return newState;
	}

	generateEmptyState(rowCount: number = this.state.gridConfig.size.h, columnCount: number = this.state.gridConfig.size.w ): GridObject {
		let newState: GridObject = [];
		for (let rowIndex = 0; rowIndex < rowCount; rowIndex ++) {
			newState[rowIndex] = this.generateEmptyColumn(rowIndex, columnCount);
		}
		return newState;
	}

	generateEmptyColumn(rowIndex: number, size: number): CanvasCell[] {
		let emptyColumn: CanvasCell[] = [];
		for (let columnIndex = 0; columnIndex < size; columnIndex ++) {
			emptyColumn.push( new CanvasCell(columnIndex, rowIndex) );
		}
		return emptyColumn;
	}

	handleCellClick(e: React.SyntheticEvent, row: number, column: number) {
		if (!this.state.edit) return;
		this.toggleCellStateAt(row, column)
	}

	toggleCellStateAt(row: number, column: number) {
		let clonedGrid = [ ...this.state.gridState ];
		clonedGrid[row][column].toggle();
		this.setState({ gridState: clonedGrid })
	}

	render () {
		return (
			<div className="bg-darkgreen flex-grow flex-shrink overflow-hidden">
				<div className="h-full p-2">
					<div id="GridWrapper" className={"h-full flex justify-center content-center"}>
						<Canvas
							gridState={this.state.gridState}
							gridConfig={this.state.gridConfig}
							animation={this.state.animation}
							handleCellClick={this.handleCellClick.bind(this)}/>
					</div>
				</div>
			</div>
		)
	};
}

export default Grid;
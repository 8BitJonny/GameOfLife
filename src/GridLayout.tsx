import React from 'react';
import Cell from "./Cell";

interface ComponentsProps { gridState: boolean[][], cellSize: number, size: { h: number, w: number } }
interface ComponentsState { }

export default class GridLayout extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.validateProps(props);

		this.state = { };
	}

	validateProps(props: ComponentsProps) {
		if (props.gridState.length !== props.size.h) console.error("Invalid Props: The GridState Row Count doesn't match with the size.h ");
		if (props.gridState[0].length !== props.size.w) console.error("Invalid Props: The GridState Column Count doesn't match with the size.w ");
	}

	createGrid() {
		let grid = [];

		for (let i = 0; i < this.props.size.h; i++) {
			let row = [];
			for (let j = 0; j < this.props.size.w; j++) {
				row.push(<Cell key={i-j} alive={this.props.gridState[i][j]} />)
			}
			grid.push(<div key={i} className={"row flex flex-1 py-1"}>{row}</div>)
		}
		return grid
	}

	render() {
		return(
			<div className={"flex flex-col"} style={{ width: this.props.size.w * this.props.cellSize, height: this.props.size.h * this.props.cellSize }}>
				{this.createGrid()}
			</div>
		)
	}
}
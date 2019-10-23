import React, {CSSProperties} from 'react';
import Cell from "./Cell";
import Grid from "./model/grid";
import remap from "./utils";

interface ComponentsProps { gridState: Grid, cellSize: number, size: { h: number, w: number }, loadingAnimation: boolean }
interface ComponentsState { }

let loadingAnimation: CSSProperties = {
	transition: "background-color 1s"
};

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

		let cellStyle = this.props.loadingAnimation ? loadingAnimation : {};

		for (let i = 0; i < this.props.size.h; i++) {
			let row = [];
			for (let j = 0; j < this.props.size.w; j++) {
				if (cellStyle.transition) cellStyle.transition = "background-color 1s ease " + remap(i+j, {min: 0, max: this.props.size.h+this.props.size.w}, {min: 0, max: 2}) + "s";
				row.push(<Cell key={i-j} className="mx-1" style={{margin: "0 3px", ...cellStyle}} alive={this.props.gridState[i][j]} />)
			}
			grid.push(<div key={i} className="row flex flex-1 py-1" style={{padding: "3px 0"}}>{row}</div>)
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
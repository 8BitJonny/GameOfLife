import React from 'react';
import Cell from "./Cell";

interface ComponentsProps { }
interface ComponentsState { cellSize: number, size: { h: number, w: number } }

export default class GridLayout extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = {
			cellSize: 30,
			size: { h: 0, w: 0 }
		}
	}

	componentDidMount(): void {
		const wrapperElement = document.getElementById("GridWrapper");
		if (wrapperElement) this.setState({ size: { h: wrapperElement.clientHeight, w: wrapperElement.clientWidth} });

	}

	createGrid() {
		const rowCount = Math.floor(this.state.size.h / this.state.cellSize);
		const columnCount = Math.floor(this.state.size.w / this.state.cellSize);

		let grid = [];

		for (let i = 0; i < rowCount; i++) {
			let row = [];
			for (let j = 0; j < columnCount; j++) {
				row.push(<Cell key={i-j} />)
			}
			grid.push(<div key={i} className={"flex flex-1 py-1"}>{row}</div>)
		}
		return grid
	}

	render() {
		return(
			<div className="h-full p-2">
				<div id="GridWrapper" className={"h-full"}>
					<div className={"flex flex-col"} style={{ width: this.state.size.w, height: this.state.size.h }}>
						{this.createGrid()}
					</div>
				</div>
			</div>
		)
	}
}
import React from "react";
import GridLayout from "./GridLayout";

interface ComponentsProps {  }
interface ComponentsState {  }

class Grid extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { }
	}

	render () {
		return (
			<div className="h-full pt-20 bg-darkgreen">
				<GridLayout/>
			</div>
		)
	};
}

export default Grid;
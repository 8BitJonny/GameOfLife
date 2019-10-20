import React from 'react';

interface ComponentsProps { alive: boolean }
interface ComponentsState {  }

class Cell extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { }
	}

	render () {
		return (
			<div className={(this.props.alive ? "bg-grey" : "bg-green" ) + " cell flex-1 inline-block mx-1 rounded"} />
		);
	}
}

export default Cell;

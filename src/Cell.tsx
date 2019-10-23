import React, {CSSProperties} from 'react';

interface ComponentsProps { alive: 0 | 1, className?: string, style?: CSSProperties }
interface ComponentsState {  }

class Cell extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { }
	}

	render () {
		const internalStyles: CSSProperties = {transition: "background-color 0.1s"};
		return (
			<div className={(this.props.alive ? "bg-grey" : "bg-green" ) + " cell flex-1 inline-block rounded " + this.props.className} style={{...internalStyles, ...this.props.style}}/>
		);
	}
}

export default Cell;

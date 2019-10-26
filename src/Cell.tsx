import React, {CSSProperties} from 'react';

interface ComponentsProps { alive: 0 | 1, className?: string, style?: CSSProperties, onClick: (e: React.SyntheticEvent) => void}
interface ComponentsState { animationRunning: boolean }

class Cell extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { animationRunning: false }
	}

	onHoverOrHover(e: React.MouseEvent) {
		if (!this.state.animationRunning && e.buttons === 1) this.props.onClick(e);
	}

	setAnimationStatus(status: boolean) {
		this.setState({animationRunning: status});
	}

	render () {
		const internalStyles: CSSProperties = {transition: "background-color 0.1s"};
		return (
			<div
				onMouseDown={this.onHoverOrHover.bind(this)}
				onMouseOver={this.onHoverOrHover.bind(this)}
				onAnimationStart={this.setAnimationStatus.bind(this, true)}
				onAnimationEnd={this.setAnimationStatus.bind(this, false)}
				className={(this.props.alive ? "bg-grey" : "bg-green" ) + " cell flex-1 inline-block rounded " + this.props.className}
				style={{...internalStyles, ...this.props.style}}/>
		);
	}
}

export default Cell;

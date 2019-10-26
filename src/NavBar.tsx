import React from "react";
import Play from "./svg/play";
import Randomize from "./svg/randomize";
import Pause from "./svg/pause";
import {ControlEvent} from "./model/controlEvent";
import {State} from "./model/state";

interface ComponentsProps { gridControlState: State, actionCallBack: (event: ControlEvent) => void }
interface ComponentsState { }

class NavBar extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { }
	}

	handleClick(controlEvent: ControlEvent) {
		if (!this.shouldBeDisabled(controlEvent)) this.props.actionCallBack(controlEvent);
	}

	shouldBeDisabled(controlEvent: ControlEvent): boolean {
		switch (this.props.gridControlState) {
			case "PLAY":
				return controlEvent === "RAND";
			case "PAUSE":
				return false;
			default:
				return false;
		}
	}

	render () {
		const controlClassname = "h-full ml-8 inline-block cursor-pointer text-white ";
		return (
			<div className="w-full h-12 px-6 flex flex-wrap items-center justify-between bg-black">
				<div>
					<span className="text-white font-extrabold text-3xl">Game of Life</span>
				</div>
				<div id="controls" className="h-full py-3">
					{ this.props.gridControlState === "PAUSE" ? (
						<Play fillCurrentColor={true} className={controlClassname} onClick={this.handleClick.bind(this,"PLAY")} />
					) : (
						<Pause fillCurrentColor={true} className={controlClassname} onClick={this.handleClick.bind(this,"PAUSE")} />
					) }
					<Randomize fillCurrentColor={true} className={controlClassname + (this.shouldBeDisabled("RAND")  ? " cursor-not-allowed" : " active:p-px")} onClick={this.handleClick.bind(this,"RAND")} />
				</div>
			</div>
		);
	}
}

export default NavBar;

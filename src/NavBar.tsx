import React from "react";
import Play from "./svg/play";
import Edit from "./svg/edit";
import Pause from "./svg/pause";
import Randomize from "./svg/randomize";
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
		if (this.props.gridControlState === "PLAY") {
			return controlEvent === "RAND" || controlEvent === "EDIT";
		} else {
			return false;
		}
	}

	render () {
		const controlClassname = "h-full ml-8 inline-block cursor-pointer text-white ";
		return (
			<div className="w-full h-12 flex-shrink-0 px-6 flex flex-wrap items-center justify-between bg-black">
				<div>
					<span className="text-white font-extrabold text-3xl">Game of Life</span>
				</div>
				<div id="controls" className="h-full py-3">
					{ this.props.gridControlState === "PLAY" ? (
						<Pause fillCurrentColor={true} className={controlClassname} onClick={this.handleClick.bind(this,"PAUSE")} />
					) : (
						<Play fillCurrentColor={true} className={controlClassname} onClick={this.handleClick.bind(this,"PLAY")} />
					) }
					<Randomize fillCurrentColor={true} className={controlClassname + (this.shouldBeDisabled("RAND")  ? " cursor-not-allowed" : " active:p-px")} onClick={this.handleClick.bind(this,"RAND")} />
					<Edit fillCurrentColor={true} className={controlClassname + (this.shouldBeDisabled("EDIT")  ? " cursor-not-allowed" : " active:p-px")} onClick={this.handleClick.bind(this,"EDIT")} />
				</div>
			</div>
		);
	}
}

export default NavBar;

import React from "react";
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

	classesIf(condition: boolean, classes: string) {
		return condition ? classes : "";
	}

	render () {
		const buttonClassname = "h-full mx-1 px-1 bg-transparent text-white font-bold border border-transparent rounded appearance-none focus:outline-none ";
		return (
			<div className="w-full h-12 flex-shrink-0 px-6 flex flex-wrap items-center justify-between bg-black">
				<div>
					<span className="text-white font-extrabold text-3xl">Game of Life</span>
				</div>
				<div id="controls" className="h-full my-auto py-1 text-xl">
					{ this.props.gridControlState === "PLAY" ? (
						<button className={buttonClassname} onClick={this.handleClick.bind(this,"PAUSE")}>Pause</button>
					) : (
						<button className={buttonClassname} onClick={this.handleClick.bind(this,"PLAY")}>Play</button>
					) }
					<button className={buttonClassname + " active:underline" + this.classesIf(this.shouldBeDisabled("RAND"), " opacity-50 cursor-not-allowed")} onClick={this.handleClick.bind(this,"RAND")}>Randomize</button>
					<button className={buttonClassname + " active:underline" + this.classesIf(this.props.gridControlState === "EDIT", " underline") + this.classesIf(this.shouldBeDisabled("EDIT"), " opacity-50 cursor-not-allowed")} onClick={this.handleClick.bind(this,"EDIT")}>Edit</button>
				</div>
			</div>
		);
	}
}

export default NavBar;

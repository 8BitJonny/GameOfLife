import React from "react";
import Play from "./static/Play.svg";
import Randomize from "./static/Randomize.svg";
import Pause from "./static/Pause.svg";
import {ControlEvent} from "./model/controlEvent";

interface ComponentsProps { actionCallBack: (event: ControlEvent) => void }
interface ComponentsState { }

class NavBar extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { }
	}

	render () {
		const controlClassname = "h-full ml-8 inline-block cursor-pointer";
		return (
			<div className="w-full h-12 px-6 flex flex-wrap items-center justify-between bg-black">
				<div>
					<span className="text-white font-extrabold text-3xl">Game of Life</span>
				</div>
				<div id="controls" className="">
					{/*<img id="SLOW" className={controlClassname} onClick={this.props.actionCallBack.bind(this,"SLOW")} src={SlowDown} alt=""/>*/}
					<img id="PLAY" className={controlClassname} onClick={this.props.actionCallBack.bind(this,"PLAY")} src={Play} alt=""/>
					{/*<img id="FAST" className={controlClassname} onClick={this.props.actionCallBack.bind(this,"FAST")} src={Faster} alt=""/>*/}
					<img id="PAUSE" className={controlClassname} onClick={this.props.actionCallBack.bind(this,"PAUSE")} src={Pause} alt=""/>
					<img id="RAND" className={controlClassname} onClick={this.props.actionCallBack.bind(this,"RAND")} src={Randomize} alt=""/>
					{/*<img id="EDIT" className={controlClassname} onClick={this.props.actionCallBack.bind(this,"EDIT")} src={Edit} alt=""/>*/}
				</div>
			</div>
		);
	}
}

export default NavBar;
